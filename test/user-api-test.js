require("co-mocha");
var data = require("../user-data");
var should = require("should");
var api = require("../user-web");
var request = require("co-supertest").agent(api.listen());

before("Cleanup data", function *(){
	yield data.users.clean();
})

describe("User Data Suite", function(){

	it("Save user and test the count" , function *(){

		var users = yield data.users.get();

		yield data.users.save({name: "Gowda"});

		var newUsers = yield data.users.get();

		newUsers.length.should.equal(users.length + 1);
	});
})

describe("User Web Suite" , function(){

	it("Save user and from UI", function *(){

		var users = (yield request.get("/user").expect(200).end()).body;

		yield data.users.save({name: "Gowda"});

		var newUsers = (yield request.get("/user").expect(200).end()).body;

		newUsers.length.should.equal(users.length + 1);

	});
});