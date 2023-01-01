import NetworkInformation from "../NetworkInformation/NetworkInformation";
import { useState } from 'react';
import './EditDialog.css'

const EditDialog = ({network, handleClose}) => {
    let [openDialog,setOpenDialog]=useState(true);
    return(
        <dialog id="model-network" className="networkInfo-dialog" open={openDialog} > 
        <article>
            <div className="div-a">
                 <button 

            onClick={handleClose}>X</button> 
            </div>
          
    <hgroup>
        <h2>{network.model_path.split('\\')[2]}</h2>
        <div className="networkInfo-dialog">
    <NetworkInformation network={network} edit={null} />
        </div>
    </hgroup>
        </article>
        </dialog>
    );

}

export default EditDialog;
