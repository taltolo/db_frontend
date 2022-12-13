import { useState, useEffect, useCallback } from 'react';
import NetworkCard from '../Card/NetworkCard';
import SearchBar from '../SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [allNetworks, setallNetworks] = useState([]);
  const [filterNetworks, setfilterNetwork] = useState([]);
  const fetchData = useCallback(() => {
    fetch('http://localhost:5000/network/db/', {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
        setallNetworks(data.data);
        setfilterNetwork(data.data);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="continer">
      <img
        src="CEVA_Inc_Logo.svg.png"
        alt="ceav logo"
        width={175}
        height={75}
      />
      <h1>Arch Planner DataBase.Web</h1>
      <SearchBar
        allNetworks={filterNetworks}
        onChoice={(filteredNetworks) => setallNetworks(filteredNetworks)}
      />
      <div className="card-continer">
        {allNetworks.map((network, index) => {
          return <NetworkCard networkData={network} key={network.id} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
