# Tourism Management System

## Description

The Tourism Management System is a RESTful API designed to manage tourist attractions, visitors, and reviews. This project allows users to create, read, update, and delete (CRUD) information related to attractions and visitors, as well as post reviews for attractions. The system ensures data integrity through validation rules and provides endpoints for retrieving top-rated attractions and visitor activity.

## Features

- **Attractions Management**: 
  - Add new attractions with details such as name, location, and entry fee.
  - Update existing attractions and their ratings.
  - Retrieve a list of all attractions or specific attractions by ID.
  - Get the top-rated attractions based on user reviews.

- **Visitors Management**: 
  - Register new visitors with unique email addresses.
  - Update visitor information and track visited attractions.
  - Retrieve a list of all visitors or specific visitors by ID.
  - Get a summary of visitor activity, including the count of attractions reviewed.

- **Reviews Management**: 
  - Post reviews for attractions, ensuring that visitors have visited the attraction and have not reviewed it multiple times.
  - Update existing reviews and calculate average ratings for attractions based on user feedback.
  - Retrieve all reviews or specific reviews by ID.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data related to attractions, visitors, and reviews.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model application data.
- **Postman**: Tool for testing API endpoints and managing requests.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tourism-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tourism-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/tourism-system
   ```

5. Start the server:
   ```bash
   npm start
   ```

6. Use Postman to test the API endpoints.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.
