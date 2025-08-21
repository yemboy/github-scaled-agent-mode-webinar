Feature: Security and Access Control

  Scenario: Prevent unauthorized order creation
    Given I am not authenticated
    When I attempt to create an order
    Then the request should be denied with a 401 Unauthorized error

  Scenario: Allow authorized user to create an order
    Given I am authenticated as a branch manager
    When I create an order
    Then the order should be created successfully
