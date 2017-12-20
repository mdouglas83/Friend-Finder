var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app){

    app.get('/api/friends', function(req, res){
    	res.sendFile(path.join(__dirname, "../public/home.html"));
    });

	app.post("/api/friends", function(req, res) {
    	var friend = req.body;
    	console.log(friend);
    	console.log(friend.name);
    	if (!(friend.name === '' || friend.photo === '')) {
	    	var b = true;
			for (i = 1; i <= 10 && b; i++){
				if (friend["select" + i] == '') b = false;
			}
			if (b) {
				// everything's good - do the comparison
				if (friends.length > 0) {
					var diff_min = {name: "", photo: "", diff: -1};
					for (i = 0; i < friends.length; i++){
						var diff = 0;
						for (j = 1; j <= 10; j++) {
							diff += Math.abs(friends[i]["select" + j] - friend["select" + j]);
						}
						if (diff_min.diff === -1 || diff_min.diff > diff) {
							diff_min.name = friends[i].name;
							diff_min.photo = friends[i].photo;
							diff_min.diff = diff;
						}
					}
					var dHtml = "<html><title>Match Found!</title><body><img src=\"" + diff_min.photo + "\"><br>Best match: " + diff_min.name + "</body></html>";
					res.send(dHtml);
				} else {
					res.send("You are the first participant!");
				}
				friends.push(friend);
			} else {
				res.send("Please go back and complete the survey.");
			}
		}
		console.log(friends);
	});

}