import { AdventureActivitiesPage } from "@/components/AdventureActivitiesPage";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AdventureActivities() {
  return (
    <div className="min-h-screen">
      <Header />
      <AdventureActivitiesPage />
      <Footer />
    </div>
  );
}

