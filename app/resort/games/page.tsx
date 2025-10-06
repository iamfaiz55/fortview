import GamesPage from '@/components/GamesPage';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Games() {
  return (
    <div className="min-h-screen">
      <Header />
      <GamesPage />
      <Footer />
    </div>
  );
}
