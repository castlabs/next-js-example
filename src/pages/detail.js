import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import VideoPlayer from "@/components/VideoPlayer";
import "@castlabs/prestoplay/clpp.styles.css"
import Link from "next/link.js";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Detail() {
  return (
    <>
      <Head>
        <title>Detail Page - PRESTOplay player</title>
        <meta name="description" content="Detail page with video player" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.jsdelivr.net/npm/mux.js@5.14.1/dist/mux.js" async></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <main className={styles.main}>
          <div className={styles.banner}>
            <a href="https://castlabs.com/">
              <img
                src="https://castlabs.com/wp-content/themes/wordpress-cl-theme/assets/castlabs-logo-eggshell.svg?no-inline"
                alt="Castlabs Logo"
                className={styles.bannerLogo}
              />
            </a>
          </div>
          <div className={styles.intro}>
            <p>
              Coming from home page the PRESTOplay SDK is already fetched. So just
              create a new instance of the player for this new video element.
            </p>
            <p>
              <Link href="/">← Back to Home Page</Link>
            </p>
          </div>
          <div className={styles.video}>
            <VideoPlayer />
          </div>
        </main>
      </div>
    </>
  );
}
