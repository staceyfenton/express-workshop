var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');
var app = express();

app.use(formidable());
app.use(express.static("public"));

var posts;
var postsFile = __dirname + '/data/posts.json';

app.post('/create-post', function (req, res) {
	// console.log(req.fields);
	var timestamp = Date.now();
	var newPost = {};

	posts[timestamp] = req.fields.blogpost;
	console.log(posts);

	var postsToSave = JSON.stringify(posts);

	fs.writeFile(postsFile, postsToSave);
});

app.get('/get-posts', function(req, res) {
	res.sendFile(postsFile, function(err) {
		if (err) {
    	console.log(err);
    } else {
    	console.log('Sent:', postsFile);
    }		
	});
});

fs.readFile(postsFile, function (error, file) {
	console.log(file.toString());
	posts = JSON.parse(file);
});

app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});