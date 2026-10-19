'use client';

import { useSearchParams } from 'next/navigation';
import DemoForm from './DemoForm';

export default function ContactForm({ courseGroups }) {
  const params = useSearchParams();
  const course = params.get('course') || '';
  const valid = courseGroups.some((g) => g.options.some((o) => o.value === course));
  const fields = [
    { name: 'name', label: 'Name', required: true, autoComplete: 'name', requiredMessage: 'Please enter your name.' },
    { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', requiredMessage: 'Please enter your email address.' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel', hint: 'Include your country code.', requiredMessage: 'Please enter your phone number.' },
    { name: 'country', label: 'Country', autoComplete: 'country-name' },
    { name: 'course', label: 'Course or retreat', type: 'select', full: true, groups: courseGroups, placeholder: 'Choose a programme (optional)' },
    { name: 'dates', label: 'Preferred dates or month', full: true, hint: 'For example: October 2027.' },
    { name: 'message', label: 'Message', type: 'textarea', full: true },
  ];
  return <DemoForm fields={fields} initial={{ course: valid ? course : '' }} submitLabel="Check and preview enquiry" title="Enquiry" />;
}
