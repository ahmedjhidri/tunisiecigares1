import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MessengerButton from './components/MessengerButton.jsx';
import Toast from './components/Toast.jsx';
import SuccessOverlay from './components/SuccessOverlay.jsx';
import AgeVerificationModal from './components/AgeVerificationModal.jsx';
import CartNotification from './components/CartNotification.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import PromoBanner from './components/PromoBanner.jsx';
import SEO from './components/SEO.jsx';
import Home from './pages/Home.jsx';
import Privacy from './pages/Privacy.jsx';
import Products from './pages/Products.jsx';
import Product from './pages/Product.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import AdminOrders from './pages/AdminOrders.jsx';
import MyOrders from './pages/MyOrders.jsx';
import Accessories from './pages/Accessories.jsx';
import NotFound from './pages/NotFound.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-ebony text-white">
      <SEO />
      <AgeVerificationModal />
      <CartNotification />
      <CookieConsent />
      <PromoBanner />
      <Header />
      <main className="flex-1" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MessengerButton />
      <ScrollToTop />
      <Toast />
      <SuccessOverlay />
      </div>
    </ErrorBoundary>
  );
}
