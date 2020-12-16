function createUser(clucks){
    const userTemp={
        clucks:[clucks],
    
    }
    return userTemp;
}

function createCluck(likes, text, date){
    const cluckTemp={
        likes:likes,
        text:text,
        date:date
    }
    return cluckTemp;
}



let cluck1=createCluck(1,"1,", new Date()), cluck2=createCluck(2,"2,",new Date());
let user1=createUser(cluck1), user2=createUser(cluck2);


let following = [user1, user2];
const sz=following.length;
let clucks = []
const todayDate=new Date().getDate(); //todays date in days





for(let i=0; i<sz;++i){
    let fClucks=following[i].clucks;//get followed users' clucks
    console.log(fClucks,fClucks.length);
    console.log(fClucks[fClucks.length -1 ], fClucks[0]);
    for(let j=fClucks.length - 1;j>=0 && fClucks[j].date.getDate()===todayDate; --j){//push all clucks from today. NOTE: twitter  
        console.log("2nd l:",fClucks[j]);
        clucks.push(fClucks[j]);
    }
}  
clucks.sort(function(a,b){return b.likes - a.likes});
console.log(clucks, "sorted");