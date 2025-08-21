Feature: Delivery Management

  Scenario: Register a delivery from a supplier
    Given a supplier exists with id "S001"
    And the following products exist:
      | id    | name         |
      | P001  | Widget A     |
    When I register a delivery from supplier "S001" with the following products:
      | productId | quantity |
      | P001      | 100      |
    Then the delivery should be recorded successfully

  Scenario: Link a delivery to an order detail
    Given an order detail exists with id "OD001"
    And a delivery exists with id "D001"
    When I link delivery "D001" to order detail "OD001"
    Then the order detail delivery should be created
