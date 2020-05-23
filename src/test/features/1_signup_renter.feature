#####features/1_signup_renter.feature

Feature: Signup

  As a Renter
  I should be able to sign up to my account
  In order to plan my travel

Scenario: Navigation to Sign up page and page contents

  Given I am at Home page
  When I click on Sign Up option from main menu
  Then navigation to Sign Up page should happen
  And the Logo should be present on the page
  And the page title should be "Sign Up"
  And the fields EMail Address, Country Code, Phone Number, Password and Confirm Password should be displayed with their placeholders
  And the button Sign Up should be displayed
  

Scenario: Submitting Sign Up form with mandatory fields as blank

  Given I am at Sign Up page
  When I click on Sign Up button
  Then the signup page error message"Please enter Email" should be displayed
  And the signup page error message"Please enter Password" should be displayed
  And the signup page error message"Please enter Confirm Password" should be displayed

Scenario Outline: Submitting Sign Up form with EMail Address field as blank

  Given I am at Sign Up page
  When I give no value for EMail Address field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
  And I click on Sign Up button
  Then the signup page error message"Please enter Email" should be displayed
 Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |                           |1234567890          |password           |password           | India   |


Scenario Outline: Submitting Sign Up form with Password field as blank

  Given I am at Sign Up page
  When I give no value for password field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>" 
  And I click on Sign Up button
  Then the signup page error message"Please enter Password" should be displayed

   Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |1234567890          |                   |password           | India   |


Scenario Outline: Submitting Sign Up form with Confirm Password field as blank

  Given I am at Sign Up page
  When I give no value for confirm password field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>" 
  And I click on Sign Up button
  Then the signup page error message"Please enter Confirm Password" should be displayed

   Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |1234567890          |password           |                   | India   |

  

Scenario Outline: Submitting Sign Up form with invalid EMail Address

  Given I am at Sign Up page
  When I give no value for email field and eneter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
  And I click on Sign Up button
  Then the signup page error message"Please enter valid Email" should be displayed

   Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakmtoobler.com        |1234567890          |password           |password           | India   |

  

Scenario Outline: Submitting Sign Up form with different values for Password and Confirm Password fields

  Given I am at Sign Up page
  When I give different values for password fields field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
  Then the signup page error message"Please enter same values for Password and Confirm Password fields" should be displayed

Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   |Country |
   |soumyakm@toobler.com       |1234567890          |password           |fdfdfdfdf          |India   |


Scenario Outline: Submitting Sign Up form with Length less than 8 for Password field values for Password

  Given I am at Sign Up page
  When I give a value in password field Length less than 8 and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
  Then the signup page error message"Password length should not be less than 8" should be displayed

Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   |Country |
   |soumyakm@toobler.com       |1234567890          |password           |123                |India   |



Scenario Outline: Submitting Sign Up form with Phone number without giving the Country code

   Given I am at Sign Up page 
    When I do not select the Country Code and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
   And I click on Sign Up button
   Then the signup page error message"Please select Country code" should be displayed
Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |1234567890          |password           |password           |         |

Scenario Outline: Submitting Sign Up form without Phone number after selecting the Country code

   Given I am at Sign Up page
   When I give no value for Phone number field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
   And I click on Sign Up button
   Then the signup page error message"Please enter Phone number" should be displayed

Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |                    |password           |password           |India         |

Scenario Outline: Submitting Sign Up form with invalid Mobile Number

   Given I am at Sign Up page
   When I give invalid value for Phone number field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
   And I click on Sign Up button
   Then the signup page error message"Please enter valid Phone number" should be displayed
Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |$$^%^%^%^$^$%       |password           |password           |India    |



Scenario Outline: Trying to Sign Up with the same EMail Address

   Given I am at Sign Up page
    When I give same EMail Address in email field and enter all other valid values"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
   And I click on Sign Up button
   Then the signup page error message"Email already exists" should be displayed

 Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   | Country |
   |soumyakm@toobler.com       |1234567890          |password           |password           |India    |


   
Scenario Outline: Successful User Sign Up

   Given I am at Sign Up page
    When I give valid values for all field"<EMail Address>""<Phone Number>""<Password>""<Confirm Password>""<Country>"
   And I click on Sign Up button
  #####  Then the navigation to Main Page should happen
  #####  And the toaster "Account created successfully" should be displayed

   Examples: 
   |EMail Address              |Phone Number        |Password           |Confirm Password   |Country |
   |soumyakm@toobler.com       |9074691603          |password           |password           |India   |



  














