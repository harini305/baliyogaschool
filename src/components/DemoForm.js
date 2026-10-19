'use client';

import { useEffect, useId, useRef, useState } from 'react';
import s from './DemoForm.module.css';

function optionLabel(f, value) {
  const opts = f.groups ? f.groups.flatMap((g) => g.options) : f.options;
  if (!opts) return value;
  const hit = opts.find((o) => (o.value ?? o) === value);
  return hit ? (hit.label ?? hit) : value;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{6,}$/;

// Frontend-only form. Validates in the browser and shows a demonstration summary.
// Nothing is transmitted: there is no action URL, no fetch and no third-party script.
export default function DemoForm({ fields, submitLabel = 'Check and preview enquiry', initial = {}, title = 'Enquiry' }) {
  const uid = useId();
  const [values, setValues] = useState(() => Object.fromEntries(fields.map((f) => [f.name, initial[f.name] ?? (f.type === 'checkbox' ? false : '')])));
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const summaryRef = useRef(null);
  const resultRef = useRef(null);
  const [focusTarget, setFocusTarget] = useState(null); // { which, n } — move focus after React commits

  useEffect(() => {
    if (!focusTarget) return;
    (focusTarget.which === 'summary' ? summaryRef : resultRef).current?.focus();
  }, [focusTarget]);

  useEffect(() => {
    setValues((v) => ({ ...v, ...Object.fromEntries(Object.entries(initial).filter(([, val]) => val)) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(initial)]);

  function validate(v) {
    const e = {};
    for (const f of fields) {
      const val = v[f.name];
      if (f.required && (f.type === 'checkbox' ? !val : !String(val).trim())) e[f.name] = f.requiredMessage || `Please enter ${f.label.toLowerCase()}.`;
      else if (f.type === 'email' && val && !EMAIL.test(val)) e[f.name] = 'Please enter a valid email address, for example name@example.com.';
      else if (f.type === 'tel' && val && !PHONE.test(val)) e[f.name] = 'Please enter a phone number using digits, spaces, + or -.';
    }
    return e;
  }

  function onChange(f, val) {
    const next = { ...values, [f.name]: val };
    setValues(next);
    if (errors[f.name]) setErrors(validate(next));
  }

  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate(values);
    setErrors(e);
    if (Object.keys(e).length) {
      setSubmitted(null);
      setFocusTarget({ which: 'summary', n: Date.now() });
      return;
    }
    setSubmitted(values);
    setFocusTarget({ which: 'result', n: Date.now() });
  }

  function reset() {
    setSubmitted(null);
    setErrors({});
  }

  const errorList = Object.entries(errors);

  if (submitted) {
    return (
      <div className={s.result} ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
        <p className={s.resultTag}>Demonstration only</p>
        <h3>Your {title.toLowerCase()} was checked but <u>not sent</u></h3>
        <p>This preview site is not connected to an email or booking service, so no message has reached Bali Yoga School and no place has been reserved. This is the information that would be sent once a real delivery method is confirmed:</p>
        <dl className={s.summary}>
          {fields.filter((f) => submitted[f.name] && f.type !== 'checkbox').map((f) => (
            <div key={f.name}><dt>{f.label}</dt><dd>{optionLabel(f, submitted[f.name])}</dd></div>
          ))}
        </dl>
        <button type="button" className="btn btn--secondary" onClick={reset}>Edit the form</button>
      </div>
    );
  }

  return (
    <form className={s.form} noValidate onSubmit={onSubmit} aria-describedby={`${uid}-note`}>
      <p id={`${uid}-note`} className="notice"><strong>Preview form.</strong> Submitting checks your entries and shows what would be sent. Nothing is transmitted from this site.</p>

      {errorList.length > 0 && (
        <div className={s.errorSummary} ref={summaryRef} tabIndex={-1} role="alert">
          <p><strong>Please correct {errorList.length === 1 ? 'this field' : `these ${errorList.length} fields`}:</strong></p>
          <ul>{errorList.map(([name, msg]) => <li key={name}><a href={`#${uid}-${name}`}>{msg}</a></li>)}</ul>
        </div>
      )}

      <div className={s.grid}>
        {fields.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          const common = {
            id, name: f.name, 'aria-invalid': err ? 'true' : undefined,
            'aria-describedby': [err && `${id}-err`, f.hint && `${id}-hint`].filter(Boolean).join(' ') || undefined,
            autoComplete: f.autoComplete,
          };
          if (f.type === 'checkbox') {
            return (
              <div key={f.name} className={`${s.field} ${s.full} ${s.check}`}>
                <input type="checkbox" {...common} checked={values[f.name]} onChange={(e) => onChange(f, e.target.checked)} />
                <label htmlFor={id}>{f.label}{f.required && <span className={s.req}> (required)</span>}</label>
                {err && <p id={`${id}-err`} className={s.error}>{err}</p>}
              </div>
            );
          }
          return (
            <div key={f.name} className={`${s.field} ${f.full ? s.full : ''}`}>
              <label htmlFor={id}>{f.label}{f.required ? <span className={s.req}> (required)</span> : <span className={s.opt}> (optional)</span>}</label>
              {f.hint && <p id={`${id}-hint`} className={s.hint}>{f.hint}</p>}
              {f.type === 'textarea' ? (
                <textarea {...common} rows={f.rows || 5} value={values[f.name]} onChange={(e) => onChange(f, e.target.value)} />
              ) : f.type === 'select' ? (
                <select {...common} value={values[f.name]} onChange={(e) => onChange(f, e.target.value)}>
                  <option value="">{f.placeholder || 'Select…'}</option>
                  {f.groups
                    ? f.groups.map((g) => <optgroup key={g.label} label={g.label}>{g.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</optgroup>)
                    : f.options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
                </select>
              ) : (
                <input type={f.type || 'text'} inputMode={f.type === 'tel' ? 'tel' : undefined} {...common} value={values[f.name]} onChange={(e) => onChange(f, e.target.value)} />
              )}
              {err && <p id={`${id}-err`} className={s.error}><span aria-hidden="true">! </span>{err}</p>}
            </div>
          );
        })}
      </div>
      <button type="submit" className="btn btn--primary">{submitLabel}</button>
    </form>
  );
}
