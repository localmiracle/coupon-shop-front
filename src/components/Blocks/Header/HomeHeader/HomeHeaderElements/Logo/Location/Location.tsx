import React, { FC, useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styles from "./location.module.css";

const cities = ["Брянск", "Коломна", "Орехово-Зуево"];

const Location: FC = () => {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [showCityList, setShowCityList] = useState<boolean>(false);

  const toggleShowCity = () => {
    setShowCityList(!showCityList);
  };

  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    if (savedCity) setCurrentCity(savedCity);
    else setCurrentCity(cities[0]);
  }, []);

  const handleCitySelected = (city: string) => {
    setCurrentCity(city);
    toggleShowCity();
    localStorage.setItem("city", city);
  };

  return (
    <div className={styles.location_wrapper}>
      <div className={styles.location} onClick={toggleShowCity}>
        <LocationOnOutlinedIcon
          style={{ fontSize: "small", display: "block" }}
        />
        <p>{currentCity}</p>
      </div>
      <div
        className={styles.location_select}
        style={showCityList ? { display: "block" } : { display: "none" }}
      >
        {cities.map((city) =>
          city !== currentCity ? (
            <p key={city} onClick={() => handleCitySelected(city)}>
              {city}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Location;
