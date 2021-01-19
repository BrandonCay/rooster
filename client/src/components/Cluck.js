import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import "../styles/cluck.css";
const innerCol=[4,8], inner2Col=[8,4]
//mediumm
const mdInnerCol=[2,10], mdInner2Col=[8,4];
//


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
        this.img="";
    }
    componentDidMount(){
        try{
            const {likes,replies, to, reclucks, author, text} = this.props;
            console.log("CLUCK PROPS:", this.props);
            this.setState({likes:likes, replies:replies, to:to, reclucks:reclucks});
            this.author=author;
            this.text=text;
            console.log("SUCCESS", this.state, this.author, this.text, this.img);
        }catch(e){
            console.log("Unexpected error");
        }
    }
    render(){
        return(
            <Container id="container">
                <Row id="row1">
                    <Col xs={innerCol[0]} md={mdInnerCol[0]}id="col1">Pic</Col>
                    <Col xs={innerCol[1]} md={mdInnerCol[1]}id="col2">
                        <Row id="innerRow1" className="innerRow">
                            <Col xs={inner2Col[0]} md={mdInner2Col[0]}id="inner2Col1">{this.author}</Col>
                            <Col xs={inner2Col[1]} md={mdInner2Col[1]}id="inner2Col2">Options</Col>
                        </Row>
                        <Row id="innerRow2" className="innerRow text-wrap text-break">
                            <Col xs={12}>{this.text}</Col>
                        </Row>
                        <Row  id="innerRow3" className="innerRow">
                            <Col xs={12}>Cluck Options/Thread</Col>
                        </Row>
                    </Col>
                </Row> 
            </Container>
        )
    }
}

export default Cluck;