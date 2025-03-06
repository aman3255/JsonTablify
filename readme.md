# JSONTablify

![Node.js](https://img.shields.io/badge/Node.js-v16+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-v4+-yellow)
![License](https://img.shields.io/badge/License-ISC-blue)

A Node.js application that converts JSON data into CSV format, with support for raw JSON input and URL-based JSON fetching. Data is stored in MongoDB with serial numbers and appended to daily CSV files in the `csv_file` folder.

## Features
- Convert raw JSON to CSV
- Fetch JSON from URLs and convert to CSV
- Persistent storage in MongoDB with unique serial numbers
- Daily CSV file generation in `csv_file`
- Download all data as a CSV file

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- npm (included with Node.js)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/aman3255/JSONTablify.git
cd JSONTablify
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:

```ini
DEV_MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/JSONTOCSV
DEV_PORT=9000
NODE_ENV=DEV
```
Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB credentials.

### 4. Run the Application
```bash
node index.js
```
The server will start at [http://localhost:9000](http://localhost:9000).

## API Endpoints

### 1. POST `/api/v1/json/rawjson`
Converts raw JSON data to CSV and stores it.

#### Headers:
```json
Content-Type: application/json
```

#### Body:
To get sample body data, visit [https://randomuser.me/api/](https://randomuser.me/api/) and click **Pretty Print** for better readability.

Example Body:
```json
{
  "results": [
    {
      "gender": "female",
      "name": { "title": "Miss", "first": "Yolanda", "last": "Fuentes" },
      "location": { "street": { "number": 78, "name": "Calle de Atocha" }, "city": "Vigo", "state": "Canarias", "country": "Spain", "postcode": 35973 },
      "email": "yolanda.fuentes@example.com",
      "phone": "971-271-036"
    }
  ]
}
```

#### Response (201):
```json
{ "message": "Data processed successfully", "serialNumber": 1 }
```

#### Example:
```bash
curl -X POST http://localhost:9000/api/v1/json/rawjson -H "Content-Type: application/json" -d @example.json
```

### 2. POST `/api/v1/json/urljson`
Fetches JSON from a URL and converts it to CSV.

#### Headers:
```json
Content-Type: application/json
```

#### Body:
```json
{ "url": "https://randomuser.me/api/" }
```

#### Response (201):
```json
{ "message": "URL data processed successfully", "serialNumber": 2 }
```

#### Example:
```bash
curl -X POST http://localhost:9000/api/v1/json/urljson -H "Content-Type: application/json" -d '{"url": "https://randomuser.me/api/"}'
```

### 3. GET `/api/v1/json/csv`
Downloads all stored data as a CSV file.

#### Response (200):
**Content-Type:** `text/csv`

Example CSV content:
```csv
SerialNumber,Gender,Title,First Name,Last Name,Email,Phone
1,Female,Miss,Yolanda,Fuentes,yolanda.fuentes@example.com,971-271-036
```

#### Example:
```bash
curl -X GET http://localhost:9000/api/v1/json/csv -o data.csv
```

## Project Structure
```bash
JSONTablify/
├── csv_file/            # CSV storage (tracked, contents ignored)
├── src/
│   ├── controllers/     # Request handlers
│   ├── database/        # MongoDB connection
│   ├── models/          # Schemas
│   ├── routers/         # API routes
│   └── service/         # Utilities
├── .env                 # Environment config (ignored)
├── .gitignore           # Git ignore rules
├── index.js             # Entry point
├── package.json         # Dependencies
└── README.md            # This file
```

## Notes
- CSV files are stored in `csv_file/` as `YYYY-MM-DD.csv`.
- The `.gitignore` tracks the `csv_file/` folder but ignores `*.csv` files inside it.

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Commit changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a pull request.

## License
This project is licensed under the ISC License.

