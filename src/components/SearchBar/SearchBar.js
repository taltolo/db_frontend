import './SearchBar.css';
const SearchBar = ({ allNetworks, onChoice }) => {
  const getQuery = (event) => {
    const value = event.target.value.toLowerCase();
    const filteredNetworks = allNetworks.filter((network) =>
      `${network.model_path}`.toLowerCase().includes(value)
    );
    onChoice(filteredNetworks);
  };

  return (
    <div className="searchBar-continer">
      <input
        className="search-box"
        placeholder="Search..."
        onInput={getQuery}
      ></input>
    </div>
  );
};

export default SearchBar;
