from typing import Dict
import os
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import pickle
from datetime import datetime

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

class GoogleSheetsManager:
    def __init__(self, spreadsheet_id: str):
        self.spreadsheet_id = spreadsheet_id
        self.service = self._get_service()

    def _get_service(self):
        """Shows basic usage of the Sheets API.
        Returns the service object.
        """
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first time.
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)

        return build('sheets', 'v4', credentials=creds)

    def save_user_registration(self, user_data: Dict):
        """Saves user registration data to the Google Sheet.
        
        Args:
            user_data: Dictionary containing user registration data
        """
        try:
            # Prepare the data to be appended
            values = [
                [
                    datetime.now().strftime("%Y-%m-%d %H:%M:%S"),  # Timestamp
                    user_data.get('name', ''),
                    user_data.get('email', ''),
                    user_data.get('phone', ''),
                    user_data.get('location', ''),
                    user_data.get('skills', ''),
                    user_data.get('education', ''),
                    user_data.get('experience', ''),
                    user_data.get('preferred_job_types', ''),
                    user_data.get('preferred_locations', ''),
                    user_data.get('salary_expectation', ''),
                    user_data.get('availability', ''),
                    user_data.get('additional_info', '')
                ]
            ]

            # Call the Sheets API
            body = {
                'values': values
            }
            
            result = self.service.spreadsheets().values().append(
                spreadsheetId=self.spreadsheet_id,
                range='Users!A:M',  # Assuming the sheet is named 'Users' and has columns A through M
                valueInputOption='RAW',
                insertDataOption='INSERT_ROWS',
                body=body
            ).execute()

            print(f"User data saved successfully. {result.get('updates').get('updatedRows')} rows added.")
            return True

        except Exception as e:
            print(f"Error saving user data: {str(e)}")
            return False

    def get_all_users(self):
        """Retrieves all user data from the Google Sheet."""
        try:
            result = self.service.spreadsheets().values().get(
                spreadsheetId=self.spreadsheet_id,
                range='Users!A:M'
            ).execute()
            
            return result.get('values', [])
        except Exception as e:
            print(f"Error retrieving user data: {str(e)}")
            return [] 