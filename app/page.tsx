import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TopicForm from "@/components/landing/TopicForm";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-base-900">
      <Navbar />
      <HeroSection />
      <div className="px-6">
        <TopicForm />
      </div>
      <div className="h-24" />
    </main>
  );
}
