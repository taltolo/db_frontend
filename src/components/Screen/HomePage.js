import { useState, useEffect, useCallback } from 'react';
import NetworkCard from '../Card/NetworkCard';
import SearchBar from '../SearchBar/SearchBar';
import './HomePage.css';

export default function HomePage() {
  const [allNetworks, setallNetworks] = useState([]);
  const [filterNetworks, setfilterNetwork] = useState([]);
  const fetchData = useCallback(() => {
    fetch('https://db-backend-ap.herokuapp.com', {
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
      <div className='box'>
      <h1>Arch Planner DataBase.Web</h1>
      <SearchBar
        allNetworks={filterNetworks}
        onChoice={(filteredNetworks) => setallNetworks(filteredNetworks)}
      />
      </div>
      <div className="card-continer">
        {allNetworks.map((network, index) => {
          return <NetworkCard networkData={network} key={network._id} />;
        })}
      </div>
    </div>
  );
}
