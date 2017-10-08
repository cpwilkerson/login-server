# React w/ JSON Web Tokens
by Christian Wilkerson
cpwilkerson72@gmail.com

on Github @ [cpwilkerson.github.io](http://cpwilkerson.github.io)
on Twitter @ cpwilkerson72


This presentation can be found on my github page under **login-server** project.

---

## What are we talking about?

* What/Why JSON Web Tokens?
* How to read them in a react component
* How to use them in a micro-service architecture

^ Just read the list.  We're telling them what we're going to tell them

---

### JSON Web Tokens

* Why?
  - Protect web applications from unauthorized access
  - Allows for a more pure REST api
  - Server no longer stores secret session data, the client does

^ Authentication is the name of the game here
  Pure REST api can be achieved
  Session data can be offloaded to the client instead of residing the server

---

### JSON Web Tokens

* JWTs are mainly used for **Authentication** and secure data transfer
* A complete description of JWTs can be found at [jwt.io](http://jwt.io)

---

## JSON Web Tokens

```javascript

// expires 2027-09-05
const jwtRecord = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkdhbmRhbGYiLCJpYXQiOjE1MDQ2NjIxMDAsImV4cCI6MTUwNDY2MjE2MH0.vl2Fv74qPuXdSN0ay5k-mWiOsrckfwejEBTsdyG8mc0'

```

![inline, right](JSON-Web-Token.png)

Example of a JWT that expires in 10 years

^ JWT Format dot separated
  * Header
      - Base64 encoded JSON Object
      - contains algorithm used
      - token type - typically 'JWT'

^  * Payload
    * Contains claims
      - Reserved Claims
      - Public Claims
      - Private Claims
    * The payload contains the data we actually care about. Like user name, and how long their authentication is good for.

^  * Signature
    * Combines the first two parts, a passphrase, and is encoded based on the encryption algorithm
    - Our example is HS256
    - HS256 Recommends a passphrase 32 characters or longer


---

## JSON Web Tokens

jwt.io has a debugger where you can test out JWTs, assuming you have the **_secret_** they were created with...

![inline](jwt.io-debugger.png)

Debugger

---

## JSON Web Tokens

### Secret?
The secret is the key to making JWTs work.  The secret is a string passphrase that is used to encode and decode the JWT into usable data.

**NOTE:** **NEVER** put the secret in your client code.

^ Mentioned a couple of times now, but the secret is what makes this work
  HS256 can be bruteforced if the secret is less than 256bits or 32 characters.

^ JWTs can support many algorithms.  Check out jwt.io for a current list
  

---

## JSON Web Tokens

Creating a JWT...

```javascript
import jwt from 'jsonwebtoken'

    ...

  if (req.body.password === 'password') {
    res.status = 200
    res.json({
              'token': jwt.sign({userName: req.body.user},
                       'MyJWTSecret',
                       {expiresIn: 60}),
              'url': LOGIN_URI
             })
  } else {
    ...
```

^ The important line here is the jwt.sign call

---

## JSON Web Tokens

```javascript
import jwt from 'jsonwebtoken'

  ...

  try {
    var verified = jwt.verify(req.body.token, 'MyJWTSecret')

    console.log('verified', verified)

    res.json({
      'authorized': true,
      'token': req.body.token,
      'userName': verified.userName
    })
  } catch (error) {
    console.log('authorize error',
                {
                  name: error.name,
                  message: error.message
                })

    res.json({
      'authorized': false,
      'token': '',
      'url': `${process.env.APP_URI}/login`,
      error
    })

  ...

```

^ The important line here is the jwt.verify call
  FYI...There is also a version that uses a callback

---
## JWTs in React

###Server works with JWTs, what about my React app?

--- 

## JWTs in React

* React App **never** deciphers the JWT

* React App **only** supplies the JWT to the server
  * Generally kept in local or session storage

^ If the React app deciphers the JWT, that means your secret passphrase is on 
  the client side.  That's a no no.

^ Our example keeps the jwt in local storage...persists across multiple tabs

---

## JWTs in React

Getting the JWT...

```javascript
    fetch(`${APP_URI}/authorize`, {
      method: 'POST',
      body: JSON.stringify({
        token: window.localStorage.getItem('login-server-token')
      }),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
      }
    })
```

^ look at the window.localStorage.getItem
  we are reading the token

---
## JWTs in React

Setting the JWT...

```javascript
export function loginResult (dispatch, data) {
  dispatch(initialize())

  return () => {
    window.location.href = data.url
    window.localStorage.setItem('login-server-token',
                                  data.token)
  }
}
```

^ Here we are writing the token to localStorage

---
## JWTs in React

First we see our login screen

![inline](login-screen.png)

^ When we run the login-server, this is what we'll see
  The CSS is Bootstrap - chosen for its mobile friendliness

---
## JWTs in React

Assuming we have provided the correct password

![inline](web-app.png)

^ Our protected application!
  Also, with Bootstrap

---
## JWTs in React

Now would be a good time to actually look at some code
* App one is a login server
* App two is our protected web app
* Both are constructed using both React and Redux

^ Let's take a walk through the code...at least the good parts
  In this example, the web-app JWT reading/writing takes place in localStorage
  inside of a Redux store
  * Anyone familiar with Redux?
  * Don't forget, this is all online so you can puzzle over it for as long as
    you like later

---
## Microservice Architecture

What is a Microservice Architecture?

* The idea of a microservice architecture is to separate
  concerns into small focused apps and/or services
* Examples
  * login-server
  * app-server
  * database-server
  * user registration server

^ Session and Local storage demand that the data comes from a single URI
  * Running on one computer means that each of my servers will be on different ports
  * This breaks the single URI
  * Next slide will explain what to do

---
## Microservice Archetecture

How do you get all those services behaving like one website?

* By using a reverse proxy like nginx
* I use nginx within a docker container
  * [nginx @ docker store](https://store.docker.com/images/nginx)
* More information on nginx can be found @ [nginx](https://www.nginx.com)
* More information can be found on Docker @ [Docker](http://www.docker.com)

^ nginx to the rescue!
  * explain how you have nginx setup and working in a docker container

---
## Microservice Architecture

I have nginx configured like so...
In a file located at...

` ~/nginx/conf.d/rev_proxy.conf `

```javascript
server {
    listen       80;
    server_name  localhost
                 192.168.1.13
                 ;
  
    # Pass to app server
    location / {
        proxy_pass   http://192.168.1.13:3001;
    }

    # Pass to login server
    location /login {
        proxy_pass   http://192.168.1.13:3000;
    }
}
```

^ Don't forget to update your local config with your current IP address

---
## Microservice Architecture

Assuming your docker and nginx configurations go off without a hitch
1. Start your nginx instance
2. Start your login server instance
3. Start your app server instance
4. In your browser, navigate to `http://localhost`
5. For devices external to your computer
  * you will need a server name or ip address.

---
## Micrsoservice Architecture

* If you haven't already, try it out

---
## Wrapping Up
  Before I finish...
  Any Questions?

---
## Wrapping Up

* JSON Web Tokens
  * We talked about what they are
  * We talked about why they are used

---
## Wrapping Up

**JWTs in React**

* We demonstrated how React
  - Reads/Writes JWTs from browser storage
  - How JWTs are **never** deciphered in the browser

---
## Wrapping Up

* Looked at how a reverse proxy like **nginx** can be used to
  make everything work together seamlessly

---

## Wrapping Up

* Where to go from here?
  * User Registration server
  * Maybe a timer component in the web-app to periodically check for authorization
  * Put funny memes in the slides 

---
## Thank You

### cpwilkerson.github.io



