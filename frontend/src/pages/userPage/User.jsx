import React, {useEffect} from "react";
import axios from "axios";
import "./user.css";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import MapSection from "../../components/MapSection";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaUsers } from 'react-icons/fa';
import { useState } from "react";
import debounce from 'lodash/debounce';
import UserProfile from "./UserProfile";
import RequestInfo from "./RequestInfo";
import Pusher from 'pusher-js';
import RequestAccepted from "./RequestAccepted";
import {Link} from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import Message from "./Message"


const User = () => {
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [numberInput, setNumberInput] = useState(1);
  const [requestData, setRequestData] = useState(null)
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [requestAccep, setRequestAccep] = useState({});
  const [toggle, setToggle] = useState(false);
  const [tripId, setTripId] = useState ();
  const Toggle = () => {
    setToggle(!toggle);
  };
  
  console.log('trip id', tripId)


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

  const handleNumberInputChange = (event) => {
    setNumberInput(event.target.value);
  };

  const fetchSuggestions = debounce(async (inputValue, type) => {
    if (!inputValue) return;

    try {
      const response = await axios.get('/api/nominatim', {
        params: { q: inputValue },
      });

      const suggestions = response.data
        .sort((a, b) => a.display_name.length - b.display_name.length)
        .slice(0, 10)
        .map((result) => {
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
  }, 1000); // Adjust the debounce time as needed

  const handleInputChange = (inputValue, type) => {
    fetchSuggestions(inputValue, type);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setRequestData({
      origin: originInput,
      destination: destinationInput,
      number: numberInput,
    });
    console.log("Request Data: ", requestData);
  };

    useEffect(() => {
      Pusher.logToConsole = true;

      const pusher = new Pusher('9a70a9abd2a13265d9c3', {
          cluster: 'ap1',
      });
      const channel = pusher.subscribe('user-channel');

      // Bind to the event
      channel.bind('RideAccepted', (data) => {
          const driverInfo = data.driverInfo;
          console.log('Event receiveddd:', driverInfo);
          setRequestAccep(data.driverInfo);
          setShowModal(true);
      });

      // Cleanup on component unmount
      return () => {
          pusher.unsubscribe('user-channel');
      };
  }, []);

    useEffect(() => {
      Pusher.logToConsole = true;

      const pusher = new Pusher('9a70a9abd2a13265d9c3', {
          cluster: 'ap1',
      });
      const channel = pusher.subscribe('Noservice-channel');

      channel.bind('NoService', (data) => {
          console.log('Event receiveddd:', data.message);
          const info = data.message
          alert(JSON.stringify(info.message));

      });
      return () => {
          pusher.unsubscribe('Noservice-channel');
      };
    }, []);

    useEffect(() => {
      Pusher.logToConsole = true;

      const pusher = new Pusher('9a70a9abd2a13265d9c3', {
          cluster: 'ap1',
      });
      const channel = pusher.subscribe('userMessage-channel');

      channel.bind('userMessageFt', (data) => {
          console.log('send your message: ', data.userMessage);
          const info = data.userMessage;
          setShowMessageModal(true)
          setTripId(parseInt(info.userMessage, 10));

      });
      return () => {
          pusher.unsubscribe('userMessage-channel');
      };
    }, []);


  const handleRequestInfoClose = () => {
    setRequestData(null); // Reset requestData to null when closing
  };

  const handleClose = () => setShowModal(false);
  const handleMessageClose = () => setShowMessageModal(false);

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand h1 d-flex align-item-center">
          <Link to="/" title="home" className="text-decoration-none">
            <IoMdHome className="fs-1 homeIconU"/>
          </Link>
        </span>
        <ul className="navbar-nav justify-content flex-grow-1 pe-3">
          <li className="nav-item text-light fs-3">
            Online Taxi
          </li>
        </ul>
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
      <RequestAccepted show={showModal} handleClose={handleClose} driverInfo={requestAccep}/>
      <Message show={showMessageModal} handleClose={handleMessageClose} tripId={tripId}/>
      {toggle && <UserProfile />}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 p-2">
            <div>{/*Search Section*/}</div>
            <div className="d-flex justify-content-center">
              <div className="RequestTaxiDiv">
                <div>
                  <i className="bi bi-car-front fs-1 me-2 mx-2" style={{color: '#FFCC00'}}></i>
                  <span className="fs-2">Get Ride</span>
                </div>
                <form onSubmit={handleSubmit} action="">
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
                        <FaMapMarkedAlt className="text-primary" />
                        <label htmlFor="origin">Origin</label>
                      </div>
                    </IconContext.Provider>
                    <input
                      className="requestInput"
                      type="text"
                      placeholder="Enter the origin....."
                      value={originInput}
                      onChange={handleOriginInputChange}
                      required
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
                        <FaMapMarkedAlt className="text-danger"/>
                        <label htmlFor="destination">Destination</label>
                      </div>
                    </IconContext.Provider>
                    <input
                      className="requestInput"
                      type="text"
                      placeholder="Enter the destination....."
                      value={destinationInput}
                      onChange={handleDestinationInputChange}
                      required
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
                    <IconContext.Provider
                      value={{
                        size: "25px",
                        className: "global-className-name",
                      }}
                    >
                      <div className="d-flex justify-content-start gap-2 mt-3">
                          <FaUsers className="text-success"/>
                        <label htmlFor="destination">Number</label>
                      </div>
                    </IconContext.Provider>
                    <input
                      className="requestInput"
                      type="number"
                      placeholder="Enter the number..."
                      value={numberInput}
                      onChange={handleNumberInputChange}
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <button
                    type="submit"
                      className="form-control mt-3 bg-primary"
                    >
                      request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-8 p-2">
            <MapSection
              originCoords={selectedOrigin}
              destinationCoords={selectedDestination}
            />
          </div>
        </div>
      </div>
      {requestData && (
        <RequestInfo requestData={requestData} onClose={handleRequestInfoClose} />
      )}
    </div>
  );
};

export default User;
