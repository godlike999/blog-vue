var mongoose = require('mongoose');

const User = require('../models/user.model');//数据模型的内容引入，user是一个用户对象

//添加用户
exports.create = function(req,res,next){
    const user = new User(req.body);
    user.save().then(data=>{
        res.json(data);
    })
}

//查询用户
 exports.getAll = function(req,res,next){
 	User.find({}).then(data=>{
 		res.json(data);
 	})
 }

 //分页查询
 exports.list = function(req,res,next){
 	var page = (req.body.page) ? req.body.page : 1 ;
 	page = parseInt(page);
 	var limit = (req.body.limit) ? req.body.limit: 5;
 	limit = parseInt(limit);
 	var keywords = [];
 	if(req.body.name!=null && req.body.name.trim().length>0){
 		var name = req.body.name;
 		keywords = {
 			"name":new RegExp(name,'i')
 		}
 	}

 	User.paginate(keywords,{page:page,limit:limit},function(err,result){
 		if(err){
 			console.log(err);
 		}
 		res.json(result);
 	})
 }

 //删除一个id用户
 exports.remove = function(req,res,next){
 	var id = req.params.id;
 	User.findByIdAndRemove(id,function(){
 		res.json({status:200,msg:'ok'});
 	})
 }

 //删除多个
 exports.removes = function(req,res,next){
 	var ids = req.body.ids;
 	User.remove({_id: { $in:ids }},function(){
 		res.json({status:200,msg:'ok'});
 	})
 }

 //更新
 exports.update = function(req,res,next){
 	var id = req.params.id;
 	User.findByIdAndUpdate(id,{$set:req.body},{new:false}).then(data=>{
 		res.json(data);
 	})
 }