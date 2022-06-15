import shell from "shelljs";
import chalk from "chalk";
import { prompt } from "inquirer";
import prompts from "../../prompts";
import { log } from "../../utils";
import { request } from "../../utils";

// Body interface
interface Body {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Signup function
const signup = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    // Construct data body
    const body: Body = {
      username,
      email,
      password,
      confirmPassword,
    };

    // Make request
    request
      .noauth()
      .post("/auth/create", body)
      .then(({ data }) => {
        log(
          chalk.green(
            `${data?.message} - Please login using your credentials now by using the "hit login" command`
          )
        );
        process.exit(0);
      })
      .catch(({ response }) => {
        log(
          chalk.red(
            `Failed! - ${response?.data?.message || "Something went wrong!"}`
          )
        );
        process.exit(1);
      });
  } catch (error) {
    log(chalk.red("Something went wrong!"));
    process.exit(1);
  }
};

// Default export
const initiateSignup = () => {
  prompt(prompts.auth.register)
    .then((response) =>
      signup(
        response.username,
        response.email,
        response.password,
        response.confirmPassword
      )
    )
    .catch((error) => {
      if (error.isTtyError) {
        log(chalk.red("Oops! Hit List is not supported here 😔"));
      } else {
        log(chalk.red("Something went wrong!"));
      }
    });
};

export default initiateSignup;
