import { Geist, Geist_Mono } from "next/font/google";
import en from "@/locales/en.json";
import SiteLanguageProvider from "@/components/providers/SiteLanguageProvider";
import SiteLanguageSync from "@/components/common/SiteLanguageSync";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import EdenChatWidgetLoader from "@/components/EdenChatWidgetLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SiteLanguageProvider>
          <SiteLanguageSync />
          {children}
          <EdenChatWidgetLoader />
          <CookieConsentBanner />
        </SiteLanguageProvider>
      </body>
    </html>
  );
}
