import type { AppProps } from "next/app";
import "../src/styles/global.css";
import { initI18n } from "@lib/i18n";
initI18n();
export default function MyApp({ Component, pageProps }: AppProps) { return <Component {...pageProps} />; }
