/* Lead forms: validation, consent, honeypot, server capture, WhatsApp fallback. A lead is never silently dropped. */
(function(){
 var WA='919602405311';
 function val(f,n){var e=f.elements[n];return e?e.value.trim():'';}
 function show(f,html,cls){var o=f.querySelector('.msg');if(!o){o=document.createElement('div');o.className='msg';o.setAttribute('role','status');o.setAttribute('aria-live','polite');f.appendChild(o);}o.className='msg '+(cls||'');o.innerHTML=html;}
 function waLink(f){var l=['Hello VCA EduTech & AI,',f.dataset.kind+' enquiry'];[].forEach.call(f.elements,function(e){if(e.name&&e.value&&!/^(consent|website|ts)$/.test(e.name)&&e.type!=='submit')l.push(e.dataset.label+': '+e.value.trim());});return 'https://wa.me/'+WA+'?text='+encodeURIComponent(l.join('\n'));}
 document.querySelectorAll('form[data-lead-form]').forEach(function(f){
  f.querySelector('[name=ts]').value=Date.now();
  f.addEventListener('submit',function(ev){ev.preventDefault();
   f.querySelectorAll('.err').forEach(function(e){e.remove();});var bad=null;
   function err(n,t){var e=f.elements[n];var p=document.createElement('p');p.className='err';p.textContent=t;e.parentNode.appendChild(p);if(!bad)bad=e;}
   f.querySelectorAll('[required]').forEach(function(e){if(e.type==='checkbox'?!e.checked:!e.value.trim())err(e.name,e.type==='checkbox'?'Please tick to agree.':'This field is required.');});
   var ph=val(f,'phone').replace(/[\s-]/g,'').replace(/^(\+91|91|0)(?=\d{10}$)/,'');if(val(f,'phone')&&!/^[6-9]\d{9}$/.test(ph))err('phone','Enter a valid 10-digit Indian mobile number.');
   if(bad){bad.focus();return;}
   if(val(f,'website')||Date.now()-(+f.elements.ts.value)<2500){show(f,'Please wait a moment and try again.','err');return;}  /* spam: honeypot + too-fast */
   var data={kind:f.dataset.kind,page:location.pathname,utm:(function(){try{return JSON.parse(sessionStorage.getItem('vca_utm')||'{}');}catch(e){return{};}})()};
   [].forEach.call(f.elements,function(e){if(e.name&&!/^(website|ts|consent)$/.test(e.name))data[e.name]=e.value.trim();});data.phone=ph;data.consent=true;
   var ep=(window.VCA_CONFIG||{}).leadEndpoint;var btn=f.querySelector('button[type=submit]');
   if(!ep){show(f,'Almost done: tap below to send this enquiry on WhatsApp. <a class="btn gold small" target="_blank" rel="noopener" href="'+waLink(f)+'">Send on WhatsApp</a>');if(window.VCA)VCA.track('lead',{id:f.dataset.kind});return;}
   btn.disabled=true;btn.textContent='Sending...';
   fetch(ep,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(data),mode:'no-cors'}).then(function(){
     show(f,'<b>Thank you. We have received your enquiry.</b> We reply on WhatsApp or by email, usually within one working day. Urgent? <a href="'+waLink(f)+'" target="_blank" rel="noopener">WhatsApp us</a>.','ok');f.reset();f.elements.ts.value=Date.now();if(window.VCA)VCA.track('lead',{id:f.dataset.kind});
   }).catch(function(){show(f,'Could not send. Please use WhatsApp instead: <a class="btn gold small" target="_blank" rel="noopener" href="'+waLink(f)+'">Send on WhatsApp</a>','err');}).finally(function(){btn.disabled=false;btn.textContent='Send enquiry';});
  });});
 /* tabs */
 var tabs=document.querySelectorAll('.tabs button');tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){x.setAttribute('aria-selected',x===t);});document.querySelectorAll('form[data-lead-form]').forEach(function(f){f.hidden=f.dataset.kind!==t.dataset.k;});});});
 if(location.hash){var m=location.hash.match(/form-(\w+)/);if(m){var b=document.querySelector('.tabs button[data-k="'+m[1]+'"]');if(b)b.click();}}
})();
