var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mongoosePaginate = require('mongoose-paginate');


var UserSchema = new mongoose.Schema({
	name: String,
	psd: String,
	mail: String,
	city: String,
	date: { type:Date},
	gender: String,
	interest:[],
	desc: String
});

UserSchema.plugin(mongoosePaginate);//自动数据分页
module.exports = mongoose.model('User',UserSchema);
