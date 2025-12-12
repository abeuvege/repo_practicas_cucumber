import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Abrir la aplicación
Given("I open the todo application", () => {
  cy.visit("https://todomvc.com/examples/react/dist/");
});

// Agregar una tarea
When("I add {string} to the list", (task) => {
  cy.get('[data-testid="text-input"]').type(`${task}{enter}`);
});

// Verificar que la tarea esté en la lista
Then("I should see {string} in the list", (task) => {
  cy.contains(task).should("exist");
});

// Marcar tarea como completada
When("I mark {string} as completed", (task) => {
  cy.contains(task).parent().find('[data-testid="todo-item-toggle"]').click();
});

// Verificar tarea completada
Then("{string} should be marked as completed", (task) => {
  cy.contains(task)
  .closest("li")
  .should("have.class", "completed");
});

// Desmarcar tarea completada
When("I unmark {string} as completed", (task) => {
  cy.contains(task).parent().find('[data-testid="todo-item-toggle"]').click();
});

// Verificar tarea no completada
Then("{string} should not be marked as completed", (task) => {
  cy.contains(task)
  .closest("li")
  .should("not.have.class", "completed");
});

// Editar una tarea
When("I edit the task {string} to {string}", (oldTask, newTask) => {
  cy.contains(oldTask).dblclick();
  cy.get('.view > .input-container > [data-testid="text-input"]')
    .clear()
    .type(`${newTask}{enter}`);
});

// Borrar una tarea
When("I delete the task {string}", (task) => {
  cy.contains(task).parent().trigger("mouseover");
  cy.contains(task)
    .parent()
    .find("button.destroy")
    .click({ force: true });
});

// Verificar que no esté en la lista
Then("{string} should not be in the list", (task) => {
  cy.contains(task).should("not.exist");
});

// Filtrar tareas
When("I filter tasks to {string}", (filter) => {
  const filters = {
    "All": 1,
    "Active": 2,
    "Completed": 3,
  };
  cy.get(`[data-testid="footer-navigation"] > :nth-child(${filters[filter]}) > a`).click();
});
