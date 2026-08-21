'use client';

import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  {
    label: 'Soluções',
    links: [
      { title: 'Qualidade, Disponibilidade e Segurança', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Colocation & Conectividade', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Data Centers Hiperescaláveis', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ],
    image: { src: '/Assets/img-menu-solucoes.jpg', alt: 'Soluções Scala Data Centers' },
  },
  null, // "Data Centers" — plain link, no dropdown
  {
    label: 'Sobre nós',
    columnsData: [
      [
        { title: 'Cultura e História Scala', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Liderança', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Carreira', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
      [
        { title: 'Governança, Riscos e Compliance', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Premiações', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    ],
    image: { src: '/Assets/img-menu-sobre.jpg', alt: 'Sobre a Scala Data Centers' },
  },
  {
    label: 'Inovação',
    links: [
      { title: 'Scala AI City', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Campus Tamboré', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ],
    image: { src: '/Assets/img-menu-inovacao.jpg', alt: 'Inovação Scala Data Centers' },
  },
  {
    label: 'Sustentabilidade',
    columnsData: [
      [
        { title: 'Programa ESG', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Debênture Verde', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Impacto Social', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
      [
        { title: 'Ações Ambientais', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Premiações', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      ],
    ],
    image: { src: '/Assets/img-menu-sustentabilidade.jpg', alt: 'Sustentabilidade Scala Data Centers' },
  },
  {
    label: 'Conteúdos',
    links: [
      { title: 'Notícias e Mídia', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { title: 'Press Releases', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ],
    image: { src: '/Assets/img-menu-conteudo.jpg', alt: 'Conteúdos Scala Data Centers' },
  },
  null, // "Contato" — plain link
];

const PLAIN_LABELS = { 1: 'Data Centers', 6: 'Contato' };

function DropdownLinks({ links }) {
  return (
    <div className="dropdown-links">
      {links.map((l) => (
        <a key={l.title} className="dropdown-link-item" href="#">
          <h4>{l.title}</h4>
          <p>{l.text}</p>
        </a>
      ))}
    </div>
  );
}

// mouseenter/mouseleave (unlike mouseover/mouseout) don't fire when the
// pointer moves between the trigger button and the panel beneath it — both
// live inside the same wrapper, so there's no accidental close while
// crossing from the button into the panel.
function NavItem({ item, onOpenChange }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const itemRef = useRef(null);

  function setOpenState(next) {
    setOpen(next);
    onOpenChange(item.label, next);
  }
  function doOpen() {
    clearTimeout(closeTimer.current);
    setOpenState(true);
  }
  function doClose() {
    closeTimer.current = setTimeout(() => setOpenState(false), 120);
  }

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className={`nav-item${open ? ' open' : ''}`}
      ref={itemRef}
      onMouseEnter={doOpen}
      onMouseLeave={doClose}
      onFocus={doOpen}
      onBlur={(e) => {
        if (!itemRef.current.contains(e.relatedTarget)) setOpenState(false);
      }}
    >
      <button className="nav-link" aria-expanded={open}>
        {item.label} <svg><use href="#icon-chevron-down" /></svg>
      </button>
      <div className="nav-dropdown">
        <div className="nav-dropdown-inner">
          {item.columnsData ? (
            <div className="dropdown-columns">
              {item.columnsData.map((col, i) => <DropdownLinks key={i} links={col} />)}
            </div>
          ) : (
            <DropdownLinks links={item.links} />
          )}
          <div className="dropdown-image"><img src={item.image.src} alt={item.image.alt} /></div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const sentinelRef = useRef(null);
  const [stuck, setStuck] = useState(false);
  const openItemsRef = useRef(new Set());
  const [anyOpen, setAnyOpen] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting), { threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Escape') return;
      openItemsRef.current.clear();
      setAnyOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleOpenChange(label, isOpen) {
    if (isOpen) openItemsRef.current.add(label);
    else openItemsRef.current.delete(label);
    setAnyOpen(openItemsRef.current.size > 0);
  }

  return (
    <>
      <div id="headerSentinel" ref={sentinelRef} aria-hidden="true" />
      <div className="site-header-wrap">
        <header className={`site-header${stuck ? ' is-stuck' : ''}${anyOpen ? ' dropdown-open' : ''}`}>
          <div className="header-content">
            <div className="logo-wrapper">
              <img src="/Assets/Logotype.svg" alt="Scala Data Centers" />
            </div>
            <nav className="nav-menu">
              {NAV_ITEMS.map((item, i) =>
                item ? (
                  <NavItem key={item.label} item={item} onOpenChange={handleOpenChange} />
                ) : (
                  <button key={i} className="nav-link">{PLAIN_LABELS[i]}</button>
                )
              )}
            </nav>
          </div>
          <div className="header-actions">
            <div className="lang-switcher">
              <button className="icon-btn"><svg><use href="#icon-search" /></svg></button>
              <button className="icon-btn"><svg><use href="#icon-user" /></svg></button>
              <button className="lang-btn">PT <svg><use href="#icon-chevron-down" /></svg></button>
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
