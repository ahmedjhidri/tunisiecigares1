import { Routes, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MessengerButton from './MessengerButton.jsx';
import Toast from './Toast.jsx';
import Home from './Home.jsx';
import Products from './Products.jsx';
import Product from './Product.jsx';
import Contact from './Contact.jsx';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <MessengerButton />
      <Toast />
    </div>
  );
}


