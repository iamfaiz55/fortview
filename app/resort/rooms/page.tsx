import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Rooms() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Rooms & Accommodations</h1>
          <p className="text-center text-gray-600">Coming soon - Beautiful rooms and accommodations for your stay.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

