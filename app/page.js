import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import Solutions from '@/components/Solutions';
import GlobalPresence from '@/components/GlobalPresence';
import Features from '@/components/Features';
import Blog from '@/components/Blog';
import CtaBanner from '@/components/CtaBanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Solutions />
        <GlobalPresence />
        <Features />
        <Blog />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
