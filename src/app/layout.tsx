import type { Metadata } from 'next';
import { Inter, Noto_Sans_Myanmar } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import NavBar from '@/components/shared/NavBar';
import Footer from '@/components/shared/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const notoMyanmar = Noto_Sans_Myanmar({
  subsets: ['myanmar'],
  variable: '--font-noto-myanmar',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Thura Yaung — Myanmar Consultation Marketplace',
    template: '%s | Thura Yaung',
  },
  description: 'Anonymous, safe consultations with verified professionals in Myanmar. Academic, Career, Mental Wellness, and Peer Support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoMyanmar.variable} font-sans`}>
      <body className="antialiased bg-neutral-cream min-h-screen flex flex-col">
        <LanguageProvider>
          <NavBar />
          <main className="flex-1 animate-fade-in">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
