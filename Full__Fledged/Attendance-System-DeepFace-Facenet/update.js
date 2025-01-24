const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'attendance';

async function main() {
    try {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('students');

        // Specify the filter to find the document for Einstein
        const filter = { name: 'Einstein' };

        // Specify the new photo data (buffer) to replace the existing photo
        const newPhoto = fs.readFileSync('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\images.jpeg'); // Update the path accordingly

        // Specify the update operation
        const updateDoc = {
            $set: { photo: newPhoto }
        };

        // Execute the update operation
        const result = await collection.updateOne(filter, updateDoc);
        console.log('Photo updated successfully for Einstein:', result.modifiedCount);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the client
        await client.close();
    }
}

main();
