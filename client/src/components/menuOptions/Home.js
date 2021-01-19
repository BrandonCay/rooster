import React from 'react';
import Cluck from '../Cluck';
import {Container, ListGroup} from 'react-bootstrap';

const loadCnt=10;
/*
const Home = () =>{
    return(
        <h1>Home</h1>
    )
}*/

//observer activates when target is within root

class Home extends React.Component{
    constructor(props){
        super();
        this.state={
            count:0,
            list:new Array(loadCnt),
            listLimit:false,
            loadingMsg:"Load More"
        }
        this.observer=undefined;
     //   this.loadingRef; // =React.createRef() ??? if callback deosnt work
    }

    handleObserver(entities, observer){
        if(!this.state.listLimit && this.state.list.length===this.state.count){
            console.log("Adding Items to list");
            this.addItemsToList();   
        }
        if(this.state.listLimit){
            this.setState({loadingMsg: "Nothing to load"});
        }else{
            this.setState({loadingMsg: "Loading More"});
        }
        console.log("handlingObserver");
    }

    async componentDidMount(){
        console.log("Home Mounted", typeof(this.state.list));
        this.observer=new IntersectionObserver(this.handleObserver.bind(this), {root:null, rootMargin:"0px", threshold:1.0});
        this.observer.observe(this.loadingRef); //loadingRef is an element ex. <div ref={loadingRef => this.loadingRef=loadingRef}>
        this.addItemsToList();

    }

    addItemsToList(){
        let listCnt=this.state.count+loadCnt, realCnt=this.props.payload.clucks.length, listLimit=false;
        if(listCnt>realCnt){ //adjust increment to exact size of clucks
            listCnt=realCnt;
            listLimit=true;
        }
        let list = new Array(listCnt); //initialize to prevent reinitialization everytime for push
        const clucks = this.props.payload.clucks;

        for(let i=this.props.payload.clucks.length-1, j=0; j<listCnt; --i, ++j){
           list[j]=clucks[i];
        }
       
       this.setState({list:list, count:listCnt, listLimit:listLimit});
       console.log("New list:", this.state.list)
    }

    render(){ //sort and display cluck. 
        //May need to add server side sorting back up in case the client cannot perform the operation (i.e. an error or takes too long)
        /*
        let arr = this.props.clucks;
        let list = new Array(loadCnt);
        for(let i=clucks.length -1 , j=0; i>=0 && j!==loadCnt; --i, ++j){
            list[j]=arr[i];
        }
        this.setState({list:this.state.list+list});
        */
       //test
       console.log(this.state.count);   

        return(
            <Container style={{width:"100%"}}>
                
                <ListGroup>
                    {  
                        this.state.list.map((item, index)=>{
                            console.log("ITEM", item);
                            return <ListGroup.Item key={index} style={{"background-color":"", "padding":"0"}}><Cluck author={item.author} text={item.text}/></ListGroup.Item>})
                        
                    }
                    <ListGroup.Item ref={loadingRef => this.loadingRef=loadingRef}><a onClick={this.handleObserver.bind(this)}>{this.state.loadingMsg}</a></ListGroup.Item>
                </ListGroup>
                
            </Container>
        );
    }
}


export default Home;