

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
    //cy.request('POST', 'http://localhost:3003/api/users',thaoUser)
    cy.createUser(thaoUser)

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

  const newBlogPost={
    title:'Testing with Cypress',
    author:'TTNT',
    url:'https://docs.cypress.io/api/commands/'
  }

  describe('When logged in as Thao',() => {

    beforeEach(function(){
      //!login user
      cy.login({
        username:thaoUser.username,
        password:thaoUser.password
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

    describe('and when there is an exist blog post',() => {

      beforeEach(() => {
        //!Add new post to blog list
        cy.createBlog(newBlogPost).then(res => console.log(res))
      })

      it('user can like a blog',() => {

        cy.get('.blogPost #toggleBtn').click() //* open blog post detail

        cy.get('#likeBtn').click() //* like the post

        cy.get('.blogPost #likes').should('contain','1')
      })

      it('user can delete their own post',() => {

      })

      describe('and when there are more blog posts from more than one user',() => {
        const paulUser ={ username:'paulDenman',password:'paulDenman',name:'Paul Denman' }


        it('cant delete other creator post',() => {
          //* create the second user
          cy.createUser(paulUser)

          //* login as a second user, and try to delete the only post there
          cy.login({ username: paulUser.username, password: paulUser.password })

          cy.get('.blogPost #toggleBtn').click() //* open blog post detail

          //* find remove btn -> there should not be remove btn
          cy.get('.blogPost #removeBtn').should('have.length',0)
        })

        it('only the creator of the post can delete their blog',() => {

          cy.get('.blogPost #toggleBtn').click() //* open blog post detail

          cy.get('.blogPost #removeBtn').click() //* click remove btn --> it should be there

          cy.on('window:confirm',() => true) //*confirm remove

          cy.get('#blogList').should('not.contain',newBlogPost.title).and('not.contain',newBlogPost.author)

        })

      })

    })


  })



})