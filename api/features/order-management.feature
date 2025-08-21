Feature: Order Management

  Scenario: Create a new order for a branch
    Given a branch exists with id "BR001"
    And the following products exist:
      | id    | name         | price |
      | P001  | Widget A     | 10.00 |
      | P002  | Widget B     | 20.00 |
    When I create an order for branch "BR001" with the following items:
      | productId | quantity |
      | P001      | 2        |
      | P002      | 1        |
    Then the order should be created successfully
    And the order should contain 2 order details

  Scenario: Retrieve orders for a branch
    Given a branch exists with id "BR001"
    And orders exist for branch "BR001"
    When I retrieve the orders for branch "BR001"
    Then I should receive a list of orders
