const fs = require('fs')
const { execSync } = require('child_process');
const { Command } = require('commander');
const inquirer = require('inquirer')

const program = new Command();

const commitType = () => {
  const types = [
    'chore',
    'feat',
    'fix',
    'style',
    'test',
    'docs',
    'ci',
    'build',
    'perf',
    'refactor',
    'revert',
  ];
  return types.map(type => ({name: type, value: type}))
}

const commitScope = (path) => {
  const names = []
  function packageNames(path) {
    const dirs = fs.readdirSync(path)
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      if (!fs.existsSync(`${path}/${dir}/package.json`)) {
        packageNames(`${path}/${dir}`)
      } else {
        const {name} = require(`${path}/${dir}/package.json`)
        names.push(name)
      }
    }
  }
  packageNames(path)
  return names.map(scope => ({name: scope, value: scope}))
}


const commitTypeInquirer = async () => {
  return inquirer.prompt({
    type: 'list',
    name: 'type',
    choices: commitType(),
    message: 'Please pick a commit type:',
    validate: v => !!v
  })
}

const commitScopeInquirer = async () => {
  return inquirer.prompt({
    type: 'list',
    name: 'scope',
    choices: commitScope('./packages'),
    message: 'Please pick a commit scope:',
    validate: v => !!v
  })
}

const commitMsgInquirer = async () => {
  return inquirer.prompt({
    type: 'input',
    name: 'msg',
    message: 'Please fill in commit message:',
    validate: v => !!v
  })
}

const execSyncCMD = (shell) => {
  return execSync(shell, {stdio:'inherit'})
}

program
  .command('push')
  .description('git push')
  .action(async () => {
    const typeOptions = await commitTypeInquirer()
    const scopeOptions = await commitScopeInquirer()
    const commitmsg = await commitMsgInquirer()
    execSyncCMD('git add .')
    execSyncCMD(`git commit -m '${typeOptions.type}(${scopeOptions.scope}): ${commitmsg.msg}'`)
  });


program.parse(process.argv)
