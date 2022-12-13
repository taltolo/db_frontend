import './NetworkInformation.css';
const NetworkInformation = ({ network }) => {
  return (
    <div className="informtion">
      <ul className="listRoot"></ul>
      <li>latency: {network.DDR.latency}</li>
      <li>L1: {network.L1} MB</li>
      <li>L2: {network.L2.size_MB} MB</li>
      <li>bytes per cycle to DDR: {network.L2.bytes_per_cycle_to_DDR} MB</li>
      <li>sparsity: {network.sparsity} </li>
      <li>weight compression rate: {network.weight_compression_rate} </li>
      <li>frequency: {network.frequency} </li>
      <li>winograd: {network.winograd} </li>
      <li>target cycles: {network.target_cycles} </li>
      <li>target Outer BW: {network.target_Outer_BW} </li>
    </div>
  );
};

export default NetworkInformation;
