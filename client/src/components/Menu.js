import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';

const xs="4";
class Menu extends React.Component{
    constructor(props){
        super();
        this.state={
            token:"A",
            load:false,
        }
    }
    async componentDidMount(){

    }
    render(){
        if(this.state.token){
            return(
                <Container fluid >
                    <Row xs="12">
                        <Col xs={xs}>A</Col> <Col xs={xs}>A</Col> <Col xs={xs}>A</Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid>
                    <Error/>
                </Container> 
                )    
        }
  
    }
}

function Error(){
    return(
        <div>
            A
        </div>
    );
}


export default Menu;