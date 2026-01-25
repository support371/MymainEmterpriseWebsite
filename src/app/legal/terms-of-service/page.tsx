export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-white">Terms of Service</h1>
        <p className="text-slate-400 mb-8">Last Updated: January 24, 2026</p>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-8 text-slate-300">
          <p>By using GEM Enterprise services, you agree to be bound by the following terms and conditions.</p>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
            <p className="text-sm">By accessing or using our services, you agree to comply with and be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">2. Description of Service</h2>
            <p className="text-sm">GEM Enterprise provides cybersecurity monitoring, incident response, and compliance management services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">3. User Responsibilities</h2>
            <p className="text-sm">Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">4. Payment Terms</h2>
            <p className="text-sm">Pricing for our services is as set forth on our website or in a separate agreement between you and GEM Enterprise.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 text-white">5. Limitation of Liability</h2>
            <p className="text-sm">GEM Enterprise shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
