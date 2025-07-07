import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Payment Successful | OAMA Martial Arts',
  description: 'Thank you for your purchase. Your payment was successful.',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-dark text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bebas-neue mb-4">Payment Successful!</h1>
        <p className="mb-8 text-gray-300">
          Thank you for becoming a member of OAMA. We look forward to training with you!
        </p>
        <Link
          href="/schedule"
          className="inline-block bg-brand-primary hover:bg-brand-primary-dark px-6 py-3 rounded-lg text-white font-semibold transition-colors"
        >
          View Class Schedule
        </Link>
      </div>
    </main>
  );
} 