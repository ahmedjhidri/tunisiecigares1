export default function Contact() {
  return (
    <div className="container-page py-12 sm:py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="title-gold text-4xl mb-8 text-center">Contact Us</h1>
        <div className="card p-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>
            <p className="text-white/80 mb-6">
              Have questions about our premium cigars? We're here to help. Reach out to us via Messenger or email.
            </p>
          </div>
          <div className="space-y-4">
            <a
              href="https://m.me/100093202210414"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full text-center block"
            >
              Message us on Messenger
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

