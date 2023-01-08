import './NetworkCard.css';
import './NetworkCard';
import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import NetworkInformation from '../NetworkInformation/NetworkInformation';

const NetworkCard = ({ networkData, onChoice, listNetwork }) => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  function onCheck(event,item){
    console.log(event.target.checked)
     if(event.target.checked){
      onChoice([...listNetwork,item])
      setIsActive(!isActive)
      console.log(listNetwork)
     }else{
      onChoice((prev) =>
      prev.filter((currItem)=> currItem._id !== item._id))
     }
    
  }

  const navigateToEditNetwork=()=>{
    if(pathname!=='/createJson'){
      navigate('/editNetwork',{state:{network:{networkData}}});
    }
        
      }

  return (
    <div className="card" onClick={navigateToEditNetwork}>
      <div className='div-checkbox '>
        {pathname==='/createJson'? 
        <input  
        class="check"
        type="checkbox"
    
        onChange={(event) => onCheck(event, networkData)}
        ></input>
        :
        null
      }
</div>
       <div className='div-header'>
      <div className="card_title">{networkData.model_path.split(/(\\|\/)/g).pop()}</div>
      </div>

      <div className="card_body" >
        <NetworkInformation network={networkData}  />
      </div>
    </div>
  );
};

export default NetworkCard;
