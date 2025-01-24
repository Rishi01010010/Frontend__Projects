// const { MongoClient } = require('mongodb');
// const fs = require('fs');
// const path = require('path');

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'attendance';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('students');

//     const einsteinPhoto = fs.readFileSync(path.join('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Albert-Einstein-Birthday-1200x834.jpg'));
//     collection.insertMany([
//         { name: 'Einstein', roll_number: 'A1', photo: einsteinPhoto }
//     ]);

// //     // Read image files as binary data
// //     const risheekPhoto = fs.readFileSync(path.join('D:', 'ME-40.jpg'));
// //     const srujalaPhoto = fs.readFileSync(path.join('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Srujala.jpeg'));

// //     // Insert documents
// //     const insertResult = await collection.insertMany([
// //         { name: 'Risheek', roll_number: 'A1', photo: risheekPhoto },
// //         { name: 'Srujala', roll_number: 'A2', photo: srujalaPhoto }
// //     ]);
// //     console.log('Inserted documents =>', insertResult);

// //     // Find all documents
// //     const findResult = await collection.find({}).toArray();
// //     console.log('Found documents =>', findResult);

// //     // // Delete documents
// //     // const deleteRisheekResult = await collection.deleteOne({ name: 'Risheek' });
// //     // console.log('Deleted Risheek =>', deleteRisheekResult);
// //     // const deleteSrujalaResult = await collection.deleteOne({ name: 'Srujala' });
// //     // console.log('Deleted Srujala =>', deleteSrujalaResult);

// //     // // Find specific fields
// //     // const projectionResult = await collection.find({}, { projection: { name: 1, roll_number: 1, photo: 1 } }).toArray();
// //     // console.log('Projection result =>', projectionResult);

//     // return 'done';
// }

// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());


    
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

        // Read photo file and convert to buffer
        const einsteinPhoto = fs.readFileSync('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Albert-Einstein-Birthday-1200x834.jpg');

        // Insert document with photo buffer
        const result = await collection.insertMany([
            { name: 'Einstein', roll_number: 'A1', photo: einsteinPhoto }
        ]);

        console.log('Inserted documents:', result.insertedCount);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the client
        await client.close();
    }
}

main();
