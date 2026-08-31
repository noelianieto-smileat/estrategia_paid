/* =========================================================================
   SMILEAT · Paid Media Performance — data.js
   Fuente: exports Meta Ads Manager (1 jul–28 ago 2026 vs 1 jul–28 ago 2025)
   y Google Ads "Informe de campaña" (1 jul–28 ago 2026 vs 3 may–30 jun 2026).
   Todas las cifras proceden directamente de los CSV proporcionados.
   Donde el dato no existe en los exports se marca explícitamente N/D.
   ========================================================================= */

const DATA = {

  meta: {
    period: "1 jul – 28 ago 2026",
    periodPrev: "1 jul – 28 ago 2025",
    spend: 45315.20,
    spendPrev: 47585.94,
    impressions: 15814775,
    impressionsPrev: 16260785,
    reach: 1593604,
    reachPrev: 2627651,
    purchases: 4505,
    purchasesPrev: 4672,
    revenueEst: 212346.59,
    roasEst: 4.69,
    cpa: 10.06,
    note: "El export de Meta no incluye una columna de ROAS ni de valor de conversión por separado para el periodo 2025, por lo que la comparativa de ingresos y ROAS 2025 se marca N/D. Los ingresos 2026 son una estimación (ROAS × inversión) por campaña.",

    // Estado de entrega de todas las campañas históricas del account (158 filas del export)
    accountHealth: { total: 158, active: 2, archived: 2, notDelivering: 1, inactive: 153 },

    activeCampaigns: [
      {
        id: "bofu",
        name: "ES - Ventas - PE - BOFU - ABO",
        objective: "Compras (BOFU)",
        status: "Activa",
        started: null,
        spend: 31350.32,
        impressions: 10747611,
        reach: 418044,
        frequency: 25.71,
        cpm: 2.92,
        purchases: 3963,
        cpa: 7.91,
        roas: 5.93,
        revenueEst: 185922.4,
        funnel: "BOFU",
        description: "La mayor parte del presupuesto diario se destina a la captación de nuevos suscriptores, sin dejar de dar peso a las promociones puntuales y a los lanzamientos de producto que conviven en la misma campaña.",
        adsets: [
          { name: "PROS/RET - Always on - Suscripción always on", spend: 4312.65, purchases: 478, cpa: 9.02, roas: 5.23, reach: 181395, frequency: 8.07, promo: "Suscripción", dates: "Desde el 13 de abril · activa actualmente" },
          { name: "PROS/RET(adv+) _Smilados_ugc", spend: 3469.24, purchases: 571, cpa: 6.08, roas: 7.62, reach: 160858, frequency: 8.70, promo: "Smilados (UGC)", dates: "Desde el 30 de abril · activa hasta dentro de poco" },
          { name: "PROS/RET - Always on - Lanzamiento Gazpachito", spend: 2175.73, purchases: 272, cpa: 8.00, roas: 5.72, reach: 112308, frequency: 7.53, promo: "Lanzamiento Gazpachito", dates: "Desde el 5 de mayo hasta principios de agosto" },
          { name: "PROS/RET - Always on - Suscripción (IMG)", spend: 6073.71, purchases: 660, cpa: 9.20, roas: 5.38, reach: 196396, frequency: 10.39, promo: "Suscripción", dates: "Desde el 10 de julio · activa actualmente" },
          { name: "PROS/RET - Suscripción (always on) - Test", spend: 5023.32, purchases: 334, cpa: 15.04, roas: 3.01, reach: 147336, frequency: 12.37, promo: "Suscripción", dates: "Desde el 10 de julio · activa actualmente" },
          { name: "PROS/RET - Lanzamiento SMILOTES - Julio", spend: 3284.78, purchases: 376, cpa: 8.74, roas: 5.19, reach: 130252, frequency: 8.68, promo: "Lanzamiento Smilotes", dates: "Desde el 14 de julio · activa actualmente" },
          { name: "PROS/RET - Lanzamiento SMILEAT KIDS", spend: 257.32, purchases: 51, cpa: 5.05, roas: 9.35, reach: 26490, frequency: 2.75, promo: "Lanzamiento Smileat Kids", dates: "Desde el 25 de agosto · activa actualmente" },
          { name: "PROS/RET - Regalo neverita +40€ (junio 2026)", spend: 1359.33, purchases: 345, cpa: 3.94, roas: 11.38, reach: 139785, frequency: 3.05, promo: "Regalo Neverita", dates: "Desde el 23 de junio hasta mediados de julio" },
          { name: "PROS/RET - Regalo neverita +40€ (suscripción)", spend: 2773.52, purchases: 536, cpa: 5.17, roas: 9.16, reach: 124557, frequency: 5.60, promo: "Regalo Neverita", dates: "Desde el 26 de junio · pausada a mediados de julio" },
          { name: "PROS/RET - 15% Packs y 25% Suscripción", spend: 1362.35, purchases: 192, cpa: 7.10, roas: 7.15, reach: 81819, frequency: 5.11, promo: "15% Packs / 25% Suscripción", dates: "Desde el 26 de julio hasta el 2 de agosto" },
          { name: "PROS/RET - Cubiertos - Agosto", spend: 1256.47, purchases: 148, cpa: 8.49, roas: 5.25, reach: 95200, frequency: 4.51, promo: "Regalo Cubiertos", dates: "Desde el 9 de agosto hasta el 16 de agosto" }
        ]
      },
      {
        id: "mofu",
        name: "ES - Ventas -ADT - MOFU-ABO",
        objective: "Compras (MOFU) · captación / medio de embudo",
        status: "Activa",
        started: "En curso",
        spend: 7901.41,
        impressions: 2727117,
        reach: 364370,
        frequency: 7.48,
        cpm: 2.90,
        purchases: 521,
        cpa: 15.17,
        roas: 3.22,
        revenueEst: 25424.34,
        funnel: "MOFU",
        description: "Se ha actualizado el creativo del conjunto de captación de cliente nuevo, sustituyendo el post en promoción por una publicación más reciente de Instagram para evitar la alta frecuencia que estaba acumulando el anterior. Además, se han incorporado recientemente los conjuntos de recetas y consideración, orientados a dar más visibilidad a este tipo de contenido: llegan a usuarios en fase de consideración, mantienen la marca presente durante su proceso de decisión y ayudan a que puedan convertirse más adelante en compradores.",
        adsets: [
          { name: "PROS - Capta cliente nuevo - Juan Llorca -/platitos /dudas tarritos", spend: 4795.83, purchases: 142, cpa: 33.77, roas: null, reach: 265455, promo: "Captación · contenido Juan Llorca" },
          { name: "PROS - Juan Llorca / Gazpachito", spend: 144.60, purchases: 8, cpa: 18.08, roas: null, reach: 14841, promo: "Lanzamiento Gazpachito" },
          { name: "PROS - Recetas", spend: 2776.78, purchases: 304, cpa: 9.13, roas: null, reach: 140121, promo: "Contenido MOFU · recetas" },
          { name: "PROS - Consideracion", spend: 183.95, purchases: 67, cpa: 2.75, roas: null, reach: 12093, promo: "Consideración" }
        ]
      }
    ],

    // Promoción / producto → periodo aproximado → performance agregada (a partir de adsets BOFU + MOFU)
    // Nota: los exports agregan todo el rango 1 jul–28 ago; el mes se estima por la fecha de inicio del adset.
    promotions: [
      { name: "Suscripción (recurrente)", month: "Jul + Ago", spend: 15409.68, purchases: 1472, roasAvg: 5.6, note: "3 adsets always-on con foco en alta de suscripción. Es, con diferencia, la mayor partida de inversión BOFU (49% del presupuesto de la campaña BOFU)." },
      { name: "Lanzamiento Smilotes", month: "Desde julio · activa actualmente", spend: 3284.78, purchases: 376, roasAvg: 5.19, note: "Lanzamiento de producto con campaña dedicada desde el 14 de julio; sigue activa actualmente, no se limitó al mes de lanzamiento." },
      { name: "Regalo Neverita (+40€)", month: "Jun→Jul", spend: 4132.85, purchases: 881, roasAvg: 10.1, note: "La promoción con mejor ROAS de todo julio-agosto. Arrancó en junio y estuvo activa hasta mediados de julio." },
      { name: "15% packs / 25% suscripción", month: "Julio", spend: 1362.35, purchases: 192, roasAvg: 7.15, note: "Promo puntual de descuento combinado, lanzada el 26 de julio." },
      { name: "Smilados (UGC)", month: "Jul + Ago", spend: 3469.24, purchases: 571, roasAvg: 7.62, note: "Creatividad UGC de Smilados, activa desde finales de abril y mantenida en verano por su rendimiento." },
      { name: "Lanzamiento Smileat Kids", month: "Agosto", spend: 257.32, purchases: 51, roasAvg: 9.35, note: "Lanzamiento más reciente (25 de agosto). Muy pocos días de datos, pero el ROAS inicial es el más alto de la cuenta." },
      { name: "Regalo Cubiertos", month: "Agosto", spend: 1256.47, purchases: 148, roasAvg: 5.25, note: "Promo de regalo con producto, lanzada el 6 de agosto." },
      { name: "Lanzamiento Gazpachito", month: "Jul + Ago", spend: 2320.33, purchases: 280, roasAvg: 5.72, note: "Combina un adset de conversión (BOFU) y otro de prospección con contenido de Juan Llorca (MOFU)." }
    ],

    creatives: {
      julio: [
        { promo: "Regalo Neverita", files: ["julio_neverita_1.jpg","julio_neverita_2.jpg","julio_neverita_3.jpg"], hook: "Regalo con la compra (+40€)", claim: "Neverita de regalo", cta: "Comprar ahora" },
        { promo: "Suscripción", files: ["julio_suscripcion_1.jpg","julio_suscripcion_2.jpg"], hook: "Ahorro recurrente", claim: "Suscríbete y ahorra", cta: "Suscribirme" },
        { promo: "Lanzamiento Smilotes", files: ["julio_smilotes_1.jpg","julio_smilotes_2.jpg","julio_smilotes_3.jpg","julio_smilotes_4.jpg"], hook: "Novedad de producto", claim: "Lanzamiento Smilotes", cta: "Descubrir" },
        { promo: "15% packs / 25% suscripción", files: ["julio_15packs_25susc_1.jpg","julio_15packs_25susc_2.jpg"], hook: "Doble descuento", claim: "15% en packs, 25% en suscripción", cta: "Aprovechar oferta" }
      ],
      agosto: [
        { promo: "Lanzamiento Smileat Kids", files: ["agosto_kids_1.jpg","agosto_kids_2.jpg","agosto_kids_3.jpg"], hook: "Nueva gama para niños", claim: "Publi Kids + Rubio / Lanzamiento Kids", cta: "Conocer Kids" },
        { promo: "Regalo Cubiertos", files: ["agosto_cubiertos_1.jpg","agosto_cubiertos_2.jpg"], hook: "Regalo con producto", claim: "Cubiertos de regalo", cta: "Comprar ahora" },
        { promo: "Smilados (UGC)", files: ["agosto_smilados_1.jpg"], hook: "Contenido generado por usuarios", claim: "Smilados", cta: "Ver más" },
        { promo: "Suscripción", files: ["agosto_suscripcion_1.jpg","agosto_suscripcion_2.jpg"], hook: "Ahorro recurrente", claim: "Suscríbete y ahorra", cta: "Suscribirme" }
      ]
    },

    audiences: {
      geo: "España, excluyendo Canarias",
      age: "≈ 24–45 años",
      interestSegments: [
        "Maternidad / paternidad / familia",
        "Padres con bebés (0–12 meses)",
        "Padres con bebés mayores / niños pequeños",
        "Listas de clientes (Customer Match / CRM)",
        "Audiencias personalizadas y remarketing web",
        "Añadieron al carrito y no compraron",
        "Compradores recurrentes no suscriptores",
        "No conocen packs personalizados específicos"
      ],
      demographicSkew: "Dentro del alcance de las campañas activas, el grupo 35–44 años (mujeres y hombres) es el que concentra más impactos, por delante del resto de franjas de edad.",
      caveat: "Importante: estos intereses son los criterios de segmentación configurados en los conjuntos de anuncios (a quién decidimos apuntar), no un dato verificado de los intereses reales de cada persona alcanzada. Meta no expone qué intereses reales tiene cada usuario impactado, solo agregados de segmentación y edad/género. Los exports proporcionados no incluyen un desglose demográfico o por intereses con métricas de rendimiento asociadas — por lo que no es posible cuantificar aquí el peso exacto (% de alcance o gasto) de cada segmento."
    },

    strategyEvolution: [
      { phase: "Fases iniciales (histórico de cuenta)", detail: "El histórico de nombres de campaña (158 campañas registradas en la cuenta) muestra una evolución por fases numeradas — 0.FASE, 1.FASE, 2.FASE, 3.FASE, 4.FASE — que combinaban prospección por intereses/broad/lookalike con retargeting progresivo (RRSS + Web) hasta la compra y fidelización (CLTV)." },
      { phase: "Consolidación ABO → estructura always-on", detail: "La cuenta ha migrado de decenas de campañas puntuales y tácticas (Black Friday, Navidad, sorteos, colaboraciones con agencias como TRIBOO) hacia dos campañas always-on (BOFU y MOFU) que concentran presupuesto y aprendizaje del algoritmo, reduciendo la fragmentación." },
      { phase: "Prioridad actual: suscripción + eficiencia", detail: "De las 158 campañas históricas, solo 2 están activas hoy y ambas apuntan a venta directa (BOFU) y captación cualificada (MOFU), en línea con el objetivo de negocio de aumentar usuarios suscritos y mantener el CPA bajo control." },
      { phase: "Más creatividades, menos frecuencia", detail: "El objetivo declarado es ampliar el volumen de creatividades para poder rotarlas con más frecuencia y bajar así la frecuencia media de impactos por usuario." }
    ],

    mofuStrategy: "MOFU combina paid media con contenido orgánico (recetas, tips, contenido educativo y utilidad) para construir audiencia cualificada que después madura hacia BOFU. El adset 'PROS - Recetas' (2.777€, 304 compras) es el ejemplo más claro: contenido de valor que también convierte.",
    bofuStrategy: "BOFU se mantiene centrado en suscripción y ventas directas, dando visibilidad a lanzamientos (Smilotes, Kids), promociones (Neverita, Cubiertos, 15%/25%) y productos. El caso Smilotes ilustra la lógica: la campaña de lanzamiento sigue activa semanas después del 14 de julio, no solo en el momento inicial.",

    frequency: {
      bofu: 25.71,
      mofu: 7.48,
      note: "La frecuencia de BOFU (25,7 impactos por persona en 59 días) es muy elevada — resultado de concentrar el 69% del presupuesto en un alcance comparativamente pequeño (418.044 personas) con remarketing always-on. MOFU, con un público más amplio y de prospección, mantiene una frecuencia mucho más sana (7,5). Los datos disponibles no incluyen una serie temporal día a día de frecuencia ni de CTR por creatividad, por lo que no se puede confirmar de forma cuantitativa si la fatiga creativa ya está afectando al rendimiento; el número de creatividades activas por adset tampoco está en el export. Se recomienda monitorizar frecuencia y CTR por adset en el propio Meta Ads Manager con detalle semanal."
    },

    subscriberGrowth: {
      pct: 7,
      source: "Shopify",
      note: "A nivel de suscriptores, según el informe de Shopify, se ha registrado un incremento del 7% respecto al periodo anterior."
    }
  },

  google: {
    period: "1 jul – 28 ago 2026",
    periodPrev: "3 may – 30 jun 2026",
    periodPrevNote: "El export de Google Ads compara con el periodo inmediatamente anterior de la misma duración (59 días), no con el mismo periodo de 2025 — ese es el dato que ofrece nativamente el informe descargado.",

    // Total: Cuenta (todo lo que tuvo actividad en el periodo, incluida actividad ya pausada / legacy)
    accountTotal: {
      spend: 17537.45, spendPrev: 18815.35,
      impressions: 3025677, impressionsPrev: 5709831,
      clicks: 49540, clicksPrev: 53994,
      ctr: 1.64, ctrPrev: 0.95,
      users: 948190, usersPrev: 2233127,
      conversions: 4701.73, conversionsPrev: 4544.77,
      value: 260208.26, valuePrev: 277746.00,
      cpa: 3.73, cpaPrev: 4.14,
      roas: 14.84, roasPrev: 14.76
    },

    // Total: Campañas filtradas = suma de las 8 campañas activas hoy
    currentStructureTotal: {
      spend: 10323.59, spendPrev: 8366.92,
      impressions: 1099325, impressionsPrev: 2061584,
      clicks: 39535, clicksPrev: 26241,
      conversions: 4411.79, conversionsPrev: 2273.62,
      value: 249515.15, valuePrev: 136336.02,
      roas: 24.17, roasPrev: 16.29
    },

    activeCampaigns: [
      { name: "ES | ESP | Search | Brand | Smileat", type: "Búsqueda", priority: "Brand", strategy: "ROAS objetivo", spend: 1298.48, impressions: 34731, clicks: 17336, ctr: 49.92, conversions: 2951.10, value: 174705.53, cpa: 0.44, roas: 134.55 },
      { name: "ES | PMÁX | Suscripción", type: "Rendimiento máximo", priority: "Suscripción", strategy: "ROAS objetivo", spend: 1750.16, impressions: 46209, clicks: 3697, ctr: 8.00, conversions: 406.07, value: 19031.69, cpa: 4.31, roas: 10.87 },
      { name: "ES | ESP | Search | Suscripción | Smileat", type: "Búsqueda", priority: "Suscripción", strategy: "ROAS objetivo", spend: 733.35, impressions: 15390, clicks: 1257, ctr: 8.17, conversions: 147.26, value: 6741.43, cpa: 4.98, roas: 9.19 },
      { name: "ES | DEMAND GEN | Suscripción", type: "Generación de demanda", priority: "Suscripción", strategy: "Maximizar conversiones", spend: 2035.53, impressions: 403784, clicks: 3453, ctr: 0.86, conversions: 31.84, value: 1510.61, cpa: 63.94, roas: 0.74 },
      { name: "ES | PMÁX | Productos", type: "Rendimiento máximo", priority: "Productos", strategy: "Maximizar valor de conversiones", spend: 1151.24, impressions: 242520, clicks: 4855, ctr: 2.00, conversions: 326.13, value: 15446.39, cpa: 3.53, roas: 13.42 },
      { name: "ES | PMÁX | Lanzamientos/Promos", type: "Rendimiento máximo", priority: "Lanzamientos / Promos", strategy: "ROAS objetivo", spend: 2449.71, impressions: 256507, clicks: 7484, ctr: 2.92, conversions: 544.38, value: 31824.02, cpa: 4.50, roas: 12.99 },
      { name: "ES | ESP | Display | RMKT Dinámico | 180_WEB", type: "Display", priority: "Remarketing", strategy: "Maximizar conversiones", spend: 490.15, impressions: 54022, clicks: 587, ctr: 1.09, conversions: 5.00, value: 255.48, cpa: 98.03, roas: 0.52 },
      { name: "ES - Demand Gen - SMILEAT KIDS", type: "Generación de demanda", priority: "Lanzamientos / Promos", strategy: "Maximizar conversiones", spend: 0, impressions: 46162, clicks: 866, ctr: 1.88, conversions: 0, value: 0, cpa: null, roas: null, launchNote: "Campaña de lanzamiento más reciente: genera awareness (46.162 impresiones, 866 clics) pero aún no registra conversiones atribuidas en la ventana del informe." }
    ],

    byType: [
      { type: "Búsqueda", spend: 2044.92, spendPrev: 2169.49, conversions: 3098.36, conversionsPrev: 2169.49, value: 181446.96, valuePrev: 130986.40, roas: 88.73, roasPrev: 60.38 },
      { type: "Rendimiento máximo", spend: 7224.34, spendPrev: 4962.54, conversions: 1456.52, conversionsPrev: 2297.47, value: 76885.21, valuePrev: 143279.05, roas: 10.64, roasPrev: 28.87 },
      { type: "Generación de demanda", spend: 2435.44, spendPrev: 6266.16, conversions: 31.84, conversionsPrev: 76.81, value: 1510.61, valuePrev: 3450.79, roas: 0.62, roasPrev: 0.55 },
      { type: "Display", spend: 490.15, spendPrev: 0, conversions: 5.00, conversionsPrev: 0, value: 255.48, valuePrev: 0, roas: 0.52, roasPrev: null },
      { type: "Vídeo", spend: 5326.20, spendPrev: null, conversions: 110.00, conversionsPrev: 0, value: 110.00, valuePrev: 0, roas: 0.02, roasPrev: null },
      { type: "Shopping", spend: 0, spendPrev: 24.51, conversions: 0, conversionsPrev: 1.00, value: 0, valuePrev: 29.76, roas: null, roasPrev: 1.21 }
    ],

    restructuring: {
      before: ["Creatividades sin actualizar", "Campañas antiguas de baja actividad", "Campañas con rendimiento decreciente (p. ej. Vídeo, sin conversiones)", "Estructura no alineada con las prioridades actuales del negocio"],
      after: ["1. Suscripción — Search, Performance Max y Demand Gen dedicados", "2. Brand — Search de marca, la campaña más eficiente de toda la cuenta (ROAS 134,6)", "3. Productos — Performance Max de catálogo", "4. Lanzamientos / Promos — Performance Max + Demand Gen para novedades (Kids)", "+ Remarketing dinámico en Display"]
    }
  },

  combined: {
    spend: 62852.65,
    revenue: 472554.85,
    roas: 7.52,
    metaShare: 72.1,
    googleShare: 27.9,
    metaCpa: 10.06,
    googleCpa: 3.73
  }
};
