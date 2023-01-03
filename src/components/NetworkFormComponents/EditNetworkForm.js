import './NetworkForm.css';
import NetworkForm from './NetworkForm';
import {useLocation} from 'react-router-dom';

const EditNetworkForm = () => {
    const location = useLocation();

    return (
        <div className="div-h1">
            <h1>Edit Network</h1>
            <NetworkForm from="Edit Network" networkToEdit={location.state.network.networkData}/>
        </div>
    )
}
export default EditNetworkForm;