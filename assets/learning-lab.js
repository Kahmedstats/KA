/* Kawsar Ahmed / Interactive Statistics & Learning Lab.
   Mathematical models are educational. No tracking, dependencies or personal data.
   Native SVG is used instead of images copied from the supplied books. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
if (!$('labChart')) return;
const NS='http://www.w3.org/2000/svg';
const palette={blue:'#3c7ea3',green:'#168771',purple:'#8377b0',gray:'#97a7b7'};
const W=700, left=48, right=666, top=30, bottom=245, width=right-left, height=bottom-top;
const fmt=(v,n=1)=>Number(v).toFixed(n);
const svgEl=(tag, attrs={}, parent) => {const e=document.createElementNS(NS,tag); for(const [k,v] of Object.entries(attrs))e.setAttribute(k,String(v)); (parent||null)?.appendChild(e);return e;};
const sx=(x,a,b)=>left+(x-a)/(b-a)*width;
const sy=(y,max)=>bottom-(y/max)*height*.85;
function clear(s){s.replaceChildren();}
function scaffold(svg,xmin,xmax,discrete=false){
  for(let i=0;i<5;i++){const x=left+i*width/4;svgEl('line',{x1:x,y1:top,x2:x,y2:bottom,stroke:'currentColor','stroke-opacity':'.085','stroke-dasharray':'4 7'},svg);}
  for(let i=0;i<4;i++){let y=bottom-i*(bottom-top)/3;svgEl('line',{x1:left,y1:y,x2:right,y2:y,stroke:'currentColor','stroke-opacity':'.09'},svg);}
  svgEl('line',{x1:left,y1:bottom,x2:right,y2:bottom,stroke:'currentColor','stroke-opacity':'.45','stroke-width':'1.2'},svg);
  for(let i=0;i<=4;i++){let val=xmin+(xmax-xmin)*i/4;let t=svgEl('text',{x:sx(val,xmin,xmax),'text-anchor':'middle',y:bottom+22},svg);t.textContent=discrete?Math.round(val):Number(val.toFixed(2));}
}
function curvePath(f,lo,hi,ymax){const points=[];for(let i=0;i<=190;i++){const x=lo+(hi-lo)*i/190;points.push([sx(x,lo,hi),sy(f(x),ymax)]);}return {line:'M'+points.map(p=>p.join(',')).join('L'),fill:'M'+left+','+bottom+'L'+points.map(p=>p.join(',')).join('L')+'L'+right+','+bottom+'Z'};}
function drawPath(svg,d,color,fill,opacity=.16,dash=''){return svgEl('path',{d,fill:fill?color:'none','fill-opacity':fill?opacity:0,stroke:fill?'none':color,'stroke-width':fill?0:3,'stroke-linejoin':'round','stroke-linecap':'round',...(dash?{'stroke-dasharray':dash}:{})},svg);}
function gaussian(x,mean,sd){const z=(x-mean)/sd;return Math.exp(-.5*z*z)/(sd*Math.sqrt(2*Math.PI));}
function erf(x){const sign=x<0?-1:1;x=Math.abs(x);const t=1/(1+.3275911*x);return sign*(1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x));}
function normcdf(x){return .5*(1+erf(x/Math.SQRT2));}
function choose(n,k){if(k<0||k>n)return 0;let z=1;for(let i=1;i<=k;i++)z=z*(n-i+1)/i;return z;}
function poisson(k,lambda){let z=Math.exp(-lambda);for(let i=1;i<=k;i++)z*=lambda/i;return z;}
function label(svg,text,x,y,anchor='start'){let t=svgEl('text',{x,y,'text-anchor':anchor},svg);t.textContent=text;return t;}
const state={anim:0,playing:!window.matchMedia('(prefers-reduced-motion: reduce)').matches, raf:0,last:0,lastDraw:0,visible:false};
function halt(){state.playing=false;cancelAnimationFrame(state.raf);state.raf=0;$('labAnimate').textContent='▶ Animate';}
function updateLabels(){for(const id of ['labMean','labSd','labCutoff','labTrials','labProb','labLambda','labSampleN']){const ctl=$(id);$(id+'Value').textContent=id==='labProb'?fmt(ctl.value,2):['labMean','labSd','labCutoff','labLambda'].includes(id)?fmt(ctl.value):ctl.value;}}
function distDraw(){
 const chart=$('labChart');clear(chart);const fam=$('labFamily').value;
 let s1='',s2='',s3='';let explain='';
 if(fam==='normal'){
   const mu=Number($('labMean').value)+(state.playing?.19*Math.sin(state.anim):0),sd=Number($('labSd').value),cut=Number($('labCutoff').value),f=x=>gaussian(x,mu,sd),xMin=-5,xMax=5,yMax=.9;
   scaffold(chart,xMin,xMax);const path=curvePath(f,xMin,xMax,yMax);drawPath(chart,path.fill,palette.blue,true,.11);
   let shaded='M'+left+','+bottom;for(let i=0;i<=160;i++){const x=xMin+(Math.min(xMax,cut)-xMin)*i/160;shaded+='L'+sx(x,xMin,xMax)+','+sy(f(x),yMax);}shaded+='L'+sx(Math.min(xMax,Math.max(xMin,cut)),xMin,xMax)+','+bottom+'Z';drawPath(chart,shaded,palette.green,true,.3);drawPath(chart,path.line,palette.blue,false);
   const xcut=sx(cut,xMin,xMax);svgEl('line',{x1:xcut,x2:xcut,y1:top,y2:bottom,stroke:palette.green,'stroke-width':1.6,'stroke-dasharray':'5 5'},chart);label(chart,'x = '+fmt(cut),Math.min(right-16,Math.max(left+20,xcut)),top+13,'middle');
   s1='Mean μ';s2='Standard deviation σ';s3='P(X ≤ x)';$('labStatOne').textContent=fmt(mu,2);$('labStatTwo').textContent=fmt(sd,2);$('labStatThree').textContent=fmt(normcdf((cut-mu)/sd)*100,1)+'%';
   $('labChartHeading').textContent='Normal distribution · N(μ, σ²)';explain='The mean shifts the curve left or right; the standard deviation controls its spread. The green area is the cumulative probability P(X ≤ x), not the probability of one exact value.';
 }else{
   const n=fam==='binomial'?Number($('labTrials').value):Math.max(16,Math.ceil(Number($('labLambda').value)*2.4+6));
   const p=Number($('labProb').value),lambda=Number($('labLambda').value),items=[];
   for(let k=0;k<=n;k++)items.push(fam==='binomial'?choose(n,k)*Math.pow(p,k)*Math.pow(1-p,n-k):poisson(k,lambda));
   const ymax=Math.max(...items)*1.24;scaffold(chart,0,n,true);
   items.forEach((pr,k)=>{const x=sx(k,0,n);svgEl('line',{x1:x,x2:x,y1:bottom,y2:sy(pr,ymax),stroke:fam==='binomial'?palette.green:palette.purple,'stroke-width':Math.max(3,Math.min(20,width/(n+1)*.55)),'stroke-linecap':'round'},chart);});
   if(fam==='binomial'){$('labStatOne').textContent=fmt(n*p,2);$('labStatTwo').textContent=fmt(Math.sqrt(n*p*(1-p)),2);$('labStatThree').textContent=fmt(p*100,0)+'%';s1='Mean np';s2='SD √(np(1-p))';s3='Success probability p';$('labChartHeading').textContent='Binomial distribution · B(n, p)';explain='Each vertical mark shows the probability of exactly k successes in n independent trials with the same success probability p. Here the chart is a probability mass function (PMF).';}
   else{$('labStatOne').textContent=fmt(lambda,2);$('labStatTwo').textContent=fmt(Math.sqrt(lambda),2);$('labStatThree').textContent=fmt(items.reduce((a,b)=>a+b,0)*100,1)+'%';s1='Expected count λ';s2='SD √λ';s3='Mass shown on chart';$('labChartHeading').textContent='Poisson distribution · Poisson(λ)';explain='The Poisson model describes counts over an interval when events occur independently at a steady average rate. The vertical marks are probabilities of integer event counts.';}
 }
 $('labStatOneLabel').textContent=s1;$('labStatTwoLabel').textContent=s2;$('labStatThreeLabel').textContent=s3;$('labDistExplain').textContent=explain;
}
function switchFamily(){halt();$('labNormalControls').hidden=$('labFamily').value!=='normal';$('labBinomControls').hidden=$('labFamily').value!=='binomial';$('labPoissonControls').hidden=$('labFamily').value!=='poisson';updateLabels();distDraw();}
$('labFamily').addEventListener('change',switchFamily);
for(const id of ['labMean','labSd','labCutoff','labTrials','labProb','labLambda'])$(id).addEventListener('input',()=>{halt();updateLabels();distDraw();});
$('labAnimate').addEventListener('click',()=>{if(state.playing){halt();return;}if($('labFamily').value!=='normal'){$('labFamily').value='normal';switchFamily();}state.playing=true;$('labAnimate').textContent='Ⅱ Pause';state.last=0;start();});
$('labReset').addEventListener('click',()=>{halt();$('labFamily').value='normal';for(const [id,val] of Object.entries({labMean:0,labSd:1,labCutoff:.5,labTrials:12,labProb:.4,labLambda:4}))$(id).value=val;state.anim=0;switchFamily();});
function start(){if(!state.playing||document.hidden||!state.visible||$('labPanelDist').hidden||state.raf)return;state.raf=requestAnimationFrame(tick);}
function tick(now){state.raf=0;if(!state.playing||document.hidden||!state.visible)return;if(state.last)state.anim+=Math.min((now-state.last)/1000,.08)*1.1;state.last=now;if(now-state.lastDraw>42){state.lastDraw=now;if($('labPanelDist').hidden===false)distDraw();}start();}
document.addEventListener('visibilitychange',()=>{state.last=0;if(!document.hidden)start();});
if('IntersectionObserver' in window){new IntersectionObserver(entries=>{state.visible=entries.some(e=>e.isIntersecting);if(!state.visible){cancelAnimationFrame(state.raf);state.raf=0;state.last=0;}else start();},{threshold:.05}).observe($('statistics-live'));}else state.visible=true;
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');if(motion.addEventListener)motion.addEventListener('change',e=>{if(e.matches)halt();});

// Beta-Bernoulli updating: Alpha & Beta are positive integers, so normalization
// can be calculated via log factorials without external math libraries.
let successes=0,failures=0;
function logfact(n){let s=0;for(let i=2;i<=n;i++)s+=Math.log(i);return s;}
function betaPdf(x,a,b){if(x<=0||x>=1)return 0;return Math.exp((a-1)*Math.log(x)+(b-1)*Math.log(1-x)+logfact(a+b-1)-logfact(a-1)-logfact(b-1));}
function bayesDraw(){const [a,b]=$('labPrior').value.split(',').map(Number),A=a+successes,B=b+failures;const chart=$('labBayesChart');clear(chart);const funcs=[x=>betaPdf(x,a,b),x=>betaPdf(x,A,B)];const ymax=Math.max(3,...funcs.flatMap(f=>Array.from({length:101},(_,i)=>f(.001+.998*i/100))))*1.18;scaffold(chart,0,1);funcs.forEach((f,i)=>{let p=curvePath(f,0,1,ymax);drawPath(chart,p.fill,i?palette.green:palette.blue,true,i?.2:.065);drawPath(chart,p.line,i?palette.green:palette.blue,false,0,i?'':'8 5');});$('labObservationText').textContent=successes+' successes · '+failures+' failures';$('labPriorMean').textContent=fmt(a/(a+b)*100,1)+'%';$('labPostMean').textContent=fmt(A/(A+B)*100,1)+'%';$('labPredMean').textContent=fmt(A/(A+B)*100,1)+'%';$('labBayesExplain').textContent='After '+(successes+failures)+' observation(s), the prior Beta('+a+', '+b+') updates to Beta('+A+', '+B+'). The posterior mean is '+fmt(A/(A+B)*100,1)+'%. This follows from Bayes’ rule for independent binary observations.';}
$('labPrior').addEventListener('change',()=>{successes=failures=0;bayesDraw();});$('labSuccess').addEventListener('click',()=>{if(successes+failures<70)successes++;bayesDraw();});$('labFailure').addEventListener('click',()=>{if(successes+failures<70)failures++;bayesDraw();});$('labBayesReset').addEventListener('click',()=>{successes=failures=0;$('labPrior').value='2,2';bayesDraw();});
function sampleDraw(){const n=Number($('labSampleN').value),se=1/Math.sqrt(n),ref=1/Math.sqrt(5),chart=$('labSampleChart');clear(chart);const range=1.6,ymax=8.5;scaffold(chart,-range,range);[ref,se].forEach((sd,i)=>{const f=x=>gaussian(x,0,sd),p=curvePath(f,-range,range,ymax);drawPath(chart,p.fill,i?palette.green:palette.blue,true,i?.21:.09);drawPath(chart,p.line,i?palette.green:palette.blue,false,0,i?'':'8 5');});$('labSampleNValue').textContent=n;$('labSampleCount').textContent=n;$('labStdErr').textContent=fmt(se,3);$('labSampleCI').textContent=fmt(1.96*se,3);}
$('labSampleN').addEventListener('input',sampleDraw);$('labSampleReset').addEventListener('click',()=>{$('labSampleN').value=25;sampleDraw();});
// Keyboard-accessible tabs; tab selection does not change the page scroll.
const tabs=[['labTabDist','labPanelDist'],['labTabBayes','labPanelBayes'],['labTabSample','labPanelSample']];
function selectTab(i,focus=false){tabs.forEach(([btn,panel],j)=>{const selected=i===j;$(btn).setAttribute('aria-selected',String(selected));$(btn).classList.toggle('active',selected);$(btn).tabIndex=selected?0:-1;$(panel).hidden=!selected;});if(focus)$(tabs[i][0]).focus();if(i===0){distDraw();start();}if(i===1){cancelAnimationFrame(state.raf);state.raf=0;bayesDraw();}if(i===2){cancelAnimationFrame(state.raf);state.raf=0;sampleDraw();}}
tabs.forEach(([id],i)=>{$(id).addEventListener('click',()=>selectTab(i));$(id).addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const dir=e.key==='ArrowLeft'?-1:1;const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+dir+tabs.length)%tabs.length;selectTab(next,true);});});
updateLabels();distDraw();bayesDraw();sampleDraw();$('labAnimate').textContent=state.playing?'Ⅱ Pause':'▶ Animate';start();
})();
