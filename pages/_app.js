import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={`${process.env.MORALIS_API_KEY}`}
      serverUrl="https://ubno5c6vadgi.usemoralis.com:2053/server"
    >
      {<Component {...pageProps} />}
    </MoralisProvider>
  );
}

export default MyApp;