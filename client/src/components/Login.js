import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Login extends React.Component{
    constructor(props){
        super();
        this.state={
            msg:""
        }
    }

    componentDidMount(){
        const passedState=this.props.location.state;
        if(passedState){
            console.log(passedState);
            this.setState({msg:passedState.msg});
        }else if(window.msg){

            this.setState({msg:window.msg});
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const data={
            username:e.target.elements[0].value,
            password:e.target.elements[1].value
        }
        try{
            let result = await fetch('/api/auth/login', 
                {method:'POST', 
                headers:{'Content-Type':'application/json'}, 
                body:JSON.stringify(data)
                })
            result=await result.json();
            
            if(result.success){
                window.open("/home", "_blank","noopener,noreferrer");
            }else{
                const endChar=result.msg[result.msg.length -1];
                if(endChar==="e"){
                    window.open(`/VerifyCode/${result.payload}`, "_blank","noopener,noreferrer") //opens tab to verify phoneCode
                }
                console.log(result);
                this.setState({msg:result.msg});
            }
        }catch(e){
            this.setState({msg:"An unexpected error occurred. Try again later until the issue resolves"});
        }
    }

    render(){
        return(
            <Container fluid>
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
            </Container>
        )
    }
};

export default Login;