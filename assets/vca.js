/* VCA EduTech & AI - shared config, offer logic, tracking.
   TRACKING IDS: paste your real IDs below. Leave '' to keep that tracker switched off. */
window.VCA_CONFIG={
  ga4:'',            /* e.g. 'G-XXXXXXXXXX' */
  gtm:'',            /* e.g. 'GTM-XXXXXXX' (optional; if set, GA4 above is not loaded separately) */
  metaPixel:'2173221344074914',   /* same Pixel as the books store */
  offerEnd:'2026-11-10T23:59:00+05:30',   /* Diwali offer end. After this, offer wording and offer prices disappear automatically. */
  offerName:'Diwali offer',
  leadEndpoint:'https://script.google.com/macros/s/AKfycbywsxwXUMnKgFBXWq5YMO1N63E9ugM2o88CLBecjLr887fWo6R9ruOA3BLlFfkOK1GCeA/exec'
};
(function(){
 var C=window.VCA_CONFIG;
 window.VCA={offerOn:function(){return Date.now()<=new Date(C.offerEnd).getTime();}};
 /* UTM capture (kept for the session so campaigns can be measured) */
 try{var q=new URLSearchParams(location.search),u={};['utm_source','utm_medium','utm_campaign','utm_term','utm_content','fbclid','gclid'].forEach(function(k){if(q.get(k))u[k]=q.get(k);});
  if(Object.keys(u).length)sessionStorage.setItem('vca_utm',JSON.stringify(u));}catch(e){}
 function utm(){try{return JSON.parse(sessionStorage.getItem('vca_utm')||'{}');}catch(e){return{};}}
 window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;
 function load(src){var s=document.createElement('script');s.async=true;s.src=src;document.head.appendChild(s);}
 function consent(){try{return localStorage.getItem('vca_consent');}catch(e){return null;}}
 function startTrackers(){
 if(C.gtm){dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});load('https://www.googletagmanager.com/gtm.js?id='+C.gtm);}
 else if(C.ga4){load('https://www.googletagmanager.com/gtag/js?id='+C.ga4);gtag('js',new Date());gtag('config',C.ga4);}
 if(C.metaPixel){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',C.metaPixel);fbq('track','PageView');}
 }
 if(consent()==='yes')startTrackers();
 VCA.startTrackers=startTrackers;
 if('serviceWorker' in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){});});
 /* track(kind, {id,name,price}) kind: view | checkout | lead. No personal data is sent. Purchase is NOT fired here (see README). */
 VCA.track=function(kind,d){d=d||{};var item={item_id:d.id,item_name:d.name,price:d.price,currency:'INR'},p=Object.assign({},utm());
  var ga={view:'view_item',checkout:'begin_checkout',lead:'generate_lead'}[kind],fb={view:'ViewContent',checkout:'InitiateCheckout',lead:'Lead'}[kind];
  try{if(C.gtm||C.ga4)gtag('event',ga,Object.assign({currency:'INR',value:d.price||0,items:d.id?[item]:undefined},p));}catch(e){}
  try{if(C.metaPixel&&window.fbq)fbq('track',fb,{content_ids:d.id?[d.id]:undefined,content_name:d.name,value:d.price||0,currency:'INR'});}catch(e){}
  if(C.gtm)dataLayer.push(Object.assign({event:'vca_'+kind},item,p));};
 document.addEventListener('DOMContentLoaded',function(){
  if(!consent()&&(C.ga4||C.gtm||C.metaPixel)){var b=document.createElement('div');b.className='consent';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie consent');
   b.innerHTML='<b>Cookies and measurement</b><br>We use analytics and advertising cookies (Google Analytics, Meta Pixel) to understand visits and measure ads. Nothing loads unless you accept. <a href="/privacy/">Privacy</a><div class="row"><button class="btn small" id="cAcc">Accept</button><button class="btn small line" id="cDec">Decline</button></div>';
   document.body.appendChild(b);
   document.getElementById('cAcc').onclick=function(){try{localStorage.setItem('vca_consent','yes');}catch(e){}b.remove();startTrackers();};
   document.getElementById('cDec').onclick=function(){try{localStorage.setItem('vca_consent','no');}catch(e){}b.remove();};}
  var mb=document.getElementById('menuBtn'),nv=document.getElementById('nav');
  if(mb)mb.addEventListener('click',function(){var o=nv.classList.toggle('open');mb.setAttribute('aria-expanded',o);});
  document.querySelectorAll('[data-vca-view]').forEach(function(e){VCA.track('view',{id:e.dataset.vcaView,name:e.dataset.name,price:+e.dataset.price||0});});
  document.addEventListener('click',function(ev){var a=ev.target.closest('[data-vca-buy],[data-vca-lead]');if(!a)return;
   if(a.dataset.vcaBuy)VCA.track('checkout',{id:a.dataset.vcaBuy,name:a.dataset.name,price:+a.dataset.price||0});else VCA.track('lead',{id:a.dataset.vcaLead});});
 });
 /* append UTM to outgoing buy links so the checkout script can see the campaign */
 document.addEventListener('click',function(ev){var a=ev.target.closest('a[data-vca-buy]');if(!a)return;var u=utm();if(!Object.keys(u).length||a.href.indexOf('utm_')>-1)return;
  try{var x=new URL(a.href);Object.keys(u).forEach(function(k){x.searchParams.set(k,u[k]);});a.href=x.toString();}catch(e){}},true);
})();
