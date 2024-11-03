import Image from "next/image";
import { LandingPageComponent } from "@/components/landing-page";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="w-full min-h-screen">
        <LandingPageComponent></LandingPageComponent>
      </main>
    </ThemeProvider>
  );
}
