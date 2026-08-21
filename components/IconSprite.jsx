// Icon sprite (Untitled UI style icons used across the design). Rendered
// once in the root layout; every other component references icons via
// <svg><use href="#icon-x"/></svg>.
export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="icon-chevron-down" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="icon-search" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="icon-user" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </symbol>
        <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="icon-phone" viewBox="0 0 24 24" fill="none">
          <path d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10 20 4 14 4 6c0-.6.4-1 1-1h2.9c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </symbol>
      </defs>
    </svg>
  );
}
