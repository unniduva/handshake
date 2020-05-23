Feature: Login

  As a User
  I should be able to login to my Account
  In order to plan my travel

# Scenario: Navigation to Login page and the page contents

#   Given I am at Home page
#   When I click on Login from menu
#   Then I should get navigated to Login page
#   And the Logo should be present on the page
#   And the title should be Login
#   And the fields EMail Address and Password should be displayed with their placeholders
#   And the option Remember Me should be displayed
#   And the option Forgot Password should be displayed
#   And the button Login should be displayed
#   And the link Sign Up should be present

# Scenario: Navigation to Sign Up page from Login page

#   Given I am at Login page
#   When I click on Sign Up link
#   Then the navigation to Sign Up page should happen

# Scenario: Submitting Login page with blank fields

#   Given I am at Login page
#   When I click on Login button
#   Then the error message "Please enter EMail Address" should be displayed for EMail Address field
#   And the error message "Please enter Password" should be displayed for Password field

# Scenario Outline: Submitting Login page with blank EMail Address field

#   Given I am at Login page
#   When I give no value for "<EMail Address>" field
#   And I give a value for "<Password>" field
#   And I click on Login button
#   Then the error message "Please enter EMail Address" should be displayed

#   Examples:
#   |EMail Address     |Password |
#   |                  |password |

# Scenario Outline: Submitting Login page with blank Password field

#   Given I am at Login page
#   When I give a value for "<EMail Address>" field
#   And I give no value for "<Password>" field
#   And I click on Login button
#   Then the error message "Please enter Password" should be displayed

#   Examples:
#   |EMail Address                 |Password |
#   |soumyakm@toobler.com          |         |
  
# Scenario Outline: Submitting Login form with invalid EMail Address field

#   Given I am at Login page
#   When I give invalid value for "<EMail Address>" field
#   And I give value for "<Password>" field
#   And I click on Login button
#   Then the error message "Invalid EMail Address" should be displayed

#   Examples:
#   |EMail Address     |Password |
#   |soumyakm          |password |

# Scenario Outline: Submitting Login form with a non existing EMail Address value

#   Given I am at Login page
#   When I give a non existing value for "<EMail Address>" field
#   And I give value for "<Password>" field
#   And I click on Login button
#   Then the error message "Invalid EMail Address" should be displayed

#   Examples:
#   |EMail Address           |Password |
#   |soumyakm1@toobler.com   |password |

# Scenario Outline: Submitting Login form with invalid combination of EMail Address and Password values

#   Given I am at Login page
#   When I give "<EMail Address>" field value 
#   And I give an incorrect value for "<Password>" field
#   And I click on Login button
#   Then the error message "Incorrect Login credentials" should be displayed

#   Examples:
#   |EMail Address                |Password  |
#   |soumyakm@toobler.com         |password1 |

Scenario Outline: Submitting Login form with valid credentials

  Given I am at Login page
  When I give valid values for EMail Address and password"<EMail Address>""<Password>"
  And I click on Login button
#   Then the navigation to Main page should happen
#   And the toaster "Logged In successfully" should be displayed

  Examples:
  |EMail Address         |Password |
  |vj@gmail.com          |password |

  






