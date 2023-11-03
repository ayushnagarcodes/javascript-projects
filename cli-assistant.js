const [, , ...arguments] = process.argv;
const { access, mkdir, rmdir, stat, readdir } = require("node:fs/promises");

async function checkAccess(dir) {
    const fileName = dir.slice(dir.lastIndexOf("/") + 1);
    try {
        await access(dir);
        console.log(`The file ${fileName} exists!`);
    } catch (err) {
        console.log(`The file ${fileName} doesn't exist`);
    }
}

async function createDir(dir) {
    await mkdir(dir, { recursive: true });
    dir.includes("/")
        ? console.log(`The folders ${dir} were created!`)
        : console.log(`The folder ${dir} was created!`);
}

async function removeDir(dir) {
    try {
        await rmdir(dir, { recursive: true });
        dir.includes("/")
            ? console.log(
                  `The folder ${dir.split("/")[0]} in ${
                      dir.split("/")[1]
                  } folder was deleted!`
              )
            : console.log(`The folder ${dir} was deleted!`);
    } catch (err) {
        console.log(`This ${dir} folder doesn't exist!`);
    }
}

async function checkFolder(dir) {
    try {
        const stats = await stat(dir);
        if (stats.isFile()) console.log(`The ${dir} is not a folder!`);
        else if (stats.isDirectory()) console.log(`The ${dir} is a folder!`);
    } catch (err) {
        console.log("It seems that some specified files don't exist!");
    }
}

async function displaySize(dir) {
    const dirArr = dir.split("-/");
    let totalSize = 0;

    for (const item of dirArr) {
        try {
            const stats = await stat(item);
            let size = stats.size;
            totalSize += size;

            console.log(
                `Size of ${item}: ${
                    size > 1024
                        ? (size / 1024).toFixed(2) + " kilobytes"
                        : size + " bytes"
                }`
            );
        } catch (err) {
            console.log("It seems that some specified files don't exist!");
            break;
        }
    }

    if (totalSize)
        console.log(
            `The total size of the specified files is ${
                totalSize > 1024
                    ? (totalSize / 1024).toFixed(2) + " kilobytes"
                    : totalSize + " bytes"
            } bytes`
        );
}

async function showContent(dir) {
    try {
        const files = await readdir(dir);
        for (const file of files) {
            console.log(file);
        }
    } catch {
        console.log("It seems that the specified directory doesn't exist!");
    }
}

arguments.forEach((item) => {
    if (item.startsWith("--exist=")) {
        checkAccess(item.split("=")[1]);
    } else if (item.startsWith("--create=")) {
        createDir(item.split("=")[1]);
    } else if (item.startsWith("--remove=")) {
        removeDir(item.split("=")[1]);
    } else if (item.startsWith("--isFolder=")) {
        checkFolder(item.split("=")[1]);
    } else if (item.startsWith("--size=")) {
        displaySize(item.split("=")[1]);
    } else if (item.startsWith("--content")) {
        item.includes("=") ? showContent(item.split("=")[1]) : showContent(".");
    }
});
