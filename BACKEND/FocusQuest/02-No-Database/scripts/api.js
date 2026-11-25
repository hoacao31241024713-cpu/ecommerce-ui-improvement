import {seed} from './seed.js';
import {dispatch, initialize, reconcile} from './domain.js';

const mode=document.documentElement.dataset.mode;
const key='focusquest-mock-v1';
let preview;
function localRequest(method,path,body,query) {
  const now=Date.now();
  let data=mode==='gui'?preview:JSON.parse(localStorage.getItem(key)??'null');
  if (!data) {
    data=seed(now,Intl.DateTimeFormat().resolvedOptions().timeZone);
    initialize(data,now);
  }
  reconcile(data,now);
  if (mode==='gui') preview=data;
  else localStorage.setItem(key,JSON.stringify(data));
  const draft=structuredClone(data);
  const result=dispatch(draft,method,path,body,query,now);
  if (mode==='gui') preview=draft;
  else if (method!=='GET') localStorage.setItem(key,JSON.stringify(draft));
  return result;
}
export async function request(path,method='GET',body,query={}) {
  const params=Object.fromEntries(Object.entries(query).filter(([,value])=>value!==''));
  if (mode!=='api') return localRequest(method,path,body,params);
  const suffix=new URLSearchParams(params).toString();
  const result=await fetch('/api'+path+(suffix?'?'+suffix:''),{
    method,headers:body!==undefined?{'Content-Type':'application/json'}:undefined,body:JSON.stringify(body)
  });
  const envelope=await result.json();
  if (!result.ok || !envelope.success) throw new Error(envelope.error?.message??'Lỗi kết nối.');
  return envelope.data;
}
