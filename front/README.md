<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="front/public/Icons/logoSvg.svg">
  <source media="(prefers-color-scheme: light)" srcset="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png">
  <img src="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360711/Rustik-logo/ulwcjystr37bqblnje3p.png" alt='Rustik'>
</picture>
</div>

<br />

<h1 align="center"> Cabin Booking Application</h1>

Rustik is a web application that allows users to register and book available cabins for their desired dates. The application features a user-friendly interface for cabin bookings and an admin panel for managing cabins, users, and bookings.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Browse and book available cabins
- Admin panel for managing cabins, users, and bookings
- Responsive design for better user experience

## Technologies Used

- **Frontend**: React.js
- **Backend**: Java, Spring Boot
- **Database**: MySQL
- **Authentication**: JWT
- **Image Hosting**: Cloudinary
- **Email Sending**: Gmail API

## Setup Instructions

To set up the Rustik application, follow the instructions below for both the frontend.

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

<br />

<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="front/public/Icons/shortlogo-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png">
  <img src="http://res.cloudinary.com/dmu6eqzqy/image/upload/v1731360812/Rustik-logo/o1sepuqvrih5biexqajy.png" alt='Rustik' style='height: 40px;' />
</picture>
</div>