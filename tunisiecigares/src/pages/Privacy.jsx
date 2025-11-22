// src/pages/Privacy.jsx
import SEO from '../components/SEO';

export default function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn about how we collect, use, and protect your personal information at Tunisie Cigares."
      />
      <div className="container-page py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="title-gold text-4xl mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="title-gold text-2xl mb-4">1. Information We Collect</h2>
              <p className="text-white/80 leading-relaxed">
                We collect information you provide directly to us when placing orders, including:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Name, email address, phone number</li>
                <li>Delivery address</li>
                <li>Age verification information</li>
                <li>Order history and preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="title-gold text-2xl mb-4">2. How We Use Your Information</h2>
              <p className="text-white/80 leading-relaxed">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Provide customer support</li>
                <li>Send promotional offers (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="title-gold text-2xl mb-4">3. Data Security</h2>
              <p className="text-white/80 leading-relaxed">
                We implement appropriate security measures to protect your personal information.
                All data is encrypted in transit and at rest.
              </p>
            </section>

            <section>
              <h2 className="title-gold text-2xl mb-4">4. Your Rights (GDPR)</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Under GDPR, you have the right to:
              </p>
              <ul className="list-disc list-inside text-white/80 space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="title-gold text-2xl mb-4">5. Cookies</h2>
              <p className="text-white/80 leading-relaxed">
                We use essential cookies to provide basic functionality. We do not use tracking
                cookies without your consent.
              </p>
            </section>

            <section>
              <h2 className="title-gold text-2xl mb-4">6. Contact Us</h2>
              <p className="text-white/80 leading-relaxed">
                For privacy-related inquiries, contact us at:
              </p>
              <div className="mt-4 card p-4">
                <p className="text-white">Email: privacy@cigarlounge.tn</p>
                <p className="text-white">
                  Messenger: <a href="https://m.me/100093202210414" className="text-gold hover:underline">@CigarLoungeTunisia</a>
                </p>
              </div>
            </section>

            <p className="text-white/60 text-sm mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

