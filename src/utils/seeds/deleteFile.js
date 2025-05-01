const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
    const fullPath = path.resolve(filePath);
    fs.unlink(fullPath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted:', fullPath);
        }
    });
}

module.exports = deleteFile;