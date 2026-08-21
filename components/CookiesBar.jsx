'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'scalaCookieConsent';

export default function CookiesBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  function dismiss(consent) {
    localStorage.setItem(STORAGE_KEY, consent);
    setVisible(false);
  }

  return (
    <div className={`cookies-bar${visible ? ' is-visible' : ''}`} role="dialog" aria-label="Aviso de cookies">
      <div className="cookies-bar-header">
        <div className="cookies-bar-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2a10 10 0 1010 10 4 4 0 01-4-4 4 4 0 01-4-4 4 4 0 01-2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="8.5" cy="12.5" r="1" fill="currentColor" />
            <circle cx="12" cy="16.5" r="1" fill="currentColor" />
            <circle cx="15.5" cy="11" r="1" fill="currentColor" />
          </svg>
        </div>
        <div className="cookies-bar-text">
          <h3>Este site usa cookies</h3>
          <p>Ao clicar em &quot;Aceitar todos os cookies&quot;, você consente com o armazenamento de cookies para navegação no site, análise de uso e marketing. Consulte nossa Política de Privacidade para mais detalhes.</p>
        </div>
      </div>
      <div className="cookies-bar-footer">
        <button type="button" className="btn-pill-outline" onClick={() => dismiss('refused')}>Recusar</button>
        <button type="button" className="btn-pill-dark" onClick={() => dismiss('accepted')}>Aceitar todos os cookies</button>
        <button type="button" className="cookies-bar-close" aria-label="Fechar" onClick={() => dismiss('refused')}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>
    </div>
  );
}
