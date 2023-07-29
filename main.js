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
function fixDefaultUser(user){
  if (typeof user === "string"){
    user = {name:user}
  }else{
    user = {name:user[0]}
  }
  if (!user.profile) {
    user.profile = 'Profile.svg'
  }
  if (!user.email) {
    user.email = ''
  }
  document.getElementsByClassName('userName')[0].innerHTML = user.name
      document.getElementsByClassName('profilePic')[0].src = user.profile

}
function forEach(list, fn) {
  //console.log(list)
  for (var i = 0; i < Object.keys(list).length; i++) {
    //console.log(list[i],i,list)
    fn(list[i], i, list)
  }
}
var firedEv = 0
function bindMulEv(ev, cssClass, handler) {

  let list = document.getElementsByClassName(cssClass)

  forEach(list, (elm) => {
    //console.log('bind')
    elm.addEventListener(ev, handler)
  })
}
async function getForm() {
  return new Promise((resolve, reject) => {
    if (firedEv == 0) {
      firedEv = 1
      bindMulEv('click', 'passwdEv', (e) => {
        e.preventDefault()
        firedEv = 0
        resolve([document.getElementsByClassName('passwd')[0].value, document.getElementsByClassName('userName')[0].innerHTML])
      })
      bindMulEv('submit', 'passwdEvFm', (e) => {
        e.preventDefault()
        firedEv = 0
        resolve([document.getElementsByClassName('passwd')[0].value, document.getElementsByClassName('userName')[0].innerHTML])
      })
    } else {
      resolve([document.getElementsByClassName('passwd')[0].value, document.getElementsByClassName('userName')[0].innerHTML])
    }

  })
}
function genUserList(users, click) {
  users.forEach((user) => {
    if (!(typeof user === "object")){
      user = {name:user}
    }
    if (!user.profile) {
      user.profile = 'Profile.svg'
    }
    if (!user.email) {
      user.email = ''
    }
    var userString = `<tr class="user" id="${user.name.replaceAll(' ', '_')}userListItem"><td class="uk-width-1-6"><img src="${user.profile}" class="userPic"></td><td class="uk-width-5-6"><div class="userSelectItem"><h5 style="margin: 0;">${user.name}</h5><p style="margin: 0;">${user.email}</p></div></td></tr>`
    document.getElementsByClassName("userList")[0].innerHTML = document.getElementsByClassName("userList")[0].innerHTML + userString
   


  })
  return users

}
(async () => {
  var users
  fixDefaultUser("Bob Boe")
  genUserList(["John Doe",{name:"Jill Doe",email:"jilldoe@example.com"}]).forEach((user) => {
    document.getElementById(`${user.name.replaceAll(' ', '_')}userListItem`).addEventListener('click', function (e) { 
      document.getElementsByClassName('userName')[0].innerHTML = user.name
      document.getElementsByClassName('profilePic')[0].src = user.profile
      UIkit.modal(document.getElementById('user-selector')).hide();
    })
  })
  while (true) {
    var user = await getForm()
    alert(user)
  }

})()