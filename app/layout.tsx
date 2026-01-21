
// C:\Users\mpereira\Downloads\van-mageski\app\layout.tsx
import "./../styles/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";


export const metadata: Metadata = {
  title: "Van Mageski",
  description: "Portfólio autoral de tatuagens",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="pt-BR">
      <body>
        {children}
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga-setup" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}


export const metadata: Metadata = {
  title: "Van Mageski — artes autorais fluidas",
  description: "Tatuagens autorais inspiradas pelo mar e pela canoagem.",
  openGraph: {
    title: "Van Mageski — artes autorais fluidas",
    description: "Portfólio de tatuagens, flashes e projetos autorais.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Van Mageski — artes autorais fluidas",
    description: "Tatuagens autorais inspiradas pelo mar e pela canoagem.",
    images: ["/og-image.jpg"]
  }
};
