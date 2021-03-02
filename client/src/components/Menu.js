import React from 'react';
import {Container, Col, Row, Button} from 'react-bootstrap';
import Home from './menuOptions/Home';
import Profile from './menuOptions/Profile';
import '../styles/menu.css';

const xsCol=[1,11,0];
const mdCol=[3,6,3];
const lgCol=[4,4,4];

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
        this.error="Error";
        this.payload=undefined;
    }
    
    async componentDidMount(){
        //need to add switch statement for payload/data package for each route such that data:{routeData:props}
        console.log('Menu DID MOUNT');
        try{
            let result = await fetch(`/api/user/${this.props.path}`, {method:"GET"});
            console.log(result);
            this.payload=await result.json();
            console.log(this.payload);
            console.log('mount success', this.payload,  this.payload.clucks);
            this.setState({loadState:2});
        }catch(e){
            console.log(e);
            this.error=JSON.stringify(e);
            this.setState({loadState:0});
        }
    }

    handleOnClick(e){
                    //test INPUT
        this.props.history.push(e.target.value);//this.paths[e.target.value]
    //does not route because same route path being used (guessing). same applies for wrong routes
    }

    render(){
        if(this.state.loadState=== 1){
            return(
                <Container fluid>
                    <Row xs="12">
                        Loading..
                    </Row>
                </Container>
            )
        }else if(this.state.loadState=== 2){
            return(
                <Container fluid>
                    <Row xs="2">
                        <Col xs={xsCol[0]} md={mdCol[0]} lg={lgCol[0]}>
                            <Row>
                                <Button value={"/home"} onClick={this.handleOnClick.bind(this)}>
                                    H
                                </Button>
                            </Row>
                            <Row>
                                <Button value={"/profile"} onClick={this.handleOnClick.bind(this)}>
                                    P
                                </Button>
                            </Row>    
                        </Col> 

                        {/*Middle Col*/ }
                        <Col xs={xsCol[1]} md={mdCol[1]} lg={lgCol[1]}id="midCol" >
                            <this.props.mid payload={this.payload}/>
                        </Col> 

                        <Col xs={xsCol[2]} md={mdCol[2]} lg={lgCol[2]}className="d-none d-md-block">
                            {this.right}
                        </Col>
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

/*

class Options extends React.Component{
    constructor(props){
        super();
        this.state={
            currentOpt:0
        }
    }

    

    render(){
        return(
            <Container>
                <Row xs={12}>
                    <Col xs={12}>

                    </Col>
                </Row>
            </Container>
        );
    }

}
*/
function Error(props){
    return(
        <div>
            {props.error}
        </div>
    );
}


export default Menu;

//dump.

            /*
            console.log(this.props.location);
            if(this.props.location.state===undefined || !('token' in this.props.location.state)){//!(token necessary?)
                throw "no token";
            }
            console.log('past throw');
            const result = await fetch('/api/userdata/',{method:"GET", headers:{"auth-token":`${this.props.location.state.token}`}});
            this.user=await result.json();*/

       //Only this code is necessary if history.push() 
       /*
        let payload;
        switch(path){
            case "home": payload={clucks:result.clucks};
            break;
            case "profile":payload={clucks:[{msg:"Profile"},{msg:"Profile2"}]};
            break;
            default:
                throw "Unexpected error";
        }
        this.payload=payload;
        this.mid=routes[path];
        this.right=rightRoutes[path];
        this.setState({loadState:2});
        */