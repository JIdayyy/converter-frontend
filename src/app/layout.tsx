import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { Navbar } from "@/components/ui/navbar";
import { IconBoxAlignTopLeft } from "@tabler/icons-react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const navItems: {
  name: string;
  link: string;
  icon?: JSX.Element;
}[] = [
  {
    icon: <IconBoxAlignTopLeft />,
    link: "/",
    name: "Home",
  },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
