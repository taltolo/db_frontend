import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
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

const useStyles = makeStyles({
  field: {
    marginTop: 17,
    marginBottom: 17,
    display: 'block',
    justifyContent: 'center',
    width: '300px',
  },
});

const NetworkForm = ({from , networkToEdit}) => {
  const classes = useStyles();
  const [L1, setL1] = useState(0);
  const [L2, setL2] = useState(0);
  const [nightlyRun, setNightlyRun] = useState(0);
  const [test, setTest] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [model_path, setModel_path] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [target_cycles, setTtargetCycles] = useState(0);
  const [target_Outer_BW, setTargetOuterBW] = useState(0);
  const [winograd, setWinograd] = useState(false);
  const [sparsity, setSparsity] = useState(-1);
  const [weight_compression_rate, setWeightCompression] = useState(-1);
  const [weightCompressionError, setWeightCompressionError] = useState(false);
  const [sparsityError, setSparsityError] = useState(false);
  const [modelPathError, setModelPathError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [targetCyclesError, setTargetCyclesError] = useState(false);
  const [targetOuterBWError, setTargetOuterBWError] = useState(false);
  const [addFlag, setAddFlag] = useState(true);
  console.log(networkToEdit)

  const handeleSubmit = (e) => {
    let network = {};
    e.preventDefault();
    setModelPathError(false);
    setFrequencyError(false);
    setTargetCyclesError(false);
    setTargetOuterBWError(false);
    setSparsityError(false);
    setAddFlag(false);
    setWeightCompressionError(false);
    if (sparsity < 0 || sparsity > 1) {
      setSparsityError(true);
      setAddFlag(true);
    }
    if (weight_compression_rate < 0 || weight_compression_rate > 1) {
      setWeightCompressionError(true);
      setAddFlag(true);
    }
    if (model_path === '') {
      setModelPathError(true);
      setAddFlag(true);
    }
    if (frequency === 0 || frequency < 0) {
      setFrequencyError(true);
      setAddFlag(true);
    }
    if (target_cycles <= 0) {
      setTargetCyclesError(true);
      setAddFlag(true);
    }
    if (target_Outer_BW <= 0) {
      setTargetOuterBWError(true);
      setAddFlag(true);
    }
    console.log(addFlag)
    if(addFlag){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Yod didnt filled all filed!',
     
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
          `${model_path.split('\\')[2]} added to the DataBase successfully!`,
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
                  onChange={(e) => setModel_path(e.target.value)}
                  value= {from==='Edit Network'? networkToEdit.model_path: "model path"}
                  label= {from==='Edit Network'? networkToEdit.model_path: "model path"}
                  variant="outlined"
                  required
                  error={modelPathError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">model.onnx</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setSparsity(e.target.value)}
                  value= {from==='Edit Network'? networkToEdit.sparsity: "sparsity"}
                  label={from==='Edit Network'? networkToEdit.sparsity: "sparsity"}
                  variant="outlined"
                  required
                  error={sparsityError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">0.0-1.0</InputAdornment>
                    ),
                  }}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setWeightCompression(e.target.value)}
                  value= {from==='Edit Network'? networkToEdit.weight_compression_rate: "weight compression rate"}
                  label={from==='Edit Network'? networkToEdit.weight_compression_rate: "weight compression rate"}
                  variant="outlined"
                  required
                  error={weightCompressionError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">0.0-1.0</InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="textfildRigth">
                <TextField
                  className={classes.field}
                  onChange={(e) => setFrequency(e.target.value)}
                  value= {from==='Edit Network'? networkToEdit.frequency : "frequency"}
                  label={from==='Edit Network'? networkToEdit.frequency : "frequency"}
                  variant="outlined"
                  required
                  error={frequencyError}
                />
                <TextField
                  className={classes.field}
                  value={from==='Edit Network'? networkToEdit.target_cycles : ""}
                  onChange={(e) => setTtargetCycles(e.target.value)}
                  label={from==='Edit Network'? networkToEdit.target_cycles : "target cycles"}
                  variant="outlined"
                  required
                  error={targetCyclesError}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setTargetOuterBW(e.target.value)}
                  placeholder = "target Outer BW"
                  value = {from==='Edit Network'? networkToEdit.target_Outer_BW :"target Outer BW"}
                  label= {from==='Edit Network'? networkToEdit.target_Outer_BW :"target Outer BW"}
                  variant="outlined"
                  required
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
                    value={from==='Edit Network'? networkToEdit.winograd : winograd}
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
            </div>
          </from>
        </Box>
      </div>
    </div>
  );
};

export default NetworkForm;
