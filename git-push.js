const { Command } = require('commander');
const inquirer = require('inquirer')
const { exec, spawn, execSync } = require('child_process');

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

const commitScope = () => {
  const scopes = [
    '@ui/gd-antd',
    '@ui/gd-bu',
    'website'
  ]
  return scopes.map(scope => ({name: scope, value: scope}))
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
    choices: commitScope(),
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

const execCMD = (shell) => {
  return spawn(shell, {stdio:'inherit', shell: true})
}

program
  .command('push')
  .description('git push')
  .action(async () => {
    const typeOptions = await commitTypeInquirer()
    const scopeOptions = await commitScopeInquirer()
    const commitmsg = await commitMsgInquirer()
    execSync('git add .')
    execSync(`git commit -m '${typeOptions.type}(${scopeOptions.scope}): ${commitmsg.msg}'`)
    // console.log(r);
  });

  

program.parse(process.argv)
