import NetworkForm from "./NetworkForm";
import './NetworkForm.css';

const AddNetworkForm = () => {
    return (
        <div className="div-h1">
        <h1>Add New Network </h1>
        <NetworkForm from="AddNewNetwork" networkToEdit={null}/>
        </div>
    )
}

export default AddNetworkForm;