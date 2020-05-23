const { client }= require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const login = client.page.login();

Given('I am at Login page', function () {
   
    return login.isBodyDisplayed()
  });
Then('I give valid values for EMail Address and password"<EMail Address>""<Password>"', function (email,password) {
   
   
  });
  When('I give valid values for EMail Address and password{string}{string}', function (email, password) {
   
    return login.login(email,password)
  });

Then('I click on Login button', function () {
   
    return login.buttonClick('@login')
  });