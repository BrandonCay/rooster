
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Start from "./components/Start";


function App() {
  return (
    <BrowserRouter className="App">
      <Switch>
        <Route exact path="/">
          <Start/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="./Signin">

        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
