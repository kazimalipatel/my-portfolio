// Mobile menu
const menu=document.getElementById('menu'),btn=document.getElementById('menuBtn');
btn.addEventListener('click',()=>{const o=menu.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded',false)}));

// Typing effect
const roles=['BCA IT Student','Quick Learner','Aspiring IT Professional'];
const el=document.getElementById('typed');
const still=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(still){el.textContent=roles[0]}else{
  let r=0,i=0,del=false;
  (function tick(){
    const w=roles[r];
    el.textContent=w.slice(0,i);
    if(!del&&i===w.length){del=true;return setTimeout(tick,1500)}
    if(del&&i===0){del=false;r=(r+1)%roles.length}
    i+=del?-1:1;
    setTimeout(tick,del?40:80);
  })();
}

// Active nav link + back to top
const links=[...menu.querySelectorAll('a')];
const secs=links.map(a=>document.querySelector(a.getAttribute('href')));
const topBtn=document.getElementById('top');
function onScroll(){
  const y=scrollY+120;
  let cur=0;secs.forEach((s,i)=>{if(s.offsetTop<=y)cur=i});
  links.forEach((a,i)=>a.classList.toggle('active',i===cur));
  topBtn.classList.toggle('show',scrollY>500);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Contact form -> mailto
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const n=name.value.trim(),m=email.value.trim(),t=msg.value.trim(),note=document.getElementById('formNote');
  if(!n||!/^\S+@\S+\.\S+$/.test(m)||!t){note.textContent='Please fill in your name, a valid email and a message.';return}
  const body=encodeURIComponent(t+'\n\n'+n+' ('+m+')');
  location.href='mailto:patelkazimali@gmail.com?subject='+encodeURIComponent('Portfolio message from '+n)+'&body='+body;
  note.textContent='Opening your email app...';
});

document.getElementById('year').textContent=new Date().getFullYear();