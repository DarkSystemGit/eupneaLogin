//let users = lightdm.users
/*function login(user,passwd,sess){
  lightdm.show_prompt.connect((text, type) => {
    if (type == 0) // Login
      lightdm.respond(user);
    else if (type == 1) // Password
      lightdm.respond(passwd);
  })
  lightdm.authentication_complete.connect(() => {
    lightdm.start_session(sess);
  })
  
lightdm.authenticate();
}*/

function forEach(list,fn){
    //console.log(list)
    for(var i=0;i<Object.keys(list).length;i++){
      //console.log(list[i],i,list)
      fn(list[i],i,list)
    }
  }
  var firedEv =0
function bindMulEv(ev,cssClass,handler){
  
  let list = document.getElementsByClassName(cssClass)
  
  forEach(list,(elm)=>{
    //console.log('bind')
    elm.addEventListener(ev,handler)
  })
}
async function getForm(){
  return new Promise((resolve,reject)=>{
    if(firedEv==0){
      firedEv =1
      bindMulEv('click','passwdEv',(e)=>{
        e.preventDefault()
        firedEv =0
        resolve(document.getElementsByClassName('passwd')[0].value)
      })
      bindMulEv('submit','passwdEvFm',(e)=>{
        e.preventDefault()
        firedEv =0
        resolve(document.getElementsByClassName('passwd')[0].value)
      })
    }else{
      resolve(document.getElementsByClassName('passwd')[0].value)
    }
    
  })
}
(async()=>{
  while(true){
    var passwd = await getForm()
  }
  
})()