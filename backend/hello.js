console.log('hello Test') 
for(var i=0; i < 5;i++){
    setTimeout(workb, Math.random() * 20000);
}
console.log('Executing Completed') 

function workb(){
    console.log('Executing from Node') 
}