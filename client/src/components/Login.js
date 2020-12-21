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

    render(){
        return(
            <div>
                <Form method="POST" action="/api/auth/login">
                    <Form.Group>
                        <Form.Label> Username, e-mail, or phone number </Form.Label>
                        <Form.Control type="text" placeholder="Enter one of the above here" required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label> Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password Here" required/>
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