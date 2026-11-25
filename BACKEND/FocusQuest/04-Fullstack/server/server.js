import express from 'express';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {openDatabase} from './database.js';
import {RequestError} from '../public/scripts/domain.js';

export function createApp({database,clock}={}) {
  const db=openDatabase(database,clock);
  const app=express();
  app.disable('x-powered-by');
  app.use('/api',express.json({limit:'64kb'}));
  app.use('/api',(req,res,next)=>{
    res.set('Cache-Control','no-store');
    try {
      // Express query values can include repeated parameters. Normalize to a single value.
      const query=Object.fromEntries(Object.entries(req.query).map(([key,value])=>[key,Array.isArray(value)?value[0]:value]));
      const data=db.execute(req.method,req.path,req.body,query);
      const creates=req.method==='POST' && (/^\/(tasks|categories|focus\/sessions|shop\/purchase)$/.test(req.path) || /\/subtasks$/.test(req.path));
      res.status(creates?201:200).json({success:true,data});
    } catch (error) { next(error); }
  });
  app.use('/api',(error,req,res,next)=>{
    const known=error instanceof RequestError;
    const status=known?error.status:error.type==='entity.parse.failed'?400:error.type==='entity.too.large'?413:500;
    if (status===500) console.error(error);
    res.status(status).json({success:false,error:{code:known?error.code:status===500?'INTERNAL_ERROR':'INVALID_JSON',
      message:known?error.message:status===500?'Không thể xử lý yêu cầu.':'Dữ liệu JSON không hợp lệ hoặc quá lớn.'}});
  });
  app.use(express.static(fileURLToPath(new URL('../public',import.meta.url))));
  return {app,db};
}

if (process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const {app,db}=createApp();
  const port=Number(process.env.PORT??3000);
  const server=app.listen(port,'127.0.0.1',(error)=>{
    if (error) {
      console.error('Không thể khởi động FocusQuest:',error.message);
      db.close();
      process.exitCode=1;
      return;
    }
    console.log('FocusQuest • http://localhost:'+server.address().port);
  });
  for (const signal of ['SIGINT','SIGTERM']) process.once(signal,()=>server.close(()=>db.close()));
}
