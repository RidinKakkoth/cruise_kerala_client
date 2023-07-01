import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AdminRoute from './Routes/AdminRoute';
import './App.css';
import PartnerRoute from './Routes/PartnerRoute';

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path='/admin/*' element={<AdminRoute/>} />
            <Route path='/partner/*' element={<PartnerRoute/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
