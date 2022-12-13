import './NetworkCard.css';
import NetworkInformation from '../NetworkInformation/NetworkInformation';

const NetworkCard = ({ networkData }) => {
  return (
    <div className="card">
      <div className="card_title">{networkData.model_path.split('\\')[2]}</div>
      <div className="card_body">
        <NetworkInformation network={networkData} />
      </div>
    </div>
  );
};

export default NetworkCard;
