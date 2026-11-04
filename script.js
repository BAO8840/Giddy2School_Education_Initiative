(function(){
'use strict';
var CONFIG={donateUrl:'https://give-usa.keela.co/giddy2school-education-initiative-donate-page',goal:5000,campaignEnd:'2026-11-30T23:59:59+01:00',acct:'6810797904'};
var $=function(s,c){return(c||document).querySelectorAll(s)};
$('[data-donate]').forEach(function(a){a.href=CONFIG.donateUrl;a.target='_blank';a.rel='noopener noreferrer'});
var hd=document.getElementById('top');addEventListener('scroll',function(){hd.classList.toggle('sc',scrollY>10)},{passive:true});
var bg=document.getElementById('burger'),nv=document.getElementById('nav');
bg.addEventListener('click',function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
$('#nav a').forEach(function(a){a.addEventListener('click',function(){nv.classList.remove('open');bg.setAttribute('aria-expanded',false)})});
fetch('data/raised.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.json()}).then(function(d){var v=Number(d.raised);if(!isFinite(v)||v<=0)return;var p=Math.min(100,Math.round(v/CONFIG.goal*100));document.getElementById('barWrap').hidden=false;document.getElementById('raisedTxt').textContent='$'+Math.round(v).toLocaleString('en-US')+' raised of $'+CONFIG.goal.toLocaleString('en-US')+' ('+p+'%)';setTimeout(function(){document.getElementById('bar').style.width=p+'%'},300)}).catch(function(){});
var left=Math.ceil((new Date(CONFIG.campaignEnd)-new Date())/864e5);if(left>0&&left<=60)document.getElementById('days').textContent=left+(left===1?' day':' days')+' left in the campaign.';
// Need band: crossfading slideshow
var band=document.getElementById('need'),idx=0,n=5,timer,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function show(i){idx=(i+n)%n;$('[data-i]',band).forEach(function(e){e.classList.toggle('on',+e.dataset.i===idx)});$('.dots button',band).forEach(function(b){b.classList.remove('on');void b.offsetWidth;b.classList.toggle('on',+b.dataset.go===idx)})}
function start(){if(reduce)return;clearInterval(timer);timer=setInterval(function(){show(idx+1)},7000)}
$('.dots button',band).forEach(function(b){b.addEventListener('click',function(){show(+b.dataset.go);start()})});
band.addEventListener('mouseenter',function(){clearInterval(timer);band.classList.add('paused')});band.addEventListener('mouseleave',function(){band.classList.remove('paused');start()});
if('IntersectionObserver' in window){new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){start()}else{clearInterval(timer)}})},{threshold:.25}).observe(band)}else{start()}
// Reveal + counters
var cnt=function(el){var t=+el.dataset.n,s=el.dataset.s||'',d=1400,t0=null;if(reduce){el.textContent=t.toLocaleString('en-US')+s;return}
function f(ts){t0=t0||ts;var k=Math.min(1,(ts-t0)/d);el.textContent=Math.round(t*(1-Math.pow(1-k,3))).toLocaleString('en-US')+(k===1?s:'');if(k<1)requestAnimationFrame(f)}requestAnimationFrame(f)};
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});$('.rv').forEach(function(e){io.observe(e)});
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){cnt(e.target);io2.unobserve(e.target)}})},{threshold:.6});$('[data-n]').forEach(function(e){io2.observe(e)})}
else{$('.rv').forEach(function(e){e.classList.add('in')});$('[data-n]').forEach(cnt)}
// Share + copy
var msg='Giddy2School is raising $5,000 this November, with up to $5,000 in matching funds, for education and skills for underserved children. Donate or share: '+CONFIG.donateUrl;
document.getElementById('wa').href='https://wa.me/?text='+encodeURIComponent(msg);
function cp(btn,txt,label){var ok=function(){btn.textContent='Copied';setTimeout(function(){btn.textContent=label},2000)};if(navigator.clipboard){navigator.clipboard.writeText(txt).then(ok)}else{window.prompt('Copy this',txt)}}
document.getElementById('copy').addEventListener('click',function(){cp(this,CONFIG.donateUrl,'Copy link')});
document.getElementById('acct').addEventListener('click',function(){cp(this,CONFIG.acct,'Copy account number')});
})();
