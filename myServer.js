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
//let baseURL = "https://stud-service-app.onrender.com";

app.post("/myserver/data", async function(req,res){
	try {
		const { performance } = require("perf_hooks");
		const t0 = performance.now();
		let body = req.body;
		if(body.method === "GET") {
			console.log(body.fetchURL);
			let response = await axios.get(body.fetchURL);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
			console.log(response.data);
			//res.send(response.data);
		}
		else if(body.method === "POST") {
			let response = await axios.post(body.fetchURL, body.data);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			console.log(response.data.courses);
			//res.send(response.data);
			res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
		}
	}
	catch (error) {
		if(error.response) {
			let {status,statusText} = error.response;
			console.log("Error::", status,statusText);
			res.send({errorCode: status, errorMessage: statusText});
		}
		else res.send({errorCode: 401, errorMessage: error});
	}
});