import React, { useState } from "react";
import "./style.css";

const SearchForm = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [matchedFlights, setMatchedFlights] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(departureAirport);
    console.log(arrivalAirport);
    console.log(departureDate);
    console.log(adults);

    try {
      // Fetch the content of the data.txt file
      const response = await fetch("LHR_CDG_ADT1_TYPE_1.txt");
      const jsonData = await response.json();
      console.log(jsonData);
      const flightOffers = jsonData.flightOffer;
      console.log(flightOffers);

      // Filter the flight offers based on form input
      const matchedFlights = flightOffers.filter((offer) => {
        let matched = false;
        offer.itineraries.forEach((itinerary) => {
          itinerary.segments.forEach((segment) => {
            const arrival = segment.arrival.iataCode;
            const arrTime = segment.arrival.at.split("T")[0];
            const deperture = segment.departure.iataCode;
            const depTime = segment.departure.at.split("T")[0];

            if (arrival == arrivalAirport && deperture == departureAirport) {
              matched = true;
            }
          });
        });
        return matched;
      });

      setMatchedFlights(matchedFlights);
    } catch (error) {
      console.error("Error searching flights:", error);
    }
  };
  return (
    <>
      <div className="container-fluid top">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="h-top-menu">
                <a href="/">Dashboard</a>
                <a href="/">Master Price</a>
                <a href="/">Custom Price</a>
                <a href="/">Calender</a>
                <a href="/">Reports</a>
              </div>
            </div>
            <div className="col-md-2">
              <div className="t-right-menu">
                <a href="/">
                  <i className="fa fa-bell" aria-hidden="true"></i>
                </a>
                <a href="/">
                  <i className="fa fa-user" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row middle">
          <div className="col-md-12">
            <div className="text">
              <h4>Master Price</h4>
              <hr />
            </div>
          </div>
        </div>
        <div className="row bottom">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="botto-btn text-center">
              <a href="/" className="btn inactive">
                Round Trip
              </a>
              <a href="/" className="btn active">
                One Way
              </a>
              <a href="/" className="btn inactive">
                Multi City
              </a>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
        <hr />
        <div className="row form">
          <div className="col-md-12">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                id="departureAirport"
                placeholder="Departure"
                value={departureAirport}
                onChange={(e) => setDepartureAirport(e.target.value)}
                required
              />
              <input
                type="text"
                id="arrivalAirport"
                placeholder="Arrival"
                value={arrivalAirport}
                onChange={(e) => setArrivalAirport(e.target.value)}
                required
              />

              <input
                type="date"
                name="departureDate"
                id="departureDate"
                onChange={(e) => setDepartureDate(e.target.value)}
                dateFormat="yyyy-MM-dd"
                required
              />
              <button
                className="btn border border-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Day +
              </button>
              <button
                className="btn border border-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Day -
              </button>
              <button
                className="btn border border-dark dropdown-toggle anytime"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Any Time
              </button>
              <div className="plus">+</div>
              <button
                className="btn border border-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                ADT
              </button>
              <input
                type="number"
                id="adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                min={1}
                required
              />
              <div className="plus">+</div>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <div className="left">
                    <input type="checkbox" />
                    <label> Extra Options</label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="environment d-flex">
                    <h6>Environment: </h6>
                    <div className="d-flex">
                      <input
                        className="check"
                        type="radio"
                        id="dummy"
                        name="fav_language"
                        defaultValue="Dummy"
                      />
                      <label htmlFor="dummy">Dummy</label>
                      <input
                        className="check"
                        type="radio"
                        id="pdt"
                        name="fav_language"
                        defaultValue="PDT"
                      />
                      <label htmlFor="pdt">PDT</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <button className="btn btn-primary" type="submit">
                    Search Flights
                  </button>
                </div>
              </div>
            </form>
            <hr />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row text-center">
          <h5 style={{ marginLeft: "24rem" }}>
            Results - Matching Departure and Arrival
          </h5>
        </div>
        <hr />
        <div className="row">
          <hr />

          {/* table */}
          <div className="col-md-12">
            <div className="result">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>FLIGHT</th>
                    <th>AIRCRAFT</th>
                    <th>CLASS</th>
                    <th>FAIR</th>
                    <th>ROUTE</th>
                    <th>DEPARTURE</th>
                    <th>ARRIVAL</th>
                    <th>DURATION</th>
                    <th>PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {matchedFlights.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        Flight is not available
                      </td>
                    </tr>
                  ) : (
                    matchedFlights.map((trip, index) => (
                      <React.Fragment key={index}>
                        {trip.itineraries.map((itinerary, i) => (
                          <React.Fragment key={i}>
                            {itinerary.segments.map((segment, j) => (
                              <tr key={j}>
                                {segment.departure.iataCode ===
                                  departureAirport &&
                                  segment.arrival.iataCode ===
                                    arrivalAirport && (
                                    <>
                                      <td>
                                        {segment.marketingCarrier}{" "}
                                        {segment.aircraft}
                                      </td>
                                      <td>{segment.flightNumber}</td>
                                      <td
                                        rowSpan={
                                          trip.itineraries[0].segments.length
                                        }
                                      >
                                        {trip.class}
                                      </td>
                                      <td
                                        rowSpan={
                                          trip.itineraries[0].segments.length
                                        }
                                      >
                                        {trip.fareBasis}
                                      </td>
                                      <td>
                                        {segment.departure.iataCode} -{" "}
                                        {segment.arrival.iataCode}
                                      </td>
                                      <td>{segment.departure.at}</td>
                                      <td>{segment.arrival.at}</td>
                                      <td>{itinerary.duration}</td>{" "}
                                      {/* Accessing duration */}
                                      <td
                                        rowSpan={
                                          trip.itineraries[0].segments.length
                                        }
                                      >
                                        {trip.price}
                                      </td>
                                      {/* {j === 0 && i === 0 && (
                        <td
                          rowSpan={
                            trip.itineraries[0].segments.length
                          }
                        >
                          {trip.price}
                        </td>
                      )} */}
                                    </>
                                  )}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* table end */}
        </div>
      </div>
    </>
  );
};

export default SearchForm;
