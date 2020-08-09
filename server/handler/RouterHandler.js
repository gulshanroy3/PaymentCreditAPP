
const db = require("../config/db")

var ObjectId = require('mongodb').ObjectID;
class RouteHandler {

    async getConfig(req,res){
        try {
            let id = req.query.id
                const dbo = await new db().connect();
                dbo.collection("config").findOne({ "_id": new ObjectId(id) }, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        let _result = JSON.parse(JSON.stringify(result))
                        res.status(200).send({
                            success: true,
                            config: _result
                        })
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            id: null,
                            message: 'Invalid id'
                        })
                    }
                });
            }
        catch (err) {
            res.status(500).send({
                status: false,
                message: err.message
            })
        }
    }

    async getInvoive(req,res){
        try {
            let id = req.query.id
                const dbo = await new db().connect();
                dbo.collection("invoice").findOne({ "userId": id }, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        let _result = JSON.parse(JSON.stringify(result))
                        res.status(200).send({
                            success: true,
                            invoice: _result
                        })
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            id: null,
                            message: 'Invalid id'
                        })
                    }
                });
            }
        catch (err) {
            res.status(500).send({
                status: false,
                message: err.message
            })
        }
    } 

    async getVendors(req,res){
        try {
            let id = req.query.id
                const dbo = await new db().connect();
                dbo.collection("vendors").findOne({ "userId": id }, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        let _result = JSON.parse(JSON.stringify(result))
                        res.status(200).send({
                            success: true,
                            vendors: _result
                        })
                    }
                    else {
                        res.status(400).send({
                            success: false,
                            id: null,
                            message: 'Invalid id'
                        })
                    }
                });
            }
        catch (err) {
            res.status(500).send({
                status: false,
                message: err.message
            })
        }
    } 
    async makeCreditAdjustment(req,res){
        try {
            let userid = req.body.id
            let vendorId=req.body.vendorId
            let creditBalance=req.body.creditBalance
            let remainingAmount=req.body.remainingAmount
            let invoiceId=req.body.invoiceId
                const dbo = await new db().connect();
                dbo.collection("invoice").updateOne(
                    { "userId": userid, "invoices.invoiceId":invoiceId }, { $set: { "invoices.$.amountDue": remainingAmount } },
                    function (err, result) {
                       if(result){
                        dbo.collection("vendors").updateOne(
                            { "userId": userid, "vendors.vendorId":vendorId }, { $set: { "vendors.$.creditBal": creditBalance } },
                            function (err, result) {
                               if(result){
                                res.status(200).send({
                                    success: true,
                                    userInfo: result
                                })
                               }
                               else{
                                res.status(400).send({
                                    success: false
                                })
                               }
                            })
                       }
                       else{
                        res.status(400).send({
                            success: false
                        })
                       }
                    })
            }
        catch (err) {
            res.status(500).send({
                status: false,
                message: err.message
            })
        }
    }

    async makePayment(req,res){
        try {
            let userid = req.body.id
            let invoiceId=req.body.invoiceId
            let remainingAmount=req.body.remainingAmount
                const dbo = await new db().connect();
                dbo.collection("invoice").updateOne(
                    { "userId": userid, "invoices.invoiceId":invoiceId }, { $set: { "invoices.$.amountDue": remainingAmount } },
                    function (err, result) {
                       if(result){
                        res.status(200).send({
                            success: true,
                            userInfo: result
                        })
                       }
                       else{
                        res.status(400).send({
                            success: false
                        })
                       }
                    })
            }
        catch (err) {
            res.status(500).send({
                status: false,
                message: err.message
            })
        }
    }


}
module.exports = RouteHandler;