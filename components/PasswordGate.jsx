'use client';

import { useEffect, useRef, useState } from 'react';

// Simple client-side access lock. Not real security (the password ships in
// this bundle's JS), just a soft barrier so the page isn't casually
// browsable while in review. Unlocking is remembered in localStorage so
// returning visitors on the same browser aren't re-prompted.
const PASSWORD = 'sc@l@2026';
const STORAGE_KEY = 'scalaGateUnlocked';

export default function PasswordGate() {
  const [unlocked, setUnlocked] = useState(null); // null = not checked yet
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const isUnlocked = localStorage.getItem(STORAGE_KEY) === '1';
    setUnlocked(isUnlocked);
    document.documentElement.style.overflow = isUnlocked ? '' : 'hidden';
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const value = inputRef.current.value;
    if (value === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, '1');
      document.documentElement.style.overflow = '';
      setUnlocked(true);
    } else {
      setError(true);
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  }

  // Avoid a flash of the gate before we've checked localStorage, and skip
  // rendering entirely once unlocked.
  if (unlocked === null || unlocked === true) return null;

  return (
    <div id="passwordGate">
      <form className="password-gate-card" autoComplete="off" onSubmit={handleSubmit}>
        <img src="/Assets/logo-white-footer.svg" alt="Scala Data Centers" className="password-gate-logo" />
        <h1>Página protegida</h1>
        <p>Digite a senha de acesso para continuar.</p>
        <input ref={inputRef} type="password" placeholder="Senha" autoFocus />
        <button type="submit" className="btn-pill">
          Entrar
          <span className="icon-circle">
            <svg fill="none"><use href="#icon-arrow-right" /></svg>
          </span>
        </button>
        {error && <p className="password-gate-error">Senha incorreta. Tente novamente.</p>}
      </form>
    </div>
  );
}
