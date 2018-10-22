var UserID = artifacts.require("./UserID");

contract("User", function(accounts) { //Declare contract injects accs from ganache

    it("Initialise with no account info", function(){
      return UserID.deployed().then(function(instance){//get instance of contract
        return instance.UID_Count();
      }).then(function(count) {
        assert.equal(count,0)
      })
    })
})

//Check on Initialise that UID_Count is empty
