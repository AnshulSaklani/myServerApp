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
		console.log(body);
		if(body.req === "GET") {
			console.log(body.url);
			let response = {};
			if(body.headerKey1 === "Authorization" && body.headerValue1) {
				response = await axios.get(body.url, { headers: { authorization: body.headerValue1 }});
			}
			else if(body.headerKey2 === "Authorization" && body.headerValue2) {
				response = await axios.get(body.url, { headers: { authorization: body.headerValue2 }});
			}
			else if(body.headerKey3 === "Authorization" && body.headerValue3) {
				response = await axios.get(body.url, { headers: { authorization: body.headerValue3 }});
			}
			else {
				response = await axios.get(body.url);
			}
				const t2 = performance.now();
				let timeTaken = t2 - t0;
				res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
				console.log(response.data);
			}

			//res.send(response.data);
		else if(body.req === "POST") {
			console.log("Post",body);
			let response = {};
			if(body.headerKey1 === "Authorization" && body.headerValue1) {
				response = await axios.post(body.url, body.body, { headers: { authorization: body.headerValue1 }});
			}
			else if(body.headerKey2 === "Authorization" && body.headerValue2) {
				response = await axios.post(body.url, body.body, { headers: { authorization: body.headerValue2 }});
			}
			else if(body.headerKey3 === "Authorization" && body.headerValue3) {
				response = await axios.post(body.url, body.body, { headers: { authorization: body.headerValue3 }});
			}
			else {
				response = await axios.post(body.url, body.body);
			}
			//let response = await axios.post(body.url, body.body);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			console.log(response.data.courses);
			res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
		}
		else if(body.req === "PUT") {
			console.log("Put",body);
			let response = {};
			if(body.headerKey1 === "Authorization" && body.headerValue1) {
				response = await axios.put(body.url, body.body, { headers: { authorization: body.headerValue1 }});
			}
			else if(body.headerKey2 === "Authorization" && body.headerValue2) {
				response = await axios.put(body.url, body.body, { headers: { authorization: body.headerValue2 }});
			}
			else if(body.headerKey3 === "Authorization" && body.headerValue3) {
				response = await axios.put(body.url, body.body, { headers: { authorization: body.headerValue3 }});
			}
			else {
				response = await axios.put(body.url, body.body);
			}
			//let response = await axios.put(body.url, body.body);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
			console.log(response.data);
		}
		else if(body.req === "DELETE") {
			console.log("Delete", body);
			let response = {};
			if(body.headerKey1 === "Authorization" && body.headerValue1) {
				response = await axios.delete(body.url, { headers: { authorization: body.headerValue1 }});
			}
			else if(body.headerKey2 === "Authorization" && body.headerValue2) {
				response = await axios.delete(body.url, { headers: { authorization: body.headerValue2 }});
			}
			else if(body.headerKey3 === "Authorization" && body.headerValue3) {
				response = await axios.delete(body.url, { headers: { authorization: body.headerValue3 }});
			}
			else {
				response = await axios.delete(body.url);
			}
			//let response = await axios.delete(body.url);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			res.send({data: response.data, status :200+" OK", timeTaken : timeTaken});
			console.log(response.data);
		}
	}
	catch (error) {
		const { performance } = require("perf_hooks");
		const t0 = performance.now();
		if(error.response) {
			let {status,statusText} = error.response;
			console.log("Error::", status,statusText);
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			res.send({errorCode: status, errorMessage: statusText, timeTaken : timeTaken});
		}
		else{
			const t2 = performance.now();
			let timeTaken = t2 - t0;
			res.send({errorCode: 401, errorMessage: error, timeTaken : timeTaken});
		}
	}
});


