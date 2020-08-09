const routeHandler = require("../handler/RouterHandler")

class route {

    constructor(app) {
        this.app = app;
    }
    appRoutes() {
        let route = new routeHandler()
        this.app.get("/app/config",route.getConfig)
        this.app.get("/invoice",route.getInvoive)
        this.app.get("/vendors",route.getVendors)
        this.app.post("/credit/apply",route.makeCreditAdjustment)
        this.app.post("/payment",route.makePayment)
    }

    routeConfig() {
        this.appRoutes()
    }

}
module.exports = route;