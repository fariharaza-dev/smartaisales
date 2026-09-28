/* The original animation components stay intact. This layer connects the
   template's missing actions and makes the selected website self-contained. */
// Framer's collections request byte slices through a query parameter. Serve
// those slices from the local immutable collection files on any static host.
const nativeFetch = window.fetch.bind(window);
const collectionCache = new Map();
window.fetch = async (input, init) => {
  const url = new URL(input instanceof Request ? input.url : String(input), location.href);
  const range = url.searchParams.get('range');
  if (url.origin !== location.origin || !url.pathname.startsWith('/assets/framerusercontent.com/cms/') || !range || !/^\d+-\d+(,\d+-\d+)*$/.test(range)) return nativeFetch(input, init);
  url.searchParams.delete('range');
  const key = url.href;
  if (!collectionCache.has(key)) collectionCache.set(key,nativeFetch(key,init).then(async response=>{if(!response.ok)throw new Error('Collection unavailable');return new Uint8Array(await response.arrayBuffer())}).catch(error=>{collectionCache.delete(key);throw error}));
  const bytes = await collectionCache.get(key);
  const segments = range.split(',').map(part=>{const [start,end]=part.split('-').map(Number);return bytes.subarray(start,end+1)});
  const result = new Uint8Array(segments.reduce((sum,part)=>sum+part.length,0));
  let offset=0;for(const part of segments){result.set(part,offset);offset+=part.length;}
  return new Response(result,{status:200,headers:{'Content-Type':'application/octet-stream'}});
};
const contactLabels = /^(get started|book a demo|request a quote|talk to our team|get in touch|try free for 14 days|contact sales|contact us)$/i;
let queued = false;

function enhance() {
  queued = false;
  const walker=document.createTreeWalker(document.getElementById("main")||document.body,NodeFilter.SHOW_TEXT);
  while(walker.nextNode()){const node=walker.currentNode;if(node.parentElement?.closest("script,style"))continue;const next=window.smartAiText(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;}
  if(document.title.includes("Makro"))document.title=window.smartAiContent[document.title]||document.title.replaceAll("Makro","SmartAi Sales");
  for (const anchor of document.querySelectorAll('a[data-reset="button"]')) {
    const label = [...anchor.querySelectorAll('p')].map(p=>p.textContent.trim()).find(Boolean) || '';
    if (!anchor.hasAttribute('href') && contactLabels.test(label)) anchor.setAttribute('href','/contact');
    if (label && anchor.getAttribute('aria-label') !== label) anchor.setAttribute('aria-label',label);
    if (label === 'Play video') anchor.setAttribute('role','button');
  }
  for (const node of document.querySelectorAll('[data-highlight][tabindex="0"]:not(a):not(button):not(input):not(textarea)')) {
    if (!node.hasAttribute('role')) node.setAttribute('role','button');
  }
  for (const node of document.querySelectorAll('[data-framer-name]')) {
    const name = node.getAttribute('data-framer-name') || '';
    if (/^(open|closed)$/i.test(name) && node.getAttribute('role') === 'button') node.setAttribute('aria-expanded',String(name.toLowerCase()==='open'));
    if (node.getAttribute('name') === 'Menu Icon') {
      node.setAttribute('aria-label',name === 'Menu' ? 'Open menu' : 'Close menu');
      node.setAttribute('aria-expanded',String(name !== 'Menu'));
    }
  }
  window.smartAiEnhance?.();
  // Reuse the reference's middle help card for the requested Blog page.
  for (const link of document.querySelectorAll('a[href]')) {
    const label = link.querySelector('p')?.textContent.trim() || link.textContent.trim();
    if (label === 'Updates') {
      const target = link.closest('[data-framer-name="Menu Item"]') || (link.parentElement?.tagName === 'P' ? link.parentElement : link);
      if(target.parentElement?.children.length===1 && !target.parentElement.matches('nav'))target.parentElement.setAttribute('data-makro-hidden','');
      target.setAttribute('data-makro-hidden','');
    }
    if (/^(Terms of Use|Privacy Policy|Cookie policy)$/i.test(label)) {
      (link.closest('.framer-vxgbxp') || link).setAttribute('data-makro-hidden','');
    }
    if (/^View Updates/.test(link.textContent.trim())) {
      const card = link.closest('[data-framer-name="Card"]') || link.parentElement?.parentElement;
      link.href='/blog';
      link.dataset.makroLink='/blog';
      link.setAttribute('aria-label','Visit Blog');
      link.querySelectorAll('p').forEach(p=>{if(p.textContent.trim()==='View Updates')p.textContent='Visit Blog'});
      if (card) {
        const heading=card.querySelector('h5');
        if(heading?.textContent==='Changelog')heading.textContent='Blog';
        card.querySelectorAll('p').forEach(p=>{if(p.textContent.startsWith("See what's new."))p.textContent='Learn how to manage cash, risk, and growth without guesswork.'});
      }
    }
  }
  for (const form of document.querySelectorAll('form')) {
    if (!form.querySelector('input[name="First Name"]')) continue;
    const fields=[['First Name','given-name'],['Last Name','family-name'],['Email','email'],['Company Name','organization']];
    for(const [name,complete] of fields){const input=form.querySelector(`input[name="${name}"]`);if(input){input.required=true;input.autocomplete=complete;input.maxLength=name==='Email'?254:name==='Company Name'?250:100;}}
    const message=form.querySelector('textarea');
    if(message){message.maxLength=5000;message.name='Message';}
  }
}

function scheduleEnhance(){if(!queued){queued=true;requestAnimationFrame(enhance)}}
const start=()=>{
  enhance();
  new MutationObserver(scheduleEnhance).observe(document.getElementById('main') || document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['data-framer-name']});
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();

document.addEventListener('keydown', event=>{
  const button=event.target.closest('[role="button"]');
  if(!button||button.matches('a[href],button,input,textarea,select'))return;
  if(event.key==='Enter'||event.key===' '){event.preventDefault();button.click();}
});
document.addEventListener('click',event=>{
  const play=event.target.closest('a[aria-label="Play video"]');
  if(play){
    event.preventDefault();event.stopImmediatePropagation();
    const source=play.closest('section')?.querySelector('video');
    if(!source)return;
    const dialog=document.createElement('dialog');
    dialog.className='makro-video-dialog';dialog.setAttribute('aria-label','Company video');
    const close=document.createElement('button');close.type='button';close.className='makro-video-close';close.textContent='×';close.setAttribute('aria-label','Close video');
    const video=document.createElement('video');video.src=source.currentSrc||source.src;video.controls=true;video.autoplay=true;video.playsInline=true;
    dialog.append(close,video);document.body.append(dialog);
    close.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
    dialog.addEventListener('close',()=>{video.pause();dialog.remove();play.focus()},{once:true});
    dialog.showModal();video.play().catch(()=>{});return;
  }
  const link=event.target.closest('a[data-makro-link]');
  if(link){event.preventDefault();event.stopImmediatePropagation();location.assign(link.dataset.makroLink);}
},true);

window.addEventListener('submit', async event=>{
  const form=event.target;
  if(!(form instanceof HTMLFormElement)||!form.querySelector('input[name="First Name"]'))return;
  event.preventDefault();event.stopImmediatePropagation();
  if(form.getAttribute('aria-busy')==='true'||!form.reportValidity())return;
  let status=form.querySelector('.makro-form-status');
  if(!status){status=document.createElement('p');status.className='makro-form-status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.append(status);}
  status.dataset.error='false';status.textContent='Sending your message…';
  form.setAttribute('aria-busy','true');
  const read=name=>form.querySelector(`input[name="${name}"]`)?.value||'';
  try{
    const id=form.dataset.requestId||(form.dataset.requestId=crypto.randomUUID?.()||Array.from(crypto.getRandomValues(new Uint8Array(16)),byte=>byte.toString(16).padStart(2,'0')).join(''));
    const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,firstName:read('First Name'),lastName:read('Last Name'),email:read('Email'),company:read('Company Name'),message:form.querySelector('textarea')?.value||''})});
    const result=await response.json();
    if(!response.ok||!result.success)throw new Error(result.error||'We could not save your message. Please try again.');
    status.textContent='Thank you. Your message has been received.';
    form.reset();delete form.dataset.requestId;
  }catch(error){status.dataset.error='true';status.textContent=error.message||'We could not save your message. Please try again. Your input has been preserved.';}
  finally{form.removeAttribute('aria-busy');}
},true);
