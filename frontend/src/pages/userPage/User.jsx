import React from "react";
import axios from "axios";
import "./user.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import MapSection from "../../components/MapSection";
import { FaMapMarkedAlt } from "react-icons/fa";
import { useState } from "react";
import UserProfile from "./UserProfile";

const User = () => {
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showOnMap, setShowOnMap] = useState(false);
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };

  const handleShowOnMap = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setShowOnMap(true);
  };

  // Function to handle changes in the origin and destination input field
  const handleOriginInputChange = async (event) => {
    const { value } = event.target;
    setOriginInput(value);
    await handleInputChange(value, "origin");
  };
  const handleDestinationInputChange = async (event) => {
    const { value } = event.target;
    setDestinationInput(value);
    await handleInputChange(value, "destination");
  };

  const handleInputChange = async (inputValue, type) => {
      try {
        const response = await axios.get('/api/nominatim', {
          params: { q: inputValue },
      });

      // Map the response data to an array of suggestions, prioritizing shorter names and extracting the most relevant part
      const suggestions = response.data
        .sort((a, b) => a.display_name.length - b.display_name.length)
        .slice(0, 10)
        .map((result) => {
          // Extract the most relevant part of the display name
          const relevantParts = result.display_name.split(",").slice(0, 2);
          const label = relevantParts.join(", ");

          return {
            value: result.osm_id,
            label,
            lat: result.lat,
            lon: result.lon,
          };
        });

      // Update the state with the suggestions based on the input type
      if (type === "origin") {
        setOriginSuggestions(suggestions);
      } else {
        setDestinationSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Function to handle the selection of a location from the suggestions
  const handleLocationSelect = (option, type) => {
    if (type === "origin") {
      setSelectedOrigin(option);
      setOriginInput(option.label);
      setOriginSuggestions([]);
    } else {
      setSelectedDestination(option);
      setDestinationInput(option.label);
      setDestinationSuggestions([]);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand m-3 h1">Online Taxi</span>
        <div className="m-3">
          <IconContext.Provider
            value={{
              size: "35px",
              color: "white",
              className: "global-class-name ",
            }}
          >
            <CgProfile style={{ cursor: "pointer" }} onClick={Toggle} />
          </IconContext.Provider>
        </div>
      </nav>
      {toggle && <UserProfile />}

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 p-2">
            <div>{/*Search Section*/}</div>
            <div className="d-flex justify-content-center">
              <div className="RequestTaxiDiv">
                <h2>Get Ride</h2>
                <form action="">
                  <div>
                  </div>
                  <div className="form-group">
                    <IconContext.Provider
                      value={{
                        size: "25px",
                        className: "global-className-name",
                      }}
                    >
                      <div className="d-flex justify-content-start gap-2 mt-3">
                        <FaMapMarkedAlt />
                        <label htmlFor="origin">Origin</label>
                      </div>
                    </IconContext.Provider>
                    <input
                      className="originDestinationInput"
                      type="text"
                      placeholder="Enter the origin....."
                      value={originInput}
                      onChange={handleOriginInputChange}
                    />
                    {originSuggestions.length > 0 && (
                      <ul className="suggestionPlacesList">
                        {originSuggestions.map((option) => (
                          <li
                            key={option.value}
                            onClick={() =>
                              handleLocationSelect(option, "origin")
                            }
                            style={{
                              padding: "8px 12px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedOrigin?.value === option.value
                                  ? "#f0f0f0"
                                  : "transparent",
                            }}
                          >
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div></div>
                  </div>
                  <div className="form-group">
                    <IconContext.Provider
                      value={{
                        size: "25px",
                        className: "global-className-name",
                      }}
                    >
                      <div className="d-flex justify-content-start gap-2 mt-3">
                        <FaMapMarkedAlt />
                        <label htmlFor="destination">Destination</label>
                      </div>
                    </IconContext.Provider>
                    <input
                      className="originDestinationInput"
                      type="text"
                      placeholder="Enter the destination....."
                      value={destinationInput}
                      onChange={handleDestinationInputChange}
                    />
                    {destinationSuggestions.length > 0 && (
                      <ul className="suggestionPlacesList">
                        {destinationSuggestions.map((option) => (
                          <li
                            key={option.value}
                            onClick={() =>
                              handleLocationSelect(option, "destination")
                            }
                            style={{
                              padding: "8px 12px",
                              cursor: "pointer",
                              backgroundColor:
                                selectedDestination?.value === option.value
                                  ? "#f0f0f0"
                                  : "transparent",
                            }}
                          >
                            <hr />
                            {option.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control mt-3"
                      onClick={handleShowOnMap}
                    >
                      search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 p-2">
            <div>{/*Map Section*/}</div>
            <MapSection
              originCoords={showOnMap ? selectedOrigin : null}
              destinationCoords={showOnMap ? selectedDestination : null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
