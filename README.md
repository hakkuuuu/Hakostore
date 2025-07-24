# Hakostore

A modern full-stack e-commerce application built with the PERN stack (PostgreSQL, Express, React, Node.js).

![Hakostore Logo](frontend/src/assets/hakostore.svg)

## Features

- 🛍️ Product Management (CRUD operations)
- 🎨 Multiple Theme Support
- 📱 Responsive Design
- 🔍 Category-based Filtering
- 🖼️ Image Support
- ⚡ Real-time Updates
- 🎯 Modern UI with DaisyUI and Tailwind CSS

## Tech Stack

### Frontend
- React.js with Vite
- Zustand for State Management
- React Router for Navigation
- Tailwind CSS & DaisyUI for Styling
- Axios for API Requests
- React Hot Toast for Notifications
- Lucide React for Icons

### Backend
- Node.js & Express
- PostgreSQL with Neon Database
- CORS for Cross-Origin Resource Sharing
- Helmet for Security
- Morgan for Logging
- Arcjet for Rate Limiting

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd hakostore
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000 # or your preferred port
```

4. Initialize the database
```bash
# Run the database initialization script
node backend/seeds/products.js
```

5. Start the development servers
```bash
# Start backend server
npm run dev

# In a new terminal, start frontend development server
cd frontend
npm run dev
```

## Available Scripts

- `npm run dev` - Start the backend server in development mode
- `npm run build` - Build the frontend and install dependencies
- `npm start` - Start the production server

## Features in Detail

### Product Management
- Create new products with name, description, price, category, and image
- View all products with pagination
- Update existing products
- Delete products
- Filter products by category

### Theme System
Available themes:
- Pastel
- Retro
- Coffee
- Forest
- Cyberpunk
- Synthwave
- Luxury
- Autumn
- Valentine
- Aqua
- Business
- Night
- Dracula

## Project Structure

```
hakostore/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── seeds/          # Database seeds
│   └── server.js       # Server entry point
└── frontend/
    ├── public/         # Static files
    ├── src/
    │   ├── assets/     # Images and static assets
    │   ├── components/ # React components
    │   ├── constants/  # Configuration constants
    │   ├── pages/      # Page components
    │   ├── store/      # Zustand store
    │   └── main.jsx    # App entry point
    └── vite.config.js  # Vite configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 