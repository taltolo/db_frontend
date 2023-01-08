import { useState, useEffect, useCallback } from 'react';
import NetworkCard from '../Card/NetworkCard';
import SearchBar from '../SearchBar/SearchBar';
import './CreateJson.css';

const CreateJson = () => {
  const [allNetworks, setallNetworks] = useState([]);
  const [filterNetworks, setfilterNetwork] = useState([]);
  const [listNetwork, setListNetwork] = useState([]);
  const json = {"name": 'tal'}

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
      <div className='header'>
      <div className='box'>
      <h1>Arch Planner DataBase.Web</h1>
      <SearchBar
        allNetworks={filterNetworks}
        onChoice={(filteredNetworks) => setallNetworks(filteredNetworks)}
      />
      </div>
      <div className='box-count-button'>
        <div><h2>Network picked : {listNetwork.length}</h2></div>
        
        <div className="button"> 
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(listNetwork, null, '\t')
         )}`}
         download="nets_for_regression.json">   
        <div className="button-wrapper">
          <div className="text">Download</div>
            <span className="icon">
              <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" height="2em" width="2em" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" fill="none"></path></svg>
            </span>
          </div>
          </a>
        </div>
      </div>
      </div>
      <div className="card-continer">
        {allNetworks.map((network, index) => {
          return <NetworkCard networkData={network} key={network._id} onChoice={setListNetwork} listNetwork={listNetwork}/>;
        })}
      </div>
    </div>
  );
};

export default CreateJson;
