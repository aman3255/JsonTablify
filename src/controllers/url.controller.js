const axios = require('axios');
const jsonModel = require('../models/json.model');
const { createFile } = require('../service/createfile.service');
const { Parser } = require('json2csv');

const urlData = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ message: 'URL is required' });
        }

        // Fetch data from URL
        const response = await axios.get(url);
        const jsonInput = response.data;

        // Get the highest serial number and increment it
        const lastDocument = await jsonModel.findOne().sort({ serialNumber: -1 });
        const newSerialNumber = lastDocument ? lastDocument.serialNumber + 1 : 1;

        // Save to database
        const newJsonDoc = new jsonModel({
            serialNumber: newSerialNumber,
            data: jsonInput
        });
        await newJsonDoc.save();

        // Prepare CSV data
        const flattenedData = {
            SerialNumber: newSerialNumber,
            Gender: jsonInput.results[0].gender,
            Title: jsonInput.results[0].name.title,
            'First Name': jsonInput.results[0].name.first,
            'Last Name': jsonInput.results[0].name.last,
            'Street Number': jsonInput.results[0].location.street.number,
            'Street Name': jsonInput.results[0].location.street.name,
            City: jsonInput.results[0].location.city,
            State: jsonInput.results[0].location.state,
            Country: jsonInput.results[0].location.country,
            Postcode: jsonInput.results[0].location.postcode,
            Latitude: jsonInput.results[0].location.coordinates.latitude,
            Longitude: jsonInput.results[0].location.coordinates.longitude,
            'Timezone Offset': jsonInput.results[0].location.timezone.offset,
            'Timezone Description': jsonInput.results[0].location.timezone.description,
            Email: jsonInput.results[0].email,
            UUID: jsonInput.results[0].login.uuid,
            Username: jsonInput.results[0].login.username,
            Password: jsonInput.results[0].login.password,
            Salt: jsonInput.results[0].login.salt,
            MD5: jsonInput.results[0].login.md5,
            SHA1: jsonInput.results[0].login.sha1,
            SHA256: jsonInput.results[0].login.sha256,
            DOB: jsonInput.results[0].dob.date,
            Age: jsonInput.results[0].dob.age,
            'Registered Date': jsonInput.results[0].registered.date,
            'Registered Age': jsonInput.results[0].registered.age,
            Phone: jsonInput.results[0].phone,
            Cell: jsonInput.results[0].cell,
            'ID Name': jsonInput.results[0].id.name,
            'ID Value': jsonInput.results[0].id.value,
            'Picture (Large)': jsonInput.results[0].picture.large,
            'Picture (Medium)': jsonInput.results[0].picture.medium,
            'Picture (Thumbnail)': jsonInput.results[0].picture.thumbnail,
            Nationality: jsonInput.results[0].nat
        };

        const fields = Object.keys(flattenedData);
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse([flattenedData]);

        // Save to CSV file
        await createFile(csv.split('\n')[1], fields.join(','));

        res.status(201).json({ message: 'URL data processed successfully', serialNumber: newSerialNumber });
    } catch (error) {
        console.error('Error in urlData:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = urlData;