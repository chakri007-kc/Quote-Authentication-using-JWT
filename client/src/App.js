import { BrowserRouter as Router,Route } from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
     <div>
          <Route exact path="/login"  component={Login}/>
          <Route exact path="/register"  component={Register}/>
          <Route exact path="/dashboard"  component={Dashboard}/>
     </div>
      </Router>
  );
}

export default App;
