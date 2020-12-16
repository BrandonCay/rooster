import React from "react";

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hello:"hello"
        }
    }

    render(){
        return(
            <div>
                {this.state.hello}
                Hi
            </div>
        )
    }
};

export default Login;