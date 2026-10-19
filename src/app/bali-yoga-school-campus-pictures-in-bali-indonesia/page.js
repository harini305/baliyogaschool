import CampusPage from '@/components/CampusPage';
import { campuses } from '@/data/site';

export const metadata = {
  title: 'Ubud Campus — Bali Yoga School',
  description: 'The Bali Yoga School campus in Ubud: yoga shalas, accommodation, vegan meals, pools and gardens.',
  alternates: { canonical: '/bali-yoga-school-campus-pictures-in-bali-indonesia/' },
};

// Text from /bali-yoga-school-campus-pictures-in-bali-indonesia/ (lightly trimmed).
// Galleries from /gallery/, /second-accommodation-pictures/ and /third-accommodation-pictures/ are merged here.
export default function UbudCampus() {
  return (
    <CampusPage
      campus={campuses.ubud}
      title="The Ubud campus"
      lead="Traditional Balinese charm and modern comfort, in the picturesque region of Ubud: away from the noise of the centre, yet only a 10-minute ride from it."
      paragraphs={[
        'Our spacious, airy yoga shalas are made with natural materials and equipped with all the necessary props, so you can feel the breeze and nature during your practice.',
        'Accommodation options are private rooms and two-person shared rooms. Rooms reflect the simplicity of Balinese architecture, with an attached bathroom and air conditioning in each room.',
        'Our kitchen team cooks a range of healthy vegan meals prepared with fresh local ingredients, emphasising a sattvic diet.',
        'Wi-Fi is available across the campus, along with a sound and Reiki healing space, gardens for personal reflection, two swimming pools and relaxation areas. You are welcome to visit and take a campus tour.',
      ]}
      location="Jl. Campuhan III, Singakerta, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571, Indonesia"
      gallery={['shala-garden', 'shala-gong', 'shala-brick', 'ubud-stay-pool', 'ubud-stay-villa', 'ubud-stay-entrance', 'ubud-stay-bathroom', 'ubud-shared-room', 'ubud-twin-room']}
      note="Photographs of the main campus and the second and third accommodation, from the original campus and gallery pages."
    />
  );
}
