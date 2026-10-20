import { Architects_Daughter, Quicksand } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';
import FooterFit from '@/components/FooterFit';
import { site } from '@/data/site';

// Two families only. Architects Daughter is the closest available match to the hand-drawn
// "BALI YOGA SCHOOL" lettering in the logo (headings, navigation, buttons, labels);
// Quicksand, a rounded geometric face, is used for all running text, forms and tables.
const logoFont = Architects_Daughter({ subsets: ['latin'], weight: '400', variable: '--font-logo', display: 'swap' });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-quicksand', display: 'swap' });

export const metadata = {
  // Production domain on Vercel; local URL otherwise.
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:4517',
  ),
  title: { default: `${site.name} — Yoga Teacher Training & Retreats in Bali`, template: `%s | ${site.name}` },
  description: 'Yoga teacher training, healing courses and retreats at Bali Yoga School in Ubud, Uluwatu and Canggu, with the sister school in Rishikesh, India.',
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
};

export const viewport = { themeColor: '#fffaf6' };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${logoFont.variable} ${quicksand.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Motion />
        <FooterFit />
      </body>
    </html>
  );
}
