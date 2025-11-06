import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MessengerButton from './components/MessengerButton.jsx';
import Toast from './components/Toast.jsx';
import SuccessOverlay from './components/SuccessOverlay.jsx';
import AgeVerificationModal from './components/AgeVerificationModal.jsx';
import CartNotification from './components/CartNotification.jsx'; // ← AJOUTE
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import MyOrders from './pages/MyOrders.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ebony text-white">
      <AgeVerificationModal />
      <CartNotification />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} /> {/* ← This route must exist */}
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
      </main>
      <Footer />
      <MessengerButton />
      <Toast />
      <SuccessOverlay />
    </div>
  );
}
