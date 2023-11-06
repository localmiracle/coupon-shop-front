import React, { FC, useEffect, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import styles from "./location.module.css";
import apiClient from "@/http/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setRegion } from "@/redux/regionSlice";

type Region = {
  name: string;
};

const Location: FC = () => {
  const dispatch = useDispatch();
  const region = useSelector((state: RootState) => state.region.name);
  const [regions, setRegions] = useState<Region[]>([]);
  const [showRegionList, setShowRegionList] = useState<boolean>(false);

  const toggleShowRegion = () => {
    setShowRegionList(!showRegionList);
  };

  useEffect(() => {
    const getRegions = async () => {
      try {
        const { data } = await apiClient.get("/regions");
        setRegions(data);
      } catch (e) {
        console.log(e);
      }
    };
    getRegions();
  }, []);

  useEffect(() => {
    if (regions.length > 0) {
      const savedRegion = localStorage.getItem("region");
      if (savedRegion && regions.some(region => region.name === savedRegion)) {
        dispatch(setRegion(savedRegion));
      } else {
        dispatch(setRegion(regions[0].name));
        localStorage.setItem("region", regions[0].name);
      }
    }
  }, [regions]);

  const handleRegionSelected = (region: string) => {
    dispatch(setRegion(region));
    toggleShowRegion();
    localStorage.setItem("region", region);
  };

  return (
    <div className={styles.location_wrapper}>
      <div className={styles.location} onClick={toggleShowRegion}>
        {regions.length === 0 ? (
          <p>Нет доступных городов</p>
        ) : (
          <>
            {" "}
            <LocationOnOutlinedIcon
              style={{ fontSize: "small", display: "block" }}
            />
            <p>{region}</p>
          </>
        )}
      </div>
      <div
        className={styles.location_select}
        style={showRegionList ? { display: "block" } : { display: "none" }}
      >
        {regions.map((r) =>
          r.name !== region ? (
            <p
              key={r.name}
              onClick={() => handleRegionSelected(r.name)}
            >
              {r.name}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Location;
