

console.log('===1===');

module.exports = {
  "hooks": {
    "commit-msg": "commitlint -e $GIT_PARAMS"
  }
}

