import React from 'react';
import Button from 'react-bootstrap/Button';


 const Status =  ({match, location}) =>{
    const {params:{verificationCode}} = match;
    const findCode = async () =>{
        try{
            let result;
            result=await fetch(`/api/auth/${verificationCode}`,{method:"GET"});
            result=await result.json();
            console.log(result);
            return result;

        }catch(e){
            console.log("error");
            return {fnd:false};
            
        }
    }
    const result = findCode();    
    return(
        <div>
            {result.fnd ? 
            <div>
                <img src="../checkmark.png" alt="nothing"/>
                <Button>Login</Button>   
            </div>
            :
            <img src="../768px-Red_X.svg.png" alt="nothing 1"/>
            }
        </div>
    )
}
/*
class Status extends React.Component{
    constructor(props){
        super(props);
        this.state={
            success:true,
            message:'A'
        }
    }

    render(){
        return(
            <div>
              {this.state.success ? <Success /> : <Error/>}
            </div>
        )
    }
}*/
export default Status;