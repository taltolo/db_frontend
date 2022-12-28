import './NetworkInformation.css';
const NetworkInformation = ({ network, edit }) => {
  return (
    <div className="informtion">
      <ul className="listRoot"></ul>
      <li>
        latency:
        <input
          className="filed-input"
          placeholder={network.DDR.latency}
          disabled
        ></input>
      </li>
      <li>
        L1:
        <input
          className="filed-input"
          placeholder={` ${network.L1} MB`}
          disabled={edit ? false : true}
        ></input>
      </li>
      <li>
        L2:
        <input
          className="filed-input"
          placeholder={` ${network.L2.size_MB} MB`}
          disabled
        ></input>
      </li>
      <li>
        bytes per cycle to DDR:
        <input
          className="filed-input"
          placeholder={` ${network.L2.bytes_per_cycle_to_DDR} MB`}
          disabled
        ></input>
      </li>
      <li>
        sparsity:
        <input
          className="filed-input"
          placeholder={network.sparsity}
          disabled
        ></input>
      </li>
      <li>
        weight compression rate:
        <input
          className="filed-input"
          placeholder={network.weight_compression_rate}
          disabled
        ></input>
      </li>
      <li>
        frequency:
        <input
          className="filed-input"
          placeholder={network.frequency}
          disabled
        ></input>
      </li>
      <li>
        winograd:
        <input
          className="filed-input"
          placeholder={network.winograd}
          disabled
        ></input>
      </li>
      <li>
        target cycles:
        <input
          className="filed-input"
          placeholder={network.target_cycles}
          disabled
        ></input>
      </li>
      <li>
        target Outer BW:
        <input
          className="filed-input"
          placeholder={network.target_Outer_BW}
          disabled
        ></input>
      </li>
    </div>
  );
};

export default NetworkInformation;
