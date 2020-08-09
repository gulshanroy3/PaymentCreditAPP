var bodyParser = require("body-parser");
const cors = require('cors');

class appConfig {

    constructor(app) {
        this.app = app;
    }

    appConnection() {
        this.app.use(bodyParser.json())
        this.app.use(cors())
    }

}
module.exports = appConfig;