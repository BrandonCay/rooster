import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    async handleOnSubmit(e){
        e.preventDefault();

        const data={
            username: e.target.elements[0].value,
            email:e.target.elements[1].value,
            phoneNumber: e.target.elements[2].value,
            password:e.target.elements[3].value
        }
        let result=await fetch('/api/auth/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        })
        result=await result.json();
        if(result.success){
            window.open('/home','_blank','noopener,noreferrer');
        }else{
            window.open('/error','_blank','noopener,noreferrer');
        }
    }
    render(){
        return(
            <div>
                <Form onSubmit={this.handleOnSubmit.bind(this)}> 
                    <Form.Group>
                        <Form.Text>You must enter at least one of the following: e-mail, phone number </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="username">Username (required)</Form.Label>
                        <Form.Control required type="text" controlId="username" name="username" placeholder="Format: Minimum length is 4 characters. maximum length is 15" />
                    </Form.Group>  
                    <Form.Group>
                        <Form.Label for="email">E-mail</Form.Label>
                        <Form.Control type="email" controlId="email" name="email" placeholder="Format: whole e-mail including @ and .com" />
                    </Form.Group> 
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" controlId="phoneNumber" name="phoneNumber" placeholder="Format:numbers with no seperation"/>
                    </Form.Group>
                    <Form.Group>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="password">Password (required)</Form.Label>
                        <Form.Control type="password" controlId="password" name="password" placeholder="Enter password here" required/>
                    </Form.Group> 
                    <Button type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Register;