var fs = require("co-fs");

var fileName ="./users.json";

module.exports ={
	users: {
		get: function *(){
			var data = yield fs.readFile(fileName, "utf-8");
			return JSON.parse(data);
		},
		save: function *(user){
			var users = yield this.get();

			users.push(user);

			yield fs.writeFile(fileName, JSON.stringify(users));

		},
		clean: function *(){
			yield fs.writeFile(fileName, "[]");
		}
		
	}
}