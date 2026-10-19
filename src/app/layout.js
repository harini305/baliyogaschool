import { Lora, Quicksand } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';
import { site } from '@/data/site';

const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-lora', display: 'swap' });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-quicksand', display: 'swap' });

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: { default: `${site.name} — Yoga Teacher Training & Retreats in Bali`, template: `%s | ${site.name}` },
  description: 'Yoga teacher training, healing courses and retreats at Bali Yoga School in Ubud, Uluwatu and Canggu, with the sister school in Rishikesh, India.',
  icons: { icon: '/favicon.png' },
};

export const viewport = { themeColor: '#fffaf6' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lora.variable} ${quicksand.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
