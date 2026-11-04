/* VCA: "Add to phone" banner. Uses the browser's own install prompt where available (Android Chrome), else shows simple steps. No data is collected. */
(function(){
 try{
  var standalone=(window.matchMedia&&matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;
  if(standalone)return;
  var KEY='vca_install_hide';
  try{var t=+localStorage.getItem(KEY)||0;if(Date.now()-t<3*864e5)return;}catch(e){}
  var ua=navigator.userAgent||'',isIOS=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1),isAnd=/Android/i.test(ua);
  var dp=null;
  window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;});
  window.addEventListener('appinstalled',function(){var b=document.getElementById('vcaInstall');if(b)b.remove();});
  var css='#vcaInstall{margin:0;padding:12px 16px;background:linear-gradient(90deg,#0b1636,#1c2f6b);color:#fff;border-bottom:3px solid #f5a623;font:600 15px/1.35 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;position:relative;z-index:5}'+
  '#vcaInstall .vi-row{max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px}'+
  '#vcaInstall .vi-ic{width:44px;height:44px;border-radius:10px;flex:none;background:#fff}'+
  '#vcaInstall .vi-tx{flex:1 1 220px;min-width:0}#vcaInstall .vi-tx b{display:block;font-size:1.05em;color:#ffc857}#vcaInstall .vi-tx span{color:#dfe6fb;font-weight:500;font-size:.92em}'+
  '#vcaInstall button.vi-go{font:800 15px system-ui,sans-serif;background:#f5a623;color:#0b1636;border:0;border-radius:10px;padding:11px 18px;cursor:pointer;white-space:nowrap}'+
  '#vcaInstall button.vi-x{background:none;border:0;color:#cdd8f3;font-size:22px;line-height:1;cursor:pointer;padding:4px 8px}'+
  '#vcaInstall .vi-help{display:none;max-width:1100px;margin:10px auto 0;background:#fff;color:#0b1636;border-radius:12px;padding:12px 16px;font-weight:600}#vcaInstall .vi-help ol{margin:6px 0 0 18px;padding:0}#vcaInstall .vi-help li{margin:3px 0}'+
  '@media(max-width:520px){#vcaInstall button.vi-go{width:100%}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
  var d=document.createElement('div');d.id='vcaInstall';d.setAttribute('role','region');d.setAttribute('aria-label','Add VCA to your phone');
  d.innerHTML='<div class="vi-row"><img class="vi-ic" src="/assets/icon-192.png" alt="" width="44" height="44"><div class="vi-tx"><b>📲 Keep VCA CBT on your phone</b><span>Add it to your home screen: opens like an app, one tap to your tests. Free, no Play Store needed.</span></div><button class="vi-go" type="button">Add to Home Screen</button><button class="vi-x" type="button" aria-label="Hide">×</button></div><div class="vi-help" id="viHelp"></div>';
  var host=document.querySelector('main')||document.querySelector('.wrap')||document.body;
  host.insertBefore(d,host.firstChild);
  var help=d.querySelector('#viHelp');
  function steps(){
   if(isIOS)return '<b>On iPhone (Safari):</b><ol><li>Tap the <b>Share</b> button (square with an arrow) at the bottom of Safari.</li><li>Scroll down and tap <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. The VCA icon now sits on your home screen.</li></ol>';
   if(isAnd)return '<b>On Android (Chrome):</b><ol><li>Tap the <b>⋮</b> menu at the top-right of Chrome.</li><li>Tap <b>Install app</b> (or <b>Add to Home screen</b>).</li><li>Tap <b>Install</b>. The VCA icon now sits on your home screen.</li></ol>';
   return '<b>On your phone:</b><ol><li>Open vcakota.com in Chrome (Android) or Safari (iPhone).</li><li>Android: menu ⋮ → <b>Install app</b>. iPhone: Share → <b>Add to Home Screen</b>.</li></ol>';
  }
  d.querySelector('.vi-go').onclick=function(){
   if(dp){dp.prompt();dp.userChoice.then(function(){dp=null;}).catch(function(){});if(window.VCA&&VCA.track)try{VCA.track('lead',{id:'install_prompt',name:'Install app'});}catch(e){}return;}
   help.innerHTML=steps();help.style.display=help.style.display==='block'?'none':'block';
  };
  d.querySelector('.vi-x').onclick=function(){d.remove();try{localStorage.setItem(KEY,String(Date.now()));}catch(e){}};
 }catch(e){}
})();
