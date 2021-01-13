import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class VerifyCode extends React.Component{
    constructor(props){
        super();
        this.state={
            msg:"Enter Verification Code Above",
            _id:""        
        }
    }
    async componentDidMount(){
        console.log("verifyingCode");
        let id  = this.props.match.params;
        let result = await fetch(`/api/userexists/${id}`,{method:"GET"});
        result=result.json();
        if(result.exists){
            this.setState({_id:id});
        }else{
            this.props.history.push("/login", {msg:"Unable to Verify Code. Login first and a code will be sent if you're not registered"});
        }
    }
    async handleSubmit(e){
        e.preventDefault();
        const data={
            code: e.target.elements[0].value,
            _id:this.state.id
        }
        try{
            let res=await fetch('/api/auth/phoneVerify',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
            res=await res.json();
            this.setState({msg:res.msg});
        }catch(e){
            this.setState({msg:"An error has occurred. Return to this page at a later time when the issue is resolved"});
        }
    }

    render(){
        return(
            <Container fluid>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Group>
                        <Form.Label>Enter Verify Code Below</Form.Label>
                        <Form.Control type="number" placeholder="Format: ######"/>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                    <Form.Text>{this.state.msg}</Form.Text>
                </Form>
            </Container>
        );
    }
}

export default VerifyCode;