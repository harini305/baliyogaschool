import CampusPage from '@/components/CampusPage';
import { campuses } from '@/data/site';

export const metadata = {
  title: 'Canggu Campus — Bali Yoga School',
  description: 'The Bali Yoga School campus in Canggu, Bali: accommodation, pool and location near Echo Beach.',
  alternates: { canonical: '/canggu-campus-photos-in-bali-indonesia/' },
};

export default function CangguCampus() {
  return (
    <CampusPage
      campus={campuses.canggu}
      title="The Canggu campus"
      lead="In the middle of everything you want and need in Canggu, yet away from the noise: perfect for yoga and healing experiences."
      points={[
        'Only 1.5 km from Echo Beach, one of the most popular beaches in Canggu.',
        'Among the main cafés, shops and spas, but a few minutes back from the main street towards a quieter, nature-filled area.',
        'Modern supermarkets, pharmacies and local markets nearby.',
      ]}
      location="Map location: “Hotel Made Canggu 77”. A street address was not published on the original site."
      gallery={['canggu-pool', 'canggu-building', 'canggu-room', 'canggu-room-2', 'canggu-room-3']}
    />
  );
}
