const express = require("express");
const bodyParser = require("body-parser");
const FormData = require("form-data");
const fetch = require("node-fetch");
const { client_id, redirect_uri, client_secret } = require("./config");
const { Octokit } = require("@octokit/rest");

const config = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));
app.use(bodyParser.urlencoded({ extended: false }));

// Enabled Access-Control-Allow-Origin", "*" in the header so as to by-pass the CORS error.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/authenticate", (req, res) => {
  const { code } = req.body;
  console.log("CLIENT ID :: ",client_id);
  console.log("client_secret ID :: ",client_secret);
  console.log("redirect_uri ID :: ",redirect_uri);
  console.log("CLIENT ID :: ",client_id);
  const data = new FormData();
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);
  data.append("code", code);
  data.append("redirect_uri", redirect_uri);

  // Request to exchange code for an access token
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    body: data,
  })
    .then((response) => response.text())
    .then((paramsString) => {
      let params = new URLSearchParams(paramsString);
      const access_token = params.get("access_token");
      console.log("ACCESS TOKEN FROM API :: ",access_token);
      const octokit = new Octokit({auth:access_token})
      // localStorage.setItem("accessToken", access_token)
    octokit.rest.repos.listForAuthenticatedUser().then(res => console.log("PUBLIC REPOSITORES :: ",res.data));
    
    // octokit.rest.apps.addRepoToInstallationForAuthenticatedUser({
    //   installation_id:1,
    //   repository_id:'534061894',
    // })
    // .then(res => console.log("RESPONSE OF INSTALLING APP",res))
    // .catch((error) => {
    //   console.log("ERROR WHILE INSTALLING APPLICATION :: ",error);
    //   return res.status(400).json(error);
    // });;

    // octokit.request('GET /user/installations', {}).then(res => console.log("res of app installation :: ",res))
      // Request to return data of a user that has been authenticated
      return fetch(`https://api.github.com/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
});
  
app.get("/", (req, res) => {
  res.status(200).json("HELLO WORLD!")
})

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
