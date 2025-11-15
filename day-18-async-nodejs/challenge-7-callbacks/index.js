const fs = require("fs");

fs.readFile("source.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    setTimeout(() => {
        console.log("Read operation completed");
        console.log("File content:", data);
    }, 1000); 
});
