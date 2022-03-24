var express = require('express')
var router = express.Router()
var orderModel = require('../models/orderModel')
var paymentModel = require('../models/paymentModel')
var orderValidation = require('../validator/orderValidator')
var ensureToken = require('../utils/jwttoken')
var Razorpay = require('razorpay')

router.post('/createorder',ensureToken, orderValidation.createorderValidation(), async (req, res) =>{
try{
    let data ={}
        data.board = req.body.board
        data.class = req.body.class
        data.user = req.body.user
        data.deliveryinfo = req.body.deliveryinfo
        data.status = req.body.status
        data.createdDate = new Date().getTime()

        orderModel.createorder(data,async(error,result)=>{
            if(!result){
                console.log({ error: 'Creating order is failed', error_description: error })
                return
            }
                console.log({ message: 'order created successfully!'})

        
        const rzp = new Razorpay({
            key_id: "rzp_live_ZuPwK7pcW5qI8X",
            key_secret: "Bf0SewsJeQtCoKzNvadUkjvR",
           })

           var amount = 1000
            
            const rzpOrder = await rzp.orders.create({
                amount: amount * 100, // rzp format with paise
                currency: 'INR',
                receipt: "receipt#1", //Receipt no that corresponds to this Order,
                payment_capture: true,
                notes: {
                 orderType: "Pre"
                } //Key-value pair used to store additional information
               })
               console.log(rzpOrder);

           data1  = {}
           data1.user = req.body.user
           data1.order_id = result._id
           data1.paymentinfo = req.body.paymentinfo
           data1.paymentstatus = req.body.paymentstatus
           data1.createdDate = new Date().getTime()
   
           paymentModel.createpayment(data1,(error,result1)=>{
               if(!result){
                   res.json({ error: 'Payment not Initiated', error_description: error })
                   return
               }
                   res.json({ message: 'Payment initiated!'}, result1._id, result._id)
           })
        })
        } catch (error) {
            console.log(error);
        }
})

router.post('/razorpaycallback', ensureToken, async (req, res) =>{

    let data ={}
    data.board = req.body.board
    data.class = req.body.class
    data.user = req.body.user
    data.deliveryinfo = req.body.deliveryinfo
    data.status = req.body.status
    data.createdDate = new Date().getTime()

  var result =  await orderModel.updateorderstatus(req.body.order_id, data)
        if(!result){
            console.log({ error: 'order data empty', error_description: "" })
            return
        }

    data1 = {}
    data1.user = req.body.user
    data1.order_id = result._id
    data1.paymentinfo = req.body.paymentinfo
    data1.paymentstatus = req.body.paymentstatus
    data1.createdDate = new Date().getTime()

    var result1 = await paymentModel.updatepaymentstatus(req.body.payment_id,data1)
        if(!result){
            res.json({ error: 'Payment status not updated!', error_description: error })
            return
        }
            res.json({ message: 'Payment status updated!'},result.status,result1.paymentstatus)
})
router.get('/checkorderstatus/:orderId', ensureToken, async (req, res) =>{
    orderModel.checkorderstatus(req.params.orderId,(result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result:result[0].status})
    })

})

router.get('/listallstudentorders/:studentId', ensureToken, async (req, res) =>{
    orderModel.listordersbystudent(req.params.studentId,(result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallteacherorders/:teacherId', ensureToken, async (req, res) =>{
    orderModel.listordersbyteacher(req.params.teacherId,(result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listallordersbydate', ensureToken, async (req, res) =>{
    orderModel.listallordersbydate(req.body.date,(result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.post('/listallordersbydateandtime', ensureToken, async (req, res) =>{
    orderModel.listallordersbydateandtime(req.body.date,req.body.time,(result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})

router.get('/listallorder', ensureToken, async (req, res) =>{
    orderModel.listorder((result)=>{
        if(!result){
            res.json({ error: 'order data empty', error_description: "" })
            return
        }
        res.json({result})
    })

})
router.delete('/deleteorder/:id', ensureToken, async(req, res) =>{
    orderModel.deleteorder(req.params.id,(result)=>{
        if(!result){
            res.json({ error: 'Deleting order is failed', error_description: "order not found!" })
            return
        }
            res.json({ message: 'order deleted successful!'})
    })
})

module.exports = router