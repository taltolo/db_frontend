import NetworkInformation from "../NetworkInformation/NetworkInformation";
import './EditDialog.css'

const EditDialog = ({network, handleClose}) => {
    return(
        <dialog id="model-network" open> 
        <article>
            <div className="div-a">
                 <a 
            href="/"
            aria-label="Close"
            className="close"
            data-target="model-network"
            onClick={handleClose}>X</a> 
            
            </div>
          
<hgroup>
    <h2>{network.model_path.split('\\')[2]}</h2>
<NetworkInformation network={network} edit={null} />
</hgroup>
        </article>
        </dialog>
    );

}

export default EditDialog;
