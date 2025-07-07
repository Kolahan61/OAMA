// src/app/layout.tsx

import type { Metadata } from 'next';
import { Bebas_Neue, Roboto } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/Providers';

// Configure your fonts
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-bebas-neue',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-roboto',
});

// Define metadata for your application
export const metadata: Metadata = {
  title: 'OAMA Martial Arts - Learn BJJ & Muay Thai',
  description: 'Join our martial arts academy and start your journey in Brazilian Jiu-Jitsu, Muay Thai, and more.',
  keywords: 'BJJ, Muay Thai, martial arts, self defense, kids martial arts, MMA training',
  authors: [{ name: 'OAMA Martial Arts' }],
  creator: 'OAMA Martial Arts',
  themeColor: '#e31414',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

// The RootLayout component wraps all pages in your application
export default function RootLayout({
  children, // 'children' prop represents the content of the current page (e.g., page.tsx)
}: {
  children: React.ReactNode; // Type definition for the children prop
}) {
  return (
    // HTML tag with language and font variables applied
    <html lang="en" className={`${bebasNeue.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className="flex-grow">
            {children} {/* This is where your page-specific content will be rendered */}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
