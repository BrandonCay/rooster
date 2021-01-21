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
        this.user=undefined;
        this.error="Error";
        this.paths = ["/home","/profile"];
        this.left=undefined;
        this.mid=undefined;
        this.right=undefined;
        this.payload=undefined;
    }
    
    async componentDidMount(){
        //need to add switch statement for payload/data package for each route such that data:{routeData:aa}
        console.log('Menu DID MOUNT');
        try{
            console.log(typeof(this.props.match.params.menuOptions),this.props.match.params.menuOptions);
            console.log(typeof(this.props.match.params),this.props.match.params);

            const path=this.props.match.params.menuOptions;
            if(!path in routes){
                throw "invalid path";
            }

            /*
            console.log(this.props.location);
            if(this.props.location.state===undefined || !('token' in this.props.location.state)){//!(token necessary?)
                throw "no token";
            }
            console.log('past throw');
            const result = await fetch('/api/userdata/',{method:"GET", headers:{"auth-token":`${this.props.location.state.token}`}});
            this.user=await result.json();*/
        const data=
        {
            author:"Author",
            text:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa AaaaaaA AAA AA AAAAA AA AAA",
            likes:0,
            to:[],
            reclucks:0,
        }
           
        const result=
        {
            clucks:[data]
        }
       //
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
        }catch(e){
            console.log(e);
            this.error=e;
            this.setState({loadState:0});
        }
    }

    handleOnClick(e){
                    //test INPUT
        this.props.history.push('/1');//this.paths[e.target.value]
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
                                <Button value={0} onClick={this.handleOnClick.bind(this)}>
                                    H
                                </Button>
                            </Row>
                            <Row>
                                <Button value={1} onClick={this.handleOnClick.bind(this)}>
                                    P
                                </Button>
                            </Row>    
                        </Col> 
                        <Col xs={xsCol[1]} md={mdCol[1]} lg={lgCol[1]}id="midCol" >
                            <this.mid payload={this.payload}/>
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