import './NetworkCard.css';
import './NetworkCard';
import { useState } from 'react';
import NetworkInformation from '../NetworkInformation/NetworkInformation';
import EditCard from './EditCard';

const NetworkCard = ({ networkData }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="card" onClick={() => setShow(true)}>
      <div className="card_title">{networkData.model_path.split('\\')[2]}</div>
      <div className="card_body">
        {/* {show ? <EditCard network={networkData} /> : null} */}
        <NetworkInformation network={networkData} edit={show} />
      </div>
    </div>
  );
};

export default NetworkCard;
