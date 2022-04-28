const loginPrompt = [
  {
    type: "input",
    name: "credential",
    message: "Username or email address : ",
  },
  {
    type: "password",
    name: "password",
    message: "Password : ",
  },
];

const signupPrompt = [
  {
    type: "input",
    name: "username",
    message: "Username : ",
  },
  {
    type: "input",
    name: "email",
    message: "Email address : ",
  },
  {
    type: "password",
    name: "password",
    message: "Password : ",
  },
  {
    type: "password",
    name: "confirmPassword",
    message: "Confirm Password : ",
  },
];

module.exports = { loginPrompt, signupPrompt };
