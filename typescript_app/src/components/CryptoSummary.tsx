import { Crypto } from "../Types";

export type AppProps = { //our specific type that deals with the Crypto objects
  crypto: Crypto;
};

export default function CryptoSummary({ crypto }: AppProps): JSX.Element {
  // for a specific type of a variable put : typename
  return <p>{crypto.name + " $" + crypto.current_price}</p>;
}
