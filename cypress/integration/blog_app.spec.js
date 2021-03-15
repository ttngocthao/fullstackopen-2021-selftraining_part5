

describe('Blog app',function()  {
  const thaoUser = {
    username:'thaotruong',
    password: 'This is my password',
    name:'Thao Truong'
  }
  beforeEach(function(){
    //! reset database
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    //!create user
    cy.request('POST', 'http://localhost:3003/api/users',thaoUser)

    cy.visit('http://localhost:3000')

    // //!create blog post for thao user
    // cy.request('POST','https://localhost:3003/api/blogs')
  })

  it('front page can be opened',function()  {
    cy.contains('Blog')
  })



  describe('Login',() => {

    it('displays login form by default',function(){
      cy.get('#username')
      cy.get('#password')
      cy.get('#loginBtn')
    })

    it('succeeds with correct credentials',function(){

      cy.get('#username').type(thaoUser.username)
      cy.get('#password').type(thaoUser.password)
      cy.get('#loginBtn').click()

      cy.contains(`${thaoUser.username} logged in `)
    })

    it('fails with wrong credentials',() => {
      cy.get('#username').type(thaoUser.username)
      cy.get('#password').type('wrongPassword')
      cy.get('#loginBtn').click()

      // cy.contains('invalid username or password')
      cy.get('#notification')
        .should('contain','invalid username or password')
        .and('have.css','color','rgb(255, 0, 0)')

      cy.get('html').should('not.contain',`${thaoUser.username}`)

    })
  })

  describe('When logged in',() => {
    const newBlogPost={
      title:'Testing with Cypress',
      author:'TTNT',
      url:'https://docs.cypress.io/api/commands/'
    }
    beforeEach(function(){
      //!login user
      cy.request('POST', 'http://localhost:3003/api/login',{ username:thaoUser.username,password:thaoUser.password }).then(res => {
        localStorage.setItem('loggedBlogappUser',JSON.stringify(res.body))
        cy.visit('http://localhost:3000')
      })

    })

    it('a blog can be created',() => {
      //open create new blog form
      cy.get('#toggleBtn').click()

      cy.get('input[name="title"]').type(newBlogPost.title)
      cy.get('input[name="author"]').type(newBlogPost.author)
      cy.get('input[name="url"]').type(newBlogPost.url)
      cy.get('#createNewBlogBtn').click()

      cy.get('#blogList').should('contain',newBlogPost.title).and('contain',newBlogPost.author)
    })

  })


})