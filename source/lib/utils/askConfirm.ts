import * as inquirer from 'inquirer';

export async function askConfirm(ask?: boolean): Promise<boolean> {
    return ask
        ? (
              await inquirer.prompt({
                  name: 'clean',
                  message: 'Are you sure that you want to clean MongoDB?',
                  type: 'confirm',
                  default: false
              })
          ).clean
        : true;
}
