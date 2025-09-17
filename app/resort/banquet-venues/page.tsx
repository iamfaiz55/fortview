import { BanquetVenuesPage } from "@/components/BanquetVenuesPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function BanquetVenues() {
  return (
    <div className="min-h-screen">
      <Header />
      <BanquetVenuesPage />
      <Footer />
    </div>
  );
}

