
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";
import VerifyLink from "./components/VerifyLink";
import VerifyCode from "./components/VerifyCode";
import Menu from "./components/Menu";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/VerifyCode/:verificationCode" component={VerifyCode}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> 
        <Route path="/home" component={()=><Menu/>}/>
        <Route path="/:verificationCode" component={VerifyLink} />
        <Route path="/" component={Start}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
