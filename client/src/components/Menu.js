import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import Home from './menuOptions/Home';
import Profile from './menuOptions/Profile';

const xs="4";
const routes = {
    home: Home,
    profile: Profile
}
const rightRoutes={
    home:<div>A</div>,
}
class Menu extends React.Component{
    constructor(props){
        super();
        this.state={
            loadState:1,
        }
        this.user=undefined;
        this.error="Error";
        this.mid=undefined;
        this.right=undefined;
    }
    
    async componentDidMount(){
        console.log('Menu');
        try{
            console.log(typeof(this.props.match.params.menuOptions),this.props.match.params.menuOptions);
            console.log(typeof(this.props.match.params),this.props.match.params);

            const path=this.props.match.params.menuOptions;
            if(!path in routes){
                throw "invalid path";
            }
            
            this.mid = routes[path];
            this.right=rightRoutes[path];
            
            /*
            console.log(this.props.location);
            if(this.props.location.state===undefined || !('token' in this.props.location.state)){//!(token necessary?)
                throw "no token";
            }
            console.log('past throw');
            const result = await fetch('/api/userdata/',{method:"GET", headers:{"auth-token":`${this.props.location.state.token}`}});
            this.user=await result.json();*/
            this.setState({loadState:2});
        }catch(e){
            console.log(e);
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
            return(
                <Container fluid >
                    <Row xs="12">
                        <Col xs={xs}>A</Col> <Col xs={xs}><this.mid/></Col> <Col xs={xs}>{this.right}</Col>
                    </Row>
                </Container>
            )
        }else{
            return(
                <Container fluid>
                    <Row xs="12">
                        <Error error={this.error}/>
                        Hi
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