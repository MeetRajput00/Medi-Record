import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="MyFpOagRB5pWdqQ8R56jZU9YJUn5dGP2KAoWAhoi"
      serverUrl="https://ubno5c6vadgi.usemoralis.com:2053/server"
    >
      {<Component {...pageProps} />}
    </MoralisProvider>
  );
}

export default MyApp;