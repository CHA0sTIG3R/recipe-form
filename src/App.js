import {BrowserRouter} from 'react-router-dom';
import NavBar from './components/NavBar';
import Pages from './Pages/Pages';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="App bg-light">
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
