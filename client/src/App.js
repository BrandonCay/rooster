
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";
import VerifyLink from "./components/VerifyLink";
import VerifyCode from "./components/VerifyCode";
import Menu from "./components/Menu";
import Home from "./components/menuOptions/Home";
import Profile from "./components/menuOptions/Profile";

function left(){
  return(
    <div>B</div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/VerifyCode/:verificationCode" component={VerifyCode}/>
        <Route path="/verifyLink/:verificationCode" component={VerifyLink} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> 
        <Route path="/start" component={Start}/> 
        <Route path="/:menuOptions" component={Menu}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
