const middleware = function(req,res,next){
  // 处理逻辑

  next();
}
const m1 = function(req,res,next){
  console.log('m1');
  next();
}
const m2 = function(req,res,next){
  console.log('m2');
  next();
}
const m3 = function(req,res,next){
  console.log('m3');
  next();
}
const mids = [m1, m2, m3];

function App(req,res){
  const next = function(){
    const mid = mids.shift();
    mid && mid(req,res,next);
  } 
  next(); 
}

App();