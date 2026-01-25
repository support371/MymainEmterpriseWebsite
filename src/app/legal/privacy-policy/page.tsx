

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
        <p className="text-slate-400 mb-8">Last Updated: January 24, 2026</p>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8 text-slate-300">
          <p>GEM Enterprise is committed to protecting your privacy and ensuring the security of your data.</p>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">1. Information Collection</h2>
            <p className="text-sm">We collect information you provide directly to us, such as when you request a demo, subscribe to our newsletter, or contact us for support. This may include your name, email address, company name, and phone number.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">2. Data Usage</h2>
            <p className="text-sm">We use the information we collect to provide, maintain, and improve our services, to communicate with you about your account, and to send you updates and promotional materials.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">3. Security Measures</h2>
            <p className="text-sm">We implement a variety of security measures to maintain the safety of your personal information, including encryption and secure server infrastructure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">4. Your Rights</h2>
            <p className="text-sm">You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">5. Contact</h2>
            <p className="text-sm">If you have any questions about this Privacy Policy, please contact us at privacy@gemcyber.com.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
