const express =require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message:'Handling get request to /orders'
    });
});

router.post('/',(req,res,next) => {
    const order = {
        productId:req.body.productId,
        quantity:req.body.quantity
      };
    res.status(200).json({
        message:'Handling post request to /orders',
        order:order
    });
});

router.get('/:orderId',(req,res,next) => {
    const id=req.params.orderId;
    if(id==='special'){
        res.status(200).json({
            message:'You discovered the special ID',
            id:id
        });
    }else{
        res.status(200).json({
            message:'you passes id'
        });
    }
});

router.patch('/:orderId',(req,res,next) => {
        res.status(200).json({
            message:'you updated orders'
        });
});

router.delete('/:orderId',(req,res,next) => {
    res.status(200).json({
        message:'you deleted orders'
    });
});
module.exports = router;