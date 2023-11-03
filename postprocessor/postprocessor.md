# Postprocessor

-   It uses Node.js modules such as the file system module, and the crypto module.
-   I learned how to store user information and reduce potential risks.
-   The project has 3 CSV files:
    -   database.csv: add user data here
    -   hash_database.csv: the password is encrypted and stored here
    -   filtered_database.csv: it contains filtered data only (if user didn't enter "password" or "consent to mailing", then it will not be filtered)
-   Setup:-
    -   Install node and npm
    -   Install crypto module: `npm install crypto`
