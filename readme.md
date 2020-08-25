## Twitter replica

This project is a replica of Twitter written in MERN stack. It has all the main features of this portal. The project is under development and its test version may contain errors.

Video from the status of the project as of 22/08/20: [Youtube link](https://www.youtube.com/watch?v=ZYlMCxW5iRI&)

#### Running

If you want to run the project on your own machine in the root directory, add the config.env file and put such variables as config.env in it:

- NODE_ENV = development
- PORT = 5000
- DATABASE = link to mong database
- DATABASE_PASSWORD = db password
- JWT_SECRET = examplesecret
- JWT_EXPIRES_IN = 1d
- JWT_COOKIE_EXPIRES_IN = 5
- EMAIL_USERNAME = mailtrap username
- EMAIL_PASSWORD = mailtrap password
- EMAIL_HOST = mailtrap host
- EMAIL_PORT = 2525
- EMAIL_FROM = email from which you want to send messanges to website users
- AWS_SECRET_ACCESS_KEY = AWS secret key
- AWS_ACCESS_KEY_ID = AWS secret key id
- AWS_REGION = propably eu-central-1

Then install both server and client side dependencies and run the development server with: npm run dev

#### Things I learned during this project:

- Better organize the code,
- Work with 3rd party components such as (emoji-mart, react-easy-emoji, react-textarea-autosize, react-giphy-searchbox, react-process-string, react-infinite-scroll-component, react-circular-progressbar),
- Work more efficiently with Redux (loadings, more complex structure),
- I have deepened my knowledge of express and node (I work on the backend at least twice as efficiently as before)
