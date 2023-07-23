let users = lightdm.users
lightdm.show_prompt.connect((text, type) => {
    if (type == 0) // Login
      lightdm.respond("user");
    else if (type == 1) // Password
      lightdm.respond("password");
  })
  lightdm.authentication_complete.connect(() => {
    lightdm.start_session("session");
  })
  
lightdm.authenticate();