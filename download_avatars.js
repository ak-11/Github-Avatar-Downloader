"use strict";
const config = require ("./config")
const request = require("request");
const http = require("https");
const fs = require("fs");

const GITHUB_USER = config["username"];
const GITHUB_TOKEN = config["token"];

console.log("Welcome to the Github Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  let requestURL = `https:// ${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  request.get({
    url: requestURL,
    headers: {
      "User-Agent": "Me"
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body)
      cb(data);
      console.log(cb(data));
    } else {
      console.log(error);
      console.log(response);
    }
});
}
getRepoContributors("jquery", "jquery", function (url) {
  url.forEach(function (element) {
    console.log(element["avatar_url"]);
  })
})
  // request.get("https://github.com/jquery/jquery")
  // .on("error", function (err) {
  //  console.log(err);
  // })
  // .on("response", function (response) {
  //  console.log(response.statusMessage, response.headers["content-type"]);
  // })
  // .pipe(fs.createWriteStream("./avatar.jpg"))
// function callback(err, result) {

// }
// request.get("https://github.com/jquery/jquery")
//   .on("error", function (err) {
//    console.log(err);
//   })
//   .on("response", function (response) {
//    console.log(response.statusMessage, response.headers["content-type"]);
//   })



