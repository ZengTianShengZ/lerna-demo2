

const hooks = {}

if (!process.env.RELEASE) {
  hooks['commit-msg'] = 'commitlint -e $GIT_PARAMS'
} 

module.exports = {
  hooks
}

