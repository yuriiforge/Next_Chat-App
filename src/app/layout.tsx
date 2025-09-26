import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Next Chat App',
  description: 'Created by Yurii Stepaniuk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
