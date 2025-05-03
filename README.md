# Blue Collar Compass

A job matching platform for blue-collar workers, featuring Google Sheets integration for user data management.

## Features

- User registration and data management
- Google Sheets integration for data storage
- Search and update functionality
- Data validation and error handling

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/blue-collar-compass.git
cd blue-collar-compass
```

2. Install dependencies:
```bash
npm install
```

3. Set up Google Sheets API:
   - Create a Google Cloud Project
   - Enable Google Sheets API
   - Create a service account
   - Download credentials as JSON
   - Share your Google Sheet with the service account email

4. Configure environment variables:
   Create a `.env` file in the project root:
   ```
   GOOGLE_SHEETS_ID=your_spreadsheet_id_here
   GOOGLE_SERVICE_EMAIL=your_service_account_email@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   ```

## Usage

1. Run the test script:
```bash
npm test
```

2. Use in your application:
```javascript
const GoogleSheetsManager = require('./integrations/google_sheets');

// Initialize
const sheetsManager = new GoogleSheetsManager(process.env.GOOGLE_SHEETS_ID);

// Save user
const result = await sheetsManager.saveUserRegistration(userData);

// Search users
const searchResults = await sheetsManager.searchUsers('query');

// Update user
const updateResult = await sheetsManager.updateUser('email', updates);
```

## Project Structure

```
blue-collar-compass/
├── src/
│   ├── integrations/
│   │   └── google_sheets.js
│   └── test_google_sheets.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
