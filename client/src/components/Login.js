import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            hello:"hello"
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const data={
            username:e.target.elements[0].value,
            password:e.target.elements[1].value
        }
        console.log("Hello",data);
        let result= await fetch('/api/auth/login', 
        {method:'POST', 
        headers:{'Content-Type':'application/json'}, 
        body:JSON.stringify(data)
        })
        result=await result.json();
        if(result.success){
            this.props.history.push("/home");
            return;
        }else if(result.success===false){
            this.props.history.push("/error");

        }else{
            console.log(await result.text());
            this.props.history.push("/error");

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
            </div>
        )
    }
};

export default Login;