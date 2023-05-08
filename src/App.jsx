import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Menu from './componentes/Menu'
import Home from './componentes/telas/Home'
import Predio from './componentes/telas/predio/Predio'
import Sala from './componentes/telas/sala/Sala'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Menu/>
        <Routes>
          <Route exact="true" path='/' element={<Home/>}/>
          <Route exact="true" path='/predios' element={<Predio/>}/>
          <Route exact="true" path='/salas' element={<Sala/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
