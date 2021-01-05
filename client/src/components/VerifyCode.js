import React from 'react';
import Form from 'react-bootstrap/From';
import Button from 'react-bootstrap/Button';
class VerifyCode extends React.Component{
    constructor(props){
        super();
        this.state={
            msg:"Enter Verification Code Above"
        }
    }

    async handleSubmit(e){
        e.preventDefault();
        const data={
            msg: e.target.elements[0].value
        }
        try{
            let res=await fetch('/api/auth/phoneVerify',{method:'POST', headers:{'Content-Type':'application/json'}, body})
        }catch(e){

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