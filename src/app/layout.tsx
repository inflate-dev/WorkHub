import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { TopTabs } from "@/components/top-tabs";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "WorkHub",
  description: "見積・社内業務管理アプリ(MVP)",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <TopTabs />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
