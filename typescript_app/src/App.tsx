import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();
  //useState is what we use to set up a value
  //for a specific value type for use state we will put <typename> after useState and before ()
  //<typename[] > makes it an array

  useEffect(() => {
    //useEffect will auto matically load when a function on the page is used
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
    axios
      .get(url) //get the source of data which is the url
      .then((response) => {
        //once we get the source
        setCryptos(response.data); //we will set the crypto variable to the data from the source
      });
  }, []);
  return (
    <div className="App">
      {cryptos //turnary opperation that says is cryptos has a value run whatever is after ? otherwise run whatever is after :
        ? cryptos.map((crypto) => {
            //this will go through all of the objects in cryptos
            return <CryptoSummary crypto={crypto} />; //returns the componet that would print out data
          })
        : null}
    </div>
  );
}

export default App;
