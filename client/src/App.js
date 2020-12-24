
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> 
        <Route path="/home"/>
        <Route path="/error" component={Error}/>
        <Route path="/" component={Start}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
