const fs = require('fs');
const path = require('path');

const createFile = async (csvData, headers) => {
    const date = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, '..', '..', 'csv_file', `${date}.csv`);
    
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            // Create file with headers if it doesn't exist
            await fs.promises.writeFile(filePath, headers + '\n');
        }
        
        // Append data to file
        await fs.promises.appendFile(filePath, csvData + '\n');
        return true;
    } catch (error) {
        console.error('Error in createFile:', error);
        throw error;
    }
};

module.exports = { createFile };