'use client';

import { useState } from 'react';

// Copies a contact detail to the clipboard (no external app is opened).
export default function CopyButton({ value, label }) {
  const [done, setDone] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      setDone(false);
    }
  }
  return (
    <button type="button" className="copy-btn" onClick={copy} aria-label={`Copy ${label}`}>
      <span aria-live="polite">{done ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
