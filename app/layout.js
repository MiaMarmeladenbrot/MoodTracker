import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Broodle - MoodTracker",
  description: "Track your daily mood",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${opensans.className}`}
      >
        <header className="p-4 sm:p-8 items-center justify-between gap-4">
          <h1 className={`text-base sm:text-lg textGradient  ${fugaz.className}`}>Broodl</h1>
          <div className="flex items-center justify-between">PLACEHOLDER CTA || Stats</div>
        </header>
        {children}
        <footer className="p-4 sm:p-8">
          <p className={`text-indigo-500 text-center ${fugaz.className}`}>Created with ❤</p>
        </footer>
        ;
      </body>
    </html>
  );
}
