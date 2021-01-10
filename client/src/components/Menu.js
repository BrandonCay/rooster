import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';

const xs="4";

class Menu extends React.Component{
    constructor(props){
        super();
        this.state={
            loadState:1,
        }
        this.user=undefined;
        this.error=undefined;
    }
    
    async componentDidMount(){
        try{
            const token=this.props.location.state.token;
            if(!token){
                throw 0;
            }
            const result = await fetch('/api/userdata/',{method:"GET", headers:{"auth-token":`${token}`}});
            this.user=await result.json();
        }catch(e){
            this.error=e;
            this.setState({loadState:0});
        }
    }

    render(){
        if(this.state.loadState=== 1){
            return(
                <Container fluid >
                    <Row xs="12">
                        Loading..
                    </Row>
                </Container>
            )
        }else if(this.state.loadState=== 2){
            const {mid, right} = this.props;
            return(
                <Container fluid >
                    <Row xs="12">
                        <Col xs={xs}>A</Col> <Col xs={xs}>{mid}</Col> <Col xs={xs}>{right}</Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid>
                    <Row xs="12">
                        <Error error={this.error}/>
                    </Row>
                </Container> 
                ) ;
        }
  
    }
}

function Error(props){
    return(
        <div>
            {props.error}
        </div>
    );
}


export default Menu;