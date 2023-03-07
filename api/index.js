const app = require("./app.js");
let dotenv = require('dotenv');
dotenv.config();
const { connection } = require("./db.js");


const PORT = process.env.PORT || 3001

connection
    .syncIndexes({ force: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT: ${PORT}`);
        });
    }
);
