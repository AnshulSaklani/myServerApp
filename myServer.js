let express = require("express");
let app = express();
app.use(express.json());
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
//const port = 2450;
var port = process.env.PORT || 2450;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
let axios = require("axios");
let baseURL = "https://stud-service-app.onrender.com";

app.post("/myserver/data", async function(req,res){
	try {
		let body = req.body;
		if(body.method === "GET") {
			let response = await axios.get(baseURL + body.fetchURL);
			console.log(response.data);
			res.send(response.data);
		}
		else if(body.method === "POST") {
			let response = await axios.post(baseURL + body.fetchURL, body.data);
			console.log(response.data);
			res.send(response.data);
		}
	}
	catch (error) {
		if(error.response) {
			let {status,statusText} = error.response;
			console.log("Error::", status,statusText);
			res.status(status).send(statusText);
		}
		else res.status(404).send(error);
	}
});