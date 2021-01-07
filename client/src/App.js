
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Start from "./components/Start";
import VerifyLink from "./components/VerifyLink";
import VerifyCode from "./components/VerifyCode";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/VerifyCode/:verificationCode" component={VerifyCode}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/> 
        <Route path="/home"/>
        <Route path="/error" component={()=><div>dizzy</div>}/>
        <Route path="/:verificationCode" component={VerifyLink} />
        <Route path="/" component={Start}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
