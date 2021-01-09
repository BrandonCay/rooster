import React from 'react';

class Home extends React.Component{
constructor(props){
    super();
    this.state={
        count=10
    }
}
render(){ //sort and display cluck. May need to add server side sorting back up in case the client cannot perform the operation (i.e. an error or takes too long)
    return(
        <div>
            {this.props.list}
        </div>
    );
}
}