var koa = require("koa");
var router = require("koa-router")();

var data = require("./user-data");

var app = module.exports = koa();

router.get("/user", function *(){
	this.body = yield data.users.get();
})

router.post("/user/:name", function *(){	

	yield data.users.save({name: name});
	this.body =  yield data.users.get();
})

app.use(router.routes());

var PORT = process.env.PORT || 3000

app.listen(PORT, function(){
	console.log("Server Listening at port " + PORT);
})