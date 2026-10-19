import CampusPage from '@/components/CampusPage';
import { campuses } from '@/data/site';

export const metadata = {
  title: 'Uluwatu Campus — Bali Yoga School',
  description: 'The Bali Yoga School campus in Uluwatu, Bali: accommodation, pool and location.',
  alternates: { canonical: '/bali-yoga-school-campus-pictures-in-uluwatu-indonesia/' },
};

export default function UluwatuCampus() {
  return (
    <CampusPage
      campus={campuses.uluwatu}
      title="The Uluwatu campus"
      lead="Away from the noise, in tranquillity, yet very close to the beaches and the centre of Uluwatu."
      points={[
        'Only 2 km from Garuda Wisnu Kencana Cultural Park, with its natural surroundings and cultural and spiritual activities.',
        'Within 10 km of the busiest centre of Uluwatu, with modern, health-oriented cafés and restaurants.',
        'More than ten massage and beauty spas within 3 km.',
        'Large supermarkets, pharmacies and convenience stores within 2–3 km.',
      ]}
      location="Map location: “Bali Yoga School Uluwatu (Puri Sabina)”. A street address was not published on the original site."
      gallery={['uluwatu-pool-dusk', 'uluwatu-pool-day', 'uluwatu-deck', 'uluwatu-villa', 'uluwatu-room', 'uluwatu-room-2', 'uluwatu-hall', 'uluwatu-pool-aerial', 'food-pool']}
    />
  );
}
