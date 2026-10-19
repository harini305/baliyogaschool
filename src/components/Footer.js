import Link from 'next/link';
import { site, footerLinks } from '@/data/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.name}>Bali Yoga School</p>
          <p className={styles.blurb}>Yoga teacher training, healing courses and retreats in Ubud, Uluwatu and Canggu, with the sister school Himalayan Yoga Association in Rishikesh, India.</p>
          <address className={styles.address}>
            {site.address.lines.map((l) => <span key={l}>{l}</span>)}
            <span className={styles.contactLine}>{site.email}</span>
          </address>
        </div>
        {footerLinks.map((col) => (
          <nav key={col.title} className={styles.col} aria-label={col.title}>
            <p className={styles.colTitle}>{col.title}</p>
            <ul>
              {col.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </nav>
        ))}
      </div>
      <div className={`container ${styles.bottom}`}>
        <p>© {new Date().getFullYear()} {site.copyright}</p>
        <p>
          <Link href="/contact/">Contact</Link>
          <span aria-hidden="true"> · </span>
          <Link href="/terms-conditions/">Terms</Link>
          <span aria-hidden="true"> · </span>
          Frontend preview: no bookings, payments or messages are processed on this site.
        </p>
      </div>
    </footer>
  );
}
