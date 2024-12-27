import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Habit Manager",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
