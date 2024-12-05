const requiredFieldsValidator = (props) => {

    let required = []
    const falsyKeys = Object.entries(props).filter(([key, value]) => !value).map(([key]) => key)
    const falsyPhrases = falsyKeys.map(key => key.replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()))

    if (falsyPhrases.length > 0) {
        return `Kindly provide ${falsyPhrases.join(", ")}.`
    }

    return null

}


module.exports = requiredFieldsValidator;