import React from 'react';
import Button from 'react-bootstrap/Button';
import checkImg from '../images/checkmark.png';
import crossImg from '../images/768px-Red_X.svg.png';


 class Status extends React.Component{
     constructor(props){
         super();
         this.state={
             fReq:{success:false, msg:"Verifying code..."}
         }
     }
    
    async componentDidMount(){
        try{
            const {params:{verificationCode}} = this.props.match;    
            let result;
            result=await fetch(`/api/auth/${verificationCode}`,{method:"GET"});
            result=await result.json();
            this.setState({fReq:result});
        }catch(e){
            this.setState({fReq:{success:false, msg:"An error occurred"}});
        }
    }
    render(){
        return(
                <div>
                    {this.state.fReq.success ? 
                    <div>
                        <img src={checkImg} alt="nothing"/>
                        <p>{this.state.fReq.msg}</p>
                        <Button href="/login">Go to login page</Button>   
                    </div>
                    :
                    <div>
                        <img src={crossImg} alt="nothing 1" width="200px" height="200px"/>
                        <p>{this.state.fReq.msg}</p>
                        <Button href="/">Go to start page</Button>   

                    </div>
                    }
                </div>
        )
    }
}
export default Status;