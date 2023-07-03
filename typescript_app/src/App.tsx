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
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelect] = useState<Crypto[]>([]);
  const [range, setRange] = useState<number>(30);

  /*
  const [data, setData] = useState<ChartData<"line">>();
  const [options, setOptions] = useState<ChartOptions<"line">>({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  });
  //useState is what we use to set up a value
  //for a specific value type for use state we will put <typename> after useState and before ()
  //<typename[] > makes it an array
  */

  useEffect(() => {
    //useEffect will auto matically load when a function on the page is used
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
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
        return <CryptoSummary crypto={s} />;
      })}
      {/*selected ? <CryptoSummary crypto={selected} /> : null*/}
      {/* //if there is a selected element run the Crypto summary function */}
      {/*data ? (
        <div style={{ width: 600 }}>
          <Line options={options} data={data} />
        </div>
      ) : null*/}
    </>
  );
}

export default App;
