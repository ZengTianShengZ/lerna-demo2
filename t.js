const fs = require('fs')

// const p = require('./package.json')

// console.log(p);

// const r = fs.readdirSync('./packages')
// console.log(r);
// console.log(process.cwd());

// const l = fs.readFileSync(`${process.cwd()}/packages`)
// console.log(l);

const scopes = (path) => {
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
  
  return names
}

const names = scopes(`${process.cwd()}/packages`)
console.log('==names==', names);