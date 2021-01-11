import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
const row1="11"
const innerCol=["1","11"]
const innerRow=["1","10","1"]
const inner2Col=["11","1"]
class Cluck extends React.Component{
    constructor(props){
        super();
        this.state={
            likes:0,
            replies:[],
            to:[],
        }
        this.author="";
    }
    render(){
        return(
            <Container>
                <Row xs={row1}>
                    <Col xs={innerCol[0]}>Pic</Col>
                    <Col xs={innerCol[1]}>
                        <Row xs={innerRow[0]}>
                            <Col xs={inner2Col[0]}>Name</Col>
                            <Col xs={inner2Col[1]}>Options</Col>
                        </Row>
                        <Row xs={innerRow[1]}>Msg</Row>
                        <Row xs={innerRow[2]}>Cluck Options/Thread </Row>
                    </Col>
                </Row> 
            </Container>
        )
    }
}

export default Cluck;