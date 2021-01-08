import React from 'react';
import {Container} from 'react-bootstrap';
class Home extends React.Component{
    constructor(props){
        super();
        this.state={
            req:"req",
        }
    }
    componentDidMount(){
        
    }
    render(){
        return(
        <Container fluid>
            <div>{this.state.req}</div>
        </Container> 
        )    
    }
}
export default Home;