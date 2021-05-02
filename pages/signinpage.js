"use strict";
const base64 = require("base-64");
require("superagent");
require("ejs");
require("ajax");
let signinEL = document.getElementById("signin");
console.log("FILE REACHED");
//let signupEL = document.getElementById("signup");

signinEL.addEventListener("submit", (e) => signInHandler(e));

function signInHandler(e) {
  e.preventDefault();
  console.log("REACHED");
  let pw = e.target.password.value;
  let un = e.target.username.value;
  let cred = `Basic ${un}:${pw}`;
  let cred_encoded = base64.encode(cred);
  req.headers.authorization = cred_encoded;
  console.log(cred_encoded);
}
