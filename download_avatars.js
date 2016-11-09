"use strict";
const config = require ("./config")
const request = require("request");
const fs = require("fs");

const GITHUB_USER = config["username"];
const GITHUB_TOKEN = config["token"];

const owner = process.argv[2];
const repo = process.argv[3];

const getRepoContributors = function (repoOwner, repoName, cb) {
  const requestURL = `https:// ${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  request.get({
    url: requestURL,
  }, function (error, response, body) {
    if (error)  {
      throw error;
    }
    if (response.statusCode === 200)  {
      const data = JSON.parse(body)
      cb(data);
    }
  });
};

const downloadImageByURL = function (url, filepath)  {
  request.get(url)
     .on("error", function (error, data) {
       throw error;
     })
     .pipe(fs.createWriteStream(filepath));
};

console.log("Welcome to the Github Avatar Downloader!");

getRepoContributors(owner, repo, function (url) {
  url.forEach(function (element) {
    const avatar_url = element.avatar_url;
    const filepath = `./avatars/${element.login}.jpg`;
    downloadImageByURL(avatar_url, filepath);
  })
});
