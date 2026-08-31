/* =========================================================================
   SMILEAT · Paid Media Performance — app.js
   Renderiza todas las secciones a partir de DATA (data.js)
   ========================================================================= */

/* ---------------- Formatting helpers ---------------- */
const fmtEUR = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0});
const fmtEUR2 = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:2});
const fmtNum = n => n === null || n === undefined ? 'N/D' : Math.round(n).toLocaleString('es-ES');
const fmtNum1 = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:1});
const fmtPct = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:2})+'%';
const fmtX = n => n === null || n === undefined ? 'N/D' : n.toLocaleString('es-ES',{maximumFractionDigits:2})+'x';
const pctDelta = (a,b) => (a===null||b===null||b===0) ? null : ((a-b)/Math.abs(b))*100;
const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className = cls; if(html!==undefined) e.innerHTML = html; return e; };

function deltaPill(now, prev, opts={}){
  const p = pctDelta(now, prev);
  if(p===null) return `<span class="delta flat">Sin comparativa</span>`;
  const dir = p>0.5 ? 'up' : (p<-0.5 ? 'down' : 'flat');
  const goodDir = opts.lowerIsBetter ? (p<0?'up':'down') : dir;
  const arrow = p>0.5 ? '↑' : (p<-0.5 ? '↓' : '→');
  return `<span class="delta ${goodDir==='flat'?'flat':goodDir}">${arrow} ${Math.abs(p).toFixed(1)}% vs ${opts.label||'periodo anterior'}</span>`;
}

/* ---------------- Tab switching ---------------- */
const panelMeta = document.getElementById('panel-meta');
const panelGoogle = document.getElementById('panel-google');
document.getElementById('tabnav').addEventListener('click', e=>{
  const btn = e.target.closest('button[data-panel]');
  if(!btn) return;
  document.querySelectorAll('.tabnav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(btn.dataset.panel==='meta'){ panelMeta.classList.remove('hide'); panelGoogle.classList.add('hide'); }
  else { panelGoogle.classList.remove('hide'); panelMeta.classList.add('hide'); }
  window.scrollTo({top: document.getElementById('panel-meta').offsetTop - 90, behavior:'smooth'});
});

/* ============================================================
   HERO
   ============================================================ */
function renderHero(){
  const m = DATA.meta, g = DATA.google, c = DATA.combined;
  const kpis = [
    {label:'Inversión total', value: fmtEUR(c.spend), sub:'Meta + Google · jul-ago 2026', solid:true},
    {label:'Ingresos generados (est.)', value: fmtEUR(c.revenue), sub:'Basado en ROAS reportado'},
    {label:'ROAS combinado', value: fmtX(c.roas), sub:'Por cada € invertido'},
    {label:'CPA Meta / Google', value: `${fmtEUR2(c.metaCpa)} / ${fmtEUR2(c.googleCpa)}`, sub:'Coste por resultado'},
    {label:'Resultados totales', value: fmtNum(m.purchases + g.accountTotal.conversions), sub:'Compras Meta + conversiones Google (no son usuarios únicos)'},
  ];
  const row = document.getElementById('hero-kpis');
  kpis.forEach(k=>{
    row.appendChild(el('div', `kpi-card${k.solid?' solid':''}`, `<div class="label">${k.label}</div><div class="value">${k.value}</div><div class="sub">${k.sub}</div>`));
  });

  document.getElementById('hero-split').querySelector('.meta-part').style.width = c.metaShare+'%';
  document.getElementById('hero-split').querySelector('.google-part').style.width = c.googleShare+'%';
  document.getElementById('hero-split-legend').innerHTML = `
    <span><span class="dot meta"></span>Meta Ads — ${fmtEUR(m.spend)} (${c.metaShare}%)</span>
    <span><span class="dot google"></span>Google Ads — ${fmtEUR(g.accountTotal.spend)} (${c.googleShare}%)</span>`;
}

/* ============================================================
   META — Campañas activas
   ============================================================ */
function renderMetaCampaigns(){
  const wrap = document.getElementById('meta-active-campaigns');
  DATA.meta.activeCampaigns.forEach(camp=>{
    const card = el('div','campaign-card');
    card.appendChild(el('div','campaign-card__top', `
      <div><h3>${camp.name}</h3><div class="obj">${camp.objective} · desde ${camp.started}</div></div>
      <div class="status-pill">● ${camp.status}</div>
    `));
    const body = el('div','campaign-card__body');
    body.appendChild(el('p','campaign-card__desc', camp.description));
    const metrics = [
      ['Inversión', fmtEUR(camp.spend)],
      ['Compras', fmtNum(camp.purchases)],
      ['CPA', fmtEUR2(camp.cpa)],
      ['ROAS', fmtX(camp.roas)],
      ['Alcance', fmtNum(camp.reach)],
      ['Frecuencia', fmtNum1(camp.frequency)],
    ];
    const mg = el('div','metric-grid');
    metrics.forEach(([l,v])=> mg.appendChild(el('div','metric', `<div class="m-label">${l}</div><div class="m-value">${v}</div>`)));
    body.appendChild(mg);
    card.appendChild(body);

    const details = el('details','campaign-card__adsets');
    details.appendChild(el('summary','', `Ver ${camp.adsets.length} conjuntos de anuncios y promociones asociadas`));
    let rows = camp.adsets.map(a=>`<tr>
        <td>${a.name}</td>
        <td><span class="promo-tag">${a.promo}</span></td>
        <td class="num">${fmtEUR(a.spend)}</td>
        <td class="num">${fmtNum(a.purchases)}</td>
        <td class="num">${a.cpa!=null?fmtEUR2(a.cpa):'N/D'}</td>
        <td class="num">${a.roas!=null?fmtX(a.roas):'N/D'}</td>
        <td class="num">${fmtNum(a.reach)}</td>
      </tr>`).join('');
    details.appendChild(el('div','', `<table class="data-table"><thead><tr><th>Conjunto de anuncios</th><th>Promoción</th><th class="num">Inversión</th><th class="num">Compras</th><th class="num">CPA</th><th class="num">ROAS</th><th class="num">Alcance</th></tr></thead><tbody>${rows}</tbody></table>`));
    card.appendChild(details);
    wrap.appendChild(card);
  });
}

/* ============================================================
   META — Comparativa periodo
   ============================================================ */
function renderMetaPeriod(){
  const m = DATA.meta;
  const grid = document.getElementById('meta-period-compare');
  const items = [
    {l:'Inversión', now:m.spend, prev:m.spendPrev, f:fmtEUR},
    {l:'Impresiones', now:m.impressions, prev:m.impressionsPrev, f:fmtNum},
    {l:'Alcance', now:m.reach, prev:m.reachPrev, f:fmtNum},
    {l:'Compras', now:m.purchases, prev:m.purchasesPrev, f:fmtNum},
  ];
  items.forEach(it=>{
    grid.appendChild(el('div','compare-card', `<div class="label">${it.l}</div><div class="value">${it.f(it.now)}</div>${deltaPill(it.now, it.prev, {label:'2025'})}`));
  });

  const spendDelta = pctDelta(m.spend, m.spendPrev);
  const reachDelta = pctDelta(m.reach, m.reachPrev);
  const purchDelta = pctDelta(m.purchases, m.purchasesPrev);
  document.getElementById('meta-period-narrative').innerHTML = `
    <div class="callout">
      <b>Qué ha pasado:</b> la inversión en Meta se ha mantenido prácticamente estable (${fmtEUR(m.spend)} vs ${fmtEUR(m.spendPrev)} en 2025, ${spendDelta.toFixed(1)}%), pero el alcance ha caído un ${Math.abs(reachDelta).toFixed(1)}% (${fmtNum(m.reach)} vs ${fmtNum(m.reachPrev)} personas) y las compras se sitúan en ${fmtNum(m.purchases)}, un ${Math.abs(purchDelta).toFixed(1)}% menos que las ${fmtNum(m.purchasesPrev)} de 2025.<br><br>
      <b>Qué significa:</b> con una inversión similar estamos concentrando los impactos en menos personas — la cuenta ha pasado de decenas de campañas de prospección amplia a solo 2 campañas always-on, más eficientes en gestión pero con un alcance bruto menor.<br><br>
      <b>Por qué importa:</b> mantener el volumen de compras con menos alcance exige más frecuencia por persona (ver frecuencia y fatiga) y hace más importante ampliar el volumen de creatividades para poder crecer en alcance sin perder eficiencia.
    </div>`;
}

/* ============================================================
   META — Promociones
   ============================================================ */
function renderMetaPromotions(){
  const rows = DATA.meta.promotions.map(p=>`<tr>
      <td><b>${p.name}</b><div style="color:var(--ink-soft);font-weight:400;font-size:.82rem;margin-top:3px;">${p.note}</div></td>
      <td>${p.month}</td>
      <td class="num">${fmtEUR(p.spend)}</td>
      <td class="num">${fmtNum(p.purchases)}</td>
      <td class="num">${fmtX(p.roasAvg)}</td>
    </tr>`).join('');
  document.getElementById('meta-promo-table').innerHTML = `
    <thead><tr><th>Promoción / producto</th><th>Periodo</th><th class="num">Inversión</th><th class="num">Compras</th><th class="num">ROAS medio</th></tr></thead>
    <tbody>${rows}</tbody>`;
}

/* ============================================================
   META — Audiencias
   ============================================================ */
function renderMetaAudience(){
  const a = DATA.meta.audiences;
  document.getElementById('meta-audience-meta').innerHTML = `
    <div class="card"><div class="card-pad"><div class="label">Geografía</div><div class="value">${a.geo}</div></div></div>
    <div class="card"><div class="card-pad"><div class="label">Edad objetivo</div><div class="value">${a.age}</div></div></div>`;
  document.getElementById('meta-audience-chips').innerHTML = a.interestSegments.map(s=>`<span class="chip">${s}</span>`).join('');
  document.getElementById('meta-audience-caveat').innerHTML = `<b>Lo que sí sabemos vs. lo que no:</b> ${a.demographicSkew}<br><br>${a.caveat}`;
}

/* ============================================================
   META — Evolución estrategia
   ============================================================ */
function renderMetaStrategy(){
  const tl = document.getElementById('meta-strategy-timeline');
  DATA.meta.strategyEvolution.forEach(s=>{
    tl.appendChild(el('div','timeline-item', `<h4>${s.phase}</h4><p>${s.detail}</p>`));
  });
}

function renderMetaFunnel(){
  const grid = document.getElementById('meta-funnel-grid');
  grid.appendChild(el('div','funnel-card mofu', `<span class="tag">MOFU</span><h3>Construir audiencia cualificada</h3><p>${DATA.meta.mofuStrategy}</p><p><strong>${fmtEUR(DATA.meta.activeCampaigns[1].spend)}</strong> invertidos · <strong>${fmtNum(DATA.meta.activeCampaigns[1].purchases)}</strong> compras asistidas</p>`));
  grid.appendChild(el('div','funnel-card bofu', `<span class="tag">BOFU</span><h3>Suscripción + ventas</h3><p>${DATA.meta.bofuStrategy}</p><p><strong>${fmtEUR(DATA.meta.activeCampaigns[0].spend)}</strong> invertidos · <strong>${fmtNum(DATA.meta.activeCampaigns[0].purchases)}</strong> compras</p>`));
}

/* ============================================================
   META — Creatividades
   ============================================================ */
function renderMetaCreatives(){
  function buildGroup(promoGroup, folder){
    const g = el('div','creative-group');
    g.appendChild(el('h4','', promoGroup.claim));
    g.appendChild(el('div','meta-line', `${promoGroup.promo} · Hook: “${promoGroup.hook}” · CTA sugerida: “${promoGroup.cta}”`));
    const gallery = el('div','creative-gallery');
    promoGroup.files.forEach(f=>{
      const thumb = el('div','creative-thumb');
      const img = el('img'); img.src = `assets/creatives/${folder}/${f}`; img.alt = promoGroup.claim;
      thumb.appendChild(img);
      thumb.addEventListener('click', ()=> openLightbox(img.src));
      gallery.appendChild(thumb);
    });
    g.appendChild(gallery);
    return g;
  }
  const julioWrap = document.getElementById('meta-creatives-julio');
  julioWrap.appendChild(el('h3','', 'Julio 2026'));
  DATA.meta.creatives.julio.forEach(pg=> julioWrap.appendChild(buildGroup(pg,'julio')));

  const agostoWrap = document.getElementById('meta-creatives-agosto');
  agostoWrap.appendChild(el('h3','', 'Agosto 2026'));
  DATA.meta.creatives.agosto.forEach(pg=> agostoWrap.appendChild(buildGroup(pg,'agosto')));
}

function openLightbox(src){
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.remove('hide');
}
document.getElementById('lightbox-close').addEventListener('click', ()=> document.getElementById('lightbox').classList.add('hide'));
document.getElementById('lightbox').addEventListener('click', e=>{ if(e.target.id==='lightbox') document.getElementById('lightbox').classList.add('hide'); });

/* ============================================================
   META — Frecuencia
   ============================================================ */
function renderMetaFrequency(){
  const f = DATA.meta.frequency;
  const wrap = document.getElementById('meta-freq-bars');
  const maxF = 30;
  [['BOFU (venta directa)', f.bofu, DATA.meta.activeCampaigns[0].reach], ['MOFU (captación)', f.mofu, DATA.meta.activeCampaigns[1].reach]].forEach(([name,val,reach])=>{
    wrap.appendChild(el('div','freq-bar-row', `
      <div class="name">${name}</div>
      <div class="freq-bar-track"><div class="freq-bar-fill" style="width:${Math.min(100,(val/maxF)*100)}%"></div></div>
      <div class="fval">${fmtNum1(val)}x</div>`));
  });
  document.getElementById('meta-freq-note').innerHTML = f.note;
}

/* ============================================================
   GOOGLE — Campañas activas
   ============================================================ */
function renderGoogleCampaigns(){
  const wrap = document.getElementById('google-active-campaigns');
  const rows = DATA.google.activeCampaigns.map(c=>{
    const norm = c.type.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const typeClass = 'type-'+norm.replace(/\s+/g,'-');
    return `<tr>
      <td><b>${c.name}</b>${c.launchNote?`<div style="color:var(--ink-soft);font-weight:400;font-size:.8rem;margin-top:4px;">${c.launchNote}</div>`:''}</td>
      <td><span class="type-badge ${typeClass}">${c.type}</span></td>
      <td>${c.priority}</td>
      <td class="num">${fmtEUR2(c.spend)}</td>
      <td class="num">${fmtNum(c.impressions)}</td>
      <td class="num">${fmtNum(c.clicks)}</td>
      <td class="num">${fmtPct(c.ctr)}</td>
      <td class="num">${fmtNum1(c.conversions)}</td>
      <td class="num">${c.cpa!=null?fmtEUR2(c.cpa):'N/D'}</td>
      <td class="num">${c.roas!=null?fmtX(c.roas):'N/D'}</td>
    </tr>`;
  }).join('');
  wrap.innerHTML = `<div class="card"><div class="card-pad" style="overflow-x:auto;">
    <table class="data-table">
      <thead><tr><th>Campaña</th><th>Tipo</th><th>Prioridad</th><th class="num">Inversión</th><th class="num">Impr.</th><th class="num">Clics</th><th class="num">CTR</th><th class="num">Conv.</th><th class="num">CPA</th><th class="num">ROAS</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div></div>`;
}

/* ============================================================
   GOOGLE — Reestructuración
   ============================================================ */
function renderGoogleRestructure(){
  const r = DATA.google.restructuring;
  document.getElementById('google-restructure-grid').innerHTML = `
    <div class="restructure-col before"><h4>Antes</h4><ul>${r.before.map(x=>`<li>${x}</li>`).join('')}</ul></div>
    <div class="restructure-arrow">→</div>
    <div class="restructure-col after"><h4>Después de la reestructuración</h4><ul>${r.after.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
  document.getElementById('google-restructure-note').innerHTML = `${r.dataNote}<br><br>${DATA.google.legacyNote}`;
}

/* ============================================================
   GOOGLE — Impacto
   ============================================================ */
function renderGoogleImpact(){
  const cs = DATA.google.currentStructureTotal;
  const grid = document.getElementById('google-impact-compare');
  const items = [
    {l:'Inversión (estructura actual)', now:cs.spend, prev:cs.spendPrev, f:fmtEUR2},
    {l:'Conversiones', now:cs.conversions, prev:cs.conversionsPrev, f:fmtNum1},
    {l:'Valor de conversión', now:cs.value, prev:cs.valuePrev, f:fmtEUR},
    {l:'ROAS', now:cs.roas, prev:cs.roasPrev, f:fmtX},
  ];
  items.forEach(it=> grid.appendChild(el('div','compare-card', `<div class="label">${it.l}</div><div class="value">${it.f(it.now)}</div>${deltaPill(it.now, it.prev, {label:'periodo anterior'})}`)));

  document.getElementById('google-impact-narrative').innerHTML = `
    <div class="callout">
      <b>Tras la reestructuración observamos</b> que las 8 campañas de la estructura actual generan un ${pctDelta(cs.conversions,cs.conversionsPrev).toFixed(0)}% más de conversiones y un ${pctDelta(cs.roas,cs.roasPrev).toFixed(0)}% más de ROAS que en su propio periodo anterior (3 may–30 jun 2026). Los datos sugieren que concentrar el presupuesto en Suscripción, Brand, Productos y Lanzamientos — y retirarlo de actividad como la campaña de Vídeo sin conversiones — está mejorando la eficiencia general de la cuenta. No se afirma causalidad absoluta: no hay un export "antes" campaña a campaña que permita aislar el efecto de la reestructuración de otros factores (estacionalidad, aprendizaje del algoritmo, etc.).
    </div>`;

  const rows = DATA.google.byType.map(t=>`<tr>
      <td><b>${t.type}</b></td>
      <td class="num">${fmtEUR2(t.spend)}</td>
      <td class="num">${fmtNum1(t.conversions)}</td>
      <td class="num">${fmtEUR(t.value)}</td>
      <td class="num">${t.roas!=null?fmtX(t.roas):'N/D'}</td>
      <td class="num">${t.roasPrev!=null?fmtX(t.roasPrev):'N/D'}</td>
    </tr>`).join('');
  document.getElementById('google-type-table').innerHTML = `
    <thead><tr><th>Tipo de campaña</th><th class="num">Inversión</th><th class="num">Conversiones</th><th class="num">Valor</th><th class="num">ROAS actual</th><th class="num">ROAS periodo anterior</th></tr></thead>
    <tbody>${rows}</tbody>`;
}

/* ============================================================
   GOOGLE — Prioridades
   ============================================================ */
function renderGooglePriorities(){
  const g = DATA.google;
  const susc = g.activeCampaigns.filter(c=>c.priority==='Suscripción');
  const brand = g.activeCampaigns.filter(c=>c.priority==='Brand');
  const prod = g.activeCampaigns.filter(c=>c.priority==='Productos');
  function sum(arr,k){ return arr.reduce((a,c)=>a+(c[k]||0),0); }
  const cards = [
    {n:'01', t:'Suscripción', d:`${susc.length} campañas (Search, Performance Max, Demand Gen). ${fmtEUR2(sum(susc,'spend'))} invertidos generando ${fmtNum1(sum(susc,'conversions'))} conversiones y ${fmtEUR(sum(susc,'value'))} en valor — el objetivo de negocio número uno tiene ya su propia estructura dedicada en Google.`},
    {n:'02', t:'Brand', d:`La campaña de marca es la más eficiente de toda la cuenta: ROAS ${fmtX(brand[0].roas)} con un CPA de solo ${fmtEUR2(brand[0].cpa)}. Captura demanda que ya nos busca — su función es defender cuota, no generar demanda nueva.`},
    {n:'03', t:'Productos', d:`Performance Max de catálogo: ${fmtEUR2(sum(prod,'spend'))} invertidos, ROAS ${fmtX(prod[0].roas)}. Complementa a Suscripción y Brand dando salida a la venta puntual de producto.`},
  ];
  document.getElementById('google-priorities-grid').innerHTML = cards.map(c=>`
    <div class="priority-card"><div class="pnum">${c.n}</div><h3>${c.t}</h3><p style="color:var(--ink-soft);font-size:.92rem;">${c.d}</p></div>`).join('');
}

/* ============================================================
   GOOGLE — Notas keywords / creatividades
   ============================================================ */
function renderGoogleNotes(){
  document.getElementById('google-keywords-note').innerHTML = `<b>N/D:</b> ${DATA.google.keywordsNote}`;
  document.getElementById('google-creatives-note').innerHTML = `<b>N/D:</b> ${DATA.google.creativesNote}`;
}

/* ============================================================
   VISIÓN CONJUNTA
   ============================================================ */
function renderJoint(){
  const m = DATA.meta, g = DATA.google, c = DATA.combined;
  const rows = [
    ['Inversión', fmtEUR(m.spend), fmtEUR(g.accountTotal.spend), fmtEUR(c.spend)],
    ['Resultados (compras/conv.)', fmtNum(m.purchases), fmtNum1(g.accountTotal.conversions), fmtNum(m.purchases + g.accountTotal.conversions)+'*'],
    ['Ingresos', fmtEUR(m.revenueEst), fmtEUR(g.accountTotal.value), fmtEUR(c.revenue)],
    ['CPA', fmtEUR2(m.cpa), fmtEUR2(g.accountTotal.cpa), '—'],
    ['ROAS', fmtX(m.roasEst), fmtX(g.accountTotal.roas), fmtX(c.roas)],
  ];
  document.getElementById('joint-table').innerHTML = `
    <thead><tr><th>KPI</th><th>Meta</th><th>Google</th><th>Total</th></tr></thead>
    <tbody>${rows.map((r,i)=>`<tr class="${i===rows.length-1?'total-row':''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td></tr>`).join('')}</tbody>`;

  document.getElementById('joint-roles').innerHTML = `
    <div class="role-card meta"><h4>Meta — generación de demanda</h4><p>Concentra el ${c.metaShare}% de la inversión conjunta. Su ROAS estimado (${fmtX(m.roasEst)}) y CPA (${fmtEUR2(m.cpa)}) reflejan un rol de descubrimiento, MOFU y remarketing: construye audiencia (contenido de recetas, UGC) y la empuja a suscripción y venta directa vía BOFU.</p></div>
    <div class="role-card google"><h4>Google — captura de demanda</h4><p>Con el ${c.googleShare}% de la inversión conjunta logra el ROAS más alto (${fmtX(g.accountTotal.roas)}) y el CPA más bajo (${fmtEUR2(g.accountTotal.cpa)}), liderado por Brand y Search de Suscripción: capta intención de compra ya existente.</p></div>`;
}

/* ============================================================
   CONCLUSIONES
   ============================================================ */
function renderConclusions(){
  const m = DATA.meta, g = DATA.google, c = DATA.combined, cs = g.currentStructureTotal;
  const items = [
    {t:'La eficiencia global es sólida, con Google como motor de rentabilidad', dato:`ROAS combinado de ${fmtX(c.roas)} (Meta ${fmtX(m.roasEst)}, Google ${fmtX(g.accountTotal.roas)})`, interp:'Google convierte demanda ya cualificada (Brand, Search Suscripción) a un coste muy inferior; Meta invierte más en construir esa demanda desde cero.', impacto:'El CPA combinado se mantiene competitivo pese a que Meta concentra el 72% del presupuesto.', reco:'Mantener el peso presupuestario actual, pero vigilar que Meta no absorba más presupuesto de Google sin justificarlo en volumen de captación nueva.'},
    {t:'La reestructuración de Google está funcionando', dato:`+${pctDelta(cs.conversions,cs.conversionsPrev).toFixed(0)}% conversiones y +${pctDelta(cs.roas,cs.roasPrev).toFixed(0)}% ROAS en la estructura actual vs su periodo anterior`, interp:'Concentrar la cuenta en Suscripción, Brand, Productos y Lanzamientos, retirando actividad como la campaña de Vídeo sin conversiones, coincide con una mejora clara de eficiencia.', impacto:`7.213,86€ de gasto "legacy" ya han salido de la estructura actual.`, reco:'Formalizar el cierre definitivo de cualquier campaña legacy restante y documentar el export "antes" para poder auditar el impacto con más rigor en el próximo informe.'},
    {t:'La campaña Brand de Google es el activo más rentable de toda la cuenta', dato:`ROAS 134,55x y CPA de 0,44€ en "ES | ESP | Search | Brand | Smileat"`, interp:'Es tráfico de máxima intención (gente que ya busca "Smileat"); su coste es bajísimo porque compite con poca puja.', impacto:'Cualquier caída de inversión de marca (o de posicionamiento orgánico) tendría un efecto desproporcionado sobre el ROAS medio de la cuenta.', reco:'Proteger el presupuesto de Brand como mínimo innegociable y vigilar el Quality Score / cuota de impresiones para no perder esta eficiencia.'},
    {t:'La suscripción ya tiene presencia propia en ambos canales, pero el volumen aún es bajo en Google', dato:`Suscripción en Google: ${fmtEUR2(733.35+1750.16+2035.53)} invertidos, ROAS Search 9,19x pero Demand Gen solo 0,74x`, interp:'El Demand Gen de Suscripción tiene mucho alcance (403.784 impresiones) pero conversión débil; el Search y el PMax de Suscripción sí funcionan.', impacto:'Parte del presupuesto de Suscripción en Google no está generando el retorno del resto de la cuenta.', reco:'Revisar la segmentación y creatividad del Demand Gen de Suscripción, o reasignar parte de ese presupuesto hacia Search/PMax de Suscripción, que sí funcionan.'},
    {t:'BOFU en Meta funciona con una frecuencia muy alta', dato:`Frecuencia de 25,7 impactos por persona en 59 días (vs 7,5 en MOFU)`, interp:'El 69% del presupuesto de Meta se concentra en un alcance de solo 418.044 personas en remarketing y venta directa always-on.', impacto:'Riesgo de fatiga creativa y de saturación de la misma audiencia si no se amplía el volumen de creatividades.', reco:'Priorizar la producción de nuevas piezas para BOFU en concreto — es la campaña con más presupuesto y más riesgo de fatiga — y monitorizar CTR por adset semanalmente.'},
    {t:'Neverita fue la promoción más rentable del verano', dato:`ROAS medio ~10,1x, ${fmtNum(881)} compras asociadas`, interp:'Un regalo con la compra (+40€) superó claramente al resto de promociones de descuento directo (15%/25%, con ROAS 7,15x).', impacto:'Sugiere que los incentivos de regalo pueden ser más eficientes que el descuento puro para este público.', reco:'Testar mecánicas de "regalo con la compra" en próximas promociones estacionales, comparándolas directamente contra descuentos porcentuales.'},
    {t:'El lanzamiento de Smileat Kids arranca con muy buenas señales, aún con poco volumen', dato:`ROAS 9,35x en Meta (257€ invertidos) y 46.162 impresiones ya generadas en Google Demand Gen sin coste`, interp:'Es el lanzamiento más reciente (25 de agosto); los primeros indicadores de eficiencia son los mejores de la cuenta, pero la base de datos es aún pequeña para sacar conclusiones firmes.', impacto:'Kids tiene potencial para convertirse en una nueva línea de inversión relevante si el ROAS se sostiene con más volumen.', reco:'Escalar gradualmente el presupuesto de Kids en septiembre, manteniendo control de CPA a medida que crece el volumen.'},
    {t:'Faltan piezas de datos clave para un diagnóstico completo de audiencias y creatividades', dato:'Sin desglose demográfico, de intereses reales alcanzados, keywords ni creatividades de Google en los exports recibidos', interp:'El informe actual describe la estrategia de segmentación configurada, no el resultado real desagregado por audiencia o palabra clave.', impacto:'Algunas decisiones de optimización fina (qué interés recorta más, qué keyword escalar) no se pueden tomar solo con esta información.', reco:'Incorporar en el próximo envío: desglose demográfico/intereses de Meta, informe de términos de búsqueda y de audiencias de Google, y export de anuncios (RSA/Display) de Google.'},
  ];
  document.getElementById('conclusions-list').innerHTML = items.map((it,i)=>`
    <div class="conclusion-card">
      <div class="conclusion-num">${i+1}</div>
      <div>
        <h4>${it.t}</h4>
        <div class="conclusion-row"><b>Dato:</b><span>${it.dato}</span></div>
        <div class="conclusion-row"><b>Interpretación:</b><span>${it.interp}</span></div>
        <div class="conclusion-row"><b>Impacto:</b><span>${it.impacto}</span></div>
        <div class="conclusion-row"><b>Recomendación:</b><span>${it.reco}</span></div>
      </div>
    </div>`).join('');
}

/* ============================================================
   INIT
   ============================================================ */
renderHero();
renderMetaCampaigns();
renderMetaPeriod();
renderMetaPromotions();
renderMetaAudience();
renderMetaStrategy();
renderMetaFunnel();
renderMetaCreatives();
renderMetaFrequency();
renderGoogleCampaigns();
renderGoogleRestructure();
renderGoogleImpact();
renderGooglePriorities();
renderGoogleNotes();
renderJoint();
renderConclusions();
