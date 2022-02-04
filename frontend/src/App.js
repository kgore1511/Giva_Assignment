import './App.css';
import SearchStates from './component/SearchState'
import {BrowserRouter,Route,Link} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SearchStates}></Route>
    </BrowserRouter>
  );
}

export default App;
