// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const localHostUrl = 'http://localhost:3000'
const baseRESTUrl = 'http://localhost:3003/api'

Cypress.Commands.add('login',({ username,password }) => {
  cy.request('POST', `${baseRESTUrl}/login`,{ username,password }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser',JSON.stringify(body))
    cy.visit(localHostUrl)
  })
})

Cypress.Commands.add('createBlog',({ title,author,url,likes }) => {
  cy.request({
    url:`${baseRESTUrl}/blogs`,
    method:'POST',
    body:{ title,author,url,likes },
    headers:{
      'Authorization':`Bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    }
  }).then(res => {
    console.log('from custom command',res)
    console.log('token',JSON.parse(localStorage.getItem('loggedBlogappUser')).token)
  })
  cy.visit(localHostUrl)

})

Cypress.Commands.add('createUser',({ username,password,name }) => {
  cy.request('POST',`${baseRESTUrl}/users`,{ username,password,name })
})