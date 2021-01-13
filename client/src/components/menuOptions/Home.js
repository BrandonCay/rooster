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


class Home extends React.Component{
    constructor(props){
        super();
        this.state={
            count:0,
            list:new Array(loadCnt)
        }
        this.observer=undefined;
     //   this.loadingRef; // =React.createRef() ??? if callback deosnt work
    }

    handleObserver(entities, observer){
        if(this.state.list.length===this.state.count){
            this.setState({count:this.state.count+10});
            console.log('observed');
        }
        console.log("handlingObserver");
    }

    async componentDidMount(){
        console.log("Home Mounted", typeof(this.state.list));
        this.observer=new IntersectionObserver(this.handleObserver.bind(this), {root:null, rootMargin:"0px", threshold:1.0});
        this.observer.observe(this.loadingRef); //loadingRef is an element ex. <div ref={loadingRef => this.loadingRef=loadingRef}>
        console.log(typeof(this.state.list));
        
       let arr = [1,2,3]
       let list = new Array(loadCnt);
       let cnt=0;
       console.log(typeof(this.state.list), this.state.list, "1");   

       for(let i=arr.length-1, j=0; i>=0 && j!==loadCnt; --i, ++j){
        console.log(typeof(this.state.list), this.state.list, "2");   
           list[j]=arr[i];
           console.log("list updated:",list);
           cnt++;
       }
       this.setState({list:this.state.list.concat(list), count:cnt});
       console.log(typeof(this.state.list), this.state.list, this.state.count);

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
       console.log(typeof(this.state.list), this.state.list, "0");   

        return(
            <Container>
                <ListGroup>
                    {  
                        this.state.list.map((item, index)=>(<ListGroup.Item>item</ListGroup.Item>))
                    }
                    <ListGroup.Item ref={loadingRef => this.loadingRef=loadingRef}>Loading...</ListGroup.Item>
                </ListGroup>

            </Container>
        );
    }
}


export default Home;