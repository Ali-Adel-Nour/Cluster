const express = require('express');

const app = express();

const cluster = require('cluster');

const os = require('os');

const numCpu = os.cpus().length;
app.get('/',(req, res) => {
  for(let i = 0; i <1e8; i++) {
  //some long running task
  }
  res.send(`Ok...${process.pid}`);
  //cluster.worker.kill()
})


if(cluster.isMaster){
  for(let i = 0; i < numCpu; i++) {
    cluster.fork()
  }
  cluster.on('exit',(worker,code,siganl)=>{
    console.log(`worker ${worker.process.pid}died`)
  })
}else{
  app.listen(3000,()=>{
    console.log(`listening on ${process.pid} http://localhost:3000`);
}
  )}

//app.listen(3000,()=>{
  //console.log('listening on port http://localhost:3000');
//})