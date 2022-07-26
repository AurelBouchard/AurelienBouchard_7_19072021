# The Coffee Place

The Coffee Place is the final student project of the Open Classrooms program.

The aim is to create from scratch a working social network. Tha stack is free of choice execpt the dabase must be SQL.

![Project GIF Demo](img/demo.gif)

Contents
========

 * [1. Scenario](#scenario)
 * [2. Live demo](#demo)
 * [3. Stack](#stack)
 * [4. Installation](#setup)
 * [5. Usage](#usage)
 * [6. Folder](#folder)
 * [7. Upcoming changes](#upcoming)
 * [8. Contact](#contact)
 * [9. License](#license)

------------
<a name="scenario"></a>
## 1. Scenario

The fake firm "Groupomania" want to set up a private social network restricted to their employees.

The product is a SPA (single page application) with a mobile first UI and it's obvioulsly responsive.

Some neede features :
+ Users can easily create an account
+ The app is mobile friendly
+ Users can post text
+ Users can post comments


<br />


<a name="demo"></a>
## 2. Live demo

Available soon ...


<br />


<a name="stack"></a>
## 3. Stack

- **Front-end** :
    * [*React*](https://reactjs.org "reactjs.org")
    * [*Tailwind*](https://tailwindcss.com "tailwindcss.com")
    * [*Material Tailwind*](https://www.material-tailwind.com/ "www.material-tailwind.com")
    * [*Tippy.js*](https://atomiks.github.io/tippyjs/ "Tippy.js")
    * [*React Router*](https://reactrouter.com/docs/en/v6 "React Router")
    * [*Axios*](https://axios-http.com "Axios")
    * [*Formik*](https://formik.org/ "formik.org")

- **Back-end** :
    * [*Node*](https://nodejs.org/en/ "nodejs.org")
    * [*Express*](https://expressjs.com/ "expressjs.com")
    * [*Sequelize*](https://sequelize.org// "sequelize.org")

- **Dev tools** :
    * [*Vite*](https://vitejs.dev/ "vitejs.dev")
    * *autoprefixer* + *postcss* under the hood


<br />


<a name="setup"></a>
## 4. Installation


### Clone the repo and install:

- #### 1. in backend folder:
`yarn install`

- #### 2. in frontend folder:
`yarn install`

### Run the servers:
> **Warning** <br />
> Servers need open ports to listen to ! <br />
> Front listen to 3000. <br />
> Back listen to 4000. <br />
> If any of those ports are already in use, the server listen to the next (eg: 3001 and 4001). <br />
> Initial ports can be changed in .env file. <br />

- #### 1. in backend folder:
`node server`

> **No SQL engine** <br />
> An error will occure because the SQL database is off! <br />
> I will fix it soon. <br />

- #### 2. in frontend folder:
`yarn start`


<br />


<a name="usage"></a>
## 5. Usage

+ ### create account

+ ### connect

+ ### new post
+ ### new comment
+ ### user profile
+ ### find user


<br />


<a name="folder"></a>
## 6. Folder



### File Structure
<pre>
the_coffee_place
├── tcp-backend
│   ├── app.js
│   ├── cloud_sql_proxy
│   ├── controllers
│   │   ├── member.js
│   │   ├── post.js
│   │   └── user.js
│   ├── db_management
│   │   ├── connection.js
│   │   ├── sequelize.js
│   │   └── setup.js
│   ├── .env
│   ├── middleware
│   │   └── auth.js
│   ├── models
│   │   ├── Comm.js
│   │   ├── Like.js
│   │   ├── Post.js
│   │   └── User.js
│   ├── node_modules
│   │   └── a lot ...
│   ├── package.json
│   ├── routes
│   │   ├── member.js
│   │   ├── post.js
│   │   └── user.js
│   ├── server.js
│   └── yarn.lock
└── tcp-frontend
    ├── .gitignore
    ├── index.html
    ├── node_modules
    │   └── a lot ...
    ├── package.json
    ├── postcss.config.js
    ├── public
    ├── README.md
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   │   ├── back-transparent.png
    │   │   ├── coffee-cup-192.png
    │   │   ├── favicon.ico
    │   │   ├── icon
    │   │   │   ├── thumbs-down.png
    │   │   │   ├── thumbs-up.png
    │   │   │   └── warning.png
    │   │   ├── icon-above-font.png
    │   │   ├── icon-above-font.svg
    │   │   ├── icon-left-font-monochrome-white.svg
    │   │   └── icon.png
    │   ├── components
    │   │   ├── AccessToWall.jsx
    │   │   ├── Commentor.jsx
    │   │   ├── Connection.jsx
    │   │   ├── CreateAccount.jsx
    │   │   ├── DbError.jsx
    │   │   ├── Headings.jsx
    │   │   ├── Members.jsx
    │   │   ├── Moderator.jsx
    │   │   ├── NotFound.jsx
    │   │   ├── Post.jsx
    │   │   ├── ProfileEditor.jsx
    │   │   ├── Redactor.jsx
    │   │   ├── ScrollToTop.jsx
    │   │   ├── Settings.jsx
    │   │   ├── ShowProfile.jsx
    │   │   ├── TCP_button.jsx
    │   │   ├── TCP_input.jsx
    │   │   ├── TCP_navbar.jsx
    │   │   └── Wall.jsx
    │   ├── main.jsx
    │   ├── style
    │   │   ├── fonts
    │   │   │   ├── Caveat-Medium.ttf
    │   │   │   └── Exo2-Medium.otf
    │   │   └── index.css
    │   └── utils
    │       ├── useGet.jsx
    │       ├── usePosts.jsx
    │       └── useUsersLikes.jsx
    ├── tailwind.config.js
    ├── vite.config.js
    ├── yarn-error.log
    └── yarn.lock
</pre>


<br />


<a name="upcoming"></a>
## 7. Upcoming changes
+ fix SQL database issue
+ color theming
+ add dark mode


<br />


<a name="contact"></a>
## 8. Contact
Author : [AurelBouchard](mailto:au.bouchard@gmail.com)


<br />


<a name="licence"></a>
## 9. Licence
MIT

