import json
from typing import List, Dict
import asyncio
from playwright.async_api import async_playwright, TimeoutError
from datetime import datetime

class SkillIndiaScraper:
    def __init__(self):
        self.base_url = "https://www.skillindiadigital.gov.in/opportunities"

    async def get_opportunities(self) -> List[Dict]:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=False)
            context = await browser.new_context(
                viewport={'width': 1920, 'height': 1080},
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            )
            page = await context.new_page()
            
            try:
                print("Navigating to the page...")
                await page.goto(self.base_url, wait_until='networkidle', timeout=60000)
                print("Initial page load complete")
                
                # Debug: Print page title and URL
                print(f"Page title: {await page.title()}")
                print(f"Current URL: {page.url}")
                
                # Wait for Angular to be ready
                print("Waiting for Angular app root...")
                await page.wait_for_selector('app-root', state='attached', timeout=30000)
                print("Angular app root found")
                
                # Wait for the opportunities section to load
                print("Waiting for opportunities section...")
                await page.wait_for_selector('.opportunities-section', timeout=30000)
                print("Opportunities section found")
                
                # Get all opportunity cards
                courses = []
                cards = await page.query_selector_all('.opportunity-card')
                print(f"Found {len(cards)} opportunity cards")
                
                for card in cards:
                    try:
                        # Extract opportunity data
                        opportunity = {
                            'id': await self._get_attribute(card, '.opportunity-card', 'id') or str(len(courses) + 1),
                            'title': await self._get_text(card, '.opportunity-title'),
                            'description': await self._get_text(card, '.opportunity-description'),
                            'category': await self._get_text(card, '.opportunity-category'),
                            'duration': await self._get_text(card, '.opportunity-duration'),
                            'level': await self._get_text(card, '.opportunity-level'),
                            'students': self._parse_number(await self._get_text(card, '.opportunity-students')),
                            'imageUrl': await self._get_attribute(card, '.opportunity-image img', 'src'),
                            'isFree': 'Free' in await self._get_text(card, '.opportunity-price'),
                            'isCertified': 'Certified' in await self._get_text(card, '.opportunity-certification'),
                            'provider': await self._get_text(card, '.opportunity-provider'),
                            'rating': self._parse_rating(await self._get_text(card, '.opportunity-rating')),
                            'startDate': await self._get_text(card, '.opportunity-start-date'),
                            'endDate': await self._get_text(card, '.opportunity-end-date'),
                            'location': await self._get_text(card, '.opportunity-location'),
                            'prerequisites': await self._get_prerequisites(card),
                            'skills': await self._get_skills(card)
                        }
                        
                        # Clean and validate data
                        opportunity = self._clean_opportunity_data(opportunity)
                        courses.append(opportunity)
                        print(f"Processed opportunity: {opportunity['title']}")
                        
                    except Exception as e:
                        print(f"Error processing opportunity card: {str(e)}")
                        continue
                
                # Save debug information
                content = await page.content()
                with open('page_source.html', 'w', encoding='utf-8') as f:
                    f.write(content)
                print("\nPage source saved to 'page_source.html'")
                
                await page.screenshot(path='page.png')
                print("Page screenshot saved as 'page.png'")
                
                # Return structured response
                response = {
                    'opportunities': courses,
                    'total': len(courses),
                    'page': 1,
                    'limit': len(courses)
                }
                
                return response
                
            except TimeoutError:
                print("Timeout waiting for page to load")
                return {'opportunities': [], 'total': 0, 'page': 1, 'limit': 0}
            except Exception as e:
                print(f"Error scraping opportunities: {str(e)}")
                return {'opportunities': [], 'total': 0, 'page': 1, 'limit': 0}
            finally:
                await context.close()
                await browser.close()

    def _parse_number(self, text: str) -> int:
        try:
            # Remove any non-numeric characters except decimal point
            cleaned = ''.join(c for c in text if c.isdigit() or c == '.')
            return int(float(cleaned)) if cleaned else 0
        except:
            return 0

    def _parse_rating(self, text: str) -> float:
        try:
            # Extract rating from text like "4.5 stars" or "4.5/5"
            cleaned = ''.join(c for c in text if c.isdigit() or c == '.')
            return float(cleaned) if cleaned else 0.0
        except:
            return 0.0

    def _clean_opportunity_data(self, opportunity: Dict) -> Dict:
        # Clean and validate each field
        cleaned = opportunity.copy()
        
        # Ensure required fields are not empty
        cleaned['title'] = cleaned['title'] or 'Untitled Opportunity'
        cleaned['description'] = cleaned['description'] or 'No description available'
        
        # Clean numeric fields
        cleaned['students'] = max(0, cleaned['students'])
        cleaned['rating'] = max(0.0, min(5.0, cleaned['rating']))
        
        # Ensure lists are not None
        cleaned['prerequisites'] = cleaned['prerequisites'] or []
        cleaned['skills'] = cleaned['skills'] or []
        
        return cleaned

    async def _get_text(self, element, selector: str) -> str:
        try:
            el = await element.query_selector(selector)
            if el:
                return (await el.text_content() or "").strip()
            return ""
        except Exception as e:
            print(f"Error getting text for selector '{selector}': {str(e)}")
            return ""

    async def _get_attribute(self, element, selector: str, attr: str = None) -> str:
        try:
            if attr:
                el = await element.query_selector(selector)
                if el:
                    return (await el.get_attribute(attr) or "").strip()
            else:
                return (await element.get_attribute(selector) or "").strip()
            return ""
        except Exception as e:
            print(f"Error getting attribute for selector '{selector}': {str(e)}")
            return ""

    async def _get_skills(self, element) -> List[str]:
        try:
            skills_el = await element.query_selector('.opportunity-skills')
            if skills_el:
                skill_items = await skills_el.query_selector_all('.skill-tag')
                return [await item.text_content() for item in skill_items if await item.text_content()]
            return []
        except Exception as e:
            print(f"Error getting skills: {str(e)}")
            return []

    async def _get_prerequisites(self, element) -> List[str]:
        try:
            prereq_el = await element.query_selector('.opportunity-prerequisites')
            if prereq_el:
                prereq_items = await prereq_el.query_selector_all('.prerequisite-item')
                return [await item.text_content() for item in prereq_items if await item.text_content()]
            return []
        except Exception as e:
            print(f"Error getting prerequisites: {str(e)}")
            return []

    def save_to_json(self, data: Dict, filename: str = "skill_india_opportunities.json"):
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Data saved to {filename}")
        except Exception as e:
            print(f"Error saving data: {str(e)}")

async def main():
    scraper = SkillIndiaScraper()
    response = await scraper.get_opportunities()
    scraper.save_to_json(response)

if __name__ == "__main__":
    asyncio.run(main()) 