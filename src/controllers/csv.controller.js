const { Parser } = require('json2csv');
const fs = require('fs');
const jsonModel = require('../models/json.model');

const csvData = async (req, res) => {
    try {
        const jsonDocuments = await jsonModel.find().sort({ serialNumber: 1 });
        
        if (!jsonDocuments.length) {
            return res.status(404).json({ message: 'No data found' });
        }

        const flattenedData = jsonDocuments.map(doc => ({
            SerialNumber: doc.serialNumber,
            Gender: doc.data.results[0].gender,
            Title: doc.data.results[0].name.title,
            'First Name': doc.data.results[0].name.first,
            'Last Name': doc.data.results[0].name.last,
            'Street Number': doc.data.results[0].location.street.number,
            'Street Name': doc.data.results[0].location.street.name,
            City: doc.data.results[0].location.city,
            State: doc.data.results[0].location.state,
            Country: doc.data.results[0].location.country,
            Postcode: doc.data.results[0].location.postcode,
            Latitude: doc.data.results[0].location.coordinates.latitude,
            Longitude: doc.data.results[0].location.coordinates.longitude,
            'Timezone Offset': doc.data.results[0].location.timezone.offset,
            'Timezone Description': doc.data.results[0].location.timezone.description,
            Email: doc.data.results[0].email,
            UUID: doc.data.results[0].login.uuid,
            Username: doc.data.results[0].login.username,
            Password: doc.data.results[0].login.password,
            Salt: doc.data.results[0].login.salt,
            MD5: doc.data.results[0].login.md5,
            SHA1: doc.data.results[0].login.sha1,
            SHA256: doc.data.results[0].login.sha256,
            DOB: doc.data.results[0].dob.date,
            Age: doc.data.results[0].dob.age,
            'Registered Date': doc.data.results[0].registered.date,
            'Registered Age': doc.data.results[0].registered.age,
            Phone: doc.data.results[0].phone,
            Cell: doc.data.results[0].cell,
            'ID Name': doc.data.results[0].id.name,
            'ID Value': doc.data.results[0].id.value,
            'Picture (Large)': doc.data.results[0].picture.large,
            'Picture (Medium)': doc.data.results[0].picture.medium,
            'Picture (Thumbnail)': doc.data.results[0].picture.thumbnail,
            Nationality: doc.data.results[0].nat
        }));

        const fields = Object.keys(flattenedData[0]);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(flattenedData);

        res.header('Content-Type', 'text/csv');
        res.attachment('data.csv');
        return res.send(csv);
    } catch (error) {
        console.error('Error in csvData:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = csvData;