## Twitter replica

This project is a replica of Twitter written in MERN stack. It has all the main features of this portal. The project is under development and it may contain errors.

- [AWS Deploy](http://35.158.105.176/) - EC2 instance, runs 24/7, no ssl certificate.
- [Heroku Deploy](https://twitterreplica.herokuapp.com/) - need more time to load website(Dyno sleeping), provides ssl certificate.

Video from the status of the project as of 22/08/20: [Youtube link](https://www.youtube.com/watch?v=ZYlMCxW5iRI&)

#### Running:

If you want to run the project on your own machine in the root directory, add the config.env file and put such variables in it:

- NODE_ENV = development
- PORT = 5000
- DATABASE = link to mongoDB database
- DATABASE_PASSWORD = db password
- JWT_SECRET = examplesecret
- JWT_EXPIRES_IN = 1d
- JWT_COOKIE_EXPIRES_IN = 3
- EMAIL_USERNAME = mailtrap username
- EMAIL_PASSWORD = mailtrap password
- EMAIL_HOST = mailtrap host
- EMAIL_PORT = mailtrap port
- EMAIL_FROM = email from which you want to send messanges to website users
- AWS_SECRET_ACCESS_KEY = AWS secret key for S3 image storage
- AWS_ACCESS_KEY_ID = AWS secret key id
- AWS_REGION = propably eu-central-1

Then install both server and client side dependencies and run the development server with: npm run dev

#### Working funcionalities:

- Responsive pages: Explore page, Search page, Login page, ResetPassword page, MainContent(wall for auth users), SingleTweet page, Profile page, Edit profile page
- Registration/login/forget&reset password funcionalities
- Follow/Unfollow users funcionality
- Rendering tweets from people that you follow and getting more of them on scrolling
- Commenting/Retweeting/Liking tweets or undoing it
- Finding links/hashtags/@users in tweets
- Displaying photos in fullscreen page
- Removing your own tweets
- Uploading images/gifs, adding emojis to tweets
- Displaying the activity of a user in his/her profile
- Profile Editing
- Searching for users

#### Things I learned during this project:

- How to better organize the code,
- Work with 3rd party components such as (emoji-mart, react-easy-emoji, react-textarea-autosize, react-giphy-searchbox, react-process-string, react-infinite-scroll-component, react-circular-progressbar),
- Work more efficiently with Redux (loadings, more complex structure),
- I have deepened my knowledge of express and node (I work on the backend at least twice as efficiently as before)
- How to deploy the app with AWS EC2 instance
