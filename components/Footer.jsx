const FOOTER_COLUMNS_ROW_1 = [
  { title: 'Sobre nós', links: ['Nossa História', 'Cultura Scala', 'Premiações', 'Carreira'] },
  { title: 'Soluções', links: ['Qualidade, Segurança e Disponibilidade', 'Colocation & Conectividade', 'Data Centers', 'Inovação'] },
  { title: 'ESG & Transparência', links: ['Programa ESG', 'Ações Ambientais', 'Debênture Verde', 'Projetos Sociais', 'Relatório de Sustentabilidade'] },
];
const FOOTER_COLUMNS_ROW_2 = [
  { title: 'Governança Corporativa', links: ['Liderança', 'Política de Privacidade', 'Investors & Shareholders', 'Documentos e Contratos', 'Documentos Jurídicos'] },
  { title: 'Artigos & Conteúdos', links: ['Blog'] },
];

function FooterColumn({ title, links }) {
  return (
    <div className="footer-col">
      <h5>{title}</h5>
      {links.map((l) => <a key={l} href="#">{l}</a>)}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-brand">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <img className="logo" src="/Assets/logo-white-footer.svg" alt="Scala Data Centers" />
                <p>A Scala Data Centers é líder em infraestrutura digital hyperscale na América Latina, com soluções escaláveis, confiáveis e sustentáveis para habilitar o futuro digital.</p>
              </div>
              <div className="social-icons">
                <svg viewBox="0 0 24 24" fill="#fff"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zM8.34 18v-8.4H5.67V18h2.67zM7 8.48c.93 0 1.51-.61 1.51-1.38-.02-.79-.58-1.39-1.49-1.39-.91 0-1.51.6-1.51 1.39 0 .77.58 1.38 1.47 1.38H7zm11 9.52v-4.83c0-2.59-1.38-3.79-3.23-3.79-1.49 0-2.15.82-2.52 1.39V9.6h-2.67s.03.62 0 8.4h2.67v-4.69c0-.25.02-.5.09-.68.2-.5.65-1.02 1.42-1.02.99 0 1.39.76 1.39 1.86V18H18z" /></svg>
                <svg viewBox="0 0 24 24" fill="#fff"><path d="M13.5 21v-7.5h2.5l.5-3H13.5V8.5c0-.87.24-1.46 1.5-1.46H16.5V4.35C16.24 4.32 15.35 4.24 14.3 4.24 12.1 4.24 10.6 5.58 10.6 8.02v2.48H8v3h2.6V21h2.9z" /></svg>
                <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2c2.7 0 3.05.01 4.12.06 1.06.05 1.79.22 2.43.47.66.25 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.07.06 1.42.06 4.12s-.01 3.05-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.76 4.9 4.9 0 01-1.76 1.15c-.64.25-1.37.42-2.43.47-1.07.05-1.42.06-4.12.06s-3.05-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.76-1.15 4.9 4.9 0 01-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.05 2 14.7 2 12s.01-3.05.06-4.12c.05-1.06.22-1.79.47-2.43.25-.66.6-1.21 1.15-1.76.5-.5 1.1-.9 1.76-1.15.64-.25 1.37-.42 2.43-.47C8.95 2.01 9.3 2 12 2zm0 3.6A6.4 6.4 0 1012 18.4 6.4 6.4 0 0012 5.6zm0 10.57a4.17 4.17 0 110-8.34 4.17 4.17 0 010 8.34zm6.65-10.82a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                <svg viewBox="0 0 24 24" fill="#fff"><path d="M18.9 3H22l-6.9 7.88L23 21h-6.24l-4.9-6.4L6.2 21H3.08l7.4-8.44L2.6 3h6.4l4.44 5.87L18.9 3zm-1.1 16.17h1.73L7.3 4.73H5.44l12.36 14.44z" /></svg>
              </div>
            </div>
            <div className="footer-links-wrapper">
              <div className="footer-links-row">
                {FOOTER_COLUMNS_ROW_1.map((col) => <FooterColumn key={col.title} {...col} />)}
              </div>
              <div className="footer-links-row">
                {FOOTER_COLUMNS_ROW_2.map((col) => <FooterColumn key={col.title} {...col} />)}
                <div className="footer-col footer-col-buttons" style={{ display: 'flex' }}>
                  <a href="#" className="footer-outline-btn"><svg><use href="#icon-user" /></svg> Painel do Cliente</a>
                  <a href="#" className="footer-outline-btn"><svg><use href="#icon-phone" /></svg> Contato</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Scala Data Centers | Segurança e Privacidade das Informações</p>
            <p>Desenvolvido por: <a href="#">Studio Visual</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
