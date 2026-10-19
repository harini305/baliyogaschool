import HubPage from '@/components/HubPage';
import { getHub } from '@/lib/hubs';

export const metadata = {
  title: 'Yin Yoga Teacher Training',
  description: 'Yin yoga teacher training at Bali Yoga School in Ubud, Uluwatu and Canggu.',
  alternates: { canonical: '/courses_group/yin-yoga-ttc/' },
};

export default function YinHub() {
  return <HubPage hub={getHub('yin-yoga-ttc')} />;
}
