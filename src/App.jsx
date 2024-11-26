import React, { useState, useEffect } from "react";
import "./app.css"
const WorldKingdoms = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/name/kingdom")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    const country = countries.find(
      (c) => c.name.common === countryName
    );
    setSelectedCountry(country);
  };

  return (
    <div className="mainContainer">
      <h1 className="title">World Kingdoms</h1>
      <select
        className="dropdown"
        onChange={handleCountryChange}
        defaultValue=""
      >
        <option value="" disabled>
          Select a country
        </option>
        {countries.map((country) => (
          <option key={country.cca3} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>

      {selectedCountry && (
        <div className="country-info">
          <h2>Kingdom of {selectedCountry.name.common}</h2>
          <img
            src={selectedCountry.flags.svg}
            alt={`${selectedCountry.name.common} flag`}
            className="flag"
          />
          <p>
            <strong>Capital:</strong> {selectedCountry.capital}
          </p>
          <p>
            <strong>Located in:</strong> {selectedCountry.region}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorldKingdoms;

