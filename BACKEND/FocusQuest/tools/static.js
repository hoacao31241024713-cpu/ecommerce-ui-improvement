import {createServer} from 'node:http';
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import {resolve,sep,extname} from 'node:path';
const [directory,port]=process.argv.slice(2);
const root=resolve(directory);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.txt':'text/plain; charset=utf-8'};
createServer(async (req,res)=>{
  try {
    const path=resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/^\/$/,'/index.html')));
    if (!path.startsWith(root+sep) || !(await stat(path)).isFile()) throw new Error('Not found');
    res.setHeader('Content-Type',types[extname(path)]??'application/octet-stream');
    createReadStream(path).pipe(res);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(Number(port),'127.0.0.1',()=>console.log('FocusQuest • http://localhost:'+port));
