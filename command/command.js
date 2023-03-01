const getCommand = argv => {
    let commands = {}
    const [nodeLocation, fileLocation, ...rest] = argv
    rest.forEach((el, i, array) => {
        if (el.charAt(0) == "-") {
            if (array[i + 1] != "-" && el.charAt(1) == 't' || array[i + 1] != "-" && el.charAt(1) == 'r') {
                commands[el.slice(1)] = array[i + 1]
            } else if (array[i + 1] != "-" && el.charAt(1) === 'd') {
                let txt = ''
                let index = i + 1
                while (array[index].charAt(0) != '-' && index < array.length-1) {
                    txt += ` ${array[index]}`
                    index += 1
                }
                if(array[index].charAt(0) == '-'){
                    commands[el.slice(1)] = txt.trimStart()
                }else if(index == array.length-1){
                    txt += ` ${array[index]}`
                    commands[el.slice(1)] = txt.trimStart()
                }
            } else if (el.charAt(1) == 'h' || el.slice(1) == "sh") {
                commands[el.slice(1)] = true
            }
        }
    });
    return commands
}

export { getCommand }