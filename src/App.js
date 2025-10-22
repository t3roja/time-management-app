import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryForm from './components/AddEntryForm';
import EditEntry from './pages/EditEntry';
import Login from './pages/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/editentry/:projectid/:entryid" element={<EditEntry />} />
        <Route path="/addentryform/:projectid" element={<AddEntryForm />} />
      </Routes>
    </div>
  );
}

export default App;
