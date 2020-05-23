const { client } = require('nightwatch-api');
const { Given, Then, When } = require('cucumber');
const addboat1 = client.page.addboat1();



When('I have logged into my account', function () {

  return addboat1.isBodyDisplayed()
});

When('I click on Add Boat option from the menu', function () {

  return addboat1.btnClick('@add_boat')
});
Then('the navigation to Add Boat 1st page should happen', function () {

  return addboat1.btnClick('@step_1')
});
Then('Breadcrumb should be "(.*?)"', function (title) {

  return addboat1.isEqualElement('', title)
});
Then('the page title should be "(.*?)"', function (title) {

  return addboat1.isEqualElement('@maintitle', title)
});
Then('the page numbers 1,2,3,4,5,6 should be displayed', function (title) {

  return addboat1.isDisplayed('')
});
Then('the page numbers 2,3,4,5,6 should be inactive', function () {

  return addboat1.isDisplayed('')
});
Then('the Subtitle should be {string}', function (title) {

  return addboat1.isEqualElement('@basic_info', title)
});

Then('the input fields Boat Type, Boat Manufacturer, Boat Model,Cabins, Bathrooms, Single Beds, Double Beds, Build Year, Boat Length, Boat Capacity, Number Of Engines, HP per Engine, Fuel Economy, Your Boat Name, Boat Description should be present', function () {

  return (
     addboat1.isDisplayed('@Boat_Type') &&
    addboat1.isDisplayed('@Boat_Manufacturer') &&
     addboat1.isDisplayed('@Boat_Model') &&
    addboat1.isDisplayed('@Cabins') &&
    addboat1.isDisplayed('@Bathrooms') &&
    addboat1.isDisplayed('@single_beds') &&
    addboat1.isDisplayed('@Double_Beds') &&
    addboat1.isDisplayed('@made_year') &&
    addboat1.isDisplayed('@Boat_Length') &&
    addboat1.isDisplayed('@Boat_Capacity') &&
    addboat1.isDisplayed('@Number_Of_Engine') &&
    addboat1.isDisplayed('@horse_power_per_engine') &&
    addboat1.isDisplayed('@Fuel_Economy') &&
    addboat1.isDisplayed('@Your_Boat_Name') &&
    addboat1.isDisplayed('@Boat_Description'))

});
Then('the unit Feet should be displayed inside Boat Length field', function () {

  return addboat1.xisDisplayed('@boatlunit')
});
Then('the unit "(.*?)" should be displayed inside Fuel Economy field', function () {

  return addboat1.xisDisplayed('@fualeunit')
});

Then('the unit gal/h should be displayed inside Fuel Economy field', function () {


});

Then('the Boat Model field should be inactive by default', function () {

  return addboat1.default('')
});
Then('the Date field Build Year should be present', function () {

  return addboat1.isDisplayed('')
});
Then('the button Next should be displayed', function () {

  return addboat1.isDisplayed('@next')
});
Then('I am at Add Boat 1 page', function () {

  return (addboat1.addboatpage() &&
          addboat1.btnClick('@step_1'))
});

Then('the error message {string} should be displayed', function (title) {
  return addboat1.errormessage(title)
});

Then('I click on Next button', function () {
  return addboat1.btnClick('@next')
});

Then('I leave Boat Type field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });

Then('I leave Boat Manufacturer field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });

  Then('I leave Boat Model field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Cabins field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Bathrooms field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Single Beds field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Double Beds field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Build Year field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Boat Length field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Boat Capacity field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Number Of Engines field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Your Boat Name field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I leave Boat Description field as blank and give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('I give all other valid values {string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}{string}',
  function (string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15) {
  return addboat1.addboat(string, string2, string3, string4, string5, string6, string7, string8, string9, string10, string11, string12, string13, string14, string15)
  });
  Then('the navigation to Add Boat Page 2 should happen', function () {

    return addboat1.isEqualElement('h2','2. Set Boat Location')
  });
  


