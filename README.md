## Login with Github
- Example of octokit, github authentication and app installtion for an user
- Under guidence of [Divya Khanani](https://github.com/DivyaKhanani) Thank You!
- An app that implements "Login with GitHub" functionality.

![Login Screen](https://user-images.githubusercontent.com/47652873/189103818-453c18f5-dd53-49a8-9284-8d99c6d095a5.png)

### Usage and Setup
- Clone this repo. Go into the root folder and run *yarn* to install the dependencies.
- Login to your Github account and create an OAuth app by following the steps provided here (https://docs.github.com/en/free-pro-team@latest/developers/apps/creating-an-oauth-app). Note: For this example, while creating the OAuth app, you can set your Homepage URL to http://localhost:3000/ and Authorization callback URL to http://localhost:3000/login if you are running your app locally.
- Create a .env file in the root folder and set these variables: 
  ```
  REACT_APP_CLIENT_ID=Your Client ID from Github
  REACT_APP_CLIENT_SECRET=Your Client Secret from Github
  REACT_APP_REDIRECT_URI=http://localhost:3000/login
  REACT_APP_PROXY_URL=http://localhost:5000/authenticate
  SERVER_PORT=5000
  ```
- Run *yarn start* to start the app
### Play with docker image
> We have added image on docker so that you don't need to download all the stuff
- Meanwhile please check letest image on my dockerhub repository [DockerHub](https://hub.docker.com/r/mineshp008/github-auth/)
- Take pull from docker hub
```
docker pull mineshp008/github-auth:latest
```
- To run docker image in local
```
docker-compose up
```
- If you want to run application on localhost port:3000 please execute below command
```
sudo docker run -d --network=host <image_name:version>
```

