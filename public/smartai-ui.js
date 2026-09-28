(() => {
const assistanceCopy={
'Reconnect':'Website chat','Qualify':'Social messaging','Hand off':'Team support',
'Existing lead database':'Website chat assistance','SMS and WhatsApp outreach':'Answers in your business voice','Approved first messages':'Approved knowledge and answers','Campaign progress':'Conversation visibility','Review before launch':'Test before going live',
'Personal conversations':'WhatsApp, Instagram and Facebook','Needs and timing discovery':'Relevant replies to enquiries','Your qualification criteria':'Questions shaped around your offer','Approved business answers':'Consistent approved information','Human handoff rules':'Clear escalation rules',
'Qualified lead context':'Conversation context for your team','Tasks and appointments':'Tasks and next steps','Booking visibility':'A clear path to a conversation','SMS or email handoff alerts':'Optional SMS or email alerts','Guided onboarding':'Setup around your workflow',
'A tailored setup for your leads, team, and conversation goals.':'Optional AI assistance shaped around your channels and team.'
};
const tourViews=[['sales-workspace','Start with your existing leads'],['conversation-workspace','Restart a relevant conversation'],['handoff-workspace','Bring your team in with context']];
window.smartAiEnhance=()=>{
  const root=document.getElementById('main');if(!root)return;
  const channels={'framer-z2WhB':'Your leads','framer-DuJlU':'SMS','framer-2q0VP':'WhatsApp','framer-XVf2e':'AI replies','framer-UEPJM':'Your team','framer-CddWn':'Website chat','framer-cRvga':'Instagram','framer-kMAuP':'Facebook','framer-36Vpm':'Bookings','framer-5Ex6P':'Your voice','framer-UEQ2V':'Handoffs'};
  for(const [className,label] of Object.entries(channels))for(const item of root.querySelectorAll('.ticker-item > .'+className)){
    item.classList.add('smartai-channel');
    if(!item.querySelector('.smartai-channel-label')){const span=document.createElement('span');span.className='smartai-channel-label';span.textContent=label;item.append(span);}
  }
  for(const image of root.querySelectorAll('img[src]')){
    if(image.getAttribute('src').includes('/assets/smartai/')){image.removeAttribute('srcset');image.alt='SmartAi Sales workflow illustration';}
    const src=window.smartAiAsset(image.getAttribute('src'));if(src!==image.getAttribute('src')){image.src=src;image.removeAttribute('srcset');image.alt='SmartAi Sales workflow illustration';}
  }
  for(const title of root.querySelectorAll('h1'))if(title.textContent.trim()==='SmartAi Sales.'){
    title.classList.add('smartai-footer-wordmark');
    const svg=title.closest('svg');if(svg){title.style.setProperty('--smartai-wordmark-size',(Number(svg.getAttribute('viewBox')?.split(' ')[2]||748)/6.6)+'px');svg.setAttribute('role','img');svg.setAttribute('aria-label','SmartAi Sales');}
  }
  for(const link of root.querySelectorAll('a')){
    const href=link.getAttribute('href')||'';
    let target=null;
    if(link.textContent.trim().startsWith('Read the journal'))target='/blog';
    if(href.includes('mailto:')&&href.includes('makro.ai'))target='/contact#form';
    if(href.includes('ashbyhq.com')||href.includes('discord.com'))target='/contact#form';
    if(href.includes('zendesk.com'))target='/about#careers';
    if(href.includes('x.com/'))target='/contact';
    if(href.includes('facebook.com'))target='/about';
    if(href.includes('instagram.com'))target='/blog';
    if(href.includes('/blog/'))for(const button of link.querySelectorAll('[role=button]'))button.setAttribute('aria-label','Read article');
    if(target){link.href=target;link.dataset.makroLink=target;link.removeAttribute('target');}
    if(link.getAttribute('aria-label')==='Explore the workflow'){link.setAttribute('role','button');link.dataset.smartaiTour='';}
  }
  for(const container of root.querySelectorAll('[data-framer-name="Links"]')){
    for(const child of container.children)if(child.textContent.trim()==='Updates')child.setAttribute('data-makro-hidden','');
  }
  const pricing=document.getElementById('pricing');
  if(pricing){
    const assistance=Boolean(pricing.querySelector('[data-framer-name="Montly"],[data-framer-name="Montly Mobile"]'));
    for(const el of pricing.querySelectorAll('h5,p')){
      if(el.closest('.framer-15ee17k'))continue;
      const base=el.dataset.smartAiBase||el.textContent.trim();
      if(!(base in assistanceCopy))continue;
      el.dataset.smartAiBase=base;
      const next=assistance?assistanceCopy[base]:base;
      if(el.textContent!==next)el.textContent=next;
    }
    for(const tab of pricing.querySelectorAll('[role="button"]')){
      if(tab.textContent.trim()==='AI Assistance'){
        const label=tab.querySelector('strong')||tab.querySelector('p');
        if(label&&label.textContent!=='Website AI Chatbot')label.textContent='Website AI Chatbot';
      }
      if(/^(Reactivation|Website AI Chatbot)$/.test(tab.textContent.trim()))tab.setAttribute('aria-pressed',String((tab.textContent.trim()==='Website AI Chatbot')===assistance));
    }
    const offer=pricing.querySelector('.framer-s0p7o9 > .framer-15ee17k');
    if(offer){
      const heading=offer.querySelector('h5');
      const paragraphs=[...offer.querySelectorAll('p')];
      const set=(node,value)=>{if(node&&node.textContent!==value)node.textContent=value};
      set(heading,assistance?'Website AI Chatbot':'Lead Reactivation');
      set(paragraphs[0],assistance
        ?'Give website visitors helpful, approved answers and guide interested people to your team.'
        :'Reconnect with your existing leads through relevant, personal AI conversations.');
      const features=assistance
        ?['AI chat on your website','Answers from your approved knowledge','Questions that capture needs and timing','Human handoff when a person is needed','Conversation and booking visibility']
        :['Your existing lead database','Personal SMS and WhatsApp outreach','Approved business answers','Qualification and intent signals','Context-rich team handoffs'];
      paragraphs.slice(-5).forEach((node,index)=>set(node,features[index]));
    }
    const footer=pricing.querySelector('.framer-1c0b2sp');
    if(footer){
      const heading=footer.querySelector('h4');
      const description=footer.querySelectorAll('p')[1];
      const title=assistance?'Let’s plan your website chatbot':'Let’s map your first campaign';
      const copy=assistance
        ?'Tell us about your website, common questions, and when your team should take over. We’ll shape a chatbot around your business.'
        :'Tell us about your existing leads, current follow-up, and sales goals. We’ll walk you through a setup that fits your business.';
      if(heading&&heading.textContent!==title)heading.textContent=title;
      if(description&&description.textContent!==copy)description.textContent=copy;
    }
    for(const el of pricing.querySelectorAll('h1,h2,h3,h4,p,div')){
      const raw=el.textContent.trim();
      if(/^\$\s*\d+(?:\s*\/mo)?$/.test(raw)||/^\$\s*\d+\s*\/mo$/.test(raw)) {el.textContent='Let’s talk';el.classList.add('smartai-price');}
      if(raw==='/mo')el.setAttribute('data-makro-hidden','');
    }
  }
  for(const label of root.querySelectorAll('#testimonials strong'))if(label.textContent==='Go live')label.textContent='Assist';
  for(const form of root.querySelectorAll('form')){
    if(!form.querySelector('input[name="First Name"]'))continue;
    form.id='form';const btn=form.querySelector('button');if(btn)btn.setAttribute('aria-label','Request a walkthrough');
  }
  if(location.pathname==='/about'){
    for(const label of root.querySelectorAll('#careers p'))if(label.textContent.trim()==='Not now')label.textContent='Knowledge';
    for(const video of root.querySelectorAll('video')){
      if(video.classList.contains('smartai-hidden-video'))continue;
      video.classList.add('smartai-hidden-video');video.pause();
      const img=document.createElement('img');img.src='/assets/smartai/company-workflow.svg';img.alt='A SmartAi Sales conversation and qualification workflow';img.className='smartai-tour-poster';
      video.parentElement.append(img);
    }
  }
};
document.addEventListener('click',event=>{
 const priceTab=event.target.closest('#pricing [role=button]');if(priceTab&&/^(Reactivation|AI Assistance|Website AI Chatbot)$/.test(priceTab.textContent.trim()))requestAnimationFrame(window.smartAiEnhance);
 const trigger=event.target.closest('[data-smartai-tour]');if(!trigger)return;
 event.preventDefault();event.stopImmediatePropagation();
 let step=0;const dialog=document.createElement('dialog');dialog.className='smartai-tour-dialog';dialog.setAttribute('aria-label','SmartAi Sales workflow');
 const close=document.createElement('button');close.className='smartai-tour-close';close.textContent='×';close.setAttribute('aria-label','Close workflow');
 const img=document.createElement('img');img.className='smartai-tour-image';
 const bar=document.createElement('div');bar.className='smartai-tour-toolbar';
 const previous=document.createElement('button');previous.textContent='←';previous.setAttribute('aria-label','Previous step');
 const next=document.createElement('button');next.textContent='→';next.setAttribute('aria-label','Next step');
 const caption=document.createElement('div');caption.className='smartai-tour-caption';caption.setAttribute('aria-live','polite');
 const render=()=>{const [file,label]=tourViews[step];img.src='/assets/smartai/'+file+'.svg';img.alt=label;caption.replaceChildren(document.createTextNode((step+1)+' / 3 · '+label));const note=document.createElement('span');note.className='smartai-tour-example';note.textContent='Illustrative campaign data';caption.append(note)};
 previous.onclick=()=>{step=(step+2)%3;render()};next.onclick=()=>{step=(step+1)%3;render()};close.onclick=()=>dialog.close();
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});dialog.addEventListener('close',()=>{dialog.remove();trigger.focus()},{once:true});
 bar.append(previous,caption,next);dialog.append(close,img,bar);document.body.append(dialog);render();dialog.showModal();
},true);
})();
