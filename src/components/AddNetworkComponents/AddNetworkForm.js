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
import './AddNetworkForm.css';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
    justifyItems: 'center',
  },
});

const AddNetworkForm = () => {
  const classes = useStyles();
  const [L1, setL1] = useState(0);
  const [L2, setL2] = useState(0);
  const [nightlyRun, setNightlyRun] = useState(0);
  const [test, setTest] = useState(0);
  const [weekly, setWeekly] = useState(0);
  const [checkIn, setCheckIn] = useState(0);
  const [modelPath, setModelPath] = useState('');
  const [frequency, setFrequency] = useState(0);
  const [targetCycles, setTtargetCycles] = useState(0);
  const [targetOuterBW, setTargetOuterBW] = useState(0);
  const [winograd, setWinograd] = useState(false);
  const [sparsity, setSparsity] = useState(0);
  const [weightCompression, setWeightCompression] = useState(0);
  const [weightCompressionError, setWeightCompressionError] = useState(false);
  const [sparsityError, setSparsityError] = useState(false);
  const [modelPathError, setModelPathError] = useState(false);
  const [frequencyError, setFrequencyError] = useState(false);
  const [targetCyclesError, setTargetCyclesError] = useState(false);
  const [targetOuterBWError, setTargetOuterBWError] = useState(false);

  const handeleSubmit = (e) => {
    e.preventDefault();
    setModelPathError(false);
    setFrequencyError(false);
    setTargetCyclesError(false);
    setTargetOuterBWError(false);
    setSparsityError(false);
    setWeightCompressionError(false);
    if (sparsity < 0 || sparsity > 1) {
      setSparsityError(true);
    }
    if (weightCompression < 0 || weightCompression > 1) {
      setWeightCompressionError(true);
    }
    if (modelPath === '') {
      setModelPathError(true);
    }
    if (frequency === 0 || frequency < 0) {
      setFrequencyError(true);
    }
    if (targetCycles < 0) {
      setTargetCyclesError(true);
    }
    if (targetOuterBW < 0) {
      setTargetOuterBWError(true);
    }
  };
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
    <div>
      <h1>add new Network</h1>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div className="form-continer">
          <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-required-L1-label">L1 [MB]</InputLabel>
            <Select
              labelId="select-required-L1"
              id="select-required-L1"
              value={L1}
              label="L1 [MB]"
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
              value={L2}
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
                  onChange={(e) => setModelPath(e.target.value)}
                  label="model path"
                  variant="outlined"
                  required
                  error={modelPathError}
                  sx={{ m: 1, width: '25ch' }}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setSparsity(e.target.value)}
                  label="sparsity"
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
                  label="weight compression rate"
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
                  label="frequency"
                  variant="outlined"
                  required
                  error={frequencyError}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setTtargetCycles(e.target.value)}
                  label="target cycles"
                  variant="outlined"
                  required
                  error={targetCyclesError}
                />
                <TextField
                  className={classes.field}
                  onChange={(e) => setTargetOuterBW(e.target.value)}
                  label="target Outer BW"
                  variant="outlined"
                  required
                  error={targetOuterBWError}
                />
              </div>
            </div>
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="select-required-nightlyRun-label">
                nightly run
              </InputLabel>
              <Select
                labelId="select-required-nightlyRun"
                id="select-required-nightlyRun"
                value={nightlyRun}
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
                value={test}
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
              <InputLabel id="select-required-weekly-label">weekly</InputLabel>
              <Select
                labelId="select-required-weekly"
                id="select-required-weekly"
                value={weekly}
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
                value={checkIn}
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
            <FormControl className={classes.field}>
              <FormLabel>Winograd</FormLabel>
              <RadioGroup
                value={winograd}
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
            <Button
              onClick={handeleSubmit}
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#063970', color: '#99EC00' }}
              endIcon={<KeyboardArrowRightIcon />}
            >
              add
            </Button>
          </from>
        </div>
      </Box>
    </div>
  );
};

export default AddNetworkForm;
