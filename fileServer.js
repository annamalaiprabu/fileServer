const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

const targetedPath = path.join(__dirname, "files");

function listOfFiles(req,res){
  fs.readdir(targetedPath,function(err,files){
    if(err){
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
    else{
      res.json(files);
    }
  });
}

function contentsOfFile(req,res){
  let filename = req.params.filename;
  const filePath = path.join(targetedPath,filename);
  
  fs.readFile(filePath,"utf-8",function (err,data){
    if(err){
      res.status(404).send("File not found");
    }
    else{
        res.send(data);
    }
  });

}



app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});



function catchAll(req, res) {
  res.status(404).send('Route not found');
}

app.get("/files",listOfFiles);
app.get("/file/:filename",contentsOfFile);
app.get('*',catchAll);

module.exports = app;
