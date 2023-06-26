import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "../components/NotFound";
import DefSearch from "../components/DefSearch";
import useFetch from "../hooks/UseFetch";

export default function Definition() {
  let { search } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    request,
    data: [{ meanings: word }] = [{}],
    errorStatus,
  } = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search, {});

  useEffect(() => {
    request();
  });

  if (errorStatus === 404) {
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
  if (errorStatus) {
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
      {word ? (
        <>
          <h1>Here is the definition:</h1>
          {word.map((meaning) => {
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
