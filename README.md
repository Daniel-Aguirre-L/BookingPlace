# Rustik - Cabin Booking Application

Rustik is a web application that allows users to register and book available cabins for their desired dates. The application features a user-friendly interface for cabin bookings and an admin panel for managing cabins, users, and bookings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Browse and book available cabins
- Admin panel for managing cabins, users, and bookings
- Responsive design for better user experience

## Technologies Used

- **Backend**: Java, Spring Boot
- **Frontend**: React.js
- **Database**: MySQL

## Setup Instructions

To set up the Rustik application, follow the instructions below for both the backend and frontend.

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/JulianCallejas/BookingPlace.git
   ```

2. **Set up the environment**:
   - Go to the backend folder is `rustik/backend`.
   - Copy the `.envTemplate` to `.env`:
     ```bash
     cd BookingPlace/backend/rustik     
     cp .envTemplate .env
     ```
   - Edit the `.env` file to configure your database and other settings.

3. **Create the MySQL database**:
   - Open your MySQL client and run the following command:
     ```sql
     CREATE DATABASE rustik;
     or
     CREATE SCHEMA `rustik`;
     ```

4. **Run the Spring Boot application**:
   - Make sure you have Maven installed. Run:
     ```bash
     mvn spring-boot:run
     ```
   - The server should now be running on `http://localhost:8080`.

### Frontend Setup

1. **Navigate to the frontend folder**:
   ```bash
   cd ../frontend
   ```

2. **Set up the environment**:
   - Copy the `.envTemplate` to `.env`:
     ```bash
     cp .envTemplate .env
     ```
   - Edit the `.env` file to configure the API endpoint and other settings.

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Run the React application**:
   ```bash
   npm run dev
   ```
   - The frontend should now be running on `http://localhost:5173/`.

## Usage

1. **User Registration**: Navigate to the registration page to create a new account.
2. **Cabin Booking**: Log in and browse available cabins for booking.
3. **Admin Panel**: Access the admin panel to manage cabins, users, and bookings (admin access required).

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
