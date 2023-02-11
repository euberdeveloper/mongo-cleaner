import inquirer from 'inquirer';

/**
 * Asks a confirmation, whether the user is sure to clean the databases or not.
 * @param ask If anything will be asked or not.
 * @returns A promise to a boolean, consisting in the response of the user (or true if ask was set to false).
 */
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
