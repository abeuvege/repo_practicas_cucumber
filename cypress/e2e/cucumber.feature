Feature: Pruebas de la página TODO

  Background:
    Given I open the todo application

  Scenario: Añadir tarea
    When I add "comprar el pan" to the list
    Then I should see "comprar el pan" in the list

  Scenario: Marcar tarea como completada
    When I add "comprar el pan" to the list
    And I mark "comprar el pan" as completed
    Then "comprar el pan" should be marked as completed

  Scenario: Desmarcar tarea completada
    When I add "comprar el pan" to the list
    And I mark "comprar el pan" as completed
    And I unmark "comprar el pan" as completed
    Then "comprar el pan" should not be marked as completed

  Scenario: Editar tarea
    When I add "comprar el pan" to the list
    And I edit the task "comprar el pan" to "ir a por cafe"
    Then I should see "ir a por cafe" in the list

  Scenario: Borrar tarea
    When I add "ir a por cafe" to the list
    And I delete the task "ir a por cafe"
    Then "ir a por cafe" should not be in the list

  Scenario: Filtrar tareas
    When I add "comprar el pan" to the list
    And I mark "comprar el pan" as completed
    And I add "ir a por cafe" to the list
    And I mark "ir a por cafe" as completed
    And I add "curso" to the list
    And I filter tasks to "Completed"
    And I filter tasks to "Active"
    And I filter tasks to "All"