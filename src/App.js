import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryForm from './components/AddEntryForm';
import AddProjectForm from './components/AddProjectForm';
import EditEntry from './pages/EditEntry';
import Login from './pages/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editentry/:projectid/:entryid" element={<EditEntry />} />
        <Route path="/addentryform/:projectid" element={<AddEntryForm />} />
        <Route path="/addprojectform" element={<AddProjectForm />} />
      </Routes>
    </div>
  );
}

export default App;
