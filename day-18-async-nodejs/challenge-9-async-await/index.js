const fs = require("fs").promises;

async function copyFileAsync() {
    try {
        const data = await fs.readFile("../input.txt", "utf8");

        await new Promise(resolve => setTimeout(resolve, 1000));

        await fs.writeFile("../output-async.txt", data);

        console.log("File copied successfully using async/await!");
    } catch (err) {
        console.error("Error:", err);
    }
}

copyFileAsync();
