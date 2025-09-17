import { WellnessPage } from "@/components/WellnessPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SpaWellness() {
  return (
    <div className="min-h-screen">
      <Header />
      <WellnessPage />
      <Footer />
    </div>
  );
}

