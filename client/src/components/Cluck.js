import React from 'react'
import {Container, Row, Col, Button, Modal} from 'react-bootstrap';
import "../styles/cluck.css";
import ContentEditable from 'react-contenteditable';
import defaultCluck from '../cluck';
const innerCol=[1,11], inner2Col=[8,4]
//medium
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


//cluck needs to append to replies and display a message
class Cluck extends React.Component{
    constructor(props){//props contains 
        super();
        this.state={
            reclucks:0,
            likes:0,
            show:false, //modal
            html:""

        }
        ({author:this.author,  text:this.text, img:this.img, userId:this.userId, to:this.to}= this.props);//destructering
        this.contentEditable=React.createRef();

        /*this.author="";
        this.text="";
        this.img="";
        this.userId="";
        this.to=[];*/
    }

    handleReplyClick(){
        this.setState({show:!this.state.show});
    }
    
    async handleReplySubmit(){
        //api request to add message to clucks reply list
        let replies=this.state.replies,  newCluck=defaultCluck;
        newCluck.text=this.state.html;  
        newCluck.author= undefined;//provided by context
        await fetch()
        this.setState({show:false, replies:replies})
        console.log('replied: ', this.state.replies);
    }


    handleClose(){
        this.setState({show:false});
    }

    handleOnContentChange(e){
        console.log("text div", e.target.value)
        this.setState({html:e.target.value});
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
                            <Col xs={4}>
                                <Button onClick={this.handleReplyClick.bind(this)}> {/*Cant seperate Modal because of this*/}
                                    Reply
                                </Button>
                            </Col>
                            <Col>
                                <Button>

                                </Button>
                            </Col>
                            <Col>
                                <Button>

                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>{/*Gonna switch off with if statement */}
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <Button>Unsent Tweets</Button> 
                            </Modal.Title> 
                        </Modal.Header>
                    <Modal.Body>
                        <ContentEditable onChange={this.handleOnContentChange.bind(this)} html={this.state.html} innerRef={this.contentEditable}
                        style={{borderColor:"black", border:"5px", backgroundColor:"red", minHeight:"150px"}}
                        />
                    </Modal.Body>
                    <Modal.Footer style={{justifyContent:"start"}}>
                        <Button onClick={this.handleReplySubmit.bind(this)} >Reply</Button>
                    </Modal.Footer>

                    </Modal>


                </Row>
            </Container>
                       
        )
    }
}




export default Cluck;