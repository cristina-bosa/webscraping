const fs = require('fs')

fs.readFile('./jsons/nike.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return
    }
    const nikeElements = JSON.parse(jsonString);
    console.log(nikeElements);
})


