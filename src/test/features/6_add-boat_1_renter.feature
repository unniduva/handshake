Feature: Add Boat Page 1 

  As a Boat Owner
  I should be able to add boats
  In order to publish them and available for the customers


Scenario: Navigation to 1st page of Add Boat and Contents

  Given I have logged into my account
  When I click on Add Boat option from the menu
  Then the navigation to Add Boat 1st page should happen
###   And the Breadcrumb should be "Home > Add Boat"
   And the page title should be "Add Boat"
###   And the page numbers 1,2,3,4,5,6 should be displayed
###   And the page numbers 2,3,4,5,6 should be inactive
   And the Subtitle should be "1.Basic Information"
    And the input fields Boat Type, Boat Manufacturer, Boat Model,Cabins, Bathrooms, Single Beds, Double Beds, Build Year, Boat Length, Boat Capacity, Number Of Engines, HP per Engine, Fuel Economy, Your Boat Name, Boat Description should be present
 ## #  And the unit Feet should be displayed inside Boat Length field
  ###  And the unit "gal/h" should be displayed inside Fuel Economy field
###   And the Boat Model field should be inactive by default
###   And the Date field Build Year should be present
   And the button Next should be displayed

Scenario: Submit Page 1 with blank fields

  Given I am at Add Boat 1 page
  When I click on Next button
  Then the error message "Please enter Boat Type" should be displayed
  And the error message "Please enter Boat Manufacturer" should be displayed
  And the error message "Please enter Boat Model" should be displayed
  And the error message "Please enter number of Cabins" should be displayed
  And the error message "Please enter number of Bathrooms" should be displayed
  And the error message "Please enter number of Single Beds" should be displayed
  And the error message "Please enter number of Double Beds" should be displayed
  And the error message "Please enter Build Year" should be displayed
  And the error message "Please enter Boat Length" should be displayed
  And the error message "Please enter Boat Capacity" should be displayed
  And the error message "Please enter Number Of Engines" should be displayed
  And the error message "Please enter Your Boat Name" should be displayed
  And the error message "Please enter Boat Description" should be displayed
  And the error message "Please enter a valid value" should be displayed


Scenario Outline: Submit page 1 without selecting Boat Type field value

  Given I am at Add Boat 1 page
  Then  I leave Boat Type field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Type" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |          |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |


Scenario Outline: Submit page 1 without selecting Boat Manufacturer field value

  Given I am at Add Boat 1 page
  Then  I leave Boat Manufacturer field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Manufacturer" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |                  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 without selecting Boat Model field value

  Given I am at Add Boat 1 page
  Then  I leave Boat Model field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Model" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |           |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Cabins field as blank

  Given I am at Add Boat 1 page
  Then  I leave Cabins field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter number of Cabins" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |       |4         |4           |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Bathrooms field as blank

  Given I am at Add Boat 1 page
  Then  I leave Bathrooms field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter number of Bathrooms" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |          |4           |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |


Scenario Outline: Submit page 1 with leaving Single Beds field as blank

  Given I am at Add Boat 1 page
  Then  I leave Single Beds field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter number of Single Beds" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |            |4           |2020      |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Double Beds field as blank

  Given I am at Add Boat 1 page
  Then  I leave Double Beds field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter number of Double Beds" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |           |2020      |100         |15            |4                  |2000         |100         |SKM            |SKM Test Secription                      |


Scenario Outline: Submit page 1 with leaving Build Year field as blank

  Given I am at Add Boat 1 page
  Then  I leave Build Year field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Build Year" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |          |100         |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Boat Length field as blank

  Given I am at Add Boat 1 page
  Then  I leave Boat Length field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Length" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |            |15            |4                 |2000         |100         |SKM            |SKM Test Secription                      |


Scenario Outline: Submit page 1 with leaving Boat Capacity field as blank

  Given I am at Add Boat 1 page
  Then  I leave Boat Capacity field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Capacity" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |              |4                 |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Number Of Engines field as blank

  Given I am at Add Boat 1 page
  Then  I leave Number Of Engines field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Number Of Engines" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |                  |2000         |100         |SKM            |SKM Test Secription                      |

Scenario Outline: Submit page 1 with leaving Your Boat Name field as blank

  Given I am at Add Boat 1 page
  Then  I leave Your Boat Name field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Your Boat Name" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description                         |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |100         |               |SKM Test Secription                      |


Scenario Outline: Submit page 1 with leaving Boat Description field as blank

  Given I am at Add Boat 1 page
  Then  I leave Boat Description field as blank and give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the error message "Please enter Boat Description" should be displayed

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description   |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |1000        |SKM            |                   |

### Scenario Outline: Submit page 1 with invalid values for fields

####   Given I am at Add Boat 1 page
####   When I give invalid values for the fields "<Cabins>", "<Bathrooms>", "<Single Beds>",  "<Double Beds>", "<Boat Length>", "<Boat Capacity>",  "<Number Of Engines>"
####   And I give values for "<Your Boat Name>" and "<Boat Description>" fields
####   And I click on Next button
####   Then error message 'Please give valid value for Cabins' should be displayed for Cabins field
####   And error message 'Please give valid value for Bathrooms' should be displayed for Bathrooms field
####   And error message 'Please give valid value for Single Beds' should be displayed for Single Beds field
####   And error message 'Please give valid value for Double Beds' should be displayed for Double Beds field
####   And error message 'Please give valid value for Boat Length' should be displayed for Boat Length field
####   And error message 'Please give valid value for Boat Capacity' should be displayed for Boat Capacity field
####   And error message 'Please give valid value for Number Of Engines' should be displayed for Number Of Engines field

####   Examples:
####   |Cabins |Bathrooms |Single Beds |Double Beds |Boat Length |Boat Capacity |Number Of Engines |Your Boat Name |Boat Description                         |
####   |q      |w         |r           |h           |t           |y             |u                 |SKM            |Test Decsription                         |
####   |!      |@         |R$          |&           |#           |(             |@                 |SKM            |Test Decsription                         |

 Scenario Outline: Submit page 1 with valid values for fields

  Given I am at Add Boat 1 page
  Then  I give all other valid values "<Boat Type>""<Boat Manufacturer>""<Boat Model>""<Cabins>""<Bathrooms>""<Single Beds>""<Double Beds>""<Build Year>""<Boat Length>""<Boat Capacity>""<Number Of Engines>""<HP per Engine>""<Fuel Economy>""<Your Boat Name>""<Boat Description>"
  And   I click on Next button
  Then  the navigation to Add Boat Page 2 should happen

  Examples:
  |Boat Type |Boat Manufacturer |Boat Model |Cabins |Bathrooms |Single Beds |Double Beds |Build Year|Boat Length |Boat Capacity |Number Of Engines |HP per Engine|Fuel Economy|Your Boat Name |Boat Description   |
  |test type |testManufacturer  |testmodel  |6      |4         |4           |4           |2020      |100         |15            |4                 |2000         |5000        |SKM            |test Description   |

  



  
  