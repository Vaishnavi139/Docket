
(function(){
"use strict";
var MARK='<svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="var(--brand)"/><path d="M10.5 9.5v13h4a6.5 6.5 0 0 0 0-13z" stroke="var(--on-brand)" stroke-width="2.4" fill="none" stroke-linejoin="round"/><circle cx="15" cy="16" r="1.6" fill="var(--on-brand)"/></svg>';
var X='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg>';
var OK='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Sample catalog (all made up) ---------- */
var RAW=[
["report","Monthly Capital Position Report","Summarizes capital ratios against internal thresholds, with month-over-month movement and commentary.","Capital Reporting","Monthly","Due by the 5th business day of each month.","capital ratio threshold position monthly"],
["report","Liquidity Coverage Snapshot","A daily view of high-quality liquid assets against expected 30-day outflows.","Liquidity Reporting","Daily","Published by 9:00 AM each business day.","liquidity coverage assets outflows daily"],
["report","Counterparty Exposure Report","Lists the largest exposures by counterparty, with limits and utilization.","Risk Reporting","Weekly","Published every Monday.","counterparty exposure limits utilization risk"],
["report","Large Exposure Filing","Quarterly filing of credit exposures above internal size thresholds, with supporting schedules.","Risk Reporting","Quarterly","Due 30 days after quarter end.","large exposure filing credit quarterly schedules"],
["report","Loan Loss Reserve Summary","Shows reserve balances, movements, and coverage by portfolio.","Finance Reporting","Quarterly","Due 15 days after quarter close.","loan loss reserve allowance portfolio coverage"],
["report","Funding Mix Report","Breaks down funding sources by type, cost, and maturity.","Treasury Reporting","Monthly","Due by the 8th business day.","funding mix sources maturity cost treasury"],
["report","Deposit Concentration Report","Flags deposit balances concentrated in a small number of customers or segments.","Treasury Reporting","Monthly","Due by the 10th business day.","deposit concentration customers segments"],
["report","Interest Rate Sensitivity Report","Estimates how earnings and value change when interest rates move.","Market Risk Reporting","Monthly","Due by the 12th business day.","interest rate sensitivity earnings value market"],
["report","Attestation Status Report","Shows which reports have been attested by their owners this cycle and which are outstanding.","Reporting Governance","Monthly","Refreshed on the 1st of each month.","attestation status owners cycle outstanding"],
["report","Data Quality Exceptions Report","Lists records that failed validation checks, with the source system and owner.","Data Governance","Daily","Published each morning.","data quality exceptions validation failed"],
["report","Stress Scenario Summary","Summarizes how key ratios hold up under the standard stress scenarios.","Capital Reporting","Quarterly","Due 25 days after quarter end.","stress scenario ratios capital quarterly test"],
["dashboard","Reporting Command Center","One place to see the status of every filing: on track, at risk, or late.","Reporting Governance","Live","Refreshes every 15 minutes.","status filings overview command center track late"],
["dashboard","Filing Calendar Dashboard","A calendar of upcoming due dates by report, team, and regulator.","Reporting Governance","Live","Refreshes nightly.","calendar due dates deadlines regulator upcoming"],
["dashboard","Attestation Tracker Dashboard","Tracks attestation progress by team, with reminders for owners who are behind.","Reporting Governance","Live","Refreshes hourly during attestation week.","attestation tracker progress owners reminders"],
["dashboard","Capital Trends Dashboard","Charts capital ratios over time against thresholds.","Capital Reporting","Monthly","Updated after each monthly close.","capital ratios trends thresholds charts"],
["dashboard","Liquidity Monitor Dashboard","Intraday and daily liquidity metrics with alert thresholds.","Liquidity Reporting","Live","Refreshes every hour.","liquidity monitor intraday alerts metrics"],
["dashboard","Exposure Limits Dashboard","Shows exposure against limits by counterparty and flags breaches.","Risk Reporting","Daily","Refreshes every morning at 7:00 AM.","exposure limits breaches counterparty"],
["dashboard","Data Quality Scorecard","Scores each data source on completeness, accuracy, and timeliness.","Data Governance","Daily","Refreshes every morning.","data quality scorecard completeness accuracy timeliness"],
["dashboard","Regulatory Change Tracker","Follows new and upcoming rule changes and shows which reports each one affects.","Regulatory Interpretation","Weekly","Reviewed every Friday.","regulatory change rule rules tracker impact upcoming"],
["document","Reporting Policy Handbook","The rules for preparing, reviewing, and approving regulatory reports.","Reporting Governance","Annual","Reviewed every year in January.","policy handbook rules review approval"],
["document","Exposure Aggregation Interpretation Guide","Explains how to group related exposures and which entities count as one counterparty.","Regulatory Interpretation","As needed","Updated when guidance changes.","interpretation exposure aggregation counterparty guide group"],
["document","Attestation How-To Guide","Step-by-step instructions for attesting a report and recording your sign-off.","Reporting Governance","As needed","Reviewed each quarter.","attestation how steps sign-off guide"],
["document","Report Metadata Standards","Defines the fields every report must have: owner, frequency, source, and description.","Data Governance","Annual","Reviewed every year.","report metadata standards fields owner frequency source"],
["document","Metadata Update Request Form","Use this form to update a report's owner, frequency, or description in the catalog.","Reporting Governance","As needed","Requests are processed within 3 business days.","metadata update request form change catalog owner"],
["document","Filing Escalation Runbook","What to do when a filing is at risk of being late, and who to call.","Reporting Governance","As needed","Reviewed every six months.","filing escalation runbook late risk contacts"],
["document","Reporting Glossary","Clear definitions of terms used across regulatory reporting.","Regulatory Interpretation","As needed","Updated monthly.","glossary terms definitions terminology"],
["document","New Joiner Onboarding Pack","A first-week guide to the reporting calendar, tools, and key contacts.","Reporting Governance","As needed","Updated each quarter.","onboarding new joiner first week tools contacts"],
["document","Reporting Contacts Directory","Who to talk to for each report, system, and approval step.","Reporting Governance","As needed","Updated monthly.","contacts directory people talk approval"]
];

/* Sample knowledge base for "ask anything" (general, made-up policy wording) */
var KBRAW=[
["What is an attestation?","attestation attest sign-off signoff owner accurate complete","An attestation is the report owner's formal sign-off that a report is accurate, complete, and ready to file. Owners attest every reporting cycle, and the Attestation Tracker Dashboard shows who is still outstanding.",["Attestation How-To Guide","Attestation Tracker Dashboard","Attestation Status Report"]],
["How do I attest a report?","attest attestation sign sign-off steps record how report","Review the final numbers, confirm the supporting checks passed, then record your sign-off in the attestation step. The How-To Guide walks through each screen.",["Attestation How-To Guide","Attestation Tracker Dashboard"]],
["What happens if a filing is late?","late filing escalation miss missed deadline overdue happen","Regulators expect filings on time, so a late one is escalated quickly. Tell your manager and the governance team right away, confirm a new submission time, record the reason, and let affected teams know. The Escalation Runbook lists who to call.",["Filing Escalation Runbook","Reporting Command Center","Filing Calendar Dashboard"]],
["What is the difference between a report, a filing, and a dashboard?","difference report filing dashboard between","A report is a document of numbers and commentary prepared on a schedule. A filing is a report that is submitted to a regulator. A dashboard is a live view for monitoring, not a formal submission.",["Reporting Command Center","Large Exposure Filing"]],
["What is a large exposure?","large exposure counterparty credit connected concentration","A large exposure is a credit exposure to one counterparty, or a group of connected counterparties, that is big relative to the firm's capital. Firms watch these closely so that no single failure can cause outsized losses.",["Large Exposure Filing","Exposure Aggregation Interpretation Guide","Exposure Limits Dashboard"]],
["What is liquidity coverage?","liquidity coverage liquid assets outflows cushion lcr","Liquidity coverage compares the assets a firm can sell quickly with the cash it could need to pay out over the next 30 days. A higher number means a bigger cushion.",["Liquidity Coverage Snapshot","Liquidity Monitor Dashboard"]],
["What is a capital ratio?","capital ratio threshold risk-weighted assets loss absorb","A capital ratio compares a firm's capital with its risk-weighted assets. It shows how much loss the firm can absorb. Regulators and internal policy set minimum levels, called thresholds.",["Monthly Capital Position Report","Capital Trends Dashboard"]],
["How do I update a report's metadata?","update metadata change owner frequency description request form","Submit the Metadata Update Request Form with the report's name and the field you want to change, such as the owner, frequency, or description. Requests are processed within 3 business days.",["Metadata Update Request Form","Report Metadata Standards"]],
["Who approves a report before it is filed?","approve approval approver review reviewer sign filed","The report owner prepares and attests it, a reviewer checks it, and the governance team confirms it is ready to file. The Policy Handbook lists the exact approvers for each report.",["Reporting Policy Handbook","Reporting Contacts Directory"]],
["What is a data quality exception?","data quality exception failed validation check record","A data quality exception is a record that failed an automatic check, such as a missing field or a number outside its expected range. Exceptions are listed each morning so owners can fix them before filing.",["Data Quality Exceptions Report","Data Quality Scorecard"]],
["What does regulatory interpretation mean?","regulatory interpretation interpret rule meaning apply guidance","Regulatory interpretation is reading a rule, deciding how it applies to the firm's data and reports, and writing that decision down so everyone applies it the same way.",["Exposure Aggregation Interpretation Guide","Regulatory Change Tracker","Reporting Glossary"]],
["What is a stress scenario?","stress scenario test downturn severe what-if","A stress scenario is a what-if test that shows how key numbers would hold up in a severe but plausible downturn.",["Stress Scenario Summary","Capital Trends Dashboard"]],
["I'm new. Where do I start?","new joiner start begin onboarding first week learn","Start with the Onboarding Pack, skim the Glossary for the terms, then open the Reporting Command Center to see how filings move from start to finish.",["New Joiner Onboarding Pack","Reporting Glossary","Reporting Command Center"]],
["What is a regulatory report?","regulatory report reports regulator submitted schedule","A regulatory report is a set of numbers and explanations a firm prepares for its regulator on a fixed schedule, so the regulator can see how the firm is doing.",["Reporting Policy Handbook","Filing Calendar Dashboard"]]
];

var STOP=new Set("a an the of for to me i is are on in and or please give show find get need want about my with tell what whats can you do does how all any who owns own owner when due often frequency where there it this that they them its their these those we our us be was were have has some from at by as list latest new else more like related similar item items refresh refreshes refreshe updated next create build make generate draft design put together should if say says mention mentions according state states cover covers".split(" "));
var FREQ={"Daily":"runs daily","Weekly":"runs weekly","Monthly":"runs monthly","Quarterly":"runs quarterly","Annual":"is reviewed every year","Live":"stays up to date automatically","As needed":"is updated as needed"};
var LABEL={report:"Report",dashboard:"Dashboard",document:"Document",answer:"Answer",create:"Create"};
var INTENT={find:"find something",about:"learn about an item",owner:"find out who owns something",when:"check timing",related:"see related items",browse:"browse the catalog"};
var QRE=/\b(what is|what are|what does|what'?s|what happens|why|how does|how do|how is|how can|explain|difference between|meaning of|define|where do|where can|where should|should i|can i)\b/;

function stem(w){return w.length>3?w.replace(/ies$/,"y").replace(/s$/,""):w;}
function clean(s){return s.toLowerCase().replace(/[^a-z0-9\s]/g," ").replace(/\s+/g," ").trim();}
function stems(s){return clean(s).split(" ").filter(function(w){return w.length>1}).map(stem);}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]});}
function titleCase(s){return s.replace(/\b\w/g,function(c){return c.toUpperCase()});}

var ITEMS=RAW.map(function(r){
  var it={type:r[0],name:r[1],desc:r[2],owner:r[3],freq:r[4],note:r[5],tags:r[6]};
  it.n=new Set(stems(it.name)); it.t=new Set(stems(it.tags)); it.d=new Set(stems(it.desc)); it.o=new Set(stems(it.owner));
  it.nameStem=stems(it.name).join(" ");
  it.link="https://sharepoint.example.com/sites/reg-reporting/"+it.type+"s/"+slug(it.name);
  return it;
});
var KB=KBRAW.map(function(r){return {q:r[0],a:r[2],rel:r[3],ks:new Set(stems(r[1])),qs:new Set(stems(r[0]))};});
function byName(n){for(var i=0;i<ITEMS.length;i++)if(ITEMS[i].name===n)return ITEMS[i];return null;}

/* ---------- Storage ---------- */
function load(k,def){try{var v=localStorage.getItem(k);return v?JSON.parse(v):def;}catch(e){return def;}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
var saved=load("docket-saved",[]);
var drafts=load("docket-drafts",[]);
var showHow=load("docket-how",false);
var uploads=load("docket-uploads",[]);

/* ---------- Retrieval ---------- */
function parse(q){
  var pairs=clean(q).split(" ").filter(function(w){return w.length>1}).map(function(w){return {raw:w,s:stem(w)}});
  var hint=null,content=[];
  pairs.forEach(function(p){
    if(p.s==="dashboard"||p.s==="board"){hint="dashboard";return;}
    if(p.s==="report"){hint="report";return;}
    if(p.s==="document"||p.s==="doc"){hint="document";return;}
    if(STOP.has(p.raw)||STOP.has(p.s))return;
    content.push(p);
  });
  var l=q.toLowerCase(), intent="find";
  var pron=/\b(it|this|that|they|them|its|their|these|those)\b/.test(l);
  var rel=/\b(related|similar|else|more like)\b/.test(l);
  var create=/\b(create|build|make|generate|draft|design|put together)\b/.test(l);
  if(rel)intent="related";
  else if(/who (owns|manages|runs|maintains)|owner|contact/.test(l))intent="owner";
  else if(/\b(when|due|how often|frequency|deadline|refresh)/.test(l))intent="when";
  else if(/(tell me about|what is|what'?s|explain|describe|\babout\b)/.test(l))intent="about";
  return {content:content,hint:hint,intent:intent,pron:pron,rel:rel,create:create};
}
function startsAny(set,t){var r=false;set.forEach(function(w){if(w.indexOf(t)===0)r=true});return r;}
function search(p){
  var phrase=p.content.map(function(c){return c.s}).join(" "), out=[];
  var maxPoss=p.content.length*7.5+(p.content.length>1?4:0)+(p.hint?(p.content.length?2.5:5):0);
  ITEMS.forEach(function(it){
    var sc=0,hit=[];
    p.content.forEach(function(c){
      var h=0;
      if(it.n.has(c.s))h+=3; else if(c.s.length>=4&&startsAny(it.n,c.s))h+=1.5;
      if(it.t.has(c.s))h+=2.5; else if(c.s.length>=4&&startsAny(it.t,c.s))h+=1;
      if(it.d.has(c.s))h+=1;
      if(it.o.has(c.s))h+=1;
      if(h>0){sc+=h;hit.push(c.raw);}
    });
    if(p.content.length&&sc===0)return;
    if(phrase&&p.content.length>1&&it.nameStem.indexOf(phrase)>-1)sc+=4;
    if(p.hint){
      if(it.type===p.hint)sc+=p.content.length?2.5:5;
      else if(!p.content.length)return;
    }
    if(sc>0)out.push({it:it,sc:sc,hit:hit,pct:Math.min(100,Math.round(sc/(maxPoss*0.55)*100))});
  });
  out.sort(function(a,b){return b.sc-a.sc||a.it.name.localeCompare(b.it.name)});
  return out;
}
function kbSearch(p){
  var best=null;
  var need=Math.max(1,Math.ceil(p.content.length*0.6));
  KB.forEach(function(e,idx){
    var s=0,hits=0;
    p.content.forEach(function(c){if(e.ks.has(c.s)){s+=3;hits++;}else if(e.qs.has(c.s))s+=1;});
    if(hits<need)return;
    if(s>0&&p.hint&&e.ks.has(p.hint))s+=1.5;
    if(s>0&&(!best||s>best.s))best={e:e,idx:idx,s:s};
  });
  return best;
}
function relatedTo(it){
  var tags=new Set(stems(it.tags+" "+it.name));
  return ITEMS.filter(function(x){return x!==it}).map(function(x){
    var s=0;x.t.forEach(function(w){if(tags.has(w))s+=1});x.n.forEach(function(w){if(tags.has(w))s+=1});
    if(x.owner===it.owner)s+=0.5;
    return {it:x,sc:s,hit:[],pct:Math.min(100,Math.round(s/4*100))};
  }).filter(function(r){return r.sc>=1}).sort(function(a,b){return b.sc-a.sc||a.it.name.localeCompare(b.it.name)}).slice(0,4);
}
function strength(pct){return pct>=75?"Strong match":pct>=40?"Good match":"Possible match";}
function B(t){return [t,true];}
function T(t){return [t,false];}
function followUps(top){
  if(!top)return [];
  var timing=top.type==="report"?"When is it due?":top.type==="dashboard"?"How often does it refresh?":"How often is it updated?";
  return ["Who owns it?",timing,"Show related items"];
}
var HELP_CHIPS=["Show me a liquidity dashboard","What is an attestation?","Create a governance policy for attestation"];

/* ---------- Draft builder ---------- */
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;}
function rng(seed){var a=seed;return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
var FAMILY=[
 {k:["liquidity","liquid","coverage"],m:[["Liquidity coverage ratio","pct",[118,142]],["High-quality liquid assets","usd",[38,52]],["30-day net outflows","usd",[29,41],1]]},
 {k:["capital","ratio","stress"],m:[["Capital ratio","pct",[11.5,14.5]],["Risk-weighted assets","usd",[210,260]],["Buffer over threshold","pct",[2,4.5]]]},
 {k:["exposure","counterparty","limit","credit"],m:[["Limit utilization","pct",[58,86],1],["Top counterparty share","pct",[6,14],1],["Limit breaches","int",[0,3],1]]},
 {k:["attestation","attest","signoff"],m:[["Reports attested","pct",[78,98]],["Outstanding","int",[2,14],1],["Overdue","int",[0,4],1]]},
 {k:["data","quality","exception"],m:[["Completeness","pct",[96,99.6]],["Accuracy","pct",[95,99.3]],["Open exceptions","int",[4,38],1]]},
 {k:["funding","deposit","treasury"],m:[["Stable funding share","pct",[62,78]],["Top 10 deposit share","pct",[18,31],1],["Average funding cost","pct",[2.1,3.9],1]]},
 {k:["filing","deadline","calendar","regulatory"],m:[["Filed on time","pct",[92,100]],["Due this month","int",[6,18]],["At risk","int",[0,4],1]]}
];
var DEFAULT_FAM={m:[["Reports filed on time","pct",[93,100]],["Open exceptions","int",[3,30],1],["Reports reviewed","int",[14,42]]]};
var PERIOD={
 daily:{noun:"day",labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Today"]},
 weekly:{noun:"week",labels:["Wk 1","Wk 2","Wk 3","Wk 4","Wk 5","This wk"]},
 monthly:{noun:"month",labels:["Apr","May","Jun","Jul","Aug","Sep"]},
 quarterly:{noun:"quarter",labels:["Q2 25","Q3 25","Q4 25","Q1 26","Q2 26","Q3 26"]}
};
function fmtv(t,v){return t==="pct"?v.toFixed(1)+"%":t==="usd"?"$"+v.toFixed(1)+"B":String(Math.round(v));}
function axisFmt(t,v){return t==="pct"?Math.round(v)+"%":t==="usd"?"$"+Math.round(v)+"B":String(Math.round(v));}
function famFor(words){
  var ws=new Set(words.map(stem));
  for(var i=0;i<FAMILY.length;i++)for(var j=0;j<FAMILY[i].k.length;j++)if(ws.has(stem(FAMILY[i].k[j])))return FAMILY[i];
  return DEFAULT_FAM;
}
function buildNumeric(sp){
  var fam=famFor(sp.topic.split(" ")),R=rng(hash(sp.topic+"|"+sp.period));
  var metrics=fam.m.map(function(m){
    var v=m[2][0]+R()*(m[2][1]-m[2][0]);
    if(m[1]==="int")v=Math.round(v);
    var prior=m[1]==="int"?Math.max(0,Math.round(v+(R()-0.5)*6)):v*(1+(R()-0.5)*0.06);
    var diff=v-prior,pc=m[1]==="int"?diff:(prior?diff/prior*100:0);
    var flat=m[1]==="int"?diff===0:Math.abs(pc)<0.05,up=diff>0;
    var txt=flat?"No change":(up?"Up ":"Down ")+(m[1]==="int"?Math.abs(Math.round(diff)):Math.abs(pc).toFixed(1)+"%");
    var good=flat?null:(up!==!!m[3]);
    return {label:m[0],t:m[1],v:v,val:fmtv(m[1],v),delta:txt,good:good};
  });
  var n=6,series=new Array(n);series[n-1]=metrics[0].v;
  for(var i=n-2;i>=0;i--)series[i]=series[i+1]*(1+(R()-0.5)*0.08);
  var thr=Math.min.apply(null,series)*0.93;
  var segs=["Retail","Commercial","Treasury","Corporate"];
  var vals=segs.map(function(){return metrics[0].v*(1+(R()-0.5)*0.14)});
  var minI=0;vals.forEach(function(v,i){if(v<vals[minI])minI=i;});
  var rows=segs.map(function(s,i){return {seg:s,val:fmtv(metrics[0].t,vals[i]),watch:i===minI}});
  return {
    id:"d"+Date.now().toString(36)+Math.floor(Math.random()*1000),
    topic:sp.topic,kind:sp.kind,period:sp.period,trend:!!sp.trend,comment:!!sp.comment,basedOn:sp.basedOn||null,ver:sp.ver||1,
    title:titleCase(sp.topic)+" "+(sp.kind==="dashboard"?"Dashboard":"Report"),
    metrics:metrics,series:series,thr:thr,labels:PERIOD[sp.period].labels,rows:rows
  };
}
function chartSVG(d,mode){
  var W=560,H=176,pl=44,pr=12,pt=14,pb=26,n=d.series.length,t=d.metrics[0].t;
  var iw=W-pl-pr,ih=H-pt-pb,vs=d.series,hi=Math.max.apply(null,vs.concat([d.thr])),lo=0;
  if(mode==="line"){var mn=Math.min.apply(null,vs.concat([d.thr])),pad=(hi-mn)*0.3||1;lo=mn-pad;hi=hi+pad;}else{hi=hi*1.15;}
  function Y(v){return pt+ih-(v-lo)/(hi-lo)*ih;}
  function Xc(i){return pl+iw/n*(i+0.5);}
  var g="",body="",k;
  for(k=0;k<=2;k++){var gv=lo+(hi-lo)*k/2,gy=Y(gv);g+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+gy.toFixed(1)+'" y2="'+gy.toFixed(1)+'" stroke="var(--line)"/><text x="'+(pl-6)+'" y="'+(gy+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="var(--muted)">'+axisFmt(t,gv)+'</text>';}
  if(mode==="bars"){
    var bw=iw/n*0.55;
    vs.forEach(function(v,i){body+='<rect x="'+(Xc(i)-bw/2).toFixed(1)+'" y="'+Y(v).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+(pt+ih-Y(v)).toFixed(1)+'" rx="5" fill="var(--brand)" opacity="'+(i===n-1?1:0.5)+'"/>';});
  }
  var ty=Y(d.thr).toFixed(1);
  body+='<line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+ty+'" y2="'+ty+'" stroke="var(--warn)" stroke-width="1.5" stroke-dasharray="5 4"/>';
  if(mode==="line"||d.trend){
    var pts=vs.map(function(v,i){return Xc(i).toFixed(1)+","+Y(v).toFixed(1)}).join(" ");
    body+='<polyline points="'+pts+'" fill="none" stroke="var(--dash)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    vs.forEach(function(v,i){body+='<circle cx="'+Xc(i).toFixed(1)+'" cy="'+Y(v).toFixed(1)+'" r="3.5" fill="var(--surface)" stroke="var(--dash)" stroke-width="2"/>';});
  }
  var xl=d.labels.map(function(lb,i){return '<text x="'+Xc(i).toFixed(1)+'" y="'+(H-8)+'" text-anchor="middle" font-size="11" fill="var(--muted)">'+esc(lb)+'</text>'}).join("");
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Chart of '+esc(d.metrics[0].label)+' over six '+PERIOD[d.period].noun+'s">'+g+body+xl+'</svg>';
}
function commentary(d){
  var P=PERIOD[d.period],a=d.metrics[0],b=d.metrics[1],w=d.rows.filter(function(r){return r.watch})[0];
  return a.label+" ended the "+P.noun+" at "+a.val+" ("+a.delta.toLowerCase()+" from the last "+P.noun+"). "+b.label+" was "+b.val+". "+w.seg+" has the lowest "+a.label.toLowerCase()+" and is worth watching. Draft text for review.";
}
function exportRow(d){
  return '<div class="exp"><span>Download as</span><button class="chip" data-export="docx" data-exid="'+d.id+'">Word</button><button class="chip" data-export="pdf" data-exid="'+d.id+'">PDF</button><button class="chip" data-export="xlsx" data-exid="'+d.id+'">Tracker</button></div>';
}
function renderNumeric(d,opts){
  opts=opts||{};
  var P=PERIOD[d.period],m0=d.metrics[0],isDash=d.kind==="dashboard";
  var sub=titleCase(d.period)+" "+d.kind+(opts.viewer?"":(d.basedOn?", modeled on "+d.basedOn:"")+(d.ver>1?", version "+d.ver:""));
  var html='<div class="dhead"><div><h3>'+esc(d.title)+'</h3><div class="dsub">'+esc(sub)+'</div></div>'+(opts.viewer?'':'<span class="pill small">Draft</span>')+'</div>';
  if(isDash){
    html+='<div class="kpis">'+d.metrics.map(function(m){
      var c=m.good===null?"flat":(m.good?"up":"down");
      return '<div class="kpi"><span>'+esc(m.label)+'</span><b>'+m.val+'</b><em class="'+c+'">'+m.delta+'</em></div>';
    }).join("")+'</div>';
    html+='<div class="chartbox"><h4>'+esc(m0.label)+' over the last 6 '+P.noun+'s</h4>'+chartSVG(d,"bars")+'<div class="key"><i></i>Internal threshold'+(d.trend?'<span style="margin-left:12px;color:var(--dash)">Line shows the trend</span>':'')+'</div></div>';
  }else{
    html+='<div class="sec"><h4>Purpose</h4><p class="dp">This '+d.period+' report summarizes '+esc(d.topic)+' for the regulatory reporting team, so owners and reviewers work from the same numbers before filing.</p></div>';
    html+='<div class="sec"><h4>Summary</h4><table class="dt"><thead><tr><th>Measure</th><th>Current</th><th>Vs last '+P.noun+'</th></tr></thead><tbody>'+d.metrics.map(function(m){
      var c=m.good===null?"flat":(m.good?"up":"down");return '<tr><td>'+esc(m.label)+'</td><td>'+m.val+'</td><td class="'+c+'">'+m.delta+'</td></tr>';
    }).join("")+'</tbody></table></div>';
    if(d.trend)html+='<div class="chartbox"><h4>'+esc(m0.label)+' trend</h4>'+chartSVG(d,"line")+'<div class="key"><i></i>Internal threshold</div></div>';
  }
  html+='<div class="sec"><h4>By segment</h4><table class="dt"><thead><tr><th>Segment</th><th>'+esc(m0.label)+'</th><th>Status</th></tr></thead><tbody>'+d.rows.map(function(r){
    return '<tr><td>'+r.seg+'</td><td>'+r.val+'</td><td class="st '+(r.watch?"watch":"ok")+'">'+(r.watch?"Watch":"On track")+'</td></tr>';
  }).join("")+'</tbody></table></div>';
  if(d.comment)html+='<div class="sec"><h4>Commentary</h4><p class="dp">'+esc(commentary(d))+'</p></div>';
  if(!isDash)html+='<div class="sign"><div>Prepared by</div><div>Reviewed by</div><div>Attested on</div></div>';
  var isSaved=drafts.some(function(x){return x.id===d.id});
  html+='<div class="dacts">'+
    (opts.viewer?'':(opts.saved?'<button class="btn ghost" data-deldraft="'+d.id+'">Delete draft</button>':'<button class="btn open" style="--accent:var(--brand)" data-savedraft="'+d.id+'">'+(isSaved?"Saved":"Save draft")+'</button>'))+
    '<button class="btn ghost" data-copydraft="'+d.id+'">Copy summary</button></div>'+exportRow(d);
  return html;
}
function numericText(d){
  return d.title+" ("+d.period+")\n"+d.metrics.map(function(m){return m.label+": "+m.val+" ("+m.delta.toLowerCase()+")"}).join("\n");
}
/* ---------- Document drafts ---------- */
var DOCTYPES={
 policy:{label:"Policy",appr:true},
 procedure:{label:"Procedure",appr:true},
 guide:{label:"Guide"},
 runbook:{label:"Runbook"},
 checklist:{label:"Checklist"},
 memo:{label:"Memo"},
 charter:{label:"Governance Charter",appr:true},
 minutes:{label:"Meeting Minutes"},
 faq:{label:"FAQ"},
 raci:{label:"RACI Matrix",appr:true}
};
var DOC_ORDER=["checklist","procedure","policy","guide"];
var DOC_STRIP=/^(policy|policies|procedure|procedures|sop|sops|runbook|runbooks|checklist|checklists|charter|charters|memo|briefing|minutes|meeting|notes|faq|faqs|raci|guide|guides|handbook|manual|governance|framework|terms|reference|document|documents|doc|docs|daily|weekly|monthly|quarterly|standard|operating)$/;
function detectDocType(l){
  if(/\brunbooks?\b/.test(l))return "runbook";
  if(/\bchecklists?\b/.test(l))return "checklist";
  if(/\braci\b/.test(l))return "raci";
  if(/\b(minutes|meeting notes)\b/.test(l))return "minutes";
  if(/\bfaqs?\b/.test(l))return "faq";
  if(/\b(memo|briefing|one-pager|one pager)\b/.test(l))return "memo";
  if(/\b(charters?|terms of reference|governance (document|documents|doc|docs|framework))\b/.test(l))return "charter";
  if(/\bpolic(y|ies)\b/.test(l))return "policy";
  if(/\b(procedures?|sops?|standard operating procedure)\b/.test(l))return "procedure";
  if(/\b(guides?|handbook|manual|how-to)\b/.test(l))return "guide";
  return null;
}
function docSections(type,T,Tt){
  var S={};
  S.policy=[
   {h:"Purpose",p:"This policy sets out how "+T+" is managed in regulatory reporting, so every team follows the same rules and can show that it did."},
   {h:"Scope",p:"It applies to everyone in regulatory reporting who prepares, reviews, approves, or relies on "+T+", including reports, dashboards, and supporting data."},
   {h:"Policy statements",ul:["Every item covered by this policy has a named owner who is accountable for it.","Changes are checked by a second person before they are used.","Exceptions need written approval from the governance lead and are logged.","Evidence of reviews and approvals is kept for audit."]},
   {h:"Roles and responsibilities",table:{head:["Role","Responsibility"],rows:[["Owner","Prepares the work and is accountable for its accuracy."],["Reviewer","Checks the work independently before it is used."],["Governance team","Monitors compliance and keeps the evidence."]]}},
   {h:"Exceptions",p:"Any exception must state the reason, the risk, and an end date. The governance lead approves it and records it in the exceptions log."},
   {h:"Monitoring and review",p:"The owner reviews this policy every year, or sooner when a rule or process changes. Compliance is reported to the governance team each quarter."}
  ];
  S.charter=[
   {h:"Purpose",p:"This charter sets up the governance forum for "+T+": who is in it, what it decides, and how it works."},
   {h:"Authority and scope",p:"The forum is accountable for oversight of "+T+". It can approve changes, accept exceptions within agreed limits, and escalate risks to senior management."},
   {h:"Members and roles",table:{head:["Role","Who","Responsibility"],rows:[["Chair","[name]","Leads meetings and makes the final call when there is no consensus."],["Owner","[name]","Reports status and brings items for decision."],["Members","[names]","Review, challenge, and vote on decisions."],["Secretary","[name]","Keeps minutes, decisions, and the action log."]]}},
   {h:"Decision-making",p:"Decisions are made by consensus. If consensus is not reached, the chair decides and records the dissent. Every decision is logged with its date and owner."},
   {h:"Meetings",ul:["Held monthly for 60 minutes.","Papers are shared 2 business days before the meeting.","Minutes are issued within 3 business days."]},
   {h:"Escalation",p:"Risks the forum cannot resolve go to the senior governance committee within 2 business days."},
   {h:"Review",p:"The charter is reviewed every year, or when the forum\u2019s scope changes."}
  ];
  S.procedure=[
   {h:"Purpose",p:"This procedure explains how to handle "+T+" step by step, so the work is done the same way every time."},
   {h:"When to use it",p:"Use this procedure whenever "+T+" is due, changes, or needs to be checked."},
   {h:"Steps",ol:["Confirm what is needed and who owns it.","Gather the inputs and check that they are complete.","Prepare the output using the approved template.","Ask the reviewer to check it, then fix any comments.","Get approval and record it.","Publish or file it, then confirm it was received."]},
   {h:"Controls and evidence",ul:["Keep the review comments and the approval record.","Note any exception and who approved it.","Store everything in the agreed shared location."]},
   {h:"Escalation",p:"If a step cannot be completed on time, tell the governance lead right away and record the reason."}
  ];
  S.runbook=[
   {h:"When to use this runbook",p:"Use it when something goes wrong with "+T+" and you need to act quickly and consistently."},
   {h:"Before you start",ul:["Confirm you have the access you need.","Check the current status of the affected item.","Tell your manager that you are starting."]},
   {h:"Steps",ol:["Stop any further use of the affected output.","Identify what changed and when.","Fix the cause, or apply the agreed workaround.","Re-run the checks and confirm the numbers.","Tell everyone who relies on it that it is resolved."]},
   {h:"If something goes wrong",ul:["If the fix does not work within 30 minutes, escalate to the governance lead.","If a filing deadline is at risk, follow the filing escalation steps."]},
   {h:"Contacts",table:{head:["Role","Name","How to reach"],rows:[["Owner","[name]","[chat or phone]"],["Governance lead","[name]","[chat or phone]"],["Backup","[name]","[chat or phone]"]]}},
   {h:"After the incident",p:"Record what happened, the cause, and the fix. Share it with the governance team within 2 business days."}
  ];
  S.checklist=[
   {h:"Before you start",check:["Confirm who owns "+T+".","Check that you have the latest template.","Make sure the inputs are ready and complete."]},
   {h:"While you work",check:["Follow the approved steps.","Note anything unusual as you go.","Ask a colleague to review before you finish."]},
   {h:"Before you finish",check:["Check the numbers against the source.","Record the review and approval.","Share the result with everyone who needs it.","File the evidence in the shared location."]}
  ];
  S.guide=[
   {h:"Overview",p:"This guide explains "+T+" and shows you how to work with it in regulatory reporting."},
   {h:"Who this is for",p:"Anyone in regulatory reporting who prepares, reviews, or relies on "+T+", including new joiners."},
   {h:"Key terms",ul:["Owner: the person accountable for it.","Reviewer: the person who checks it.","Cycle: how often it is produced or updated."]},
   {h:"How it works",ol:["It is prepared by its owner.","A reviewer checks it.","It is approved and shared with the people who need it.","Any change goes through the same steps again."]},
   {h:"Common questions",ul:["Who owns it? Check the catalog entry or ask the governance team.","How often is it updated? See the schedule in the catalog.","What if something looks wrong? Tell the owner right away."]},
   {h:"Where to get help",p:"Ask the governance team, or look up the owner in the contacts directory."}
  ];
  S.memo=[
   {h:"Summary",p:"This memo explains the current position on "+T+" and what we recommend doing next."},
   {h:"Background",p:"[Add two or three sentences on what happened and why this matters to regulatory reporting.]"},
   {h:"Recommendation",ul:["[First recommendation]","[Second recommendation]"]},
   {h:"Next steps",ol:["Agree the owner for each action.","Confirm dates with the governance team.","Report progress at the next review."]}
  ];
  S.minutes=[
   {h:"Attendees",ul:["[Name, role]","[Name, role]","[Name, role]"]},
   {h:"Agenda",ol:["Status update on "+T,"Open risks and issues","Decisions needed","Any other business"]},
   {h:"Decisions",ul:["[Decision 1, with the owner]","[Decision 2, with the owner]"]},
   {h:"Actions",table:{head:["Action","Owner","Due"],rows:[["[Action]","[name]","[date]"],["[Action]","[name]","[date]"]]}},
   {h:"Next meeting",p:"[Date and time]"}
  ];
  S.faq=[
   {h:"What is "+T+"?",p:"It is part of how regulatory reporting stays accurate and on time. This FAQ answers the questions people ask most."},
   {h:"Who owns it?",p:"Each item has a named owner. You can find the owner in the catalog or ask the governance team."},
   {h:"How often is it updated?",p:"It depends on the item. The schedule is shown in the catalog next to each report, dashboard, or document."},
   {h:"What should I do if something looks wrong?",p:"Tell the owner straight away and share what you saw. If a filing deadline is at risk, tell the governance lead too."},
   {h:"Where can I get help?",p:"Ask the governance team, or look up the right person in the contacts directory."}
  ];
  S.raci=[
   {h:"Responsibilities for "+T,table:{head:["Activity","Owner","Reviewer","Governance","Executive"],rows:[["Prepare","R / A","C","I","-"],["Review","C","R","A","I"],["Approve","C","C","R / A","I"],["Attest","R / A","C","I","I"],["Publish or file","R","C","A","I"]]}},
   {h:"How to read it",p:"R means responsible for doing the work. A means accountable for the result. C means consulted before a decision. I means kept informed."}
  ];
  return S[type]||S.guide;
}
function buildDoc(sp){
  var type=sp.docType||"guide",label=DOCTYPES[type].label,Tt=titleCase(sp.topic);
  var words=sp.topic.split(" ").map(function(w){return {raw:w,s:stem(w)}});
  var sim=search({content:words,hint:null});
  var owner=sim.length&&sim[0].pct>=40?sim[0].it.owner:"Reporting Governance";
  var meta=[["Owner",owner],["Version","0.1 (draft)"],["Status","Draft for review"],["Next review","12 months after approval"]];
  if(type==="memo")meta=[["To","[recipient]"],["From","[your name]"],["Date","[date]"],["Subject",Tt]];
  if(type==="minutes")meta=[["Meeting",Tt+" meeting"],["Date","[date]"],["Chair","[name]"],["Minutes by","[name]"]];
  var title=Tt+" "+(sp.gov&&type!=="charter"?"Governance ":"")+label;
  return {id:"d"+Date.now().toString(36)+Math.floor(Math.random()*1000),topic:sp.topic,kind:"document",docType:type,gov:!!sp.gov,
    approvals:!!sp.approvals,short:!!sp.short,basedOn:sp.basedOn||null,ver:sp.ver||1,title:title,label:label,meta:meta,sections:docSections(type,sp.topic,Tt)};
}
function approvalsSection(){
  return {h:"Approvals",table:{head:["Role","Name","Date","Signature"],rows:[["Owner","[name]","[date]","[sign]"],["Reviewer","[name]","[date]","[sign]"],["Governance lead","[name]","[date]","[sign]"]]}};
}
function docSecs(d){
  var secs=d.short?d.sections.slice(0,3):d.sections.slice();
  if(d.approvals)secs=secs.concat([approvalsSection()]);
  return secs;
}
function renderDoc(d,opts){
  opts=opts||{};
  var sub=opts.viewer?d.label:d.label+" draft"+(d.basedOn?", modeled on "+d.basedOn:"")+(d.ver>1?", version "+d.ver:"")+(d.short?", short version":"");
  var html='<div class="dhead"><div><h3>'+esc(d.title)+'</h3><div class="dsub">'+esc(sub)+'</div></div>'+(opts.viewer?'':'<span class="pill small">Draft</span>')+'</div>';
  html+='<table class="dt metat"><tbody>'+d.meta.map(function(m){return '<tr><td>'+esc(m[0])+'</td><td>'+esc(m[1])+'</td></tr>'}).join("")+'</tbody></table>';
  docSecs(d).forEach(function(sec){
    var lim=function(a){return d.short?a.slice(0,3):a;};
    html+='<div class="sec"><h4>'+esc(sec.h)+'</h4>';
    if(sec.p)html+='<p class="dtext">'+esc(sec.p)+'</p>';
    if(sec.ul)html+='<ul class="dl">'+lim(sec.ul).map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul>';
    if(sec.ol)html+='<ol class="dl">'+lim(sec.ol).map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ol>';
    if(sec.check)html+='<ul class="dl check">'+lim(sec.check).map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul>';
    if(sec.table)html+='<table class="dt"><thead><tr>'+sec.table.head.map(function(h){return '<th>'+esc(h)+'</th>'}).join("")+'</tr></thead><tbody>'+sec.table.rows.map(function(r){return '<tr>'+r.map(function(c){return '<td>'+esc(c)+'</td>'}).join("")+'</tr>'}).join("")+'</tbody></table>';
    html+='</div>';
  });
  var isSaved=drafts.some(function(x){return x.id===d.id});
  html+=(opts.viewer?'':'<p class="dnote">Review before use.</p>')+'<div class="dacts">'+
    (opts.viewer?'':(opts.saved?'<button class="btn ghost" data-deldraft="'+d.id+'">Delete draft</button>':'<button class="btn open" style="--accent:var(--brand)" data-savedraft="'+d.id+'">'+(isSaved?"Saved":"Save draft")+'</button>'))+
    '<button class="btn ghost" data-copydraft="'+d.id+'">Copy text</button></div>'+exportRow(d);
  return html;
}
function docText(d){
  var out=[d.title,d.meta.map(function(m){return m[0]+": "+m[1]}).join("\n"),""];
  docSecs(d).forEach(function(sec){
    out.push(sec.h);
    if(sec.p)out.push(sec.p);
    var lim=function(a){return d.short?a.slice(0,3):a;};
    if(sec.ul)lim(sec.ul).forEach(function(x){out.push("- "+x)});
    if(sec.ol)lim(sec.ol).forEach(function(x,i){out.push((i+1)+". "+x)});
    if(sec.check)lim(sec.check).forEach(function(x){out.push("[ ] "+x)});
    if(sec.table){out.push(sec.table.head.join(" | "));sec.table.rows.forEach(function(r){out.push(r.join(" | "))});}
    out.push("");
  });
  return out.join("\n");
}
function buildDraft(sp){return sp.kind==="document"?buildDoc(sp):buildNumeric(sp);}
function renderDraft(d,opts){return d.kind==="document"?renderDoc(d,opts):renderNumeric(d,opts);}
function draftText(d){return d.kind==="document"?docText(d):numericText(d);}
function refineChips(d){
  if(d.kind==="document"){
    var alts=DOC_ORDER.filter(function(t){return t!==d.docType}).slice(0,2).map(function(t){return "Turn it into a "+DOCTYPES[t].label.toLowerCase()});
    return alts.concat([d.approvals?"Remove approvals":"Add approvals",d.short?"Make it longer":"Make it shorter","Turn it into a dashboard"]);
  }
  var next=d.period==="weekly"?"monthly":d.period==="monthly"?"quarterly":"weekly";
  return ["Make it "+next,d.trend?"Remove the trend line":"Add a trend line",d.comment?"Remove commentary":"Add commentary",d.kind==="dashboard"?"Turn it into a report":"Turn it into a dashboard","Turn it into a policy"];
}

/* EXPORT:START */
function asciiPdf(s){return String(s).replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/[\u2013\u2014]/g,"-").replace(/\u2026/g,"...").replace(/\u2192/g,"->").replace(/\u2610/g,"[ ]").replace(/[^\x00-\xFF]/g,"?");}
function xmlEsc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function exportBlocks(d){
  var b=[];
  if(d.kind==="document"){
    b.push({t:"title",text:d.title});
    b.push({t:"sub",text:d.label});
    b.push({t:"table",head:null,rows:d.meta.map(function(m){return [m[0],m[1]]})});
    docSecs(d).forEach(function(sec){
      var lim=function(a){return d.short?a.slice(0,3):a;};
      b.push({t:"h",text:sec.h});
      if(sec.p)b.push({t:"p",text:sec.p});
      if(sec.ul)b.push({t:"ul",items:lim(sec.ul)});
      if(sec.ol)b.push({t:"ol",items:lim(sec.ol)});
      if(sec.check)b.push({t:"check",items:lim(sec.check)});
      if(sec.table)b.push({t:"table",head:sec.table.head,rows:sec.table.rows});
    });
    return b;
  }
  var P=PERIOD[d.period],m0=d.metrics[0],isDash=d.kind==="dashboard";
  b.push({t:"title",text:d.title});
  b.push({t:"sub",text:titleCase(d.period)+" "+d.kind});
  if(!isDash){b.push({t:"h",text:"Purpose"});b.push({t:"p",text:"This "+d.period+" report summarizes "+d.topic+" for the regulatory reporting team, so owners and reviewers work from the same numbers before filing."});}
  b.push({t:"h",text:isDash?"Headline numbers":"Summary"});
  b.push({t:"table",head:["Measure","Current","Vs last "+P.noun],rows:d.metrics.map(function(m){return [m.label,m.val,m.delta]})});
  if(isDash||d.trend)b.push({t:"chart",mode:isDash?"bars":"line",caption:m0.label+" over the last 6 "+P.noun+"s (dashed line: internal threshold)"});
  b.push({t:"h",text:"By segment"});
  b.push({t:"table",head:["Segment",m0.label,"Status"],rows:d.rows.map(function(r){return [r.seg,r.val,r.watch?"Watch":"On track"]})});
  if(d.comment){b.push({t:"h",text:"Commentary"});b.push({t:"p",text:commentary(d)});}
  if(!isDash){b.push({t:"h",text:"Sign-off"});b.push({t:"table",head:["Prepared by","Reviewed by","Attested on"],rows:[["","",""]]});}
  return b;
}
function chartPNG(d,mode){
  var cv=document.createElement("canvas");cv.width=1120;cv.height=352;
  var c=cv.getContext("2d");
  var W=1120,H=352,pl=92,pr=24,pt=28,pb=56,n=d.series.length,t=d.metrics[0].t,iw=W-pl-pr,ih=H-pt-pb,vs=d.series;
  var hi=Math.max.apply(null,vs.concat([d.thr])),lo=0;
  if(mode==="line"){var mn=Math.min.apply(null,vs.concat([d.thr])),pad=(hi-mn)*0.3||1;lo=mn-pad;hi=hi+pad;}else{hi=hi*1.15;}
  function Y(v){return pt+ih-(v-lo)/(hi-lo)*ih;}
  function X(i){return pl+iw/n*(i+0.5);}
  c.fillStyle="#FFFFFF";c.fillRect(0,0,W,H);
  c.font="22px Helvetica, Arial, sans-serif";c.textBaseline="middle";
  var k;
  for(k=0;k<=2;k++){var gv=lo+(hi-lo)*k/2,gy=Y(gv);c.strokeStyle="#DAE2EE";c.lineWidth=2;c.beginPath();c.moveTo(pl,gy);c.lineTo(W-pr,gy);c.stroke();c.fillStyle="#586782";c.textAlign="right";c.fillText(axisFmt(t,gv),pl-12,gy);}
  if(mode==="bars"){var bw=iw/n*0.55;vs.forEach(function(v,i){c.globalAlpha=i===n-1?1:0.5;c.fillStyle="#2A55F5";c.fillRect(X(i)-bw/2,Y(v),bw,pt+ih-Y(v));});c.globalAlpha=1;}
  c.setLineDash([12,8]);c.strokeStyle="#B35F14";c.lineWidth=3;var ty=Y(d.thr);c.beginPath();c.moveTo(pl,ty);c.lineTo(W-pr,ty);c.stroke();c.setLineDash([]);
  if(mode==="line"||d.trend){
    c.strokeStyle="#0A8577";c.lineWidth=5;c.lineJoin="round";c.beginPath();
    vs.forEach(function(v,i){if(i===0)c.moveTo(X(i),Y(v));else c.lineTo(X(i),Y(v));});c.stroke();
    vs.forEach(function(v,i){c.fillStyle="#FFFFFF";c.beginPath();c.arc(X(i),Y(v),8,0,Math.PI*2);c.fill();c.lineWidth=4;c.stroke();});
  }
  c.fillStyle="#586782";c.textAlign="center";d.labels.forEach(function(lb,i){c.fillText(lb,X(i),H-24);});
  return cv.toDataURL("image/png");
}
function docxBuild(d,outType){
  var blocks=exportBlocks(d),imgB64=null,body=[],TW=9360;
  function run(text,o){o=o||{};return '<w:r><w:rPr>'+(o.b?'<w:b/>':'')+(o.color?'<w:color w:val="'+o.color+'"/>':'')+(o.sz?'<w:sz w:val="'+o.sz+'"/>':'')+'</w:rPr><w:t xml:space="preserve">'+xmlEsc(text)+'</w:t></w:r>';}
  function para(inner,o){o=o||{};var pp=(o.style?'<w:pStyle w:val="'+o.style+'"/>':'')+(o.after!=null?'<w:spacing w:after="'+o.after+'"/>':'')+(o.ind?'<w:ind w:left="'+o.ind+'" w:hanging="'+(o.hang||0)+'"/>':'');return '<w:p>'+(pp?'<w:pPr>'+pp+'</w:pPr>':'')+inner+'</w:p>';}
  function table(head,rows){
    var cols=(head||rows[0]).length,w=Math.floor(TW/cols);
    var x='<w:tbl><w:tblPr><w:tblW w:w="'+TW+'" w:type="dxa"/><w:tblBorders>'+['top','left','bottom','right','insideH','insideV'].map(function(e){return '<w:'+e+' w:val="single" w:sz="4" w:space="0" w:color="C8D0DE"/>'}).join("")+'</w:tblBorders><w:tblLayout w:type="fixed"/><w:tblCellMar><w:top w:w="60" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>'+new Array(cols+1).join('<w:gridCol w:w="'+w+'"/>')+'</w:tblGrid>';
    function row(cells,isH){return '<w:tr>'+cells.map(function(cv){return '<w:tc><w:tcPr><w:tcW w:w="'+w+'" w:type="dxa"/>'+(isH?'<w:shd w:val="clear" w:color="auto" w:fill="E7ECFF"/>':'')+'</w:tcPr>'+para(run(cv,{b:isH}),{after:0})+'</w:tc>'}).join("")+'</w:tr>';}
    if(head)x+=row(head,true);
    rows.forEach(function(r){x+=row(r,false);});
    return x+'</w:tbl>'+para('',{after:120});
  }
  blocks.forEach(function(bl){
    if(bl.t==="title")body.push(para(run(bl.text),{style:"Title"}));
    else if(bl.t==="sub")body.push(para(run(bl.text,{color:"586782"}),{after:200}));
    else if(bl.t==="h")body.push(para(run(bl.text),{style:"Heading1"}));
    else if(bl.t==="p")body.push(para(run(bl.text)));
    else if(bl.t==="ul"||bl.t==="ol"||bl.t==="check"){
      bl.items.forEach(function(it,i){var mk=bl.t==="ul"?"\u2022":bl.t==="ol"?(i+1)+".":"\u2610";body.push(para(run(mk)+'<w:r><w:tab/></w:r>'+run(it),{after:60,ind:420,hang:420}));});
    }
    else if(bl.t==="table")body.push(table(bl.head,bl.rows));
    else if(bl.t==="chart"){
      imgB64=chartPNG(d,bl.mode).split(",")[1];
      body.push(para(run(bl.caption,{color:"586782",sz:20}),{after:60}));
      body.push('<w:p><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="5486400" cy="1724000"/><wp:docPr id="1" name="Chart"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="chart.png"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="rId2"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="5486400" cy="1724000"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>');
    }
  });
  var NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"';
  var docXml='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document '+NS+'><w:body>'+body.join("")+'<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>';
  var W_NS='xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  var styles='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles '+W_NS+'><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:spacing w:after="80"/></w:pPr><w:rPr><w:b/><w:color w:val="0E1A33"/><w:sz w:val="44"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:keepNext/><w:spacing w:before="280" w:after="100"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="2A55F5"/><w:sz w:val="28"/></w:rPr></w:style></w:styles>';
  var ct='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="png" ContentType="image/png"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>';
  var rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>';
  var drels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+(imgB64?'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/chart.png"/>':'')+'</Relationships>';
  var Z=new window.JSZip();
  Z.file("[Content_Types].xml",ct);Z.file("_rels/.rels",rels);Z.file("word/document.xml",docXml);Z.file("word/styles.xml",styles);Z.file("word/_rels/document.xml.rels",drels);
  if(imgB64)Z.file("word/media/chart.png",imgB64,{base64:true});
  return Z.generateAsync({type:outType||"blob",mimeType:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"});
}
function pdfBuild(d,outType){
  var blocks=exportBlocks(d),J=window.jspdf.jsPDF,doc=new J({unit:"pt",format:"letter",compress:true});
  var PW=doc.internal.pageSize.getWidth(),PH=doc.internal.pageSize.getHeight(),M=54,CW=PW-2*M,y=M;
  var INK=[14,26,51],MUT=[88,103,130],BRAND=[42,85,245];
  function need(h){if(y+h>PH-M){doc.addPage();y=M;}}
  function setF(size,bold,col){doc.setFont("helvetica",bold?"bold":"normal");doc.setFontSize(size);doc.setTextColor(col[0],col[1],col[2]);}
  function lines(text,size,bold,col,lh,gap){setF(size,bold,col);var ls=doc.splitTextToSize(asciiPdf(text),CW);ls.forEach(function(ln){need(lh);doc.text(ln,M,y+size);y+=lh;});y+=gap||0;}
  function ptable(bl){
    var cols=(bl.head||bl.rows[0]).length,cw=CW/cols,all=(bl.head?[{c:bl.head,h:true}]:[]).concat(bl.rows.map(function(r){return {c:r,h:false}}));
    all.forEach(function(r){
      setF(10.5,r.h,INK);
      var cells=r.c.map(function(cell){return doc.splitTextToSize(asciiPdf(cell),cw-12)});
      var nl=Math.max.apply(null,cells.map(function(c){return Math.max(c.length,1)})),h=nl*13+10;
      need(h);
      if(r.h){doc.setFillColor(231,236,255);doc.rect(M,y,CW,h,"F");}
      doc.setDrawColor(200,208,222);
      r.c.forEach(function(cell,i){doc.rect(M+i*cw,y,cw,h);setF(10.5,r.h,INK);cells[i].forEach(function(ln,j){doc.text(ln,M+i*cw+6,y+5+(j+1)*13-2);});});
      y+=h;
    });
    y+=10;
  }
  blocks.forEach(function(bl){
    if(bl.t==="title")lines(bl.text,22,true,INK,28,2);
    else if(bl.t==="sub")lines(bl.text,11,false,MUT,16,10);
    else if(bl.t==="h"){need(40);y+=8;lines(bl.text,14,true,BRAND,19,4);}
    else if(bl.t==="p")lines(bl.text,11,false,INK,15.5,6);
    else if(bl.t==="ul"||bl.t==="ol"||bl.t==="check"){
      bl.items.forEach(function(it,i){
        var mk=bl.t==="ul"?"-":bl.t==="ol"?(i+1)+".":"[ ]";
        setF(11,false,INK);need(15.5);doc.text(mk,M+4,y+11);
        doc.splitTextToSize(asciiPdf(it),CW-30).forEach(function(ln){need(15.5);doc.text(ln,M+26,y+11);y+=15.5;});
        y+=2;
      });
      y+=4;
    }
    else if(bl.t==="table")ptable(bl);
    else if(bl.t==="chart"){
      lines(bl.caption,10.5,false,MUT,14,4);
      var ih=CW*352/1120;need(ih+8);doc.addImage(chartPNG(d,bl.mode),"PNG",M,y,CW,ih);y+=ih+10;
    }
  });
  return outType==="arraybuffer"?doc.output("arraybuffer"):doc.output("blob");
}
function trackerRows(d){
  var rows=[],n=1;
  function add(item,section){rows.push([n++,item,section,"","","Not started",""]);}
  if(d.kind==="document"){
    docSecs(d).forEach(function(sec){
      var lim=function(a){return d.short?a.slice(0,3):a;};
      (sec.ol?lim(sec.ol):[]).concat(sec.ul?lim(sec.ul):[],sec.check?lim(sec.check):[]).forEach(function(it){add(it,sec.h)});
    });
  }else{
    d.metrics.forEach(function(m){add("Review "+m.label+" ("+m.val+")","Measures");});
    d.rows.forEach(function(r){if(r.watch)add("Follow up on "+r.seg+": "+d.metrics[0].label+" is the lowest at "+r.val,"Segments");});
    add("Confirm the numbers against the source data","Checks");
    add("Share the "+d.period+" "+d.kind+" with owners","Sharing");
    add("Record review and approval","Sign-off");
  }
  if(!rows.length&&d.kind==="document"){
    docSecs(d).forEach(function(sec){if(sec.table&&sec.table.rows.length)sec.table.rows.forEach(function(r){if(r[0]&&r[0].charAt(0)!=="[")add(r[0]+(r[1]&&r[1].charAt(0)!=="["&&r.length<4?": "+r[1]:""),sec.h)});});
  }
  if(!rows.length)add("Review "+d.title,"General");
  return rows;
}
function xlsxBuild(d,outType){
  var X=window.XLSX,wb=X.utils.book_new();
  var ws=X.utils.aoa_to_sheet([["#","Item","Section","Owner","Due date","Status","Notes"]].concat(trackerRows(d)));
  ws["!cols"]=[{wch:5},{wch:58},{wch:20},{wch:18},{wch:14},{wch:14},{wch:36}];
  X.utils.book_append_sheet(wb,ws,"Tracker");
  var sm=[[d.title],[d.kind==="document"?d.label:titleCase(d.period)+" "+d.kind],["Topic",d.topic],["Version",d.ver],["Created",new Date().toISOString().slice(0,10)],[],["Status options","Not started, In progress, Done, Blocked"]];
  if(d.kind!=="document"){sm.push([],["Measure","Current","Vs last "+PERIOD[d.period].noun]);d.metrics.forEach(function(m){sm.push([m.label,m.val,m.delta])});}
  var ws2=X.utils.aoa_to_sheet(sm);ws2["!cols"]=[{wch:30},{wch:40},{wch:22}];
  X.utils.book_append_sheet(wb,ws2,"Summary");
  var out=X.write(wb,{bookType:"xlsx",type:"array"});
  return outType==="raw"?out:new Blob([out],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}
/* EXPORT:END */

/* ---------- Uploaded documents ---------- */
var MAXTEXT=150000;
var DOC_NOISE=new Set("shall must will would should could may might also such each other their there which these those this that with from have been being than then them they your more most only into over under between within without".split(" "));
function termStats(text){
  var f={},raw={};
  clean(text.slice(0,60000)).split(" ").forEach(function(w){
    if(w.length<4||/^\d+$/.test(w)||STOP.has(w)||DOC_NOISE.has(w))return;
    var st=stem(w);if(STOP.has(st)||DOC_NOISE.has(st))return;
    f[st]=(f[st]||0)+1;if(!raw[st])raw[st]=w;
  });
  return {f:f,raw:raw,top:Object.keys(f).sort(function(a,b){return f[b]-f[a]})};
}
function makeUploadItem(u){
  var base=u.name.replace(/\.[^.]+$/,""),flat=u.text.replace(/\s+/g," ").trim(),first=flat.slice(0,170);
  var ts=termStats(u.text);
  var it={type:"document",name:u.name,desc:first+(flat.length>170?"...":""),owner:"You",freq:"Uploaded",note:"Added "+new Date(u.added).toLocaleDateString()+".",tags:ts.top.slice(0,25).join(" "),upload:true,uid:u.id,size:u.size,text:u.text,link:"#"};
  it.n=new Set(stems(base));it.t=new Set(stems(it.tags));it.d=new Set(stems(first));it.o=new Set(["you"]);
  it.nameStem=stems(base).join(" ");
  return it;
}
function addUploadItem(u){
  ITEMS=ITEMS.filter(function(i){return !(i.upload&&i.name===u.name)});
  ITEMS.push(makeUploadItem(u));
}
uploads.forEach(addUploadItem);
function chunksOf(it){
  if(it._ch)return it._ch;
  var out=[];
  it.text.split(/\n+/).map(function(x){return x.trim()}).filter(Boolean).forEach(function(pg){
    if(pg.length<=520){out.push(pg);return;}
    var cur="";
    pg.replace(/([.!?])\s+/g,"$1\u0001").split("\u0001").forEach(function(se){
      if(cur&&(cur+" "+se).length>480){out.push(cur);cur=se;}else cur=cur?cur+" "+se:se;
    });
    if(cur)out.push(cur);
  });
  var m=[];out.forEach(function(c){if(m.length&&m[m.length-1].length<60)m[m.length-1]+=" "+c;else m.push(c);});
  it._ch=m.map(function(t){var arr=stems(t);return {t:t,s:new Set(arr),a:arr}});
  return it._ch;
}
function uploadSearch(p,only){
  var best=null,docs=only?[only]:ITEMS.filter(function(i){return i.upload});
  var qs=new Set(p.content.map(function(w){return w.s}));
  docs.forEach(function(it){
    chunksOf(it).forEach(function(c){
      var hits=0;p.content.forEach(function(w){if(c.s.has(w.s))hits++;});
      if(!hits)return;
      var tf=0;c.a.forEach(function(w){if(qs.has(w))tf++;});
      var score=hits*10+Math.min(tf,6)+(qs.has(c.a[0])?3:0);
      if(!best||score>best.score)best={it:it,c:c,hits:hits,score:score};
    });
  });
  return best;
}
function summarize(it){
  var text=it.text.replace(/\s+/g," ");
  var sents=text.replace(/([.!?])\s+/g,"$1\u0001").split("\u0001").map(function(x){return x.trim()}).filter(function(x){return x.length>30&&x.length<400});
  var ts=termStats(it.text),f=ts.f;
  var scored=sents.map(function(sn,i){var ws=stems(sn),sc=0;ws.forEach(function(w){sc+=f[w]||0});sc=sc/Math.sqrt(ws.length||1);if(i<2)sc*=1.3;return {sn:sn,i:i,sc:sc}});
  var pick=scored.slice().sort(function(a,b){return b.sc-a.sc}).slice(0,4).sort(function(a,b){return a.i-b.i}).map(function(x){return x.sn});
  if(!pick.length)pick=[text.slice(0,300)+(text.length>300?"...":"")];
  var terms=ts.top.slice(0,6).map(function(k){return ts.raw[k]});
  var bullets=pick.slice();if(terms.length)bullets.push("Key terms: "+terms.join(", "));
  stats.found++;ctx.top=it;ctx.draft=null;
  var kw=terms[0]||"this";
  return {segs:[T("Here\u2019s a short summary of "),B(it.name),T(".")],bullets:bullets,items:[{it:it,sc:1,hit:[],pct:null}],relLabel:"Source",found:true,kind:"answer",
    follow:["What does it say about "+kw+"?","Create a checklist on "+kw],followLabel:"Try asking",
    trace:{steps:steps('You asked for a summary of <b>'+esc(it.name)+'</b>.','Read the whole document ('+Math.round(it.text.length/1000)+'k characters).','Picked the sentences that carry the most important terms.','Listed those sentences in their original order, plus the key terms.')}};
}
function answerFromUpload(hit,p){
  var text=hit.c.t,short=text.length>440?text.slice(0,440).replace(/\s+\S*$/,"")+"...":text;
  stats.found++;ctx.top=hit.it;ctx.draft=null;
  return {segs:[T("From "),B(hit.it.name),T(": \u201C"+short+"\u201D")],items:[{it:hit.it,sc:1,hit:[],pct:null}],relLabel:"Source",found:true,kind:"answer",
    follow:["Summarize it"],followLabel:"Try asking",
    trace:{steps:steps('You asked a question about your uploaded documents.'+kw(p.content.map(function(c){return c.raw})),'Read '+ITEMS.filter(function(i){return i.upload}).reduce(function(n,i){return n+chunksOf(i).length},0)+' passages across your uploads.','Best passage:','Quoted the closest passage and linked the source.',[{name:hit.it.name,pct:100}])}};
}
function uploadRoute(q,p,l,ups){
  var flat=stems(l).join(" ");
  var named=ups.filter(function(u){return u.nameStem&&flat.indexOf(u.nameStem)>-1})[0];
  var mention=/\b(my|the|this|that|uploaded|attached)\s+(doc|docs|document|documents|file|files|upload|uploads|policy|paper|pdf)\b/.test(l);
  var target=named||(ctx.top&&ctx.top.upload&&(p.pron||mention)?ctx.top:null)||(mention?ups[ups.length-1]:null);
  var isQ=QRE.test(l)||/\b(say|says|mention|mentions|according|state|states|cover|covers|how long|how many|how much)\b/.test(l);
  if(/\b(summari[sz]e|summary|key points|main points|tl;?dr)\b/.test(l)&&target)return summarize(target);
  if(named&&!isQ&&!/\babout\b/.test(l))return null;
  var pc=target?p.content.filter(function(c){return target.nameStem.split(" ").indexOf(c.s)<0&&!/^(policy|document|doc|file|paper|pdf|upload)$/.test(c.s)}):p.content;
  if(target&&isQ&&!pc.length)return summarize(target);
  if(pc.length&&(target||isQ)){
    var need=Math.max(1,Math.ceil(pc.length*0.6));
    var hit=uploadSearch({content:pc,hint:p.hint},target||null);
    if(hit&&hit.hits>=need&&(target||hit.hits>=2))return answerFromUpload(hit,{content:pc});
    if(target)return {segs:[T("I couldn\u2019t find that in "),B(target.name),T(". Try different words, or ask me to summarize it.")],items:[{it:target,sc:1,hit:[],pct:null}],relLabel:"Source",found:false,kind:"answer",follow:["Summarize it"],followLabel:"Try asking"};
  }
  return null;
}

/* ---------- Stats and context ---------- */
var stats={asked:0,found:0,none:0,created:0,yes:0,no:0,gaps:{}};
var ctx={top:null,draft:null};
var DRAFTMAP={};

function steps(a,b,c,d,rank){return [{b:"Understood your question",h:a},{b:"Searched",h:b},{b:"Ranked the results",h:c,rank:rank},{b:"Wrote the answer",h:d}];}
function kw(list){return list.length?' Key words: '+list.map(function(k){return '<mark>'+esc(k)+'</mark>'}).join(" ")+'.':'';}

function refine(q,l){
  var d0=ctx.draft,ch=[];
  var sp={topic:d0.topic,kind:d0.kind,period:d0.period||"monthly",trend:!!d0.trend,comment:!!d0.comment,docType:d0.docType||"guide",gov:!!d0.gov,approvals:!!d0.approvals,short:!!d0.short,basedOn:d0.basedOn,ver:d0.ver+1};
  var turn=/\b(turn|convert|switch|change)\b/.test(l);
  var newDoc=detectDocType(l),km=l.match(/\b(dashboard|report)\b/);
  var neg=/\b(remove|drop|without|hide)\b/.test(l);
  if(turn&&newDoc&&!(sp.kind==="document"&&sp.docType===newDoc)){
    sp.kind="document";sp.docType=newDoc;sp.approvals=!!DOCTYPES[newDoc].appr;ch.push("turned it into a "+DOCTYPES[newDoc].label.toLowerCase());
  }else if(turn&&km&&km[1]!==sp.kind){
    sp.kind=km[1];sp.comment=km[1]==="report";sp.trend=false;ch.push("turned it into a "+km[1]);
  }
  if(sp.kind!=="document"){
    var per=l.match(/\b(daily|weekly|monthly|quarterly)\b/);
    if(per&&per[1]!==sp.period){sp.period=per[1];ch.push("switched it to "+per[1]);}
    if(/trend/.test(l)&&neg!==!sp.trend){sp.trend=!neg;ch.push(neg?"removed the trend line":"added a trend line");}
    if(/comment/.test(l)&&neg!==!sp.comment){sp.comment=!neg;ch.push(neg?"removed the commentary":"added commentary");}
  }else{
    if(/(approval|sign-?off|sign off)/.test(l)&&neg!==!sp.approvals){sp.approvals=!neg;ch.push(neg?"removed the approvals section":"added an approvals section");}
    if(/\b(shorter|short|brief|concise|condense)\b/.test(l)&&!sp.short){sp.short=true;ch.push("made it shorter");}
    if(/\b(longer|full|detailed|expand)\b/.test(l)&&sp.short){sp.short=false;ch.push("restored the full version");}
  }
  if(!ch.length)return null;
  var d=buildDraft(sp);ctx.draft=d;stats.found++;
  return {segs:[T("Done. I "+ch.join(" and ")+". This is version "+d.ver+" of "),B(d.title),T(".")],items:[],draft:d,found:true,kind:"create",
    follow:refineChips(d),followLabel:"Keep refining",
    trace:{steps:steps('You asked to change the draft: \u201C'+esc(q.trim())+'\u201D.','Reused your last draft as the starting point and kept the same topic.','Applied: '+ch.join(", ")+'.','Rebuilt the draft as version '+d.ver+'.')}};
}
function create(q,p,l){
  var docType=detectDocType(l);
  var isNum=p.hint==="dashboard"||(p.hint==="report"&&!docType);
  var per=(l.match(/\b(daily|weekly|monthly|quarterly)\b/)||[])[1]||"monthly";
  var strip=isNum?/^(daily|weekly|monthly|quarterly)$/:DOC_STRIP;
  var words=p.content.filter(function(c){return !strip.test(c.raw)});
  if(!words.length){
    return {segs:[T("What should it cover? Try one of these.")],items:[],chips:true,
      chipList:isNum?["Create a monthly liquidity dashboard","Create a quarterly exposure report","Create a weekly attestation dashboard"]:["Create a governance policy for attestation","Create a runbook for late filings","Create a checklist for monthly filing"],found:false,noLog:true};
  }
  var topic=words.map(function(w){return w.raw}).join(" ");
  var kind=isNum?(p.hint==="dashboard"?"dashboard":"report"):"document";
  var sim,d,basedOn,segs,stepsArr;
  if(kind==="document"){
    docType=docType||"guide";
    sim=search({content:words,hint:"document"}).filter(function(r){return r.pct>=40});
    basedOn=sim.length?sim[0].it.name:null;
    d=buildDraft({topic:topic,kind:"document",docType:docType,gov:/\bgovernance\b/.test(l),approvals:!!DOCTYPES[docType].appr,short:false,basedOn:basedOn,ver:1});
    segs=[T("Here\u2019s a first draft: "),B(d.title),T("."+(basedOn?" I used "+basedOn+" as a model.":" There was no close match in the catalog, so I used a standard template.")+" Refine it below.")];
    stepsArr=steps('You want to <b>create a new '+DOCTYPES[docType].label.toLowerCase()+'</b> about <mark>'+esc(topic)+'</mark>.','Looked for similar documents in the catalog to use as a model.',sim.length?'Closest existing documents:':'No close match, so a standard template was used.','Filled a standard '+DOCTYPES[docType].label.toLowerCase()+' template with your topic.',sim.slice(0,3).map(function(r){return {name:r.it.name,pct:r.pct}}));
  }else{
    sim=search({content:words,hint:kind}).filter(function(r){return r.pct>=40});
    basedOn=sim.length?sim[0].it.name:null;
    d=buildDraft({topic:topic,kind:kind,period:per,trend:false,comment:kind==="report",basedOn:basedOn,ver:1});
    segs=[T("Here\u2019s a "+per+" "+kind+" draft: "),B(d.title),T("."+(basedOn?" I copied the layout of "+basedOn+" so it feels familiar.":" There was no close match in the catalog, so I used a standard layout."))];
    stepsArr=steps('You want to <b>create a new '+kind+'</b> about <mark>'+esc(topic)+'</mark> ('+per+').','Looked for similar '+kind+'s in the catalog so the draft follows a familiar layout.',sim.length?'Closest existing items:':'No close match, so a standard layout was used.','Built headline numbers, a chart, and a table.',sim.slice(0,3).map(function(r){return {name:r.it.name,pct:r.pct}}));
  }
  ctx.draft=d;ctx.top=null;stats.created++;stats.found++;
  var items=sim.slice(0,2).map(function(r){return {it:r.it,sc:1,hit:[],pct:null}});
  return {segs:segs,items:items,relLabel:items.length?(kind==="document"?"Similar documents already in the catalog":"Similar items already in the catalog"):"",draft:d,found:true,kind:"create",
    follow:refineChips(d),followLabel:"Refine this draft",trace:{steps:stepsArr}};
}

function compose(q){
  var p=parse(q),l=q.toLowerCase().trim();
  stats.asked++;
  var refineWords=ctx.draft&&/^(please\s+)?(add|remove|make|turn|switch|change|include|drop|convert)\b/.test(l);
  if(refineWords){var rr=refine(q,l);if(rr)return rr;}
  if(p.create&&(p.hint==="report"||p.hint==="dashboard"||p.hint==="document"||detectDocType(l)||/\b(summary|overview|scorecard)\b/.test(l)))return create(q,p,l);
  if(/^(hi|hello|hey|hola|good (morning|afternoon|evening))\b/.test(l)||/(what can you do|what do you do|who are you|what are you|what is docket|how does docket|how do you work|help me)/.test(l)){
    ctx.draft=null;
    return {segs:[T("I\u2019m Docket, a search assistant for regulatory reporting. Ask me anything, find a report, dashboard, or guide, or have me create a new dashboard, report, or document.")],items:[],chips:true,chipList:HELP_CHIPS,found:false,noLog:true};
  }
  var ups=ITEMS.filter(function(i){return i.upload});
  if(ups.length){var ur=uploadRoute(q,p,l,ups);if(ur)return ur;}
  var trace={intent:p.intent,keywords:p.content.map(function(c){return c.raw}),hint:p.hint,scanned:ITEMS.length};
  var useCtx=ctx.top&&!p.content.length&&!p.hint&&(p.pron||p.rel||p.intent!=="find");
  var res=[],top=null,segs,limit=5;
  if(useCtx){
    top=ctx.top;ctx.draft=null;
    res=p.intent==="related"?relatedTo(top):[{it:top,sc:10,hit:[],pct:100}];
  }else{
    if(!p.content.length&&!p.hint){
      stats.none++;
      return {segs:[T("Tell me what you\u2019re looking for, like a topic, a question, a report name, or a dashboard.")],items:[],chips:true,found:false};
    }
    var phrase=p.content.map(function(c){return c.s}).join(" ");
    var cat=search(p);
    if(p.content.length)cat=cat.filter(function(r,i){return i===0||r.pct>=25});
    var catOK=cat.length&&!(p.content.length&&(cat[0].sc<2||cat[0].pct<40||cat[0].hit.length<Math.ceil(p.content.length*0.6)));
    var kb=p.content.length?kbSearch(p):null;
    var nameInQuery=ITEMS.some(function(it){return it.nameStem.split(" ").length>=2&&phrase.indexOf(it.nameStem)>-1});
    var useKB=kb&&kb.s>=3&&((QRE.test(l)&&(p.intent==="find"||p.intent==="about")&&!nameInQuery)||!catOK);
    if(useKB){
      ctx.draft=null;stats.found++;
      var items=kb.e.rel.map(byName).filter(Boolean).map(function(it){return {it:it,sc:1,hit:[],pct:null}});
      ctx.top=items[0]?items[0].it:null;
      var nb=[KB[(kb.idx+1)%KB.length].q,KB[(kb.idx+2)%KB.length].q];
      return {segs:[T(kb.e.a)],items:items,relLabel:items.length?"Related in the catalog":"",found:true,kind:"answer",follow:nb,followLabel:"Related questions",
        trace:{steps:steps('You asked a question, so I checked saved answers before the catalog.'+kw(trace.keywords),'Looked through '+KB.length+' saved answers and '+ITEMS.length+' catalog items.','Best answer:',"Used the saved answer and linked the related items below.",[{name:kb.e.q,pct:100}])}};
    }
    if(!catOK){
      var dk=ctx.draft;
      stats.none++;stats.gaps[q.trim()]=(stats.gaps[q.trim()]||0)+1;ctx.draft=null;
      var dtype=detectDocType(l);
      var topicWords=p.content.filter(function(c){return !DOC_STRIP.test(c.raw)}).map(function(c){return c.raw}).slice(0,4).join(" ");
      if(topicWords&&(p.hint||dtype)&&!refineWords){
        var offer;
        if(p.hint==="dashboard")offer="Create a monthly "+topicWords+" dashboard";
        else if(p.hint==="report"&&!dtype)offer="Create a monthly "+topicWords+" report";
        else offer="Create a "+(dtype||"guide")+" on "+topicWords;
        return {segs:[T("I couldn\u2019t find that in the catalog, but I can create it for you. Tap below to get a first draft you can refine.")],items:[],chips:true,chipList:[offer].concat(SUGGEST.slice(0,2)),found:false};
      }
      var msg=refineWords?(dk&&dk.kind==="document"?"I can turn this draft into another document type (policy, procedure, checklist, runbook, memo, charter, guide, FAQ), add an approvals section, or make it shorter.":"I can change a draft\u2019s period (daily, weekly, monthly, quarterly), add or remove the trend line or commentary, or turn it into another type."):"I don\u2019t have an answer for \u201C"+q.trim()+"\u201D yet. I\u2019ve noted it as a gap. Try one of these instead.";
      return {segs:[T(msg)],items:[],chips:true,found:false};
    }
    res=cat;top=res[0].it;ctx.draft=null;
  }
  stats.found++;ctx.top=top;
  var n=res.length;
  if(!useCtx&&!p.content.length&&p.hint){
    trace.intent="browse";limit=8;
    segs=[T("The catalog has "+n+" "+p.hint+"s. "+(n>8?"Here are the first 8.":"Here they are."))];
  }else if(p.intent==="related"){
    limit=4;
    segs=n?[T("Items related to "),B(top.name),T(": these share topics or an owner with it.")]:[T("I couldn\u2019t find close relatives of "),B(top.name),T(".")];
  }else if(p.intent==="owner"){
    segs=[B(top.name),T(" is maintained by "),B(top.owner),T(". Contact them for access or questions.")];limit=useCtx?1:3;
  }else if(p.intent==="when"){
    segs=[B(top.name),T(" "+FREQ[top.freq]+". "+top.note)];limit=useCtx?1:3;
  }else if(p.intent==="about"){
    segs=[B(top.name),T(": "+top.desc+" It\u2019s a "+top.type+" owned by "+top.owner+" and "+FREQ[top.freq]+"."+(!useCtx&&n>1?" Related items are below.":""))];
    limit=useCtx?1:4;
  }else{
    segs=[T("I found "+n+(n===1?" match":" matches")+". The best fit is "),B(top.name),T(top.upload?", a document you uploaded.":", a "+top.type+" from "+top.owner+".")];limit=5;
  }
  if(top.upload&&(p.intent==="owner"||p.intent==="when"||p.intent==="about")){segs=[B(top.name),T(" is a document you uploaded. "+top.desc)];limit=1;}
  var fu=top.upload?["Summarize it"]:followUps(top);
  if(!useCtx&&p.intent==="find"&&p.content.length&&(p.hint==="dashboard"||p.hint==="report"||p.hint==="document")){
    var tw=p.content.map(function(c){return c.raw}).slice(0,3).join(" ");
    segs.push(T(" Need something different? I can create a new "+p.hint+"."));
    fu=fu.concat([p.hint==="document"?"Create a guide on "+tw:"Create a monthly "+tw+" "+p.hint]);
  }
  var shown=res.slice(0,limit);
  var what=useCtx?'Used what you were just looking at: <b>'+esc(top.name)+'</b>.':'You want to <b>'+INTENT[trace.intent]+'</b>.'+kw(trace.keywords)+(trace.hint?' Looking at <b>'+trace.hint+'s</b> first.':'');
  return {segs:segs,items:shown,found:true,kind:"find",follow:fu,followLabel:"Ask a follow-up",
    trace:{steps:steps(what,'Looked through '+ITEMS.length+' reports, dashboards, and documents at once, using names, topics, descriptions, and owners.','Closest matches first.','Pulled the owner, schedule, and link from the best match.',shown.slice(0,3).map(function(r){return {name:r.it.name,pct:r.pct==null?100:r.pct}}))}};
}

/* ---------- UI helpers ---------- */
var $=function(id){return document.getElementById(id)};
var inner=$("inner"),thread=$("thread"),input=$("q"),ta=$("ta");
var busy=false,demoRun=false,view="ask";
var SUGGEST=["Show me a liquidity dashboard","What is an attestation?","Create a monthly liquidity dashboard","Create a governance policy for attestation","Show me a customer complaints dashboard","What happens if a filing is late?"];
var types=["report","dashboard","document"];
var counts={};
function recount(){
  types.forEach(function(t){counts[t]=ITEMS.filter(function(i){return i.type===t}).length});
  $("browse").innerHTML=types.map(function(t){return '<button class="bitem" data-q="Show all '+t+'s"><span class="dot '+t+'"></span>'+LABEL[t]+'s<span class="n">'+counts[t]+'</span></button>'}).join("");
  $("libCount").textContent=ITEMS.filter(function(i){return i.upload}).length;
}

function toBottom(){thread.scrollTo({top:thread.scrollHeight,behavior:reduce?"auto":"smooth"});}
function toast(msg){var t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove("show")},2600);}
function chipHTML(list){return list.map(function(s){return '<button class="chip" data-q="'+esc(s)+'">'+esc(s)+'</button>'}).join("");}
function sleep(ms){return new Promise(function(r){setTimeout(r,reduce?Math.min(ms,40):ms)});}

$("brandSide").innerHTML=MARK+"Docket";
$("brandTop").innerHTML=MARK+"Docket";
$("fine").textContent="Docket is a prototype.";
recount();
$("howToggle").checked=showHow;

/* ---------- Hero ---------- */
function heroHTML(){
  return '<section class="hero" id="hero">'+
  '<span class="pill">Prototype</span>'+
  '<h1>Ask anything about regulatory reporting.</h1>'+
  '<p class="lead">Find reports and dashboards, ask questions, upload your own documents, and create new dashboards and documents. One search for everything your reporting team works with.</p>'+
  '<div class="ctas"><button class="cta main1" data-demo><svg viewBox="0 0 16 16" fill="currentColor"><path d="M4 2.5v11l9-5.5z"/></svg>Watch a 45-second demo</button><button class="cta alt" data-tour>Take the tour</button><button class="cta alt" data-upload>Upload a document</button></div>'+
  '<div class="tiles">'+
    '<div class="tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><h3>Find</h3><p>Reports, dashboards, and documents in one search, including your own uploads. If it does not exist, Docket offers to create it.</p><div class="chips"><button class="chip" data-q="Show me a liquidity dashboard">Show me a liquidity dashboard</button></div></div>'+
    '<div class="tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-5 4v-4A2.5 2.5 0 0 1 4 13.5z"/><path d="M10 9.2a2 2 0 1 1 2.8 1.8c-.5.3-.8.6-.8 1.2"/></svg><h3>Ask</h3><p>Ask questions about how reporting works and get a direct answer.</p><div class="chips"><button class="chip" data-q="What is an attestation?">What is an attestation?</button></div></div>'+
    '<div class="tile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/></svg><h3>Create</h3><p>Draft a new dashboard, report, or document, like a governance policy, then refine it by asking.</p><div class="chips"><button class="chip" data-q="Create a monthly liquidity dashboard">Create a monthly liquidity dashboard</button><button class="chip" data-q="Create a governance policy for attestation">Create a governance policy for attestation</button></div></div>'+
  '</div>'+
  '<div class="compare">'+
    '<div class="cmp without"><h3>Without Docket</h3><ul><li>'+X+'Search shared folders</li><li>'+X+'Ask a teammate on chat</li><li>'+X+'Check each dashboard</li><li>'+X+'Build the draft from scratch</li></ul><div class="res">Often 15 to 30 minutes</div></div>'+
    '<div class="cmp with"><h3>With Docket</h3><ul><li>'+OK+'Type one question</li><li>'+OK+'Get the answer and the link</li><li>'+OK+'Start from a ready draft</li></ul><div class="res">A few seconds</div></div>'+
  '</div>'+
  '<p class="tiny">Times shown are illustrative. Searching '+ITEMS.length+' items: '+counts.report+' reports, '+counts.dashboard+' dashboards, '+counts.document+' documents.</p>'+
  '<div class="chiplabel">More to try</div>'+
  '<div class="chips">'+chipHTML(SUGGEST.slice(3))+'</div>'+
  '<div class="chips mobile-only">'+chipHTML(types.map(function(t){return "Show all "+t+"s"}))+'</div>'+
  '</section>';
}

/* ---------- Messages ---------- */
function addUser(text){var d=document.createElement("div");d.className="msg user";d.textContent=text;inner.appendChild(d);toBottom();}
function addThinking(){
  var d=document.createElement("div");d.className="msg bot";
  d.innerHTML='<div class="av">'+MARK+'</div><div class="bcol"><div class="status">Thinking</div><div class="dots"><i></i><i></i><i></i></div></div>';
  inner.appendChild(d);toBottom();return d;
}
function cardHTML(r,i,opts){
  var it=r.it,plain=opts&&opts.plain,isSaved=saved.indexOf(it.name)>-1;
  var why=r.hit&&r.hit.length?'<div class="why">Matched on '+r.hit.map(function(h){return '<mark>'+esc(h)+'</mark>'}).join("")+'</div>':"";
  var meter=(r.pct!=null&&!plain)?'<span class="strength" title="How closely this matches your question">'+strength(r.pct)+'<span class="meter"><i style="width:'+Math.max(8,r.pct)+'%"></i></span></span>':"";
  var meta=it.upload?'<span>Uploaded by <b>You</b></span><span><b>'+esc(it.note)+'</b></span>':'<span>Owner <b>'+esc(it.owner)+'</b></span><span>Frequency <b>'+esc(it.freq)+'</b></span>';
  return '<span class="rail"></span><div class="cbody">'+
    '<div class="ctop"><span class="badge">'+(it.upload?"Uploaded":LABEL[it.type])+'</span>'+(i===0&&!plain&&r.pct!=null?'<span class="best">Best match</span>':'')+meter+'</div>'+
    '<h3>'+esc(it.name)+'</h3><p>'+esc(it.desc)+'</p>'+
    '<div class="meta">'+meta+'</div>'+why+
    '<div class="actions"><button class="btn open" data-open="'+esc(it.name)+'">Open '+it.type+'</button>'+(it.upload?'':'<button class="btn ghost" data-copy="'+esc(it.link)+'">Copy link</button>')+(it.upload?'<button class="btn ghost" data-rmup="'+esc(it.uid)+'">Delete</button>':'')+'<button class="btn ghost" data-save="'+esc(it.name)+'" aria-pressed="'+isSaved+'">'+(isSaved?"Saved":"Save")+'</button></div></div>';
}
function traceHTML(t){
  return '<details class="how"'+(showHow?" open":"")+'><summary>How Docket got this</summary><ol class="steps">'+t.steps.map(function(s){
    var rank=(s.rank||[]).map(function(r){return '<div class="rrow"><span class="rn">'+esc(r.name)+'</span><span class="meter"><i style="width:'+Math.max(8,r.pct)+'%"></i></span></div>'}).join("");
    return '<li><b>'+s.b+'</b><span>'+s.h+'</span>'+(rank?'<div class="rank">'+rank+'</div>':'')+'</li>';
  }).join("")+'</ol></details>';
}
function addBot(res,ms,done){
  var d=document.createElement("div");d.className="msg bot";
  d.innerHTML='<div class="av">'+MARK+'</div><div class="bcol"><div class="ans"></div><div class="filt"></div><div class="cards"></div><div class="how-slot"></div><div class="foot"></div><div class="follow"></div></div>';
  inner.appendChild(d);
  var ans=d.querySelector(".ans"),cards=d.querySelector(".cards"),foot=d.querySelector(".foot"),words=[];
  res.segs.forEach(function(seg){
    seg[0].split(/(\s+)/).forEach(function(w){
      if(!w)return;
      if(/^\s+$/.test(w)){ans.appendChild(document.createTextNode(w));return;}
      var s=document.createElement(seg[1]?"strong":"span");s.textContent=w;s.className="w";ans.appendChild(s);words.push(s);
    });
  });
  var plain=res.kind==="answer"||res.kind==="create";
  function finish(){
    var delay=0;
    if(res.bullets){var ul=document.createElement("ul");ul.className="dl";ul.innerHTML=res.bullets.map(function(b){return '<li>'+esc(b)+'</li>'}).join("");cards.appendChild(ul);}
    if(res.chips){var c=document.createElement("div");c.className="chips";c.innerHTML=chipHTML(res.chipList||SUGGEST.slice(0,3));cards.appendChild(c);}
    if(res.draft){
      var dw=document.createElement("div");dw.className="draftwrap";dw.innerHTML=renderDraft(res.draft);cards.appendChild(dw);DRAFTMAP[res.draft.id]=res.draft;
      requestAnimationFrame(function(){dw.classList.add("in")});toBottom();delay=1;
    }
    var kinds={};res.items.forEach(function(r){kinds[r.it.type]=(kinds[r.it.type]||0)+1});
    if(!plain&&res.items.length>2&&Object.keys(kinds).length>1){
      var f='<div class="filters" role="group" aria-label="Filter results"><button data-filter="all" aria-pressed="true">All '+res.items.length+'</button>';
      types.forEach(function(t){if(kinds[t])f+='<button data-filter="'+t+'" aria-pressed="false">'+LABEL[t]+'s '+kinds[t]+'</button>'});
      d.querySelector(".filt").innerHTML=f+'</div>';
    }
    if(res.relLabel&&res.items.length){var lb=document.createElement("div");lb.className="chiplabel";lb.textContent=res.relLabel;cards.appendChild(lb);}
    res.items.forEach(function(r,i){
      setTimeout(function(){
        var c=document.createElement("article");c.className="card "+r.it.type;c.setAttribute("data-type",r.it.type);c.innerHTML=cardHTML(r,i,{plain:plain});cards.appendChild(c);
        requestAnimationFrame(function(){c.classList.add("in")});toBottom();
      },reduce?0:(i+delay)*90);
    });
    setTimeout(function(){
      if(res.found&&res.trace)d.querySelector(".how-slot").innerHTML=traceHTML(res.trace);
      var what=res.kind==="answer"?"Answered":res.kind==="create"?"Built":"Searched "+ITEMS.length+" items";
      var html='<span>'+what+' in '+ms.toFixed(1)+' ms.</span>';
      if(res.found)html+='<span class="fb">Was this helpful? <button data-fb="yes" aria-pressed="false">Yes</button><button data-fb="no" aria-pressed="false">No</button></span>';
      foot.innerHTML=res.noFoot?"":html;
      if(res.follow&&res.follow.length)d.querySelector(".follow").innerHTML='<div class="chiplabel">'+(res.followLabel||"Ask a follow-up")+'</div><div class="chips">'+chipHTML(res.follow)+'</div>';
      toBottom();done();
    },reduce?0:(res.items.length+delay)*90+160);
  }
  var i=0;
  (function step(){
    if(reduce){words.forEach(function(w){w.classList.add("on")});finish();return;}
    if(i<words.length){words[i++].classList.add("on");if(i%6===0)toBottom();setTimeout(step,20);}else finish();
  })();
}
function send(text,cb){
  text=(text||"").trim();
  if(!text||busy){if(cb)cb();return;}
  busy=true;taHide();showView("ask");input.value="";
  var h=$("hero");if(h)h.remove();
  addUser(text);
  var th=addThinking();
  var t0=performance.now(), res=compose(text), ms=performance.now()-t0;
  setTimeout(function(){th.remove();addBot(res,ms,function(){busy=false;if(cb)cb();});},reduce?0:600);
}
function ask(t){return new Promise(function(res){(function go(){if(busy){setTimeout(go,100);return;}send(t,res);})();});}
function reset(){
  stopDemo(false);
  inner.innerHTML=heroHTML();ctx.top=null;ctx.draft=null;busy=false;showView("ask");thread.scrollTo({top:0});
}

/* ---------- Views ---------- */
function showView(v){
  view=v;
  $("inner").hidden=v!=="ask";$("viewSaved").hidden=v!=="saved";$("viewLibrary").hidden=v!=="library";$("viewInsights").hidden=v!=="insights";
  Array.prototype.forEach.call(document.querySelectorAll("[data-view]"),function(b){
    if(b.getAttribute("data-view")===v)b.setAttribute("aria-current","page");else b.removeAttribute("aria-current");
  });
  if(v==="saved")renderSaved();
  if(v==="library")renderLibrary();
  if(v==="insights")renderInsights();
  if(v!=="ask")thread.scrollTo({top:0});
}
function updateSaveUI(){
  $("savedCount").textContent=saved.length+drafts.length;
  Array.prototype.forEach.call(document.querySelectorAll("[data-save]"),function(b){
    var on=saved.indexOf(b.getAttribute("data-save"))>-1;
    b.setAttribute("aria-pressed",on);b.textContent=on?"Saved":"Save";
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-savedraft]"),function(b){
    var id=b.getAttribute("data-savedraft");b.textContent=drafts.some(function(x){return x.id===id})?"Saved":"Save draft";
  });
}
function toggleSave(name){
  var i=saved.indexOf(name);
  if(i>-1){saved.splice(i,1);toast("Removed from Saved");}else{saved.push(name);toast("Saved. Find it under Saved.");}
  store("docket-saved",saved);updateSaveUI();
  if(view==="saved")renderSaved();
}
function renderSaved(){
  var v=$("viewSaved");
  var items=saved.map(byName).filter(Boolean);
  var head='<div class="vh"><h2>Saved</h2><p>Items and drafts you want to come back to.</p></div>';
  if(!items.length&&!drafts.length){
    v.innerHTML=head+'<div class="empty"><p>Nothing saved yet. Tap Save on a result, or Save draft on something you created.</p><button class="btn open" style="--accent:var(--brand)" data-view="ask">Start searching</button></div>';
    return;
  }
  v.innerHTML=head+(items.length?'<h3 class="sech">Saved items</h3><div class="cards" id="savedCards"></div>':'')+(drafts.length?'<h3 class="sech">Your drafts</h3><div class="cards" id="draftCards"></div>':'');
  if(items.length){var box=$("savedCards");items.forEach(function(it,i){var c=document.createElement("article");c.className="card in "+it.type;c.innerHTML=cardHTML({it:it,hit:[],pct:null},i,{plain:true});box.appendChild(c);});}
  if(drafts.length){var db=$("draftCards");drafts.forEach(function(d){var w=document.createElement("div");w.className="draftwrap in";w.innerHTML=renderDraft(d,{saved:true});db.appendChild(w);DRAFTMAP[d.id]=d;});}
}
var SAMPLE_GAPS=[["Holiday filing schedule",14],["Audit trail export steps",11],["Regulator contact list",9]];
var TOPICS=[["Attestation",212],["Capital",187],["Liquidity",164],["Exposure",139],["Data quality",96],["Metadata",71]];
function renderInsights(){
  var v=$("viewInsights"),max=TOPICS[0][1];
  var topics=TOPICS.map(function(t){return '<div class="brow"><span>'+esc(t[0])+'</span><span class="bt"><i style="width:'+Math.round(t[1]/max*100)+'%"></i></span><span class="bv">'+t[1]+'</span></div>'}).join("");
  var gaps=[];
  Object.keys(stats.gaps).forEach(function(k){gaps.push('<div class="gap"><span>'+esc(k)+'</span><span class="tag you">You asked this</span></div>')});
  SAMPLE_GAPS.forEach(function(g){gaps.push('<div class="gap"><span>'+esc(g[0])+'</span><span class="tag">Asked '+g[1]+' times</span></div>')});
  v.innerHTML=
   '<div class="vh"><h2>Insights</h2><p>What a team lead would see: what people look for, and where the catalog has gaps. Your own session is counted live.</p></div>'+
   '<div class="stats">'+
     '<div class="stat"><b>'+stats.asked+'</b><span>Questions you asked</span></div>'+
     '<div class="stat"><b>'+stats.found+'</b><span>Answered</span></div>'+
     '<div class="stat"><b>'+stats.none+'</b><span>Not found</span></div>'+
     '<div class="stat"><b>'+stats.created+'</b><span>Drafts created</span></div>'+
   '</div>'+
   '<div class="panel"><h3>Most searched topics</h3><p class="sub">Team activity over one week.</p>'+topics+'</div>'+
   '<div class="panel"><h3>What people look for</h3><p class="sub">Share of searches by type.</p>'+
     '<div class="stack" role="img" aria-label="46 percent reports, 31 percent dashboards, 23 percent documents"><i style="width:46%;background:var(--report)"></i><i style="width:31%;background:var(--dash)"></i><i style="width:23%;background:var(--doc)"></i></div>'+
     '<div class="legend"><span><span class="dot report"></span> Reports 46%</span><span><span class="dot dashboard"></span> Dashboards 31%</span><span><span class="dot document"></span> Documents 23%</span></div></div>'+
   '<div class="panel"><h3>Questions Docket could not answer</h3><p class="sub">Each one is a page the team could add to the catalog.</p>'+gaps.join("")+'</div>';
}

/* ---------- Typeahead ---------- */
var taItems=[],taIdx=-1;
function taHide(){ta.hidden=true;taIdx=-1;input.setAttribute("aria-expanded","false");input.removeAttribute("aria-activedescendant");}
function taRender(){
  var v=input.value.trim();
  if(v.length<2||demoRun){taHide();return;}
  var lv=v.toLowerCase(),seen={},out=[];
  function add(o){if(!seen[o.send]){seen[o.send]=1;out.push(o);}}
  var cm=lv.match(/^(create|make|build|generate)\s+(?:a|an|the)?\s*(.*)$/);
  if(cm){
    var t=clean(cm[2]).replace(/\b(daily|weekly|monthly|quarterly|reports?|dashboards?)\b/g,"").replace(/\s+/g," ").trim();
    if(detectDocType(lv)){add({label:v.charAt(0).toUpperCase()+v.slice(1),kind:"create",send:v});}
    else if(t.length>=3){add({label:"Create a weekly "+t+" dashboard",kind:"create",send:"Create a weekly "+t+" dashboard"});add({label:"Create a monthly "+t+" report",kind:"create",send:"Create a monthly "+t+" report"});add({label:"Create a policy on "+t,kind:"create",send:"Create a policy on "+t});}
  }
  KB.forEach(function(e){if(e.q.toLowerCase().indexOf(lv)>-1)add({label:e.q,kind:"answer",send:e.q});});
  ITEMS.forEach(function(i){if(i.name.toLowerCase().indexOf(lv)>-1)add({label:i.name,kind:i.type,send:"Tell me about the "+i.name});});
  var p=parse(v);
  if(!cm&&(p.content.length||p.hint))search(p).slice(0,4).forEach(function(r){add({label:r.it.name,kind:r.it.type,send:"Tell me about the "+r.it.name});});
  taItems=out.slice(0,6);taIdx=-1;
  if(!taItems.length){taHide();return;}
  ta.innerHTML=taItems.map(function(it,i){return '<li role="option" id="ta'+i+'" data-ta="'+i+'" aria-selected="false"><span class="dot '+it.kind+'"></span><span class="tn">'+esc(it.label)+'</span><span class="tt">'+LABEL[it.kind]+'</span></li>'}).join("");
  ta.hidden=false;input.setAttribute("aria-expanded","true");
}
function taMove(d){
  if(ta.hidden)return;
  taIdx=(taIdx+d+taItems.length)%taItems.length;
  Array.prototype.forEach.call(ta.children,function(li,i){li.setAttribute("aria-selected",i===taIdx)});
  input.setAttribute("aria-activedescendant","ta"+taIdx);
}
function taPick(i){var it=taItems[i];if(it)send(it.send);}

/* ---------- Tour ---------- */
var tour=$("tour"),ts=0;
var ART=[
 '<svg viewBox="0 0 320 120"><rect x="20" y="38" width="280" height="44" rx="16" fill="var(--surface)" stroke="var(--line)"/><rect x="36" y="56" width="132" height="8" rx="4" fill="var(--muted)" opacity=".5"/><rect x="36" y="56" width="90" height="8" rx="4" fill="var(--ink)"/><rect x="258" y="45" width="30" height="30" rx="10" fill="var(--brand)"/><path d="M273 68V52M267 58l6-6 6 6" stroke="var(--on-brand)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 '<svg viewBox="0 0 320 120"><rect x="18" y="14" width="76" height="24" rx="8" fill="var(--report)"/><rect x="18" y="48" width="76" height="24" rx="8" fill="var(--dash)"/><rect x="18" y="82" width="76" height="24" rx="8" fill="var(--doc)"/><path d="M96 26l50 26M96 60h50M96 94l50-26" stroke="var(--muted)" stroke-width="1.6" fill="none" stroke-dasharray="3 4"/><circle cx="168" cy="60" r="22" fill="var(--surface)" stroke="var(--brand)" stroke-width="3"/><path d="M184 76l12 12" stroke="var(--brand)" stroke-width="4" stroke-linecap="round"/><path d="M204 60h24" stroke="var(--brand)" stroke-width="2.4" stroke-linecap="round"/><rect x="232" y="40" width="72" height="40" rx="10" fill="var(--surface)" stroke="var(--dash)" stroke-width="2"/><rect x="242" y="52" width="40" height="6" rx="3" fill="var(--ink)"/><rect x="242" y="64" width="52" height="5" rx="2.5" fill="var(--muted)" opacity=".5"/></svg>',
 '<svg viewBox="0 0 320 120"><rect x="50" y="10" width="220" height="100" rx="14" fill="var(--surface)" stroke="var(--line)"/><rect x="50" y="10" width="220" height="7" rx="3" fill="var(--brand)"/><rect x="66" y="28" width="70" height="8" rx="4" fill="var(--ink)"/><rect x="66" y="44" width="48" height="22" rx="6" fill="var(--bg)"/><rect x="120" y="44" width="48" height="22" rx="6" fill="var(--bg)"/><rect x="174" y="44" width="48" height="22" rx="6" fill="var(--bg)"/><rect x="70" y="92" width="12" height="10" rx="2" fill="var(--brand)" opacity=".5"/><rect x="90" y="84" width="12" height="18" rx="2" fill="var(--brand)" opacity=".5"/><rect x="110" y="88" width="12" height="14" rx="2" fill="var(--brand)" opacity=".5"/><rect x="130" y="78" width="12" height="24" rx="2" fill="var(--brand)"/><path d="M76 90l20-8 20 4 20-10" stroke="var(--dash)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="246" cy="92" r="12" fill="var(--good)"/><path d="M240 92l4 4 8-8" stroke="var(--on-accent)" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 '<svg viewBox="0 0 320 120"><rect x="150" y="12" width="150" height="30" rx="15" fill="var(--brand)"/><rect x="168" y="23" width="80" height="8" rx="4" fill="var(--on-brand)"/><rect x="20" y="52" width="190" height="56" rx="16" fill="var(--surface)" stroke="var(--line)"/><rect x="38" y="68" width="130" height="8" rx="4" fill="var(--ink)"/><rect x="38" y="86" width="100" height="6" rx="3" fill="var(--muted)" opacity=".5"/></svg>'
];
var TOUR=[
 ["Ask anything in your own words","Try \u201CWhat is an attestation?\u201D or \u201CWhat happens if a filing is late?\u201D. Docket answers directly and links the related reports and guides."],
 ["Find reports, dashboards, and guides","Docket searches everything at once. Every result shows who owns it, how often it updates, and why it matched."],
 ["Create dashboards and documents in seconds","Say \u201CCreate a monthly liquidity dashboard\u201D or \u201CCreate a governance policy for attestation\u201D. Docket builds a first draft that you can refine just by asking."],
 ["Keep going with follow-ups","Say \u201CWho owns it?\u201D, \u201CAdd a trend line\u201D, or \u201CTurn it into a checklist\u201D. Docket remembers what you were just looking at."]
];
function renderTour(){
  $("tourArt").innerHTML=ART[ts];$("tourTitle").textContent=TOUR[ts][0];$("tourText").textContent=TOUR[ts][1];
  $("tourDots").innerHTML=TOUR.map(function(_,i){return '<i class="'+(i===ts?"on":"")+'"></i>'}).join("");
  $("tourBack").style.visibility=ts===0?"hidden":"visible";
  $("tourNext").textContent=ts===TOUR.length-1?"Try it":"Next";
}
function openTour(){ts=0;renderTour();if(tour.showModal)tour.showModal();else tour.setAttribute("open","");}
function closeTour(){if(tour.close)tour.close();else tour.removeAttribute("open");}
$("tourBack").addEventListener("click",function(){if(ts>0){ts--;renderTour();}});
$("tourNext").addEventListener("click",function(){
  if(ts<TOUR.length-1){ts++;renderTour();}
  else{closeTour();input.focus();}
});
tour.addEventListener("click",function(e){if(e.target===tour)closeTour();});

/* ---------- Demo ---------- */
function stopDemo(done){
  var was=demoRun;demoRun=false;$("demoBar").hidden=true;
  if(was&&done===true)toast("That is Docket. Now try your own question.");
}
async function typeInto(text){
  for(var i=1;i<=text.length;i++){
    if(!demoRun)return false;
    input.value=text.slice(0,i);await sleep(34);
  }
  return true;
}
async function demo(){
  if(demoRun)return;
  closeTour();reset();demoRun=true;$("demoBar").hidden=false;
  var script=[["Show me a liquidity dashboard",true,2200],["What is an attestation?",false,2200],["Create a weekly liquidity dashboard",false,2800],["Create a governance policy for attestation",false,3200],["Turn it into a checklist",false,2600]];
  await sleep(500);
  for(var i=0;i<script.length;i++){
    if(!demoRun)break;
    var ok=await typeInto(script[i][0]);if(!ok)break;
    await sleep(350);
    if(!demoRun){input.value="";break;}
    await ask(script[i][0]);
    if(script[i][1]){var dd=inner.querySelector(".how");if(dd)dd.open=true;toBottom();}
    await sleep(script[i][2]);
  }
  if(demoRun)stopDemo(true);
  input.value="";
}
$("stopDemo").addEventListener("click",function(){stopDemo(false);input.value="";});

/* ---------- Exports, uploads, and previews (UI) ---------- */
var LIBS={
  jszip:"https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  jspdf:"https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  xlsx:"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  pdfjs:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
  pdfworker:"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
};
var libP={};
function loadLib(k){
  if(libP[k])return libP[k];
  libP[k]=new Promise(function(res,rej){
    var sc=document.createElement("script");sc.src=LIBS[k];
    sc.onload=function(){res();};sc.onerror=function(){delete libP[k];rej(new Error("load "+k));};
    document.head.appendChild(sc);
  });
  return libP[k];
}
async function saveFile(name,data){
  try{
    if(window.claude&&window.claude.use){
      var dl=await window.claude.use("downloads");
      if(dl){await dl.save({filename:name,data:data});toast("Saved "+name);return;}
    }
  }catch(e){
    if(e&&e.code==="declined")return;
    if(e&&e.code==="rate_limited"){toast("Please wait a moment and try again.");return;}
  }
  var blob=data instanceof Blob?data:new Blob([data]);
  var a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1500);
  toast("Downloaded "+name);
}
async function doExport(kind,id){
  var d=DRAFTMAP[id];if(!d)return;
  var base=slug(d.title)||"docket-draft";
  try{
    toast("Preparing your "+(kind==="docx"?"Word document":kind==="pdf"?"PDF":"tracker")+"...");
    if(kind==="docx"){await loadLib("jszip");await saveFile(base+".docx",await docxBuild(d));}
    else if(kind==="pdf"){await loadLib("jspdf");await saveFile(base+".pdf",pdfBuild(d));}
    else{await loadLib("xlsx");await saveFile(base+"-tracker.xlsx",xlsxBuild(d));}
  }catch(e){toast("I couldn\u2019t create the file. Check your connection and try again.");}
}
function stripTags(h){return h.replace(/<(script|style)[\s\S]*?<\/\1>/gi," ").replace(/<\/(p|div|h\d|li|tr)>|<br\s*\/?>/gi,"\n").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/[ \t]+/g," ").replace(/\n\s*\n+/g,"\n\n").trim();}
async function readFileText(file){
  var ext=(file.name.split(".").pop()||"").toLowerCase();
  if(["txt","md","csv","json"].indexOf(ext)>-1)return await file.text();
  if(ext==="html"||ext==="htm")return stripTags(await file.text());
  if(ext==="docx"){
    await loadLib("jszip");
    var z=await window.JSZip.loadAsync(await file.arrayBuffer()),f=z.file("word/document.xml");
    if(!f)throw new Error("bad docx");
    var xml=await f.async("string");
    return xml.replace(/<\/w:p>/g,"\n").replace(/<w:tab\/>/g,"\t").replace(/<w:br[^>]*\/>/g,"\n").replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&apos;/g,"'").replace(/\n{3,}/g,"\n\n").trim();
  }
  if(ext==="xlsx"||ext==="xls"){
    await loadLib("xlsx");
    var wb=window.XLSX.read(await file.arrayBuffer(),{type:"array"});
    return wb.SheetNames.map(function(n){return n+"\n"+window.XLSX.utils.sheet_to_csv(wb.Sheets[n])}).join("\n\n");
  }
  if(ext==="pdf"){
    await loadLib("pdfjs");
    var lib=window.pdfjsLib;lib.GlobalWorkerOptions.workerSrc=LIBS.pdfworker;
    var pdf=await lib.getDocument({data:new Uint8Array(await file.arrayBuffer())}).promise,out=[];
    for(var i=1;i<=Math.min(pdf.numPages,60);i++){var pg=await pdf.getPage(i),tc=await pg.getTextContent();out.push(tc.items.map(function(x){return x.str}).join(" "));}
    return out.join("\n\n");
  }
  throw new Error("type");
}
function persistUploads(){
  try{localStorage.setItem("docket-uploads",JSON.stringify(uploads));}
  catch(e){toast("Added, but it won\u2019t be kept after you refresh.");}
}
function announceUpload(its){
  showView("ask");var h=$("hero");if(h)h.remove();
  if(busy)return;
  busy=true;
  var it=its[its.length-1],ts=termStats(it.text),kw=ts.top.length?ts.raw[ts.top[0]]:"this";
  ctx.top=it;ctx.draft=null;
  var many=its.length>1;
  addBot({segs:[T("Added "),B(many?its.length+" documents":it.name),T(". You can now ask questions about "+(many?"them":"it")+", have me summarize "+(many?"them":"it")+", or turn "+(many?"them":"it")+" into a checklist or policy.")],
    items:its.slice(0,3).map(function(x){return {it:x,sc:1,hit:[],pct:null}}),relLabel:"Added",found:false,kind:"answer",noFoot:true,
    follow:["Summarize it","What does it say about "+kw+"?","Create a checklist on "+kw],followLabel:"Try asking"},0,function(){busy=false;});
}
async function handleFiles(list){
  var files=Array.prototype.slice.call(list||[]);if(!files.length)return;
  var added=[],okExt=/\.(txt|md|csv|json|html?|docx|xlsx?|pdf)$/i;
  toast("Reading "+(files.length>1?files.length+" files":files[0].name)+"...");
  for(var i=0;i<files.length;i++){
    var f=files[i];
    if(!okExt.test(f.name)){toast("Docket can read Word, PDF, Excel, text, Markdown, CSV, and HTML files.");continue;}
    if(f.size>15*1024*1024){toast(f.name+" is too large. The limit is 15 MB.");continue;}
    try{
      var text=(await readFileText(f)||"").replace(/\r/g,"").trim();
      if(text.length<20){toast("I couldn\u2019t find any text in "+f.name+".");continue;}
      var u={id:"u"+Date.now().toString(36)+Math.floor(Math.random()*1000),name:f.name,size:f.size,text:text.slice(0,MAXTEXT),added:Date.now()};
      uploads=uploads.filter(function(x){return x.name!==u.name});uploads.push(u);addUploadItem(u);added.push(u.name);
    }catch(e){toast("I couldn\u2019t read "+f.name+". Try a Word or text version.");}
  }
  if(!added.length)return;
  persistUploads();recount();
  var its=added.map(function(n){return ITEMS.filter(function(i){return i.upload&&i.name===n})[0]}).filter(Boolean);
  if(view==="library"){renderLibrary();toast("Added "+(its.length>1?its.length+" documents":its[0].name));}
  else announceUpload(its);
}
function removeUpload(uid){
  var u=uploads.filter(function(x){return x.id===uid})[0];if(!u)return;
  Array.prototype.forEach.call(document.querySelectorAll('[data-rmup="'+uid+'"]'),function(btn){
    var card=btn.closest(".card");
    if(card){card.innerHTML='<span class="rail"></span><div class="cbody"><p>'+esc(u.name)+' was deleted.</p></div>';}
  });
  uploads=uploads.filter(function(x){return x.id!==uid});
  ITEMS=ITEMS.filter(function(i){return !(i.upload&&i.uid===uid)});
  saved=saved.filter(function(n){return n!==u.name});store("docket-saved",saved);
  if(ctx.top&&ctx.top.upload&&ctx.top.uid===uid)ctx.top=null;
  persistUploads();recount();updateSaveUI();
  if(viewer.open&&viewer.close)viewer.close();
  if(view==="library")renderLibrary();
  if(view==="saved")renderSaved();
  toast("Deleted "+u.name);
}
function renderLibrary(){
  var v=$("viewLibrary"),ups=ITEMS.filter(function(i){return i.upload});
  var head='<div class="vh"><h2>Library</h2><p>Documents you add are searchable. You can ask questions about them, have them summarized, or turn them into new drafts.</p></div>';
  var dz='<div class="dropzone"><p>Word, PDF, Excel, text, Markdown, CSV, and HTML files work. You can also drop files anywhere on this page.</p><button class="btn open" style="--accent:var(--brand)" data-upload>Choose files</button></div>';
  var list=ups.length?'<div class="cards">'+ups.map(function(u){return '<div class="libitem"><div><div class="nm">'+esc(u.name)+'</div><div class="sz">'+Math.max(1,Math.round(u.size/1024))+' KB. '+esc(u.note)+'</div></div><div class="acts"><button class="btn ghost" data-open="'+esc(u.name)+'">Open</button><button class="btn ghost" data-rmup="'+esc(u.uid)+'">Delete</button></div></div>'}).join("")+'</div>':'';
  v.innerHTML=head+dz+list;
}
function itemDraft(it){
  var topic=clean(it.name).replace(/\b(dashboard|report|summary|snapshot|monitor|tracker|scorecard)\b/g,"").replace(/\s+/g," ").trim()||clean(it.name);
  var d;
  if(it.type==="document"){
    var dt=/runbook/i.test(it.name)?"runbook":/(policy|standards)/i.test(it.name)?"policy":/(form|how-to)/i.test(it.name)?"procedure":/(pack|onboarding)/i.test(it.name)?"checklist":/glossary/i.test(it.name)?"faq":"guide";
    d=buildDraft({topic:topic,kind:"document",docType:dt,approvals:false,short:false,ver:1});
    d.meta=[["Owner",it.owner],["Version","1.0"],["Status","Current"],["Updates",it.freq]];
  }else{
    var per={Daily:"daily",Weekly:"weekly",Monthly:"monthly",Quarterly:"quarterly",Live:"daily"}[it.freq]||"monthly";
    d=buildDraft({topic:topic,kind:it.type,period:per,trend:true,comment:it.type==="report",ver:1});
  }
  d.title=it.name;return d;
}
var viewer=$("viewer");
function openItem(name){
  var it=byName(name);if(!it)return;
  var html;
  if(it.upload){
    var txt=it.text.length>9000?it.text.slice(0,9000)+"\n...":it.text;
    html='<div class="dhead"><div><h3>'+esc(it.name)+'</h3><div class="dsub">Uploaded document</div></div></div><div class="doctext">'+esc(txt)+'</div><div class="dacts"><button class="btn ghost" data-rmup="'+esc(it.uid)+'">Delete this file</button></div>';
  }else{
    var d=itemDraft(it);DRAFTMAP[d.id]=d;
    html='<div class="draftwrap flat">'+renderDraft(d,{viewer:true})+'</div>';
  }
  $("vbody").innerHTML=html;
  if(viewer.showModal)viewer.showModal();else viewer.setAttribute("open","");
  $("vbody").parentNode.scrollTop=0;
}
$("vclose").addEventListener("click",function(){if(viewer.close)viewer.close();else viewer.removeAttribute("open");});
viewer.addEventListener("click",function(e){if(e.target===viewer&&viewer.close)viewer.close();});
$("file").addEventListener("change",function(){handleFiles(this.files);this.value="";});
var dragN=0;
function hasFiles(e){return e.dataTransfer&&Array.prototype.indexOf.call(e.dataTransfer.types||[],"Files")>-1;}
document.addEventListener("dragenter",function(e){if(hasFiles(e)){dragN++;$("dropov").hidden=false;}});
document.addEventListener("dragleave",function(){dragN=Math.max(0,dragN-1);if(!dragN)$("dropov").hidden=true;});
document.addEventListener("dragover",function(e){if(hasFiles(e))e.preventDefault();});
document.addEventListener("drop",function(e){if(hasFiles(e)){e.preventDefault();dragN=0;$("dropov").hidden=true;handleFiles(e.dataTransfer.files);}});

/* ---------- Events ---------- */
input.addEventListener("input",taRender);
input.addEventListener("keydown",function(e){
  if(e.key==="ArrowDown"){e.preventDefault();taMove(1);}
  else if(e.key==="ArrowUp"){e.preventDefault();taMove(-1);}
  else if(e.key==="Enter"&&!ta.hidden&&taIdx>-1){e.preventDefault();taPick(taIdx);}
  else if(e.key==="Escape"){taHide();}
});
input.addEventListener("blur",function(){setTimeout(taHide,150);});
$("form").addEventListener("submit",function(e){e.preventDefault();if(demoRun)stopDemo(false);send(input.value);});
$("newSide").addEventListener("click",reset);
$("newTop").addEventListener("click",reset);
$("howToggle").addEventListener("change",function(){
  showHow=this.checked;store("docket-how",showHow);
  Array.prototype.forEach.call(document.querySelectorAll(".how"),function(d){d.open=showHow;});
});
function copyText(txt,okMsg){
  var fail=function(){toast(txt.length>80?"Could not copy here. Select the text and copy it.":txt)};
  try{navigator.clipboard.writeText(txt).then(function(){toast(okMsg)},fail);}catch(err){fail();}
}
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-q],[data-link],[data-copy],[data-fb],[data-save],[data-view],[data-tour],[data-demo],[data-filter],[data-ta],[data-mode],[data-savedraft],[data-deldraft],[data-copydraft],[data-open],[data-upload],[data-export],[data-rmup]");
  if(!t)return;
  if(t.hasAttribute("data-ta")){taPick(parseInt(t.getAttribute("data-ta"),10));return;}
  if(t.hasAttribute("data-q")){if(demoRun)stopDemo(false);send(t.getAttribute("data-q"));return;}
  if(t.hasAttribute("data-mode")){showView("ask");input.value=t.getAttribute("data-mode");input.focus();taRender();return;}
  if(t.hasAttribute("data-demo")){demo();return;}
  if(t.hasAttribute("data-tour")){openTour();return;}
  if(t.hasAttribute("data-view")){showView(t.getAttribute("data-view"));return;}
  if(t.hasAttribute("data-save")){toggleSave(t.getAttribute("data-save"));return;}
  if(t.hasAttribute("data-savedraft")){
    var id=t.getAttribute("data-savedraft"),d=DRAFTMAP[id];
    if(d&&!drafts.some(function(x){return x.id===id})){drafts.push(d);store("docket-drafts",drafts);updateSaveUI();toast("Draft saved. Find it under Saved.");}
    else toast("This draft is already saved.");
    return;
  }
  if(t.hasAttribute("data-deldraft")){
    var did=t.getAttribute("data-deldraft");drafts=drafts.filter(function(x){return x.id!==did});store("docket-drafts",drafts);updateSaveUI();renderSaved();toast("Draft deleted");return;
  }
  if(t.hasAttribute("data-copydraft")){var cd=DRAFTMAP[t.getAttribute("data-copydraft")];if(cd)copyText(draftText(cd),cd.kind==="document"?"Text copied":"Summary copied");return;}
  if(t.hasAttribute("data-open")){openItem(t.getAttribute("data-open"));return;}
  if(t.hasAttribute("data-upload")){$("file").click();return;}
  if(t.hasAttribute("data-export")){doExport(t.getAttribute("data-export"),t.getAttribute("data-exid"));return;}
  if(t.hasAttribute("data-rmup")){
    if(t.getAttribute("data-armed")){removeUpload(t.getAttribute("data-rmup"));return;}
    var lbl=t.textContent;t.setAttribute("data-armed","1");t.textContent="Click again to delete";
    setTimeout(function(){if(t.isConnected){t.removeAttribute("data-armed");t.textContent=lbl;}},3000);
    return;
  }
  if(t.hasAttribute("data-copy")){copyText(t.getAttribute("data-copy"),"Link copied");return;}
  if(t.hasAttribute("data-filter")){
    var f=t.getAttribute("data-filter"),col=t.closest(".bcol");
    Array.prototype.forEach.call(t.parentNode.querySelectorAll("button"),function(b){b.setAttribute("aria-pressed",b===t)});
    Array.prototype.forEach.call(col.querySelectorAll(".card"),function(c){c.hidden=!(f==="all"||c.getAttribute("data-type")===f);});
    return;
  }
  if(t.hasAttribute("data-fb")){
    var row=t.parentNode,val=t.getAttribute("data-fb");
    if(row.querySelector('[aria-pressed="true"]')){toast("You already sent feedback for this answer.");return;}
    t.setAttribute("aria-pressed","true");
    if(val==="yes")stats.yes++;else stats.no++;
    toast(val==="yes"?"Thanks. Feedback saved.":"Thanks. This answer is flagged for review.");
  }
});
document.addEventListener("keydown",function(e){
  var tag=(document.activeElement&&document.activeElement.tagName)||"";
  if((e.key==="/"&&tag!=="INPUT")||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k")){e.preventDefault();input.focus();}
});

/* Theme */
var root=document.documentElement;
try{var th=localStorage.getItem("docket-theme");if(th)root.setAttribute("data-theme",th);}catch(e){}
Array.prototype.forEach.call(document.querySelectorAll("[data-theme-toggle]"),function(b){
  b.addEventListener("click",function(){
    var cur=root.getAttribute("data-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
    var next=cur==="dark"?"light":"dark";
    root.setAttribute("data-theme",next);
    try{localStorage.setItem("docket-theme",next);}catch(e){}
  });
});

inner.innerHTML=heroHTML();
updateSaveUI();
})();
