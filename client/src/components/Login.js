import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            msg:""
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const data={
            username:e.target.elements[0].value,
            password:e.target.elements[1].value
        }
        let result= await fetch('/api/auth/login', 
        {method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(data)
        })
        result=await result.json();
        if(result.success){
           window.open("/home", "_blank","noopener,noreferrer");
        }else{
            const endChar=result.msg[-1];
            if(endChar==="e"){
                window.open("/verifyCode", "_blank","noopener,noreferrer") //opens tab to verify phoneCode
            }else if(endChar==="l"){
                window.open("/verifyLink", "_blank","noopener,noreferrer") //opens tab to verify phoneCode
            }
            else{
                window.open("/Status", "_blank","noopener,noreferrer") //Opens status. Should send data too
            }
        }
    }

    render(){
        return(
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group>
                        <Form.Label> Username, e-mail, or phone number </Form.Label>
                        <Form.Control type="text" placeholder="Enter one of the above here" required name="username"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password Here" required name="password"/>
                    </Form.Group>
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
                <Form.Text>{this.state.msg}</Form.Text>
            </div>
        )
    }
};

export default Login;