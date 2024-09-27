import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Screen1 from './component/Screen1';
import Newtaskadd from './component/Newtaskadd';
import Edittask from './component/Edittask';

function App() {
  return (
    <>
      {/* Wrap your routes with BrowserRouter */}
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<Screen1 />} />
          <Route path="/edittask/:id" element={<Edittask />} />
          <Route path="/newtaskadd" element={<Newtaskadd />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
