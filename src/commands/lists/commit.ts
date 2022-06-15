import chalk from "chalk";
import shell from "shelljs";
import { log } from "../../utils";

const commit = (message: string) => {
  const gitCommit = `git add . && git commit -am '${message.toString()}' && git push`;
  if (shell.exec(gitCommit).code === 0) {
    log(chalk.white(`${chalk.greenBright.bold("[SUCCESS]")} - ${message}`));
    process.exit(0);
  } else {
    log(
      chalk.white(
        `${chalk.redBright.bold("[FAILED]")} - Unable to make commit!`
      )
    );
    process.exit(1);
  }
};

export default commit;
