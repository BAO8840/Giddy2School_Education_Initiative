(function(){
'use strict';
var CFG={donate:'https://give-usa.keela.co/giddy2school-education-initiative-donate-page',data:'data/raised.json',goal:5000,threshold:500,end:'2026-11-30T23:59:59+01:00',poll:60000};
var C=2*Math.PI*88,$=function(i){return document.getElementById(i)},shown=0,first=true,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('[data-donate]').forEach(function(a){a.href=CFG.donate;a.target='_blank';a.rel='noopener noreferrer'});
var bg=$('burger'),nv=$('nav');bg.addEventListener('click',function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
var money=function(n){return '$'+Math.round(n).toLocaleString('en-US')};
var arc=$('arc');arc.setAttribute('stroke-dasharray',C);arc.setAttribute('stroke-dashoffset',C);
function paint(v){var p=Math.min(1,v/CFG.goal);$('total').textContent=money(v);arc.setAttribute('stroke-dashoffset',C*(1-p));$('fill').style.width=(p*100)+'%';$('pct').textContent=Math.round(v/CFG.goal*100)+'%';$('ringpct').textContent=Math.round(v/CFG.goal*100)+'%';$('left').textContent=money(Math.max(0,CFG.goal-v));
  document.querySelectorAll('.mk').forEach(function(m){var t=+m.dataset.v;m.style.left=(t/CFG.goal*100)+'%';var hit=t===CFG.threshold?v>t:v>=t;if(hit&&!m.classList.contains('hit'))m.classList.add('hit');if(!hit)m.classList.remove('hit')})}
function run(to){var from=shown,t0=null,d=reduce?1:(first?2200:1400);function f(ts){t0=t0||ts;var k=Math.min(1,(ts-t0)/d),e=1-Math.pow(1-k,4);paint(from+(to-from)*e);if(k<1){requestAnimationFrame(f)}else{shown=to;if(!first&&to>from){var el=$('total');el.classList.remove('pop');void el.offsetWidth;el.classList.add('pop')}first=false}}requestAnimationFrame(f)}
function ago(iso){var s=(Date.now()-new Date(iso))/1000;if(!isFinite(s)||s<0)return '';if(s<90)return 'just now';if(s<3600)return Math.round(s/60)+' minutes ago';if(s<86400)return Math.round(s/3600)+' hours ago';return Math.round(s/86400)+' days ago'}
function render(d){var v=Math.max(0,Number(d.raised)),n=d.donors==null?null:Math.max(0,Math.floor(Number(d.donors)));if(!isFinite(v))throw 0;
  var m=$('msg');m.textContent=v>CFG.goal-1e-9?'Goal reached. Thank you! Every further gift keeps this work going.':v>CFG.threshold?'The matching threshold has been passed. '+money(CFG.goal-v)+' to go to reach our full goal.':v>0?money(CFG.threshold-v+1)+' more brings us past the matching threshold.':'We are just getting started. Be the first to give.';
  if(n==null||!isFinite(n)){$('donorcard').hidden=true}else{$('donorcard').hidden=false;$('donors').textContent=n.toLocaleString('en-US')}
  var u=$('upd');u.classList.remove('err');u.textContent=d.updated?'Confirmed figure updated '+ago(d.updated)+'.':'';
  $('ringbox').setAttribute('aria-label',Math.round(v/CFG.goal*100)+'% of the fundraising goal');
  document.getElementById('wa').href='https://wa.me/?text='+encodeURIComponent('Giddy2School has raised '+money(v)+' of its $5,000 goal this November. Donate or share: '+CFG.donate);
  if(v!==shown||first)run(v)}
function load(){fetch(CFG.data+'?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(render).catch(function(){var u=$('upd');u.classList.add('err');u.textContent='Live total temporarily unavailable. Showing the last known figure.';if(first){$('msg').textContent='The live figure could not be loaded right now.';first=false}})}
var left=Math.ceil((new Date(CFG.end)-new Date())/864e5);$('days').textContent=left>0?left:'0';
paint(0);load();setInterval(load,CFG.poll);document.addEventListener('visibilitychange',function(){if(!document.hidden)load()});
})();
