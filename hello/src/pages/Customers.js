import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";
import { LoginContext } from "../App";
import useFetch from "../hooks/UseFetch";

export default function Customers() {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  // const [customers, setCustomers] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function toggleShow() {
    setShow(!show);
  }

  const url = baseUrl + "api/customers/";
  const {
    request,
    appendData,
    data: { customers } = {},
    errorStatus,
  } = useFetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
  });

  useEffect(() => {
    request();
  }, []);

  // useEffect(() => {
  //   // console.log('Fetching...')
  //   const url = baseUrl + "api/customers/";
  //   fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("access"),
  //     },
  //   })
  //     .then((response) => {
  //       if (response.status === 401) {
  //         setLoggedIn(false);
  //         navigate("/login", {
  //           state: {
  //             previousUrl: location.pathname,
  //           },
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(data)
  //       setCustomers(data.customers);
  //     });
  // }, []);

  function newCustomer(name, industry) {
    appendData({ name: name, industry: industry });

    if (!errorStatus) {
      toggleShow();
    }
  }

  return (
    <>
      <h1>Here are our customers:</h1>
      {customers
        ? customers.map((customer) => {
            return (
              <div className="m-2" key={customer.id}>
                <Link to={"/customers/" + customer.id}>
                  <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    {customer.name}
                  </button>
                </Link>
              </div>
            );
          })
        : null}
      <AddCustomer
        newCustomer={newCustomer}
        show={show}
        toggleShow={toggleShow}
      />
    </>
  );
}
