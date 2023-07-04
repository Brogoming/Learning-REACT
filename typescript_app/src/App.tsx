import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CryptoSummary from "./components/CryptoSummary";
import { Crypto } from "./Types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
// import moment from "moment";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelect] = useState<Crypto[]>([]);
  // const [range, setRange] = useState<number>(30);

  const [data, setData] = useState<ChartData<"pie">>();

  useEffect(() => {
    //useEffect will auto matically load when a function on the page is used
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
    axios
      .get(url) //get the source of data which is the url
      .then((response) => {
        //once we get the source
        setCryptos(response.data); //we will set the crypto variable to the data from the source
      });
  }, []);

  /*
  useEffect(() => {
    if (!selected) return;
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${
          selected?.id
        }/market_chart?vs_currency=usd&days=${range}&${
          range === 1 ? `interval=hourly` : `interval=daily`
        }`
      )
      .then((response) => {
        console.log(response.data);
        setData({
          labels: response.data.prices.map((price: number[]) => {
            return moment
              .unix(price[0] / 1000)
              .format(range === 1 ? "HH:MM" : "MM-DD");
          }),
          datasets: [
            {
              label: "Price",
              data: response.data.prices.map((price: number[]) => {
                return price[1];
              }),
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        setOptions({
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text:
                `${selected?.name} Price over last ` +
                range +
                (range === 1 ? " Day." : " Days."),
            },
          },
        });
      });
  }, [selected, range]);
  */

  useEffect(() => {
    console.log("Selected:", selected);
    if(selected.length === 0) return
    setData({
      labels: selected.map((s) => s.name),
      datasets: [
        {
          label: '# of Votes',
          data: (selected.map((s) => s.owned * s.current_price)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [selected]);

  function updateOwned(crypto: Crypto, amount: number): void {
    // console.log(selected);
    console.log("updateOwned", crypto, amount);
    let temp = [...selected];
    let tempObject = temp.find((c) => c.id === crypto.id);
    if (tempObject) {
      tempObject.owned = amount;
      setSelect(temp);
    }
  }

  return (
    <>
      <div className="App">
        <select
          onChange={(e) => {
            //once a option is selected
            const c = cryptos?.find((x) => x.id === e.target.value) as Crypto; //find where x.id === the option selected
            setSelect([...selected, c]);
            //request
            //update data change
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
      {selected.map((s) => {
        return <CryptoSummary crypto={s} updateOwned={updateOwned} />;
      })}
      {/*selected ? <CryptoSummary crypto={selected} /> : null*/}
      {/* if there is a selected element run the Crypto summary function */}
      {data ? (
        <div style={{ width: 600 }}>
          <Pie data={data} />
        </div>
      ) : null}


      {selected
        ? "Your portfolio is worth: $" +
          selected
            .map((s) => {
              if (isNaN(s.owned)) {
                return 0;
              }
              return s.current_price * s.owned;
            })
            .reduce((prev, current) => {
              return prev + current;
            }, 0)
            .toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
        : null}
    </>
  );
}

export default App;
