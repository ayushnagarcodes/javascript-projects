const fs = require("fs");
const crypto = require("crypto");
const readline = require("readline");
const { log } = require("console");
const stream = fs.createReadStream("./database.csv");
const reader = readline.createInterface({ input: stream });

let data = [];

reader.on("line", row => {
    data.push(row.split(", "));
});

reader.on("close", () => {
    // Hashed data
    let hashedData = data.map(line => {
        return [line[0], line[1], getHash(line[2]), line[3]].join(", ");
    });
    hashedData.splice(0, 1, data[0].join(", "));

    writeFile("hash_database", hashedData);
    console.log("Hashed data!")

    // Filtered data
    let filteredData = data.filter(line => {
        if (!line.includes("-"))  {
            return line;
        }
    });
    filteredData.forEach((line, index) => {
        if (index > 0) {
            line[0] = index.toString();
            line[2] = getHash(line[2]);
        }
        filteredData[index] = filteredData[index].join(", ")
    });

    writeFile("filtered_database", filteredData);
    console.log("Filtered data!")
});

function getHash(text) {
    const hash = crypto.createHash("sha256").update(text).digest("hex")
    return hash;
}

function writeFile(file, data) {
    fs.writeFile(`./${file}.csv`, data.join("\n"), (error) => {
        if (error) console.log(error);
    });
}
