import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelect] = useState<Crypto | null>();
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
    <>
      <div className="App">
        <select
          onChange={(e) => {
            //once a option is selected
            const c = cryptos?.find((x) => x.id === e.target.value); //find where x.id === the option selected
            setSelect(c);
          }}
          defaultValue="default"
        >
          {/*this will give us all the different options*/}
          {cryptos //turnary opperation that says is cryptos has a value run whatever is after ? otherwise run whatever is after :
            ? cryptos.map((crypto) => {
                //.map() this will go through all of the objects in cryptos

                // return <CryptoSummary crypto={crypto} />; //returns the componet that would print out data

                return (
                  <option key={crypto.id} value={crypto.id}>
                    {crypto.name}
                  </option>
                );
              })
            : null}
          <option value="default">Choose an option</option>
        </select>
      </div>
      {selected ? <CryptoSummary crypto={selected} /> : null}{" "}
      {/* //if there is a selected element run the Crypto summary function */}
    </>
  );
}

export default App;
