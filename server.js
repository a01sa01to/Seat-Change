const express = require('express');
const fs = require('fs');
const port = 3000;
const path = require('path')

const app = express();

app.use((req,res)=>{
	console.log(req.url);
	if(!req.path.endsWith("/")){
		const rewritePath = path.join(__dirname,`${req.url}index.html`);
    if(fs.existsSync(rewritePath)){
			res.sendFile(rewritePath);
			return;
		}
  }
  if(!req.path.includes(".")){
		const rewritePath = path.join(__dirname,`${req.url}.html`);
		if(fs.existsSync(rewritePath)){
			res.sendFile(rewritePath);
			return;
		}
	}
	res.sendFile(path.join(__dirname,req.url));
})

app.use((err,req,res,next)=>{
	console.error(err);
	res.status(err.statusCode).sendFile(path.join(__dirname,`err/${err.statusCode}.html`));
})

app.listen(port, ()=>console.log(`Listening on ${port}`));