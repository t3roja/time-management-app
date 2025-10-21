import { Routes, Route  } from 'react-router-dom'
import './App.css';
import Home from './pages/Home';
import AddEntryForm from './pages/AddEntryForm';

function App() {
  return (

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/addentryform/:projectId" element={<AddEntryForm/>}/>
      </Routes>

  );
}

export default App;
