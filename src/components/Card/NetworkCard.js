import './NetworkCard.css';
import './NetworkCard';
import { useState } from 'react';
import NetworkInformation from '../NetworkInformation/NetworkInformation';
import EditDialog from '../Dialog/EditDialog';

const NetworkCard = ({ networkData }) => {
  const [show, setShow] = useState(null);

  return (
    <div className="card" onClick={() => setShow(networkData)}>
      <div className="card_title">{networkData.model_path.split('\\')[2]}</div>
      <div className="card_body">
        {show && <EditDialog network={networkData} handleClose={()=> setShow(null)}/>}
        <NetworkInformation network={networkData} edit={show} />
      </div>
    </div>
  );
};

export default NetworkCard;
