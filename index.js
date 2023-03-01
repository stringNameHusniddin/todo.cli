import { getCommand } from "./command/command.js"
import chalk from "chalk"
import { writeJson, isFile, delJson } from "./services/json.js"
import fs from 'fs'
import os from 'os'
import path from 'path'


const startCli = async () => {
    let argv = getCommand(process.argv)

    if (argv.h) {
        console.log(` ${chalk.green("help")}
   -t [word] to write title
   -d [text] to write do
   -r [num of do] to delete to do
   -sh to show to do list
   -h help`)
    }

    if(argv.t && argv.d){
        writeJson(argv.d, argv.t)
    }else if(!argv.t && argv.d){
        console.log('please write title')
    }else if(!argv.d && argv.t){
        console.log('please write do')
    }else if(!argv.d && !argv.t && !argv.h && !argv.sh && !argv.r){
        console.log('please write title and do')
    }

    if(argv.sh){
        const filePath = path.join(os.homedir(), 'todo_cli.json')
        let data = []
        if(await isFile(filePath)){
            let file = await fs.promises.readFile(filePath)
            data = JSON.parse(file)
            console.log(`${chalk.yellow('to do list:')}
${data.map(mal => `
${chalk.bgBlue(mal.title)} ${chalk.bgGreen(mal.do)}`)}`)
        }
    }

    if(argv.r){
        delJson(parseInt(argv.r))
    }
}
startCli()