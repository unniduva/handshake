module.exports = {

    url: function () {
      return this.api.launchUrl.concat('/login');
    },
  
    elements: { 
        email: '#email',
        password:'#password',
        login:'#login'
          
    },

    commands: [
        {
          isBodyDisplayed: function (element) {
            return this.navigate()
              .waitForElementVisible('body', 2000);
          },
          login: function (email,password) {
            return this.setValue('@email', email)
            .setValue('@password', password)
            
          },
          buttonClick: function (buttonId) {
            return this
            .click(buttonId).pause(2000)
          },

        }]

    }