import { Figtree } from "next/font/google";
import Head from "next/head";
import getConfig from "next/config";

import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import Sidebar from "@/components/Sidebar";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import Player from "@/components/Player";

import "./globals.css";

const { publicRuntimeConfig } = getConfig();
const font = Figtree({ subsets: ["latin"] });

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <Head>
        {/* Favicon links */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/favicon-16x16.png"
        />
        <link
          rel="manifest"
          href="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/site.webmanifest"
        />
        <link
          rel="mask-icon"
          href="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/safari-pinned-tab.svg"
          color="#5bbad5"
        />

        <meta
          name="msapplication-config"
          content="/Users/namansoni/Documents/next13-spotify-master/public/favicon_package_v0.16 (1)/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Other head metadata */}
        <title>Beatz</title>
        <meta
          name="description"
          content="Beatz is a music store built with Next.js and Supabase."
        />
      </Head>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
