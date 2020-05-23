module.exports = {

    url: function () {
      return this.api.launchUrl.concat('/signup');
    },
  
    elements: { 
      mainHeading: 'h1',
      logo: '.auth-logos',
      email: '#email',
      phone: '#phone',
      password: '#password',
      confirmPassword: '#confirm_password',
      link: '.forgot-text-block',
      button: '#signup',
      message: '#message-id',
      country:'.react-phone-number-input__icon react-phone-number-input__icon--international'        
          
    },

    commands: [
        {
          isBodyDisplayed: function (element) {
            return this.navigate()
              .waitForElementVisible('body', 2000);
          },

          btnclick: function (buttonId) {
            return this.click(buttonId)        
          },      
        
          atSignUp: function () {
            return this.assert.urlEquals(this.api.launchUrl.concat('/signup')).navigate();        
          }, 
          
          
          isDisplayed: function (element) {
            return this.waitForElementVisible(element, 2000);
          },

          isEqualElement: function (element, title) {
            return this.waitForElementVisible(element, 2000)
              .expect.element(element).text.to.equal(title);
          },

          buttonClick: function (buttonId) {
            return this.click(buttonId)
          },
       
         

          isEqualMessage: function (element, title) {
            let result= this.waitForElementVisible(element, 20000)
              .expect.element(element).text.to.equal(title);
            this.click('#close-icon');
            return result;
          },
        
          errormessage: function (title) {
            if (title=="Please enter Email")
            {

            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter Email']", 2000,function(){
              this.expect.element("//div[text()='Please enter Email']").text.to.equal(title)
              this.useCss();

            } )
              
            }
            if (title=="Please enter Password")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter Password']", 3000,function(){
              this.expect.element("//div[text()='Please enter Password']").text.to.equal(title)
              this.useCss();

            } )
              
            }
            if (title=="Please enter Confirm Password")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter Confirm Password']", 2000, function(){
              this.expect.element("//div[text()='Please enter Confirm Password']").text.to.equal(title)
              this.useCss();

            })
            }
            
            if (title=="Please enter valid Email")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter valid Email']", 2000, function(){
              this.expect.element("//div[text()='Please enter valid Email']").text.to.equal(title)
              this.useCss();

            })
            }

            if (title=="Please enter same values for Password and Confirm Password fields")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter same values for Password and Confirm Password fields']", 2000, function(){
              this.expect.element("//div[text()='Please enter same values for Password and Confirm Password fields']").text.to.equal(title)
              this.useCss();

            })
            }
            if (title=="Please select Country code")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please select Country code']", 2000, function(){
              this.expect.element("//div[text()='Please select Country code']").text.to.equal(title)
              this.useCss();

            })
            }
            if (title=="Please enter Phone number")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Please enter Phone number']", 2000, function(){
              this.expect.element("//div[text()='Please enter Phone number']").text.to.equal(title)
              this.useCss();

            })
            }
            if (title=="Email already exists")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Email already exists']", 2000, function(){
              this.expect.element("//div[text()='Email already exists']").text.to.equal(title)
              this.useCss();

            })
            }
            if (title=="Password length should not be less than 8")
            {
            return this.useXpath()
            .waitForElementVisible("//div[text()='Password length should not be less than 8']", 2000, function(){
              this.expect.element("//div[text()='Password length should not be less than 8']").text.to.equal(title)
              this.useCss();

            })
            }
            
          },
          
          countryCode: function (title) {
            if(title && title.length)
            {
            return this.click('@country')		
            .useXpath()
            .waitForElementVisible(`//option[text()='`+title+`']`)
                                
            .click(`//option[text()='`+title+`']`)
            .pause(3000)
           .useCss()     
            }  
          }, 

          xisDisplayed: function (title) {
            // if(title==Country)
            // {
              return this.useXpath()
              .waitForElementVisible(".react-phone-number-input__icon react-phone-number-input__icon--international")
              .useCss()     

            // }
    
          },

          signup: function (EMailAddress, Phone, Password, Confirm) {
            return this.setValue('@email',EMailAddress)
            .setValue('@phone',Phone)
            .setValue('@password',Password)
            .setValue('@confirmPassword',Confirm)

          }, 
          signuppage: function () {
            return this.navigate('https://heartocean.twlide.com/signup').pause(2000)
          },
          
          
       
        }]

    }
