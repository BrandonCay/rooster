
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home"/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> 
        <Route path="/" component={Start}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
