import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MessengerButton from './components/MessengerButton.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';

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


