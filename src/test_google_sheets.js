const GoogleSheetsManager = require('./integrations/google_sheets');

async function testGoogleSheets() {
    const sheetsManager = new GoogleSheetsManager(process.env.GOOGLE_SHEETS_ID);

    // Test user registration data
    const testUsers = [
        {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            location: 'New York',
            skills: 'Python, JavaScript, React',
            education: 'Bachelor of Science',
            experience: '5 years',
            preferredJobTypes: 'Full-time, Remote',
            preferredLocations: 'New York, Remote',
            salaryExpectation: '$80,000 - $100,000',
            availability: 'Immediate',
            additionalInfo: 'Looking for software development roles',
            resumeUrl: 'https://example.com/resume',
            linkedinUrl: 'https://linkedin.com/in/johndoe',
            githubUrl: 'https://github.com/johndoe',
            portfolioUrl: 'https://johndoe.com',
            currentCompany: 'Tech Corp',
            currentRole: 'Senior Developer',
            noticePeriod: '2 weeks',
            languages: 'English, Spanish',
            certifications: 'AWS Certified, Google Cloud Certified',
            projects: 'E-commerce Platform, Mobile App',
            references: 'Available upon request'
        },
        {
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '0987654321',
            location: 'San Francisco',
            skills: 'Java, Spring Boot, AWS',
            education: 'Master of Computer Science',
            experience: '3 years',
            preferredJobTypes: 'Full-time, Hybrid',
            preferredLocations: 'San Francisco, Remote',
            salaryExpectation: '$90,000 - $110,000',
            availability: '2 weeks notice',
            additionalInfo: 'Backend developer with cloud experience',
            resumeUrl: 'https://example.com/jane-resume',
            linkedinUrl: 'https://linkedin.com/in/janesmith',
            githubUrl: 'https://github.com/janesmith',
            portfolioUrl: 'https://janesmith.com',
            currentCompany: 'Cloud Solutions',
            currentRole: 'Backend Developer',
            noticePeriod: '1 month',
            languages: 'English, French',
            certifications: 'Oracle Certified, Docker Certified',
            projects: 'Microservices Architecture, API Gateway',
            references: 'Available upon request'
        }
    ];

    // Save test users
    console.log('Saving test users...');
    for (const user of testUsers) {
        const result = await sheetsManager.saveUserRegistration(user);
        console.log(`Save result for ${user.name}:`, result);
    }

    // Search for users
    console.log('\nSearching users...');
    const searchResults = await sheetsManager.searchUsers('developer');
    console.log('Search results:', searchResults);

    // Update a user
    console.log('\nUpdating user...');
    const updateResult = await sheetsManager.updateUser('john@example.com', {
        currentRole: 'Lead Developer',
        salaryExpectation: '$100,000 - $120,000'
    });
    console.log('Update result:', updateResult);

    // Get all users
    console.log('\nRetrieving all users...');
    const allUsers = await sheetsManager.getAllUsers();
    console.log('All users:', allUsers);
}

// Run the test
testGoogleSheets().catch(console.error); 