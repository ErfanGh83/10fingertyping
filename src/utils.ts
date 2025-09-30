import { keysList } from "../public/api";

const compareKeys = (key1: string, key2: string) => {

    return key1 === key2
}

const returnNextCharByIndex = (context: string, index: number) => {

    if (index < 0 || index >= context.length) return null;
    return context[index];
};

const isUsingAlt = (char: string) => {

    for(let i = 0; i < keysList.length; i++) {
        for(let j = 0; j < keysList[i].length; j++) {
            if(char === keysList[i][j].alt) {
                return true
            }
        }
    }

    return false
}


export { compareKeys, returnNextCharByIndex, isUsingAlt }