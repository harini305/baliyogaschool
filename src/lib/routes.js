// Breadcrumb / parent-hub mapping for programme pages.
export function parentHub(p) {
  const L = p.location;
  switch (p.sub) {
    case 'multistyle':
      return { ubud: { label: 'Ubud teacher training', href: '/yoga-teacher-training-courses-in-ubud-bali/' },
        uluwatu: { label: 'Uluwatu teacher training', href: '/yoga-teacher-trainings-in-uluwatu-bali/' },
        canggu: { label: 'Canggu teacher training', href: '/yoga-teacher-trainings-in-canggu-bali/' },
        rishikesh: { label: 'Rishikesh teacher training', href: '/yoga-teacher-training-courses-in-rishikesh-india/' } }[L];
    case 'yin': return { label: 'Yin yoga teacher training', href: '/courses_group/yin-yoga-ttc/' };
    case 'short': return { label: 'All courses', href: '/courses/' };
    case 'sound': return { label: 'Sound healing', href: '/sound-healing-courses-in-bali/' };
    case 'reiki': return { label: 'Reiki healing', href: '/reiki-healing-courses-in-bali/' };
    case 'ayurveda': return { label: 'Ayurveda', href: '/ayurveda-courses-in-bali/' };
    case 'session': return { label: 'Healing courses', href: '/healing-courses-in-bali/' };
    case 'online': return /15-days/.test(p.slug)
      ? { label: 'Online specialised courses', href: '/online-specialized-yoga-courses/' }
      : { label: 'Online teacher training', href: '/online-yoga-teacher-training-courses-in-bali/' };
    case 'retreat': return L === 'uluwatu'
      ? { label: 'Uluwatu retreats', href: '/yoga-retreats-in-uluwatu-bali-indonesia/' }
      : { label: 'Yoga retreats', href: '/yoga-retreats-in-bali/' };
    default: return { label: 'All courses', href: '/courses/' };
  }
}

export function topLevel(p) {
  if (p.sub === 'retreat') return null;
  if (['sound', 'reiki', 'ayurveda', 'session'].includes(p.sub)) return { label: 'Healing', href: '/healing-courses-in-bali/' };
  return { label: 'Courses', href: '/courses/' };
}
