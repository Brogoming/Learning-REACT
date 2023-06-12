import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import DefSearch from "../components/DefSearch";

export default function Definition() {
  const [aWord, setAWord] = useState("");
  let { search } = useParams();
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const errorUrl = "https://httpstat.us/500";
    const dictionaryUrl =
      "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
    fetch(dictionaryUrl) //fetches a api
      .then((response) => {
        console.log(response.status); //tells us the status of the page
        if (response.status === 404) {
          // navigate('/404')
          setNotFound(true);
        } else if (response.status === 401) {
          navigate("/401");
        } else if (response.status === 500) {
          setError(true);
        }

        if (!response.ok) {
          setError(true);
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        setAWord(data[0]);
        console.log(data[0]);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  if (notFound === true) {
    return (
      <>
        <NotFound />
        {/* <Link to='/dictionary'>Search Another</Link> // I linke the button better*/}
        <button
          onClick={() => {
            navigate("/dictionary"); //making replace true replaces the current spot in the history
          }}
        >
          Dictionary
        </button>
      </>
    );
  }
  if (error === true) {
    return (
      <>
        <p>Something went wrong!</p>
        {/* <Link to='/dictionary'>Search Another</Link> // I linke the button better*/}
        <button
          onClick={() => {
            navigate("/dictionary"); //making replace true replaces the current spot in the history
          }}
        >
          Dictionary
        </button>
      </>
    );
  }
  return (
    <>
      {aWord ? (
        <>
          <h1>Here is the definition for {aWord.word}</h1>
          {aWord.meanings.map((meaning) => {
            return (
              <p key={uuidv4()}>
                {meaning.partOfSpeech + ": "}
                {meaning.definitions[0].definition}
              </p>
            );
          })}
          <p>Search Again:</p>
          <DefSearch />
        </>
      ) : null}
    </>
  );
}
