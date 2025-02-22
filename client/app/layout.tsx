import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Hear Me Out",
  description:
    "Get your thoughts and feelings off your chest with the response you need.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1 flex flex-col">
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                  <Link href={"/"}>I Will Listen</Link>
                </div>
                {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
              </div>
            </nav>

            <div className="flex-1 w-full flex flex-col items-center justify-center gap-20 p-5">
              {children}
            </div>

            {/* Footer sticks to bottom */}
            <footer className="w-full border-t mx-auto text-center text-xs py-1 px-5 flex items-center relative">
              <p className="absolute left-1/2 transform -translate-x-1/2">
                Made with ❤️ by meltedhyperion
              </p>
              <div className="ml-auto">
                <ThemeSwitcher />
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
