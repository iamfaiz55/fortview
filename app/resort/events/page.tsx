import { EventsPage } from "@/components/EventsPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Events() {
  return (
    <div className="min-h-screen">
      <Header />
      <EventsPage />
      <Footer />
    </div>
  );
}

