import { Montserrat } from 'next/font/google';
import './globals.css';
import IconSprite from '@/components/IconSprite';
import PasswordGate from '@/components/PasswordGate';
import CookiesBar from '@/components/CookiesBar';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Scala Data Centers | Plataforma de Infraestrutura Digital para IA e Nuvem na América Latina',
  description:
    'A Scala Data Centers é uma plataforma de desenvolvimento de infraestrutura digital preparada para IA, nuvem e aplicações de missão crítica na América Latina, com data centers hyperscale, energia renovável e alta disponibilidade.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body>
        <PasswordGate />
        <CookiesBar />
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
