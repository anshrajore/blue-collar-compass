from integrations.google_sheets import GoogleSheetsManager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_google_sheets():
    # Initialize the Google Sheets manager
    sheets_manager = GoogleSheetsManager(os.getenv('GOOGLE_SHEETS_ID'))

    # Test user registration data
    test_users = [
        {
            'name': 'John Doe',
            'email': 'john@example.com',
            'phone': '1234567890',
            'location': 'New York',
            'skills': 'Python, JavaScript, React',
            'education': 'Bachelor of Science',
            'experience': '5 years',
            'preferred_job_types': 'Full-time, Remote',
            'preferred_locations': 'New York, Remote',
            'salary_expectation': '$80,000 - $100,000',
            'availability': 'Immediate',
            'additional_info': 'Looking for software development roles'
        },
        {
            'name': 'Jane Smith',
            'email': 'jane@example.com',
            'phone': '0987654321',
            'location': 'San Francisco',
            'skills': 'Java, Spring Boot, AWS',
            'education': 'Master of Computer Science',
            'experience': '3 years',
            'preferred_job_types': 'Full-time, Hybrid',
            'preferred_locations': 'San Francisco, Remote',
            'salary_expectation': '$90,000 - $110,000',
            'availability': '2 weeks notice',
            'additional_info': 'Backend developer with cloud experience'
        }
    ]

    # Save test users to Google Sheet
    for user in test_users:
        success = sheets_manager.save_user_registration(user)
        if success:
            print(f"Successfully saved user: {user['name']}")
        else:
            print(f"Failed to save user: {user['name']}")

    # Retrieve and print all users
    print("\nRetrieving all users from the sheet:")
    all_users = sheets_manager.get_all_users()
    for user in all_users:
        print(user)

if __name__ == "__main__":
    test_google_sheets() 