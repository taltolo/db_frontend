import './NetworkCard.css';
import './NetworkCard';
import { useNavigate} from 'react-router-dom';
import NetworkInformation from '../NetworkInformation/NetworkInformation';

const NetworkCard = ({ networkData  }) => {
  const navigate = useNavigate();
  const navigateToEditNetwork=()=>{
    navigate('/editNetwork',{state:{network:{networkData}}});
      }

  return (
    <div className="card" onClick={navigateToEditNetwork}>
       <div className='div-header'>
      <div className="card_title">{networkData.model_path.split('\\')[2]}</div>
      </div>
      <div className="card_body" >
        <NetworkInformation network={networkData}  />
      </div>
    </div>
  );
};

export default NetworkCard;
