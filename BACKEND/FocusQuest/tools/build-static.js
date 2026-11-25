import {cp,readFile,writeFile,copyFile} from 'node:fs/promises';
const source=new URL('../04-Fullstack/public/',import.meta.url);
const html=await readFile(new URL('index.html',source),'utf8');
for (const [directory,mode] of [['01-GUI','gui'],['02-No-Database','mock']]) {
  const target=new URL('../'+directory+'/',import.meta.url);
  for (const folder of ['assets','scripts','styles']) await cp(new URL(folder,source),new URL(folder,target),{recursive:true});
  await writeFile(new URL('index.html',target),html.replace('data-mode="api"','data-mode="'+mode+'"'));
}
