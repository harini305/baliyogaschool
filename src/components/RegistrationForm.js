'use client';

import { useSearchParams } from 'next/navigation';
import DemoForm from './DemoForm';

// Fields follow the original WPForms application form (audit 06 §3 and the captured page text).
// Options not captured in the audit (gender values, course months) are not invented: those
// fields are free text or limited to the captured values.
export default function RegistrationForm({ courseGroups }) {
  const params = useSearchParams();
  const course = params.get('course') || '';
  const fields = [
    { name: 'first', label: 'First name', required: true, autoComplete: 'given-name', requiredMessage: 'Please enter your first name.' },
    { name: 'last', label: 'Last name', required: true, autoComplete: 'family-name', requiredMessage: 'Please enter your last name.' },
    { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', requiredMessage: 'Please enter your email address.' },
    { name: 'mobile', label: 'Mobile number', type: 'tel', required: true, autoComplete: 'tel', hint: 'Include your country code.', requiredMessage: 'Please enter your mobile number.' },
    { name: 'gender', label: 'Gender', required: true, autoComplete: 'sex', requiredMessage: 'Please enter your gender.' },
    { name: 'country', label: 'Country', required: true, autoComplete: 'country-name', requiredMessage: 'Please enter your country.' },
    { name: 'address', label: 'Address', required: true, full: true, autoComplete: 'street-address', hint: 'Street, city, state or region, postal code.', requiredMessage: 'Please enter your address.' },
    { name: 'course', label: 'Course and location', type: 'select', required: true, full: true, groups: courseGroups, requiredMessage: 'Please choose a course.' },
    { name: 'month', label: 'Course month', required: true, hint: 'For example: March 2027.', requiredMessage: 'Please enter the month you would like to start.' },
    { name: 'room', label: 'Accommodation type', type: 'select', required: true, options: ['Private Room', 'Twin Shared Room', 'Triple Shared Room'], requiredMessage: 'Please choose an accommodation type.', hint: 'Options as listed on the original form; availability varies by campus.' },
    { name: 'health', label: 'Medical or health issues we should know about', type: 'textarea', full: true, rows: 3 },
    { name: 'source', label: 'How did you hear about us?', full: true },
    { name: 'policy', label: 'I have read the course policies, including attendance, discipline rules and the refund policy.', type: 'checkbox', required: true, requiredMessage: 'Please confirm you have read the course policies.' },
  ];
  const valid = courseGroups.some((g) => g.options.some((o) => o.value === course));
  return <DemoForm fields={fields} initial={{ course: valid ? course : '' }} submitLabel="Check and preview application" title="Application" />;
}
