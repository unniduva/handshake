const { client }= require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const signup = client.page.signup_renter_1();

Given (/^I am at Home page$/, () => {
    return signup.isBodyDisplayed();
});

When (/^I click on Sign Up option from main menu$/, () => {
    return signup.btnclick('@button');
});

Then (/^navigation to Sign Up page should happen$/, () => {
    return signup.atSignUp();
});

Then (/^the Logo should be present on the page$/, () => {
    return signup.isDisplayedWithDelay('@logo');
});

Then (/^the page title should be "(.*?)"$/, (title) => {
    return signup.isEqualElement('@mainHeading', title);
});

Then (/^the fields EMail Address, Country Code, Phone Number, Password and Confirm Password should be displayed with their placeholders$/, () => {
    return( signup.isDisplayed('@email') && 
            //signup.isDisplayed('@country') &&
            signup.isDisplayed('@phone') &&
            signup.isDisplayed('@password') &&
            signup.isDisplayed('@confirmPassword'))
});

Then (/^the button Sign Up should be displayed$/, () => {
    return signup.isDisplayed('@button');
});


Given (/^I am at Sign Up page$/, () => {
    return signup.signuppage();
});

When (/^I click on Login link$/, () => {
    return signup.buttonClick();    
});

Then (/^I should get navigated to Login page$/, () => {
    return signup.atLogin();
});

When (/^I click on Sign Up button$/, () => {
    return signup.buttonClick('@button');    
});
When (/^the signup page error message"(.*?)" should be displayed$/, (title) => {
    return signup.errormessage(title)    
});


///////////////////////////////

      When('I give no value for EMail Address field and enter all other valid values{string}{string}{string}{string}{string}',
       function (EMailAddress, Phone, Password, Confirm,Country) {
       
        return (signup.countryCode(Country)&&
        signup.signup(EMailAddress, Phone, Password, Confirm) 
         )
                  
      });

      When('I give no value for password field and enter all other valid values{string}{string}{string}{string}{string}',
      function (EMailAddress, Phone, Password, Confirm,Country) {
      
       return ( signup.countryCode(Country)&&
           signup.signup(EMailAddress, Phone, Password, Confirm) 
       )
                 
     });


     When('I give no value for confirm password field and enter all other valid values{string}{string}{string}{string}{string}',
     function (EMailAddress, Phone, Password, Confirm,Country) {
     
      return (signup.countryCode(Country)&&
          signup.signup(EMailAddress, Phone, Password, Confirm) 
       )
                
    });


    When('I give no value for email field and eneter all other valid values{string}{string}{string}{string}{string}',
    function (EMailAddress, Phone, Password, Confirm,Country) {
    
     return ( signup.countryCode(Country)&&
     signup.signup(EMailAddress, Phone, Password, Confirm) 
     )
               
   });


   When('I give different values for password fields field and enter all other valid values{string}{string}{string}{string}{string}',
   function (EMailAddress, Phone, Password, Confirm,Country) {
   
    return (signup.countryCode(Country)&&
        signup.signup(EMailAddress, Phone, Password, Confirm) 
     )
              
  });

  When('I give a value in password field Length less than 8 and enter all other valid values{string}{string}{string}{string}{string}',
  function (EMailAddress, Phone, Password, Confirm,Country) {
  
   return (signup.countryCode(Country)&&
       signup.signup(EMailAddress, Phone, Password, Confirm) 
    )
             
 });


  When('I do not select the Country Code and enter all other valid values{string}{string}{string}{string}{string}',
  function (EMailAddress, Phone, Password, Confirm,Country) {
  
   return signup.signup(EMailAddress, Phone, Password, Confirm) 

             
 });


 When('I give no value for Phone number field and enter all other valid values{string}{string}{string}{string}{string}',
 function (EMailAddress, Phone, Password, Confirm,Country) {
 
  return (signup.countryCode(Country)&&
  signup.signup(EMailAddress, Phone, Password, Confirm) 
   )
            
});


When('I give same EMail Address in email field and enter all other valid values{string}{string}{string}{string}{string}',
function (EMailAddress, Phone, Password, Confirm,Country) {

 return (signup.countryCode(Country)&&
 signup.signup(EMailAddress, Phone, Password, Confirm) 
  )
           
});

When('I give valid values for all field{string}{string}{string}{string}{string}',
function (EMailAddress, Phone, Password, Confirm,Country) {

 return (signup.countryCode(Country)&&
 signup.signup(EMailAddress, Phone, Password, Confirm) 
  )
           
});
When('I give invalid value for Phone number field and enter all other valid values{string}{string}{string}{string}{string}',
function (EMailAddress, Phone, Password, Confirm,Country) {

 return (signup.countryCode(Country)&&
     signup.signup(EMailAddress, Phone, Password, Confirm) 
  )
           
});

// Then('the navigation to Main Page should happen', function () {
    
//     return 
//   });












































