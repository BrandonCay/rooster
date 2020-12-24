import React from 'react';

class Error extends React.Component{
    constructor(props){
        super(props);
        this.state={
            error:'N/A',
            message:'A'
        }
    }

    render(){
        return(
            <div>
                {this.state.error} <br/>
                {this.state.message}
            </div>
        )
    }
}

export default Error;