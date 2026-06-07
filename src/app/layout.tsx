import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

// ── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://drkavyaarisham.in"),

  title: {
    default: "Dr. Kavya Arisham | Physician & Medical Professional",
    template: "%s | Dr. Kavya Arisham",
  },
  description:
    "Dr. Kavya Arisham is a dedicated physician and medical professional specialising in General Medicine, Internal Medicine, and Emergency Care. Senior Resident at Government Medical College, Mulugu, Telangana.",
  keywords: [
    "Dr. Kavya Arisham",
    "Kavya Arisham",
    "Doctor Kavya",
    "physician Telangana",
    "General Medicine",
    "Internal Medicine",
    "Senior Resident Mulugu",
    "MNR Medical College",
    "TRR Hospital",
    "Mamatha Institute",
    "COVID-19 doctor",
    "medical professional India",
    "holistic patient care",
    "emergency care Telangana",
  ],
  authors: [{ name: "Dr. Kavya Arisham" }],
  creator: "Dr. Kavya Arisham",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://drkavyaarisham.in",
  },

  // ── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: "https://drkavyaarisham.in",
    siteName: "Dr. Kavya Arisham",
    title: "Dr. Kavya Arisham | Physician & Medical Professional",
    description:
      "Dedicated physician specialising in General Medicine and Emergency Care. Serving patients across Telangana with compassionate, evidence-based healthcare.",
    images: [
      {
        url: "/images/kavya1.png",
        width: 1200,
        height: 630,
        alt: "Dr. Kavya Arisham — Physician and Medical Professional",
      },
    ],
    firstName: "Kavya",
    lastName: "Arisham",
  },

  // ── Twitter / X Card ───────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Dr. Kavya Arisham | Physician & Medical Professional",
    description:
      "Senior Resident at Government Medical College, Mulugu. Specialising in General Medicine and Emergency Care across Telangana.",
    images: ["/images/kavya1.png"],
  },
};

// ── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// ── JSON-LD Schema ────────────────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dr. Kavya Arisham",
  jobTitle: "Senior Resident Physician",
  description:
    "Dedicated physician and medical professional specialising in General Medicine, Internal Medicine, and Emergency Care in Telangana, India.",
  url: "https://drkavyaarisham.in",
  image: "https://drkavyaarisham.in/images/kavya1.png",
  worksFor: {
    "@type": "MedicalOrganization",
    name: "Government Medical College, Mulugu",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
  },
  alumniOf: {
    "@type": "MedicalOrganization",
    name: "MNR Medical College & Hospital",
  },
  knowsAbout: [
    "General Medicine",
    "Internal Medicine",
    "Emergency Care",
    "Chronic Disease Management",
    "COVID-19 Treatment",
    "Community Health",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
