import { BirdZonePage } from "@/components/BirdZonePage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function BirdZone() {
  return (
    <div className="min-h-screen">
      <Header />
      <BirdZonePage />
      <Footer />
    </div>
  );
}

