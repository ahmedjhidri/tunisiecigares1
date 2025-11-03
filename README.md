# Digital Farmer's Market Tunisia 🚜

A React web application that connects farmers, fishermen, butchers, and buyers in Tunisia. This platform enables local producers to showcase their products and buyers to discover fresh, local goods.

## Features

- **User Authentication**: Firebase Authentication with email and password
- **Role-Based Access**: Different interfaces for farmers, fishermen, butchers, and buyers
- **Product Management**: Producers can add products with detailed information
- **Category Filtering**: Browse products by produce, seafood, or meat categories
- **Real-time Database**: Firebase Firestore for storing users and products
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean, intuitive design with Tailwind-inspired styling

## User Roles

### Producers (Farmers, Fishermen, Butchers)
- Register with specific role
- Add products with name, category, quantity, price, and description
- View all marketplace products
- Manage their product listings

### Buyers
- Browse all available products
- Filter products by category
- Contact producers directly
- View product details and pricing

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Firebase account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd farmer-market-tunisia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   b. Create a new project
   c. Enable Authentication (Email/Password)
   d. Enable Firestore Database
   e. Get your Firebase configuration

4. **Configure Firebase**
   
   Edit `src/firebase.js` and replace the placeholder config with your actual Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Firebase Configuration Steps

### 1. Create Firebase Project
- Visit [Firebase Console](https://console.firebase.google.com/)
- Click "Add project"
- Enter project name: "farmer-market-tunisia"
- Follow the setup wizard

### 2. Enable Authentication
- In Firebase Console, go to "Authentication"
- Click "Get started"
- Go to "Sign-in method" tab
- Enable "Email/Password" provider
- Click "Save"

### 3. Enable Firestore Database
- In Firebase Console, go to "Firestore Database"
- Click "Create database"
- Choose "Start in test mode" (for development)
- Select a location close to Tunisia
- Click "Done"

### 4. Get Configuration
- In Firebase Console, go to Project Settings (gear icon)
- Scroll down to "Your apps" section
- Click "Add app" and choose web
- Copy the configuration object
- Paste it in `src/firebase.js`

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation component
│   └── Navbar.css
├── contexts/           # React contexts
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── Dashboard.js    # User dashboard
│   ├── AddProduct.js   # Add product form
│   ├── ProductList.js  # Product listing
│   └── *.css          # Page-specific styles
├── firebase.js         # Firebase configuration
├── App.js              # Main app component
├── index.js            # App entry point
└── *.css               # Global styles
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Usage

### For Producers
1. Register with your role (farmer, fisherman, or butcher)
2. Login to your account
3. Navigate to "Add Product" to list your goods
4. Fill in product details and submit
5. View your products in the marketplace

### For Buyers
1. Register as a buyer
2. Login to your account
3. Browse products by category
4. Contact producers for purchases
5. Support local economy

## Features in Detail

### Product Categories
- **🌾 Produce**: Fruits, vegetables, grains, and agricultural products
- **🐟 Seafood**: Fish, shellfish, and other marine products
- **🥩 Meat**: Beef, lamb, poultry, and other meat products

### Product Information
- Product name and description
- Category classification
- Quantity available
- Price in Tunisian Dinar (TND)
- Producer contact information
- Date added to marketplace

### Security Features
- Protected routes based on user roles
- Firebase Authentication
- Secure database access
- Input validation

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- Image upload for products
- Real-time chat between users
- Payment integration
- Order management system
- Product reviews and ratings
- Location-based filtering
- Mobile app development
- Multi-language support (Arabic/French)

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check Firebase documentation

## License

This project is licensed under the MIT License.

---

**Built with ❤️ for Tunisia's local producers and buyers** 