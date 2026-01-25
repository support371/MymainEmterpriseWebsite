import { Shield, CheckCircle } from 'lucide-react';

export default function TrustCompliancePage() {
  return (
    <div className="min-h-screen pt-32 pb-24 text-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <Shield className="w-20 h-20 text-cyan-500 mx-auto mb-8" />
        <h1 className="text-4xl font-bold mb-6">Trust & Compliance</h1>
        <p className="text-xl text-slate-400 mb-12">
          Our commitment to the highest standards of security and regulatory compliance.
        </p>
        <div className="grid md:grid-cols-2 gap-8 text-left">
           <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Security Standards</h2>
              <ul className="space-y-3">
                 {['SOC 2 Type II', 'ISO 27001', 'NIST CSF', 'HIPAA'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-green-400" />
                       <span>{item}</span>
                    </li>
                 ))}
              </ul>
           </div>
           <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl">
              <h2 className="text-xl font-bold mb-4">Data Privacy</h2>
              <ul className="space-y-3">
                 {['GDPR Compliant', 'CCPA Compliant', 'Data Encryption', 'Zero-Knowledge Proofs'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <CheckCircle className="w-5 h-5 text-green-400" />
                       <span>{item}</span>
                    </li>
                 ))}
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
