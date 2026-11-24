(() => {
'use strict';
const data=window.ACTIVITY_DATA, total=data.questions.length;
const panel=document.querySelector('#panel'),stage=document.querySelector('#stage'),notice=document.querySelector('#size-notice'),announcer=document.querySelector('#announcer'),motion=document.querySelector('#motion');
const media=matchMedia('(prefers-reduced-motion: reduce)');
const state={mode:'cover',current:0,answers:Array(total).fill(null),pendingMessage:'',manualReduced:false,blocked:false};
let autoTimer=null,transitionTimer=null,entry=null,exit=null,locked=false;
const reduced=()=>media.matches||state.manualReduced;
const arrow=(back=false)=>`<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M${back?'37':'11'} 24H${back?'11':'37'}m${back?'12':'-12'}-12 ${back?'-12':'12'} 12 ${back?'12':'-12'} 12"/></svg>`;
const answered=()=>state.answers.filter(x=>x!==null).length;
function cancelAuto(){clearTimeout(autoTimer);autoTimer=null;}
function progress(review=false){return `<div class="pips" role="group" aria-label="${review?'Revisar pregunta':'Ir a la pregunta'}">${data.questions.map((q,i)=>`<button class="pip ${state.answers[i]!==null?'answered':''}" data-go="${i}" aria-label="Pregunta ${i+1}${state.answers[i]!==null?', respondida':', pendiente'}"${state.current===i?' aria-current="step"':''}>${i+1}</button>`).join('')}</div>`;}
function navigation(review=false){return `<nav class="nav" aria-label="Navegación de preguntas"><button class="secondary" data-action="previous"${state.current===0?' disabled':''}>${arrow(true)}Anterior</button>${progress(review)}<button class="secondary" data-action="next">${state.current===total-1?(review?'Resultados':'Finalizar'):'Siguiente'}${arrow()}</button></nav>`;}
function cover(){return `<section class="scene cover" aria-labelledby="title"><p class="eyebrow reveal">SELECCIÓN ÚNICA · 5 PREGUNTAS</p><h1 class="reveal" id="title" data-source="p1">${data.title.replace('autoevaluación','<em>autoevaluación</em>')}</h1><img class="hero reveal" src="src/seleccion-estudiante.webp" alt="Estudiante universitario compara dos fichas de observación junto a sus materiales de estudio" width="650" height="550"><p class="instruction reveal" data-source="p2">${data.instruction}</p><p class="operational reveal">Avanzas al elegir una opción. Puedes volver para modificar tus respuestas. Los resultados aparecen al completar las cinco preguntas.</p><button class="primary start reveal" data-action="start">Comenzar${arrow()}</button></section>`;}
function question(){const q=data.questions[state.current],a=state.answers[state.current];return `<section class="scene question" data-question="${q.id}" aria-labelledby="question"><div class="meta-line reveal"></div><p class="eyebrow reveal">PREGUNTA ${String(q.id).padStart(2,'0')} / 05</p><p class="progress-text reveal">${answered()} de 5 respondidas</p><h1 class="statement reveal" id="question" tabindex="-1" data-source="${q.marker}">${q.html}</h1><div class="choices" role="group" aria-label="Elige una sola opción">${q.options.map((option,i)=>`<button class="choice reveal" data-answer="${i}" aria-pressed="${a===i}"><span data-source="${option.marker}">${option.html}</span></button>`).join('')}</div><p class="confirmation" role="status">${state.pendingMessage||(a!==null?'<span class="dot" aria-hidden="true"></span>Respuesta registrada':'Selecciona una opción para continuar.')}</p>${navigation()}</section>`;}
function result(){const count=state.answers.filter((a,i)=>a===data.questions[i].key).length,percent=count/total*100;const message=count===total?'Has completado la evaluación con todos los aciertos.':count===0?'La revisión te permite consultar cada respuesta y su explicación.':'Consulta tus aciertos y errores para continuar aprendiendo.';return `<section class="scene results" aria-labelledby="result-title"><p class="eyebrow reveal">EVALUACIÓN COMPLETADA</p><h1 class="result-title reveal" id="result-title" tabindex="-1">Cada elección,<br><em>un aprendizaje.</em></h1><p class="result-copy reveal">${count} ${count===1?'acierto':'aciertos'} de 5 preguntas.<br>${percent}% de respuestas correctas.</p><p class="result-message reveal">${message}</p><div class="score-figure reveal" role="img" aria-label="${percent} por ciento de aciertos"><svg viewBox="0 0 530 530" aria-hidden="true"><circle class="score-bg" cx="265" cy="265" r="220"/><circle class="score-ring" cx="265" cy="265" r="220"/></svg><div class="score-number" aria-hidden="true"><b id="score-count">${percent}</b>%<span>ACIERTOS</span></div></div><p class="score-caption reveal">5 / 5 RESPONDIDAS</p><div class="reward" aria-hidden="true">${Array.from({length:count*2},(_,i)=>`<i style="left:${(i*53)%530}px;top:${(i*89)%550}px"></i>`).join('')}</div><div class="result-actions"><button class="primary reveal" data-action="review">Revisar respuestas${arrow()}</button><button class="secondary reveal" data-action="retry">Intentar nuevamente</button></div></section>`;}
function review(){const q=data.questions[state.current],a=state.answers[state.current],correct=a===q.key;return `<section class="scene review" aria-labelledby="question"><div class="meta-line reveal"></div><p class="eyebrow reveal">REVISIÓN ${String(q.id).padStart(2,'0')} / 05</p><button class="secondary results-back" data-action="results">Volver a resultados</button><h1 class="statement reveal" id="question" tabindex="-1" data-source="${q.marker}">${q.html}</h1><div class="review-status reveal"><span class="badge ${correct?'':'incorrect'}">${correct?'Acierto':'Por revisar'}</span><span>Tu respuesta: ${"ABCD"[a]}</span><span class="key" data-source="${q.keyMarker}">${q.keyHtml}</span></div><p class="review-answer reveal"><span class="label">OPCIÓN CORRECTA</span>${q.options[q.key].html}</p><p class="feedback reveal" data-source="${q.feedbackMarker}">${q.feedback}</p>${navigation(true)}</section>`;}
function enter(focus=true){
 entry?.kill();locked=false;const reveal=panel.querySelectorAll('.reveal');
 if(reduced()){gsap.set(reveal,{autoAlpha:1,clearProps:'transform,clipPath'});}
 else{
  gsap.set(reveal,{autoAlpha:0,y:20});entry=gsap.timeline();
  entry.to(reveal,{autoAlpha:1,y:0,duration:.48,stagger:.055,ease:'power2.out'});
  if(state.mode==='cover'){gsap.set('.hero',{clipPath:'inset(0 0 100% 0)',y:0});entry.to('.hero',{clipPath:'inset(0 0 0% 0)',duration:.7,ease:'power3.out'},.13);}
  if(panel.querySelector('.meta-line'))entry.fromTo('.meta-line',{scaleX:0},{scaleX:1,duration:.55,ease:'power2.out'},0);
 }
 if(state.mode==='results'){
  const value=state.answers.filter((a,i)=>a===data.questions[i].key).length/total*100;
  if(reduced()){gsap.set('.score-ring',{strokeDashoffset:1382.301*(1-value/100)});}
  else{const counter={n:0};gsap.to('.score-ring',{strokeDashoffset:1382.301*(1-value/100),duration:1,ease:'power2.out',delay:.25});gsap.to(counter,{n:value,duration:1,delay:.25,onUpdate:()=>{const el=document.querySelector('#score-count');if(el)el.textContent=Math.round(counter.n)}});if(panel.querySelector('.reward i'))gsap.fromTo('.reward i',{autoAlpha:0,scale:0},{autoAlpha:.8,scale:1,duration:.4,stagger:.04,yoyo:true,repeat:1,delay:.4,ease:'power2.out'});}
 }
 if(focus&&!state.blocked){const target=panel.querySelector('[tabindex="-1"]');target?.focus({preventScroll:true});}
 announcer.textContent=state.mode==='question'?`Pregunta ${state.current+1} de 5. ${answered()} respondidas.`:state.mode==='results'?'Evaluación completada. Resultados disponibles.':state.mode==='review'?`Revisión de la pregunta ${state.current+1}.`:'';
}
function render(focus=true){panel.innerHTML=state.mode==='cover'?cover():state.mode==='question'?question():state.mode==='results'?result():review();enter(focus);}
function move(action,{auto=false}={}){
 if(locked||state.blocked)return;
 cancelAuto();locked=true;entry?.kill();gsap.killTweensOf(panel.querySelectorAll('*'));
 const duration=reduced()?0:100;
 const finish=()=>{action();render();};
 if(duration){exit=gsap.to(panel.querySelector('.scene'),{autoAlpha:0,y:-12,duration:.10,ease:'power1.in',onComplete:finish});}else finish();
}
function completeOrPending(){const pending=state.answers.findIndex(a=>a===null);if(pending>=0){state.current=pending;state.mode='question';state.pendingMessage='Queda esta pregunta pendiente. Selecciona una respuesta.';}else{state.mode='results';state.pendingMessage='';}}
function choose(value){
 if(state.mode!=='question'||locked||state.blocked||autoTimer)return;
 state.answers[state.current]=value;state.pendingMessage='';
 panel.querySelectorAll('[data-answer]').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.dataset.answer===String(value)));btn.disabled=true;});
 panel.querySelector('.confirmation').innerHTML='<span class="dot" aria-hidden="true"></span>Respuesta registrada';
 panel.querySelector('.progress-text').textContent=`${answered()} de 5 respondidos`;
 const pip=panel.querySelector(`[data-go="${state.current}"]`);pip.classList.add('answered');pip.setAttribute('aria-label',`Pregunta ${state.current+1}, respondida`);
 if(!reduced())gsap.fromTo(panel.querySelector(`[data-answer="${value}"]`),{scale:.8},{scale:1,duration:.3,ease:'back.out(1.5)'});
 announcer.textContent='Respuesta registrada.';
 const questionIndex=state.current;
 autoTimer=setTimeout(()=>{autoTimer=null;if(state.mode!=='question'||state.current!==questionIndex||state.blocked)return;move(()=>{if(state.current===total-1)completeOrPending();else{state.current++;state.pendingMessage='';}},{auto:true});},reduced()?650:550);
}
function manual(action){cancelAuto();panel.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false);move(action);}
panel.addEventListener('click',event=>{const btn=event.target.closest('button');if(!btn||btn.disabled)return;
 if(btn.hasAttribute('data-answer')){choose(Number(btn.dataset.answer));return;}
 if(btn.hasAttribute('data-go')){const index=Number(btn.dataset.go);manual(()=>{state.current=index;state.pendingMessage='';});return;}
 const action=btn.dataset.action;
 if(action==='start')move(()=>{state.mode='question';state.current=0;});
 if(action==='previous')manual(()=>{state.current=Math.max(0,state.current-1);state.pendingMessage='';});
 if(action==='next')manual(()=>{state.pendingMessage='';if(state.current===total-1){if(state.mode==='review')state.mode='results';else completeOrPending();}else state.current++;});
 if(action==='review')move(()=>{state.mode='review';state.current=0;});
 if(action==='results')move(()=>{state.mode='results';});
 if(action==='retry')manual(()=>{state.answers=Array(total).fill(null);state.current=0;state.pendingMessage='';state.mode='question';});
});
document.addEventListener('keydown',event=>{if(state.blocked||locked||!['question','review'].includes(state.mode))return;if(event.key==='ArrowLeft'&&state.current>0){event.preventDefault();panel.querySelector('[data-action=previous]').click();}if(event.key==='ArrowRight'){event.preventDefault();panel.querySelector('[data-action=next]').click();}});
function fit(){const scale=Math.min(innerWidth/1920,innerHeight/1080);stage.style.transform=`translate(${(innerWidth-1920*scale)/2}px,${(innerHeight-1080*scale)/2}px) scale(${scale})`;const blocked=scale<.36;if(blocked!==state.blocked){state.blocked=blocked;notice.hidden=!blocked;stage.inert=blocked;stage.setAttribute('aria-hidden',String(blocked));if(blocked){cancelAuto();panel.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false);}else if(state.mode!=='cover')panel.querySelector('[tabindex="-1"]')?.focus({preventScroll:true});}}
addEventListener('resize',fit);addEventListener('orientationchange',fit);document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAuto();panel.querySelectorAll('[data-answer]').forEach(b=>b.disabled=false);}});
motion.addEventListener('click',()=>{state.manualReduced=!state.manualReduced;motion.setAttribute('aria-pressed',String(state.manualReduced));motion.setAttribute('aria-label',state.manualReduced?'Restablecer movimiento':'Reducir movimiento');entry?.kill();gsap.set(panel.querySelectorAll('.reveal'),{autoAlpha:1,clearProps:'transform,clipPath'});});
media.addEventListener('change',()=>{entry?.kill();gsap.set(panel.querySelectorAll('.reveal'),{autoAlpha:1,clearProps:'transform,clipPath'});});
fit();Promise.all([document.fonts.ready,new Promise(resolve=>{const im=new Image();im.onload=resolve;im.onerror=resolve;im.src='src/seleccion-estudiante.webp';})]).then(()=>render(false));
})();
