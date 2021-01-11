import React from 'react';

class Home extends React.Component{
    constructor(props){
        super();
        this.state={
            count:10
        }
        this.observer;

    }

    handleObserver(){

    }

    async componentDidMount(){
        this.observer=new IntersectionObserver(this.handleObserver.bind(this), {root:null, rootMargin:"0px", threshold:1.0});
        this.observer.observer(this.loadingRef); //loadingRef is an element ex. <div ref={loadingRef => this.loadingRef=loadingRef}>
    }

    render(){ //sort and display cluck. 
        //May need to add server side sorting back up in case the client cannot perform the operation (i.e. an error or takes too long)
        return(
            <div>
                {this.props.list}
            </div>
        );
    }
}

export default Home;