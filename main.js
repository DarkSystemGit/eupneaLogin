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
function bindMulEv(ev,cssClass,handler){
  
  let list = document.getElementsByClassName(cssClass)
  
  forEach(list,(elm)=>{
    //console.log('bind')
    elm.addEventListener(ev,handler)
  })
}
async function getForm(){
  return new Promise((resolve,reject)=>{
    bindMulEv('click','passwdEv',(e)=>{
      e.preventDefault()
      resolve(document.getElementsByClassName('passwdEvFm')[0].value)
    })
    bindMulEv('submit','passwdEvFm',(e)=>{
      e.preventDefault()
      resolve(document.getElementsByClassName('passwdEvFm')[0].value)
    })
  })
}
(async()=>{
  console.log(await getForm())
})()