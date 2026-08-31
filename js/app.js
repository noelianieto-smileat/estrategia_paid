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
      <div><h3>${camp.name}</h3><div class="obj">${camp.objective}${camp.started ? ' · desde ' + camp.started : ''}</div></div>
      <div class="status-pill">● ${camp.status}</div>
    `));
    const body = el('div','campaign-card__body');
    if(camp.description) body.appendChild(el('p','campaign-card__desc', camp.description));
    const metrics = [
      ['Inversión', fmtEUR(camp.spend)],
      ['Compras', fmtNum(camp.purchases)],
      ['CPA', fmtEUR2(camp.cpa)],
      ['ROAS', fmtX(camp.roas)],
      ['Alcance', fmtNum(camp.reach)],
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
        <td class="period-cell">${a.dates || '—'}</td>
        <td class="num">${fmtEUR(a.spend)}</td>
        <td class="num">${fmtNum(a.purchases)}</td>
        <td class="num">${a.cpa!=null?fmtEUR2(a.cpa):'N/D'}</td>
        <td class="num">${a.roas!=null?fmtX(a.roas):'N/D'}</td>
        <td class="num">${fmtNum(a.reach)}</td>
      </tr>`).join('');
    details.appendChild(el('div','', `<table class="data-table"><thead><tr><th>Conjunto de anuncios</th><th>Promoción</th><th>Periodo activo</th><th class="num">Inversión</th><th class="num">Compras</th><th class="num">CPA</th><th class="num">ROAS</th><th class="num">Alcance</th></tr></thead><tbody>${rows}</tbody></table>`));
    card.appendChild(details);
    wrap.appendChild(card);
  });
}

/* ============================================================
   META — Comparativa periodo
   ============================================================ */
function renderMetaPeriod(){
  const m = DATA.meta;

  // Grupos de cuadros de resultados (tabs / selector interactivo)
  const groups = [
    {
      id: 'rendimiento', label: 'Rendimiento',
      items: [
        {l:'Coste por resultado', v: fmtEUR2(m.cpa)},
        {l:'ROAS', v: fmtX(m.roasEst)},
        {l:'Ingresos / valor de los resultados', v: fmtEUR(m.revenueEst)},
        {l:'Compras', v: fmtNum(m.purchases)},
      ]
    },
    {
      id: 'alcance', label: 'Inversión y alcance',
      items: [
        {l:'Inversión', v: fmtEUR(m.spend)},
        {l:'Impresiones', v: fmtNum(m.impressions)},
        {l:'Clics', v: 'N/D', sub: 'No disponible en el export de Meta'},
        {l:'Alcance', v: fmtNum(m.reach)},
      ]
    }
  ];

  const tabsWrap = el('div','result-tabs');
  groups.forEach((g,i)=>{
    const btn = el('button', `result-tab-btn${i===0?' active':''}`, g.label);
    btn.type = 'button';
    btn.dataset.tab = g.id;
    tabsWrap.appendChild(btn);
  });

  const panelsWrap = el('div','result-tab-panels');
  groups.forEach((g,i)=>{
    const panel = el('div', `result-tab-panel compare-grid${i===0?' active':''}`);
    panel.dataset.tabPanel = g.id;
    g.items.forEach(it=>{
      panel.appendChild(el('div','compare-card', `<div class="label">${it.l}</div><div class="value">${it.v}</div>${it.sub?`<div class="sub-nd">${it.sub}</div>`:''}`));
    });
    panelsWrap.appendChild(panel);
  });

  const host = document.getElementById('meta-period-compare');
  host.classList.remove('compare-grid');
  host.appendChild(tabsWrap);
  host.appendChild(panelsWrap);

  tabsWrap.addEventListener('click', e=>{
    const btn = e.target.closest('.result-tab-btn');
    if(!btn) return;
    tabsWrap.querySelectorAll('.result-tab-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    panelsWrap.querySelectorAll('.result-tab-panel').forEach(p=> p.classList.toggle('active', p.dataset.tabPanel===btn.dataset.tab));
  });

  document.getElementById('meta-period-narrative').innerHTML = `
    <div class="callout">
      Con una inversión de ${fmtEUR(m.spend)} hemos conseguido un total de ${fmtEUR(m.revenueEst)} de ingresos, generando ${fmtNum(m.purchases)} compras y alcanzando un ROAS de ${fmtX(m.roasEst)}.
    </div>
    <div class="callout subscriber-highlight">
      <div class="sh-label">Crecimiento de suscriptores</div>
      <div class="sh-value">+${DATA.meta.subscriberGrowth.pct}%</div>
      <div class="sh-note">${DATA.meta.subscriberGrowth.note}</div>
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
    g.appendChild(el('div','meta-line', promoGroup.promo));
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
  julioWrap.appendChild(el('p','creatives-intro', 'A continuación se muestran algunos ejemplos representativos de las creatividades utilizadas durante el periodo.'));
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
      <b>Tras la reestructuración observamos</b> que las 8 campañas de la estructura actual generan un ${pctDelta(cs.conversions,cs.conversionsPrev).toFixed(0)}% más de conversiones y un ${pctDelta(cs.roas,cs.roasPrev).toFixed(0)}% más de ROAS que en su propio periodo anterior (3 may–30 jun 2026). Los datos sugieren que concentrar el presupuesto en Suscripción, Brand, Productos y Lanzamientos — y retirarlo de actividad como la campaña de Vídeo sin conversiones — está mejorando la eficiencia general de la cuenta.
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
    {t:'La suscripción ya tiene presencia propia en ambos canales, pero el volumen aún es bajo en Google', dato:`Suscripción en Google: ${fmtEUR2(733.35+1750.16+2035.53)} invertidos, ROAS Search 9,19x pero Demand Gen solo 0,74x`, interp:'El Demand Gen de Suscripción tiene mucho alcance (403.784 impresiones) pero conversión débil; el Search y el PMax de Suscripción sí funcionan.', impacto:'Parte del presupuesto de Suscripción en Google no está generando el retorno del resto de la cuenta.'},
    {t:'Neverita fue la promoción más rentable del verano', dato:`ROAS medio ~10,1x, ${fmtNum(881)} compras asociadas`, interp:'Un regalo con la compra (+40€) superó claramente al resto de promociones de descuento directo (15%/25%, con ROAS 7,15x).', impacto:'Sugiere que los incentivos de regalo pueden ser más eficientes que el descuento puro para este público.'},
    {t:'El lanzamiento de Smileat Kids arranca con muy buenas señales, aún con poco volumen', dato:`ROAS 9,35x en Meta (257€ invertidos) y 46.162 impresiones ya generadas en Google Demand Gen sin coste`, interp:'Es el lanzamiento más reciente (25 de agosto); los primeros indicadores de eficiencia son los mejores de la cuenta, pero la base de datos es aún pequeña para sacar conclusiones firmes.', impacto:'Kids tiene potencial para convertirse en una nueva línea de inversión relevante si el ROAS se sostiene con más volumen.'},
  ];
  document.getElementById('conclusions-list').innerHTML = items.map((it,i)=>`
    <div class="conclusion-card">
      <div class="conclusion-num">${i+1}</div>
      <div>
        <h4>${it.t}</h4>
        <div class="conclusion-row"><b>Dato:</b><span>${it.dato}</span></div>
        <div class="conclusion-row"><b>Interpretación:</b><span>${it.interp}</span></div>
        <div class="conclusion-row"><b>Impacto:</b><span>${it.impacto}</span></div>
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
renderGoogleCampaigns();
renderGoogleRestructure();
renderGoogleImpact();
renderGooglePriorities();
renderJoint();
renderConclusions();
