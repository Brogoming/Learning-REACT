import './App.css';
import Header from './components/Header'
import Employees from './pages/Employees'
import Customers from './pages/Customers'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Routes>
          <Route path='/employees' element={<Employees />} />
          <Route path='/test' element={<Customers />} />
        </Routes>
      </Header>
    </BrowserRouter>
  );
}

export default App;
