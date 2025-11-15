const fs = require("fs").promises;

fs.readFile("../input.txt", "utf8")
    .then((data) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(data), 1000);
        });
    })
    .then((data) => {
        return fs.writeFile("../output-promise.txt", data);
    })
    .then(() => {
        console.log("File copied successfully using Promises!");
    })
    .catch((err) => {
        console.error("Error:", err);
    });
