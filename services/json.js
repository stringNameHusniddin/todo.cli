import os from 'os'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';


const filePath = path.join(os.homedir(), 'todo_cli.json')

const writeJson = async (do_, title) =>{
    let data = {}
    let array = []

    if(await isFile(filePath)){
        const file = await fs.promises.readFile(filePath)
        array = JSON.parse(file)
    }

    data['do'] = do_
    data['title'] = title
    data["id"] = uuidv4()

    

    array.push(data)

    await fs.promises.writeFile(filePath, JSON.stringify(array))

}

const delJson = async num =>{
    if(await isFile(filePath)){
        const file = await fs.promises.readFile(filePath)
        let array = JSON.parse(file)
        let massiv = array.filter(mal => mal.id != array[num].id)

        fs.promises.writeFile(filePath, JSON.stringify(massiv))
    }
}

const isFile =async path=>{
    try {
        await fs.promises.stat(path)
        return true
    } catch (error) {
        return false
    }
}

export {writeJson, isFile, delJson}