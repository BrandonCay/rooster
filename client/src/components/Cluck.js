import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
const row1="11"
const innerCol=["1","11"]
const innerRow=["1","10","1"]
const inner2Col=["11","1"]

/*
function defaultCheck(data){ //returns different default value depending on 
    if(data==="" || ){
        const type=typeof(data);
        switch (type){
            case "string":
                return ""
            case "number":
                return 0;
            case "Array":
                return [];
            default:
                return "";
        }
    }else{
        return data;
    }
} */

class Cluck extends React.Component{
    constructor(props){
        super();
        this.state={
            likes:0,
            replies:[],
            to:[],
            reclucks:0
        }
        this.author="";
        this.text="";
    }
    componentDidMount(){
        try{
            const {likes,replies, to, reclucks, author, text} = this.props;
            this.setState({likes:likes, replies:replies, to:to, reclucks:reclucks, author:author, text:text});
        }catch(e){
            console.log("Unexpected error");
        }
    }
    render(){
        return(
            <Container>
                <Row xs={row1}>
                    <Col xs={innerCol[0]}>Pic</Col>
                    <Col xs={innerCol[1]}>
                        <Row xs={innerRow[0]}>
                            <Col xs={inner2Col[0]}>{this.author}</Col>
                            <Col xs={inner2Col[1]}>Options</Col>
                        </Row>
                        <Row xs={innerRow[1]}>{this.text}</Row>
                        <Row xs={innerRow[2]}>Cluck Options/Thread </Row>
                    </Col>
                </Row> 
            </Container>
        )
    }
}

export default Cluck;