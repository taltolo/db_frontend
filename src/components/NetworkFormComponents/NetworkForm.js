import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel, makeStyles } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from 'react';
import './NetworkForm.css';
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';

const useStyles = makeStyles({
  field: {
    marginTop: 17,
    marginBottom: 17,
    display: 'block',
    justifyContent: 'center',
    width: '20rem',
  },
});

const NetworkForm = ({from , networkToEdit}) => {
  const classes = useStyles();
  const [L1, setL1] = useState(networkToEdit?.L1 || 0);
  const [L2, setL2] = useState(networkToEdit?.L2.size_MB || 0);
  const [nightlyRun, setNightlyRun] = useState(networkToEdit?.nightlyRun || 0);
  const [test, setTest] = useState(networkToEdit?.test || 0);
  const [weekly, setWeekly] = useState(networkToEdit?.weekly || 0);
  const [checkIn, setCheckIn] = useState(networkToEdit?.checkIn || 0);
  const [model_path, setModel_path] = useState(networkToEdit?.model_path || "");
  const [frequency, setFrequency] = useState(networkToEdit?.frequency);
  const [target_cycles, setTtargetCycles] = useState(networkToEdit?.target_cycles);
  const [target_Outer_BW, setTargetOuterBW] = useState(networkToEdit?.target_Outer_BW);
  const [winograd, setWinograd] = useState(networkToEdit?.winograd || false);
  const [sparsity, setSparsity] = useState(networkToEdit?.sparsity);
  const [weight_compression_rate, setWeightCompression] = useState(networkToEdit?.weight_compression_rate);
  const [weightCompressionError, setWeightCompressionError] = useState(false);
  const [sparsityError, setSparsityError] = useState(false);
  const [modelPathError, setModelPathError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [targetCyclesError, setTargetCyclesError] = useState(false);
  const [targetOuterBWError, setTargetOuterBWError] = useState(false);
  const navigate = useNavigate();
  


  const handeleSubmit = (e) => {
    let network = {};
    e.preventDefault();
    let {addFlag,errorMessage} = vlidateInput();
    if(addFlag){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
     
      });
    }
    else {
      network = {
        DDR: {
          latency: 0,
        },
        L1,
        L2: {
          size_MB: L2,
          bytes_per_cycle_to_DDR: 32,
        },
        model_path,
        sparsity,
        weight_compression_rate,
        frequency,
        winograd,
        target_cycles,
        target_Outer_BW,
        nightly_run: nightlyRun,
        CheckIn: checkIn,
        Test: test,
        Weekly: weekly,
      };
      AddNetworkToDB(network);
    }
  };
  async function AddNetworkToDB(network) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(network),
    };
    try {
      const response = await fetch(
        'https://db-backend-ap.herokuapp.com',
        requestOptions
      );
      if (response) {
         await response.json();
        Swal.fire(
          'Add network successfully!!',
          `${model_path.split(/(\\|\/)/g).pop()} added to the DataBase successfully!`,
          'success'
        );
        cleanFiled();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
      });
      throw new Error(error);
    }
  }
  const handleChangeL1 = (event) => {
    setL1(event.target.value);
  };
  const handleChangeL2 = (event) => {
    setL2(event.target.value);
  };
  const handleChangeNightlyRun = (event) => {
    setNightlyRun(event.target.value);
  };
  const handleChangeTest = (event) => {
    setTest(event.target.value);
  };
  const handleChangeWeekly = (event) => {
    setWeekly(event.target.value);
  };
  const handleChangeCheckIn = (event) => {
    setCheckIn(event.target.value);
  };

  function vlidateInput() {
    let errorMessage = "error value for:";
    setModelPathError(false);
    setFrequencyError(false);
    setTargetCyclesError(false);
    setTargetOuterBWError(false);
    setSparsityError(false);
    let addFlag =false;
    setWeightCompressionError(false);
    if (isNaN(Number(sparsity)) || sparsity < 0 || sparsity > 1) {
      setSparsityError(true);
      errorMessage += " sparsity"
      addFlag =true;
    }
    if (isNaN(Number(weight_compression_rate)) || weight_compression_rate < 0 || weight_compression_rate > 1) {
      setWeightCompressionError(true);
      addFlag =true;
      errorMessage+=" weight compression rate"
    }
    if (model_path === '' || model_path.length<1) {
      setModelPathError(true);
      errorMessage+=" model path"
      addFlag =true;
    }
    if (isNaN(Number(frequency)) || frequency === 0 || frequency < 0) {
      setFrequencyError(true);
      addFlag =true;
      errorMessage+= " frequency"
    }
    if (isNaN(Number(target_cycles)) || target_cycles <= 0) {
      setTargetCyclesError(true);
      addFlag =true;
      errorMessage+= " target cycles"
    }
    if (isNaN(Number(target_Outer_BW)) || target_Outer_BW <= 0) {
      setTargetOuterBWError(true);
      addFlag =true;
      errorMessage+= " target Outer BW"
    }
    return {addFlag,errorMessage};
  }

  const updateNetwork = (e) =>  {
    let{addFlag,errorMessage}=vlidateInput();
    if(addFlag){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
     
      });
    }
    else{
    let updateNetwork=checkTheChanges();
    updateNetworkInDB(updateNetwork);
  
  }
  }

  async function updateNetworkInDB(updateNetwork){
    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updateNetwork),
    };
    try {
      const response = await fetch(
        'https://db-backend-ap.herokuapp.com/'+networkToEdit._id,
        requestOptions
      );
      if (response) {
         await response.json();
        Swal.fire(
          'Edit network successfully!!',
          `${model_path.split(/(\\|\/)/g).pop()} added to the DataBase successfully!`,
          'success'
        );

      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
      });
      throw new Error(error);
    }
  }

  function checkTheChanges(){
    let updateValues={};
    if(L1!==networkToEdit.L1){
      updateValues["L1"]=L1;
    }
    if(L2!==networkToEdit.L2.size_MB ){
      updateValues["L2"]["size_MB"]=L2;
    }
    if(model_path!==networkToEdit.model_path){
      updateValues["model_path"]=model_path;
    }
    if(sparsity!==networkToEdit.sparsity){
      updateValues["sparsity"]=sparsity;
    }
    if(weight_compression_rate!==networkToEdit.weight_compression_rate){
      updateValues["weight_compression_rate"]=weight_compression_rate;
    }
    if(frequency!==networkToEdit.frequency){
      updateValues["frequency"]=frequency;
    }
    if(target_cycles!==networkToEdit.target_cycles){
      updateValues["target_cycles"]=target_cycles;
    }
    if(target_Outer_BW!==networkToEdit.target_Outer_BW){
      updateValues["target_Outer_BW"]=target_Outer_BW;
    }
    if(nightlyRun!==networkToEdit.nightlyRun){
      updateValues["nightlyRun"]=nightlyRun;
    }
    if(test!==networkToEdit.test){
      updateValues["test"]=test;
    }
    if(weekly!==networkToEdit.weekly){
      updateValues["weekly"]=weekly;
    }
    if(checkIn!==networkToEdit.checkIn){
      updateValues["checkIn"]=checkIn;
    }
    if(winograd!==networkToEdit.winograd){
      updateValues["winograd"]=winograd;
    }
    return updateValues;
  }

  const deleteNetwork = (e) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFormDB(networkToEdit._id);
        Swal.fire(
          'Deleted!',
          'The Network has been deleted.',
          'success'
        )
      }
      navigate('/');
    })
    
  }

  async function deleteFormDB(id){
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(updateNetwork),
    };
    try {
      const response = await fetch(
        'https://db-backend-ap.herokuapp.com/'+id,
        requestOptions
      );
      if (response) {
        await response.json();
        return;

      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error.message,
      });
      throw new Error(error);
    }
  }

  function cleanFiled() {
    setL1(0);
    setL2(0);
    setNightlyRun(0);
    setTest(0);
    setWeekly(0);
    setCheckIn(0);
    setModel_path('');
    setFrequency('');
    setTtargetCycles('');
    setTargetOuterBW('');
    setWinograd('');
    setSparsity('');
    setWeightCompression('');
  }

  return (
    <div style={{ margin: '5rem' }}>
      <div className="form-continuer">
        <div className="h1-div">
          {from==='Edit Network' ? <h1>Edit Network</h1> :  <h1>Add New Network</h1>}
         
        </div>
        <Box
          sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-required-L1-label">L1 [MB]</InputLabel>
            <Select
              labelId="select-required-L1"
              id="select-required-L1"
              value={from==='Edit Network'? networkToEdit.L1 : L1}
              label= "L1 [MB]"
              onChange={handleChangeL1}
            >
              <MenuItem value="">
                 <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={32}>32</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-required-L1-label">L2 [MB]</InputLabel>
            <Select
              labelId="select-required-L2"
              id="select-required-L2"
              value={from==='Edit Network'? networkToEdit.L2.size_MB : L2}
              label="L2 [MB]"
              onChange={handleChangeL2}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={32}>32</MenuItem>
              <MenuItem value={64}>64</MenuItem>
              <MenuItem value={128}>128</MenuItem>
              <MenuItem value={256}>256</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>
          <from noValidare autoComplete="off" onSubmit={handeleSubmit}>
            <div className="from-div">
              <div className="textfildLeft">
                <TextField
                  className={classes.field}
                  fullWidth
                  onChange={(e) => setModel_path(e.target.value)}
                  defultvalue= {networkToEdit?.model_path}
                  value={model_path}
                  label= "model path"
                  variant="outlined"
                  required
                  error={modelPathError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setSparsity(e.target.value)}
                  defultvalue= {networkToEdit?.sparsity}
                  value = {sparsity}
                  label="sparsity"
                  variant="outlined"
                  required
                  fullWidth
                  error={sparsityError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setWeightCompression(e.target.value)}
                  defultvalue= {networkToEdit?.weight_compression_rate}
                  value= {weight_compression_rate}
                  label= "weight compression rate"
                  variant="outlined"
                  required
                  fullWidth
                  error={weightCompressionError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="textfildRigth">
                <TextField
                  className={classes.field}
                  onChange={(e) => setFrequency(e.target.value)}
                  defultvalue= {networkToEdit?.frequency }
                  value={frequency}
                  label="frequency"
                  variant="outlined"
                  required
                  fullWidth
                  error={frequencyError}
                />
                <TextField
                  className={classes.field}
                  defultvalue= { networkToEdit?.target_cycles}
                  value={target_cycles}
                  onChange={(e) => setTtargetCycles(e.target.value)}
                  label= "target cycles"
                  variant="outlined"
                  required
                  fullWidth
                  error={targetCyclesError}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setTargetOuterBW(e.target.value)}
                 
                  defultvalue = {networkToEdit?.target_Outer_BW}
                  value = {target_Outer_BW}
                  label= "target Outer BW"
                  variant="outlined"
                  required
                  fullWidth
                  error={targetOuterBWError}
                />
              </div>
            </div>
            <div className="select-radio-div">
              <div className="div-selects">
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-required-nightlyRun-label">
                    nightly run
                  </InputLabel>
                  <Select
                    labelId="select-required-nightlyRun"
                    id="select-required-nightlyRun"
                    value={from==='Edit Network'? networkToEdit.nightly_run : nightlyRun}
                    label="nightly run"
                    onChange={handleChangeNightlyRun}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-required-test-label">test</InputLabel>
                  <Select
                    labelId="select-required-test"
                    id="select-required-test"
                    value={from==='Edit Network'? networkToEdit.Test : test}
                    label="test"
                    onChange={handleChangeTest}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-required-weekly-label">
                    weekly
                  </InputLabel>
                  <Select
                    labelId="select-required-weekly"
                    id="select-required-weekly"
                    value={from==='Edit Network'? networkToEdit.Weekly : weekly}
                    label="weekly"
                    onChange={handleChangeWeekly}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-required-checkIn-label">
                    checkIn
                  </InputLabel>
                  <Select
                    labelId="select-required-checkIn"
                    id="select-required-checkIn"
                    value={from==='Edit Network'? networkToEdit.CheckIn : checkIn}
                    label="checkIn"
                    onChange={handleChangeCheckIn}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </div>
              <div className="div-radioGroup">
                <FormControl>
                  <FormLabel>Winograd</FormLabel>
                  <RadioGroup
                    defaultValue={from==='Edit Network'? networkToEdit.winograd? "true": "false" : ""}
                    onChange={(e) => setWinograd(e.target.value)}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio size="small" color="#063970" />}
                      label="True"
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio size="small" color="#063970" />}
                      label="False"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="div-button">
              {from==='Edit Network' ? 
            <div className='div-button-edit-delete'>
              <Button
               variant="contained"
               style={{
               backgroundColor: '#063970',
               color: '#99EC00',
               width: 150
               }}
               type="submit"
               onClick={updateNetwork}
               endIcon={<SaveAsSharpIcon/>}
              >save</Button>
              <Button
                variant="contained"
                style={{
                backgroundColor: '#99EC00 ',
                color: '#063970',
                width: 150,
                }}
                type="submit"
                onClick={deleteNetwork}
                endIcon={<DeleteForeverRoundedIcon fontSize='large'/>}
              >delete</Button>
            </div>  
            :
              <Button
                onClick={handeleSubmit}
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: '#063970',
                  color: '#99EC00',
                }}
                endIcon={<KeyboardArrowRightIcon />}
              >
                add
              </Button>
            
            }
            
            </div>
          </from>
        </Box>
      </div>
    </div>
  );
};

export default NetworkForm;
