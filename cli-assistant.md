# CLI Assistant

-   To get information about the presence or absence of the file, pass `--exist=filename` argument. For example: execute `node ./cli-assistant.js --exist=hello.js` in the command-line.

-   To create folders and subfolders in your current directory, pass `--create=foldername` or `--create=foldername/subfoldername` argument. For example: `node ./cli-assistant.js --create=album/music`.

-   To remove a folder or a subfolder in your current directory, pass `--remove=foldername` or `--remove=foldername/subfoldername` argument. For example: `node ./cli-assistant.js --remove=album/music`.

-   To check whether the given value is a file or a directory, pass `--isFolder=example_value` argument. For example: `node ./cli-assistant.js --isFolder=album/music` or `node ./cli-assistant.js --isFolder=hello.js`.

-   To find out the size of one or more files, pass `--size=first_name-/second_name-/...` argument, where the file names are separated by a `-/`. For example: `node ./cli-assistant.js --size=hello.js-/data.txt`.

-   To print the contents of the current directory to the console, pass `--content` argument and of some other directory, pass `--content=directory_example` argument . For example: `node ./cli-assistant.js --content` or `node ./cli-assistant.js --content=album`.

-   Lastly, you can also combine 2 or more arguments. For example: `node ./cli-assistant.js --exist=README.md --create=example`
