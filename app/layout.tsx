import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const BASE_URL = 'https://attendance.tamusae.org/';

export const metadata: Metadata = {
  title: "TAMU SAE Attendance",
  description: "The official TAMU SAE Attendance Portal.",
  metadataBase: new URL(BASE_URL),
  appleWebApp: {
    title: "TAMU SAE",
    capable: true,
    statusBarStyle: "default",
    startupImage: [
      '/apple-icon.png'
    ]
  },
  keywords: ['TAMU SAE', 'Texas A&M', 'TAMU', 'Electric Racing', 'FSAE', 'Formula Student', 'Engineering', 'Student Organization', 'Student Orgs', 'SAE', 'Electric Vehicles', 'EVs', 'Electric Cars', 'EV Racing', 'Electric Racing Cars', 'Electric', 'Internal Combustion', 'IC Racing', 'Internal Combustion Racing', 'Formula SAE', 'Formula Student Racing', 'Baja SAE', 'Baja Racing', 'Racing', 'Motorsport', 'Motorsports', 'Engineering Students', 'Aggies'],
  authors: [{ name: 'Texas A&M Formula SAE' }],
  category: 'Engineering',
  openGraph: {
    title: 'Texas A&M SAE',
    description: 'The official website for Texas A&M SAE.',
    url: BASE_URL,
    siteName: 'Texas A&M SAE',
    images: [
      {
        url: `${BASE_URL}/24-blurry.jpg`,
        width: 1200,
        height: 630,
        alt: 'Texas A&M Formula SAE',
        type: 'image/jpeg'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Texas A&M Formula SAE',
    card: 'summary_large_image',
    images: [`${BASE_URL}/24-blurry.jpg`],
    description: 'The official website for Texas A&M Formula SAE.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: [
      { url: '/favicon.ico' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/icon.svg',
        color: '#490905'
      },
      {
        rel: 'apple-touch-icon',
        url: '/apple-icon.png'
      }
    ]
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
