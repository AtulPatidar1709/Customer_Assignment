# Customer Assignment

A Node.js Express application for managing and identifying customer contacts using MongoDB.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (running locally or provide a connection string)

## Installation

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd Customer_Assignment
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Edit the `.env` file to set your MongoDB URI and desired port:
     ```
     MONGODB_URI=mongodb://localhost:27017/zamazon
     PORT=4000
     ```

4. **Start the server:**
   ```sh
   npm start
   ```
   The server will run on `http://localhost:4000` (or the port you set).

## API Endpoints

### 1. Identify Contact

- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Identifies a contact based on email and/or phone number. If the contact does not exist, creates a new primary contact. If the contact exists, links as secondary if needed and returns all related contact information.

#### Request Body

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
```
- At least one of `email` or `phoneNumber` is required.

#### Response

```json
{
  "primaryContactId": "ObjectId",
  "emails": ["user@example.com", ...],
  "phoneNumbers": ["1234567890", ...],
  "secondaryContactIds": ["ObjectId", ...]
}
```

#### Error Responses

- `400 Bad Request` if neither email nor phoneNumber is provided, or if the format is invalid.
- `500 Internal Server Error` for unexpected issues.

---

## Project Structure

- `app.js` - Main application entry point
- `config/db.js` - MongoDB connection logic
- `models/Contact.js` - Mongoose schema for contacts
- `controllers/contactController.js` - Business logic for identifying contacts
- `routes/identify.js` - API route for contact identification

---