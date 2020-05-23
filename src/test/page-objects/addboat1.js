module.exports = {

    url: function() {
        return this.api.launchUrl.concat('/');
    },

    elements: {
        maintitle:'#main-header',
        basic_info:'#basic-info',
        add_boat: '#add-boat',
        step_1:'#step-1',
        fualeunit:"//span[text()='g/Li']",
        boatlunit:"//span[text()='feet']",
         Boat_Type: '#boattype',
         Boat_Manufacturer:'#manufacturer',
         Boat_Model:'#boatmodel',
         Cabins:'#cabins',
         Bathrooms:'#bathroom_count',
         single_beds:'#single_beds',
         Double_Beds:'#double_beds',
         made_year:'#made_year',
         Boat_Length:'#size',
         Boat_Capacity:'#guest_allowed',
         Number_Of_Engine:'#no_of_engines',
         horse_power_per_engine:'#horse_power_per_engine',
         Fuel_Economy:'#fuel_gal',
         Your_Boat_Name:'#name',
         Boat_Description:'#description',
         next:'#next-step1',
       
        
    },

    commands: [
        {
            isBodyDisplayed: function () {
                return this
                  .waitForElementVisible('body', 2000);
            },
            btnClick: function (btnid){
                return this.click(btnid).pause(2000)
            },
            isDisplayedWithDelay: function (element){
                return this.waitForElementVisible(element,2000);
            },
            isDisplayed:function (element){
                return this.waitForElementVisible(element);
            },
            xisDisplayed:function (element){
                return this.useXpath()
                .waitForElementVisible(element)
                .useCss()
            },
            isEqualElement: function (element, title) {
                return this.waitForElementVisible(element, 20000)
                  .expect.element(element).text.to.equal(title);
              },
            addboatpage: function () {
                return this.navigate('https://heartocean.twlide.com/addboat').pause(2000)
              },
              addboat: function (Boat_Type,Boat_Manufacturer,Boat_Model,
                Cabins,Bathrooms,Single_Beds,Double_Beds,Build_year,Boat_Length,Boat_Capacity
               ,N_Of_Engines,HP_per_Engine,Fuel_Economy,Your_Boat_Name,Boat_Description) {
                console.log('sdads',Build_year)
                return this.click('@made_year')
                            .useXpath()
                            .click(`//td[@title='`+Build_year+`']`)
                            .useCss()
                           .setValue('@Boat_Type', Boat_Type)
                           .setValue('@Boat_Manufacturer', Boat_Manufacturer)
                           .setValue('@Boat_Model', Boat_Model)
                           .setValue('@Cabins', Cabins)
                           .setValue('@Bathrooms', Bathrooms)
                           .setValue('@single_beds', Single_Beds)
                           .setValue('@Double_Beds', Double_Beds)
                           .setValue('@Boat_Length', Boat_Length)
                           .setValue('@Boat_Capacity', Boat_Capacity)
                           .setValue('@Number_Of_Engine', N_Of_Engines)
                           .setValue('@horse_power_per_engine', HP_per_Engine)
                           .setValue('@Fuel_Economy', Fuel_Economy)
                           .setValue('@Your_Boat_Name', Your_Boat_Name)
                           .setValue('@Boat_Description', Boat_Description)

                     
              },
              errormessage: function (title) {
                if (title=="Please enter Boat Type")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Type']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Type']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Boat Manufacture")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Manufacture']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Manufacture']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Boat Model")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Model']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Model']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter number of Cabins")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter number of Cabins']", 2000,function(){
                  this.expect.element("//div[text()='Please enter number of Cabins']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter number of Bathrooms")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter number of Bathrooms']", 2000,function(){
                  this.expect.element("//div[text()='Please enter number of Bathrooms']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter number of Single Beds")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter number of Single Beds']", 2000,function(){
                  this.expect.element("//div[text()='Please enter number of Single Beds']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter number of Double Beds")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter number of Double Beds']", 2000,function(){
                  this.expect.element("//div[text()='Please enter number of Double Beds']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Build Year")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Build Year']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Build Year']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Boat Length")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Length']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Length']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Boat Capacity")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Capacity']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Capacity']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Number Of Engines")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Number Of Engines']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Number Of Engines']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Your Boat Name")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Your Boat Name']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Your Boat Name']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter Boat Description")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter Boat Description']", 2000,function(){
                  this.expect.element("//div[text()='Please enter Boat Description']").text.to.equal(title)
                  this.useCss();
                })}
                if (title=="Please enter a valid value")
                {return this.useXpath()
                .waitForElementVisible("//div[text()='Please enter a valid value']", 2000,function(){
                  this.expect.element("//div[text()='Please enter a valid value']").text.to.equal(title)
                  this.useCss();
                })}
            },


        }

    ]


}