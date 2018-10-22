App = {
web3Provider: null,
contracts: {},
account: '0x0',

init: function() {
  return App.initWeb3();
},

initWeb3: function() {
  if (typeof web3 !== 'undefined') {
    // If a web3 instance is already provided by Meta Mask.
    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);
  } else {
    // Specify default instance if no web3 instance provided
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(App.web3Provider);
  }
  return App.initContract();
},

initContract: function() {
  $.getJSON("UserID.json", function(election) {
    // Instantiate a new truffle contract from the artifact
    App.contracts.UserID = TruffleContract(election);
    // Connect provider to interact with contract
    App.contracts.UserID.setProvider(App.web3Provider);

    return App.render();
  });
},


//Register
submitForm: function() {
  var name = $("#name").val();
  var birth = $("#birth").val();
  var exp = $("#exp").val();
  var violations = $("#vio").val();
  var passport = $("#psp").val();

  alert(birth);
  App.contracts.UserID.deployed().then(function(instance) {
       return instance.addUID2(12,name,birth,exp,violations,passport);
     }).then(function(result) {
       // Wait for votes to update
       alert("bad");
     }).catch(function(err) {
       console.error(err);
       alert(err);
     });



},





render: function() {
  var userInstance;
  var loader = $("#loader");
  var content = $("#content");

  loader.show();
  content.hide();

  // Load account data
  web3.eth.getCoinbase(function(err, account) {
    if (err === null) {
      App.account = account;
      $("#accountAddress").html("Your Account: " + account);
    }
  });

  // Load contract data
  App.contracts.UserID.deployed().then(function(instance) {
    userInstance = instance;
    return userInstance.UID_Count();
  }).then(function(count) {

    //index
    var candidatesResults = $("#candidatesResults");
    var nameResults = $("#user_name");
    candidatesResults.empty

    for (var i = 1; i <= count; i++) {
      userInstance.UID_Map(i).then(function(map) {
        var id = map[0];
        var name = map[1];
        var dob = map[2];
        var exp_date = map[3];
        var infractions = map[4];
        var passportId = map[5];

        // Render candidate Result
        var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + dob + "</td><td>" + exp_date + "</td><td>" + infractions + "</td><td>" + passportId + "</td></tr>";
        candidatesResults.append(candidateTemplate);
        document.getElementById("userResults").innerHTML = name;
      });
    }

    loader.hide();
    content.show();
  }).catch(function(error) {
    console.warn(error);
  });
}
};

$(function() {
$(window).load(function() {
  App.init();
});
});
