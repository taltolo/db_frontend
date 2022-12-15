import HomePage from './components/Screen/HomePage';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddNetwork from './components/Screen/AddNetwork';
import EditNetwork from './components/Screen/EditNetwork';
import DeleteNetwork from './components/Screen/DeleteNetwork';
import CreateJson from './components/Screen/CreateJson';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />

        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/addNetwork" element={<AddNetwork />} />
            <Route path="/editNetwork" element={<EditNetwork />} />
            <Route path="/deleteNetwork" element={<DeleteNetwork />} />
            <Route path="/createJson" element={<CreateJson />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
