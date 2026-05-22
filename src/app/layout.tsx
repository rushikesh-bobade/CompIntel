import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Background3D } from '@/components/Background3D';
import { ChatWidget } from '@/components/ChatWidget';

// Load Inter with tabular-nums and nice weights
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CompIntel | Tech Compensation Intelligence',
  description: 'Verified tech salaries, levels, and compensation data for the Indian tech market.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased min-h-screen flex flex-col selection:bg-zinc-300 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white transition-colors duration-300`}>
        <ThemeProvider>
          <Background3D />
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 relative z-10">
            {children}
          </main>
          <ChatWidget />
          <footer className="w-full border-t border-zinc-200 dark:border-zinc-900 py-12 mt-16 bg-zinc-50 dark:bg-zinc-950 relative z-10">
            <div className="container mx-auto px-4 flex justify-between items-center text-zinc-500 text-sm">
              <p>© {new Date().getFullYear()} CompIntel.</p>
              <p>Intelligence for the modern tech professional.</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
