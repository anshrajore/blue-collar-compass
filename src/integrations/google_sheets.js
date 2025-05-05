const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

class GoogleSheetsManager {
    constructor(spreadsheetId) {
        this.doc = new GoogleSpreadsheet(spreadsheetId);
        this.initialized = false;
    }

    async initialize() {
        if (!this.initialized) {
            await this.doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            });
            await this.doc.loadInfo();
            this.initialized = true;
        }
    }

    async saveUserRegistration(userData) {
        try {
            await this.initialize();
            const sheet = this.doc.sheetsByIndex[0];
            
            // Prepare the data with timestamp
            const rowData = {
                timestamp: new Date().toISOString(),
                ...userData
            };

            await sheet.addRow(rowData);
            return { success: true, message: 'User data saved successfully' };
        } catch (error) {
            console.error('Error saving user data:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllUsers() {
        try {
            await this.initialize();
            const sheet = this.doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            return rows.map(row => row.toObject());
        } catch (error) {
            console.error('Error retrieving users:', error);
            return [];
        }
    }

    async searchUsers(query, field = null) {
        try {
            const users = await this.getAllUsers();
            query = query.toLowerCase();
            
            return users.filter(user => {
                if (field) {
                    return user[field] && user[field].toLowerCase().includes(query);
                }
                return Object.values(user).some(value => 
                    value && value.toString().toLowerCase().includes(query)
                );
            });
        } catch (error) {
            console.error('Error searching users:', error);
            return [];
        }
    }

    async updateUser(email, updates) {
        try {
            await this.initialize();
            const sheet = this.doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            
            const row = rows.find(row => row.email === email);
            if (!row) {
                return { success: false, error: 'User not found' };
            }

            Object.assign(row, updates);
            await row.save();
            
            return { success: true, message: 'User updated successfully' };
        } catch (error) {
            console.error('Error updating user:', error);
            return { success: false, error: error.message };
        }
    }
}

module.exports = GoogleSheetsManager; 