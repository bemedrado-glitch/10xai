import type { Engine } from "@/components/EngineCard";

// ── Localization ────────────────────────────────────────────────
// Public site is trilingual (EN, PT-BR, ES). Every user-visible
// string is a Localized<string>; localizeEngine() flattens to a
// chosen locale at render time.

export type Locale = "en" | "pt" | "es";

export type Localized<T> = { en: T; pt: T; es: T };

const L = (en: string, pt: string, es: string): Localized<string> => ({ en, pt, es });
const LA = (en: string[], pt: string[], es: string[]): Localized<string[]> => ({ en, pt, es });

function pick<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.en;
}

// ── Types ───────────────────────────────────────────────────────

export type RoiInput = {
  key: string;
  label: string;
  unit: "hours" | "usd" | "percent" | "count";
  min: number;
  max: number;
  step: number;
  default: number;
};

export type RoiOutput = {
  key: string;
  label: string;
  format: "hours" | "usd" | "months" | "count";
};

type LocalizedRoiInput = Omit<RoiInput, "label"> & { label: Localized<string> };
type LocalizedRoiOutput = Omit<RoiOutput, "label"> & { label: Localized<string> };

export type EngineDetail = Engine & {
  slug: string;
  valueProp: string;
  longDesc: string;
  whoFor: string[];
  features: Array<{ title: string; desc: string }>;
  process: Array<{ week: string; deliverable: string }>;
  integrations?: string[];
  primaryCta?: { label: string; href: string };
  narrative: {
    problem: string;
    challenge: string;
    consequence: string;
    whyChange: string;
    whyNow: string;
    why10xai: string;
  };
  industries: Array<{ name: string; useCase: string; impact: string }>;
  roi: {
    inputs: RoiInput[];
    outputs: RoiOutput[];
  };
};

type RawEngine = {
  slug: string;
  iconKey: "lighthouse" | "sales" | "care" | "reach" | "mind" | "bid" | "bernie";
  name: Localized<string>;
  tag: Localized<string>;
  desc: Localized<string>;
  valueProp: Localized<string>;
  longDesc: Localized<string>;
  details: Localized<string[]>;
  bestFor: Localized<string>;
  anchor: Localized<string>;
  href?: string;
  whoFor: Localized<string[]>;
  features: Array<{ title: Localized<string>; desc: Localized<string> }>;
  process: Array<{ week: Localized<string>; deliverable: Localized<string> }>;
  integrations: string[]; // brand names — kept in source language
  primaryCta?: { label: Localized<string>; href: string };
  narrative: {
    problem: Localized<string>;
    challenge: Localized<string>;
    consequence: Localized<string>;
    whyChange: Localized<string>;
    whyNow: Localized<string>;
    why10xai: Localized<string>;
  };
  industries: Array<{
    name: Localized<string>;
    useCase: Localized<string>;
    impact: Localized<string>;
  }>;
  roi: {
    inputs: LocalizedRoiInput[];
    outputs: LocalizedRoiOutput[];
  };
  variant?: "default" | "concierge";
};

// ── Data — all 7 engines, fully localized ───────────────────────

const RAW_ENGINES: RawEngine[] = [
  {
    slug: "lighthouse",
    iconKey: "lighthouse",
    name: L("Lighthouse", "Lighthouse", "Lighthouse"),
    tag: L("Lead engine", "Motor de leads", "Motor de leads"),
    desc: L(
      "Find your ideal contacts by ICP. Enrich emails and LinkedIn. Auto-enroll into personalized cadences.",
      "Encontre os contatos ideais pelo ICP. Enriqueça e-mails e LinkedIn. Inscreva automaticamente em cadências personalizadas.",
      "Encuentra los contactos ideales por ICP. Enriquece e-mails y LinkedIn. Inscribe automáticamente en cadencias personalizadas."
    ),
    valueProp: L(
      "AI Sales Development Platform that turns an ICP definition into booked pipeline — contact discovery, enrichment, and multichannel cadence in one automated workflow.",
      "Plataforma de SDR com IA que transforma uma definição de ICP em pipeline agendado — descoberta de contatos, enriquecimento e cadência multicanal em um fluxo automatizado.",
      "Plataforma de SDR con IA que convierte una definición de ICP en pipeline agendado — descubrimiento de contactos, enriquecimiento y cadencia multicanal en un solo flujo automatizado."
    ),
    longDesc: L(
      "Lighthouse is the contact-to-cadence engine. You define who you want to reach — industry, title, geography. Lighthouse scans 50M+ verified contacts, filters by your ICP, enriches email deliverability and LinkedIn signals, and auto-enrolls qualified leads into a personalized multichannel cadence. Your reps wake up to replies, not to prospecting.",
      "Lighthouse é o motor de contato-para-cadência. Você define quem quer alcançar — setor, cargo, geografia. Lighthouse varre mais de 50M de contatos verificados, filtra pelo seu ICP, enriquece deliverability de e-mail e sinais do LinkedIn, e inscreve automaticamente leads qualificados em uma cadência multicanal personalizada. Seu time acorda com respostas, não com prospecção pela frente.",
      "Lighthouse es el motor de contacto-a-cadencia. Tú defines a quién quieres alcanzar — industria, cargo, geografía. Lighthouse escanea más de 50M de contactos verificados, filtra por tu ICP, enriquece la deliverability de e-mail y señales de LinkedIn, e inscribe automáticamente a leads calificados en una cadencia multicanal personalizada. Tu equipo despierta con respuestas, no con prospección por delante."
    ),
    details: LA(
      [
        "ICP-based contact discovery across 50M+ verified records",
        "Email deliverability verification and LinkedIn enrichment",
        "Auto-enrollment into personalized multichannel cadences",
      ],
      [
        "Descoberta de contatos por ICP em mais de 50M de registros verificados",
        "Verificação de deliverability de e-mail e enriquecimento via LinkedIn",
        "Inscrição automática em cadências multicanal personalizadas",
      ],
      [
        "Descubrimiento de contactos por ICP en más de 50M de registros verificados",
        "Verificación de deliverability de e-mail y enriquecimiento vía LinkedIn",
        "Inscripción automática en cadencias multicanal personalizadas",
      ]
    ),
    bestFor: L(
      "B2B operators and agencies targeting SMB decision-makers in defined verticals",
      "Operações B2B e agências que miram decisores de PMEs em verticais definidas",
      "Operadores B2B y agencias que apuntan a tomadores de decisión de PyMEs en verticales definidas"
    ),
    anchor: L("From $1,500 + $499/mo", "A partir de US$ 1.500 + US$ 499/mês", "Desde US$ 1.500 + US$ 499/mes"),
    href: "/lighthouse-demo",
    whoFor: LA(
      [
        "Sales-led teams who spend too much time on manual prospecting",
        "Agencies that need to generate pipeline for multiple clients simultaneously",
        "Operators entering a new vertical or geography and need qualified contacts fast",
        "Anyone replacing a full-time SDR with an always-on AI pipeline engine",
      ],
      [
        "Times sales-led que gastam tempo demais com prospecção manual",
        "Agências que precisam gerar pipeline para vários clientes ao mesmo tempo",
        "Operadores entrando em uma nova vertical ou geografia e precisando de contatos qualificados rápido",
        "Quem está substituindo um SDR full-time por um motor de pipeline com IA sempre ligado",
      ],
      [
        "Equipos comerciales que gastan demasiado tiempo en prospección manual",
        "Agencias que necesitan generar pipeline para múltiples clientes simultáneamente",
        "Operadores entrando a una nueva vertical o geografía y necesitan contactos calificados rápido",
        "Cualquiera que reemplaza a un SDR full-time con un motor de pipeline con IA siempre encendido",
      ]
    ),
    features: [
      {
        title: L("ICP-driven discovery", "Descoberta orientada por ICP", "Descubrimiento orientado por ICP"),
        desc: L(
          "Define industry, job title, location, and company size. Lighthouse scans verified contact databases and surfaces only the leads that match your exact criteria.",
          "Defina setor, cargo, localização e tamanho da empresa. Lighthouse varre bases de contatos verificadas e mostra apenas os leads que casam com seus critérios exatos.",
          "Define industria, cargo, ubicación y tamaño de empresa. Lighthouse escanea bases de contactos verificadas y muestra solo los leads que coinciden con tus criterios exactos."
        ),
      },
      {
        title: L("Deep enrichment", "Enriquecimento profundo", "Enriquecimiento profundo"),
        desc: L(
          "Every contact gets email deliverability verification, LinkedIn profile enrichment, and intent signal scoring — so every touch lands on a real, reachable decision-maker.",
          "Cada contato recebe verificação de deliverability, enriquecimento do perfil do LinkedIn e scoring de sinais de intenção — para que cada toque caia em um decisor real e alcançável.",
          "Cada contacto recibe verificación de deliverability, enriquecimiento del perfil de LinkedIn y scoring de señales de intención — para que cada toque caiga en un tomador de decisión real y alcanzable."
        ),
      },
      {
        title: L(
          "Personalized cadence enrollment",
          "Inscrição em cadência personalizada",
          "Inscripción en cadencia personalizada"
        ),
        desc: L(
          "Contacts are auto-enrolled into multichannel cadences (email, LinkedIn, WhatsApp) tailored to their persona, industry, and signal. Each touch is personalized — not templated.",
          "Contatos são inscritos automaticamente em cadências multicanal (e-mail, LinkedIn, WhatsApp) feitas sob medida para a persona, o setor e o sinal. Cada toque é personalizado — não um template.",
          "Los contactos se inscriben automáticamente en cadencias multicanal (e-mail, LinkedIn, WhatsApp) hechas a medida para la persona, la industria y la señal. Cada toque es personalizado — no un template."
        ),
      },
      {
        title: L("Compliant by design", "Compliance por design", "Cumplimiento por diseño"),
        desc: L(
          "CAN-SPAM, LGPD, and regional outreach laws baked in. Opt-out one-click. Volume-throttled to protect sender reputation.",
          "CAN-SPAM, LGPD e leis regionais de outbound já embarcadas. Descadastro com um clique. Volume controlado para proteger a reputação do remetente.",
          "CAN-SPAM, LGPD y leyes regionales de outbound ya integradas. Baja con un clic. Volumen controlado para proteger la reputación del remitente."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1", "Semana 1", "Semana 1"),
        deliverable: L(
          "Define ICP, configure filters, pull first batch of 100–200 qualified contacts, draft cadence voice.",
          "Definir ICP, configurar filtros, puxar a primeira leva de 100–200 contatos qualificados, redigir a voz da cadência.",
          "Definir ICP, configurar filtros, sacar el primer lote de 100–200 contactos calificados, redactar la voz de la cadencia."
        ),
      },
      {
        week: L("Week 2", "Semana 2", "Semana 2"),
        deliverable: L(
          "Enrich contacts, QA enrichment output, launch first cadence batch across all channels.",
          "Enriquecer contatos, QA do output, lançar a primeira leva de cadência em todos os canais.",
          "Enriquecer contactos, QA del output, lanzar el primer lote de cadencia en todos los canales."
        ),
      },
      {
        week: L("Week 3", "Semana 3", "Semana 3"),
        deliverable: L(
          "Triage replies, book discovery calls, refine targeting based on reply patterns.",
          "Triagem de respostas, agendar discovery calls, refinar targeting com base nos padrões de resposta.",
          "Triaje de respuestas, agendar discovery calls, refinar targeting según los patrones de respuesta."
        ),
      },
      {
        week: L("Week 4", "Semana 4", "Semana 4"),
        deliverable: L(
          "Measure: open rate, reply rate, call rate. Tune cadence + ICP for next cohort.",
          "Medir: taxa de abertura, taxa de resposta, taxa de call. Ajustar cadência + ICP para a próxima cohort.",
          "Medir: tasa de apertura, tasa de respuesta, tasa de call. Ajustar cadencia + ICP para la próxima cohorte."
        ),
      },
    ],
    integrations: [
      "LinkedIn Sales Navigator",
      "Apollo.io",
      "Resend",
      "Cal.com",
      "WhatsApp Business",
      "Claude (Anthropic)",
    ],
    primaryCta: {
      label: L("Try the live demo", "Testar a demo ao vivo", "Probar la demo en vivo"),
      href: "/lighthouse-demo",
    },
    narrative: {
      problem: L(
        "Finding the right contacts is the most expensive problem in B2B sales. The average SDR spends 40–60% of their time prospecting instead of selling — and most of that time produces nothing billable.",
        "Achar os contatos certos é o problema mais caro nas vendas B2B. Um SDR médio passa 40–60% do tempo prospectando em vez de vender — e a maior parte desse tempo não vira nada faturável.",
        "Encontrar los contactos correctos es el problema más caro en ventas B2B. Un SDR promedio pasa 40–60% de su tiempo prospectando en vez de vender — y la mayor parte de ese tiempo no se convierte en nada facturable."
      ),
      challenge: L(
        "Manual prospecting tools require constant configuration, data goes stale in weeks, and none of them connect discovery to outreach without a human doing every step in between.",
        "Ferramentas manuais de prospecção exigem configuração constante, os dados envelhecem em semanas e nenhuma conecta descoberta a outbound sem um humano fazendo cada passo no meio.",
        "Las herramientas manuales de prospección exigen configuración constante, los datos envejecen en semanas y ninguna conecta descubrimiento a outbound sin un humano haciendo cada paso intermedio."
      ),
      consequence: L(
        "Your pipeline depends on people showing up every morning and grinding through spreadsheets. When they leave — or get distracted — pipeline dries up. When pipeline dries, everything downstream suffers: hiring freezes, burn climbs, and deals get discounted.",
        "Seu pipeline depende de pessoas aparecendo toda manhã para encarar planilhas. Quando saem — ou se distraem — o pipeline seca. Quando seca, tudo que vem depois sofre: contratações são congeladas, o burn sobe e os deals viram desconto.",
        "Tu pipeline depende de personas que aparecen cada mañana a encarar planillas. Cuando se van — o se distraen — el pipeline se seca. Cuando se seca, todo lo que viene después sufre: contrataciones congeladas, el burn sube y los deals se descuentan."
      ),
      whyChange: L(
        "AI can do the full prospecting cycle continuously, at scale, without burnout. Every hour your team spends on ICP research is an hour not spent on closing. The math only gets worse as you scale.",
        "A IA pode fazer o ciclo inteiro de prospecção continuamente, em escala, sem burnout. Cada hora que seu time gasta com pesquisa de ICP é uma hora a menos fechando. A conta só piora à medida que você cresce.",
        "La IA puede hacer el ciclo entero de prospección continuamente, a escala, sin burnout. Cada hora que tu equipo gasta en investigación de ICP es una hora menos cerrando. La cuenta solo empeora a medida que escalas."
      ),
      whyNow: L(
        "Contact databases now cover 50M+ verified records. AI enrichment can verify emails and pull LinkedIn context in milliseconds. The cost to build this full stack dropped 90% in 18 months — what required a 3-person team in 2022 runs on one agent today.",
        "As bases de contatos hoje cobrem mais de 50M de registros verificados. O enriquecimento por IA verifica e-mails e puxa contexto do LinkedIn em milissegundos. O custo de montar essa stack inteira caiu 90% em 18 meses — o que exigia um time de 3 em 2022 roda em um agente hoje.",
        "Las bases de contactos hoy cubren más de 50M de registros verificados. El enriquecimiento con IA verifica e-mails y trae contexto de LinkedIn en milisegundos. El costo de armar este stack completo cayó 90% en 18 meses — lo que requería un equipo de 3 en 2022 corre en un solo agente hoy."
      ),
      why10xai: L(
        "We build the system once and it runs while you close. You define the ICP, we wire the discovery, enrichment, and cadence, and you wake up to a pipeline that didn't exist the day before — without adding a single headcount.",
        "Construímos o sistema uma vez e ele roda enquanto você fecha. Você define o ICP, a gente conecta descoberta, enriquecimento e cadência, e você acorda com um pipeline que não existia no dia anterior — sem somar um único headcount.",
        "Construimos el sistema una vez y corre mientras tú cierras. Tú defines el ICP, nosotros conectamos descubrimiento, enriquecimiento y cadencia, y tú despiertas con un pipeline que no existía el día anterior — sin sumar un solo headcount."
      ),
    },
    industries: [
      {
        name: L("Restaurants & Hospitality", "Restaurantes & Hospitalidade", "Restaurantes y Hospitalidad"),
        useCase: L(
          "Target GMs and owners of independent restaurants expanding to second locations or catering operations.",
          "Mire em GMs e donos de restaurantes independentes que estão abrindo a segunda unidade ou operações de catering.",
          "Apunta a GMs y dueños de restaurantes independientes que están abriendo una segunda unidad u operaciones de catering."
        ),
        impact: L(
          "First reply in 3–5 days on average for hospitality ICPs",
          "Primeira resposta em 3–5 dias em média para ICPs de hospitalidade",
          "Primera respuesta en 3–5 días en promedio para ICPs de hospitalidad"
        ),
      },
      {
        name: L(
          "Healthcare & Medtech",
          "Saúde & Medtech",
          "Salud & Medtech"
        ),
        useCase: L(
          "Reach practice administrators and procurement leads at clinics adopting new technology or changing EHR systems.",
          "Alcance administradores e líderes de compras em clínicas adotando novas tecnologias ou trocando de sistema de prontuário.",
          "Llega a administradores y líderes de compras en clínicas que adoptan nueva tecnología o cambian de sistema de historia clínica."
        ),
        impact: L(
          "High-intent signals from hiring + tech-stack data",
          "Sinais de alta intenção a partir de dados de hiring + tech stack",
          "Señales de alta intención a partir de datos de hiring + tech stack"
        ),
      },
      {
        name: L("Professional Services", "Serviços profissionais", "Servicios profesionales"),
        useCase: L(
          "Find decision-makers at law firms, accounting practices, and consulting shops with no CRM or outdated outreach.",
          "Encontre decisores em escritórios de advocacia, contabilidade e consultoria sem CRM ou com outbound desatualizado.",
          "Encuentra tomadores de decisión en estudios jurídicos, contables y consultorías sin CRM o con outbound desactualizado."
        ),
        impact: L(
          "Email + LinkedIn enrichment reduces bounce rate below 5%",
          "Enriquecimento de e-mail + LinkedIn reduz bounce abaixo de 5%",
          "Enriquecimiento de e-mail + LinkedIn reduce el bounce por debajo del 5%"
        ),
      },
      {
        name: L("Retail & E-commerce", "Varejo & E-commerce", "Retail y E-commerce"),
        useCase: L(
          "Target buyers and operations leads at growing regional retail chains with no centralized vendor outreach process.",
          "Mire em compradores e líderes de operações em redes regionais em crescimento sem processo centralizado de outbound a fornecedores.",
          "Apunta a compradores y líderes de operaciones en cadenas regionales en crecimiento sin proceso centralizado de outbound a proveedores."
        ),
        impact: L(
          "Social signals (hiring, funding) surface warm leads daily",
          "Sinais sociais (hiring, funding) expõem leads quentes diariamente",
          "Señales sociales (hiring, funding) exponen leads calientes a diario"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "hoursPerWeek",
          label: L(
            "Hours/week spent on manual prospecting",
            "Horas/semana em prospecção manual",
            "Horas/semana en prospección manual"
          ),
          unit: "hours",
          min: 2,
          max: 40,
          step: 1,
          default: 10,
        },
        {
          key: "reps",
          label: L("Number of people prospecting", "Pessoas prospectando", "Personas prospectando"),
          unit: "count",
          min: 1,
          max: 10,
          step: 1,
          default: 1,
        },
        {
          key: "dealValue",
          label: L("Average deal value", "Valor médio do deal", "Valor promedio del deal"),
          unit: "usd",
          min: 500,
          max: 100000,
          step: 500,
          default: 5000,
        },
      ],
      outputs: [
        {
          key: "hoursSaved",
          label: L("Hours saved per month", "Horas economizadas por mês", "Horas ahorradas por mes"),
          format: "hours",
        },
        {
          key: "pipelineAdded",
          label: L(
            "Estimated new pipeline / month",
            "Pipeline novo estimado / mês",
            "Pipeline nuevo estimado / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 2 — Sales
  {
    slug: "sales",
    iconKey: "sales",
    name: L("Sales Engine", "Motor de vendas", "Motor de ventas"),
    tag: L("AI SDR", "SDR com IA", "SDR con IA"),
    desc: L(
      "Autonomous outbound that books meetings while you sleep.",
      "Outbound autônomo que agenda reuniões enquanto você dorme.",
      "Outbound autónomo que agenda reuniones mientras duermes."
    ),
    valueProp: L(
      "An AI SDR built around your ICP, your CRM, your tone. Books qualified meetings into your calendar without adding headcount.",
      "Um SDR com IA construído em torno do seu ICP, do seu CRM e da sua voz. Agenda reuniões qualificadas no seu calendário sem somar headcount.",
      "Un SDR con IA construido en torno a tu ICP, tu CRM y tu voz. Agenda reuniones calificadas en tu calendario sin sumar headcount."
    ),
    longDesc: L(
      "Most SMBs can't afford an SDR team but still need pipeline. Sales Engine fills the gap with a 24/7 outbound agent that runs multichannel cadences, adapts to intent signals, and books only qualified meetings. We tune it to your ICP, your tone of voice, and your CRM — not a generic template.",
      "A maioria das PMEs não pode bancar um time de SDRs, mas precisa de pipeline. O Motor de Vendas preenche essa lacuna com um agente de outbound 24/7 que roda cadências multicanal, se adapta a sinais de intenção e agenda apenas reuniões qualificadas. A gente afina para o seu ICP, a sua voz e o seu CRM — não um template genérico.",
      "La mayoría de PyMEs no puede pagar un equipo de SDRs, pero necesita pipeline. El Motor de Ventas llena ese vacío con un agente de outbound 24/7 que corre cadencias multicanal, se adapta a señales de intención y agenda solo reuniones calificadas. Lo afinamos a tu ICP, tu voz y tu CRM — no un template genérico."
    ),
    details: LA(
      [
        "Multichannel cadences across email, LinkedIn, and WhatsApp",
        "Daily-fresh prospect lists from real-time intent signals",
        "Books qualified meetings directly into your calendar",
      ],
      [
        "Cadências multicanal por e-mail, LinkedIn e WhatsApp",
        "Listas de prospects atualizadas diariamente a partir de sinais de intenção em tempo real",
        "Agenda reuniões qualificadas direto no seu calendário",
      ],
      [
        "Cadencias multicanal por e-mail, LinkedIn y WhatsApp",
        "Listas de prospects actualizadas diariamente desde señales de intención en tiempo real",
        "Agenda reuniones calificadas directo en tu calendario",
      ]
    ),
    bestFor: L(
      "B2B SaaS, agencies, consulting firms with sales gaps",
      "B2B SaaS, agências e consultorias com lacunas de vendas",
      "B2B SaaS, agencias y consultoras con brechas de ventas"
    ),
    anchor: L(
      "From $1,500 + $499/mo",
      "A partir de US$ 1.500 + US$ 499/mês",
      "Desde US$ 1.500 + US$ 499/mes"
    ),
    whoFor: LA(
      [
        "B2B service firms with no dedicated SDR function",
        "Founders running their own outbound and losing focus on closing",
        "Mid-market sales teams that want to expand coverage without hiring",
        "Operators tired of expensive outreach tools that don't ship results",
      ],
      [
        "Empresas de serviço B2B sem uma função de SDR dedicada",
        "Founders fazendo o próprio outbound e perdendo o foco do fechamento",
        "Times de mid-market que querem expandir cobertura sem contratar",
        "Operadores cansados de ferramentas caras de outbound que não entregam",
      ],
      [
        "Empresas de servicios B2B sin función de SDR dedicada",
        "Founders haciendo su propio outbound y perdiendo foco del cierre",
        "Equipos de mid-market que quieren expandir cobertura sin contratar",
        "Operadores cansados de herramientas caras de outbound que no entregan",
      ]
    ),
    features: [
      {
        title: L("Intent-driven targeting", "Targeting orientado por intenção", "Targeting orientado por intención"),
        desc: L(
          "We build daily-fresh prospect lists from public signals — funding rounds, leadership hires, tech-stack changes, hiring posts.",
          "Montamos listas atualizadas todo dia a partir de sinais públicos — rodadas de captação, contratações de liderança, mudanças de tech stack, vagas abertas.",
          "Armamos listas actualizadas a diario desde señales públicas — rondas de funding, contrataciones de liderazgo, cambios de tech stack, vacantes abiertas."
        ),
      },
      {
        title: L("Multichannel orchestration", "Orquestração multicanal", "Orquestación multicanal"),
        desc: L(
          "Email, LinkedIn, WhatsApp, and phone — every touch picks up where the last left off. No duplicate outreach, no missed handoffs.",
          "E-mail, LinkedIn, WhatsApp e telefone — cada toque continua de onde o anterior parou. Sem duplicidade, sem hand-off perdido.",
          "E-mail, LinkedIn, WhatsApp y teléfono — cada toque continúa donde quedó el anterior. Sin duplicidad, sin hand-off perdido."
        ),
      },
      {
        title: L("Qualification before booking", "Qualificação antes do booking", "Calificación antes del booking"),
        desc: L(
          "Bernie-style qualification logic ensures the meetings that hit your calendar are real opportunities — not noise.",
          "Lógica de qualificação no estilo Bernie garante que as reuniões que entram no seu calendário sejam oportunidades reais — não ruído.",
          "Lógica de calificación al estilo Bernie garantiza que las reuniones que entran a tu calendario sean oportunidades reales — no ruido."
        ),
      },
      {
        title: L("Brand voice matters", "A voz da marca importa", "La voz de la marca importa"),
        desc: L(
          "We train the agent on your past best-performing emails, LinkedIn posts, and call transcripts. Outreach reads like you, not like a bot.",
          "Treinamos o agente nos seus melhores e-mails, posts de LinkedIn e transcrições de calls. O outbound lê como você, não como um bot.",
          "Entrenamos al agente con tus mejores e-mails, posts de LinkedIn y transcripciones de calls. El outbound lee como tú, no como un bot."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1", "Semana 1", "Semana 1"),
        deliverable: L(
          "ICP workshop, voice training, CRM integration, baseline metrics captured.",
          "Workshop de ICP, treino de voz, integração com CRM, baseline de métricas capturado.",
          "Taller de ICP, entrenamiento de voz, integración con CRM, baseline de métricas capturado."
        ),
      },
      {
        week: L("Week 2", "Semana 2", "Semana 2"),
        deliverable: L(
          "Cadences drafted, prospect lists curated, agent deployed in shadow mode.",
          "Cadências redigidas, listas de prospects curadas, agente em shadow mode.",
          "Cadencias redactadas, listas de prospects curadas, agente en shadow mode."
        ),
      },
      {
        week: L("Week 3", "Semana 3", "Semana 3"),
        deliverable: L(
          "Live outbound with 50–100 prospects/week. Real-time monitoring.",
          "Outbound ao vivo com 50–100 prospects/semana. Monitoramento em tempo real.",
          "Outbound en vivo con 50–100 prospects/semana. Monitoreo en tiempo real."
        ),
      },
      {
        week: L("Week 4", "Semana 4", "Semana 4"),
        deliverable: L(
          "First-meeting baseline measured. Tuning. Scale-up plan for month 2.",
          "Baseline da primeira reunião medido. Ajuste fino. Plano de scale-up para o mês 2.",
          "Baseline de la primera reunión medido. Ajuste fino. Plan de scale-up para el mes 2."
        ),
      },
    ],
    integrations: [
      "HubSpot",
      "Pipedrive",
      "Salesforce",
      "LinkedIn Sales Navigator",
      "Cal.com",
      "WhatsApp Business",
      "Apollo",
      "Clay",
    ],
    narrative: {
      problem: L(
        "Most SMBs can't close pipeline they don't have. But building and running a real SDR function costs $60–80k/year per rep — plus ramp time, management overhead, and the near-certain turnover within 18 months.",
        "A maioria das PMEs não fecha pipeline que não tem. Só que montar e manter uma função de SDR real custa US$ 60–80 mil/ano por rep — mais ramp time, gestão e o turnover quase certo em 18 meses.",
        "La mayoría de PyMEs no cierra pipeline que no tiene. Pero armar y mantener una función de SDR real cuesta US$ 60–80 mil/año por rep — más ramp time, gestión y la rotación casi segura en 18 meses."
      ),
      challenge: L(
        "Hiring one SDR is expensive. Keeping them motivated is harder. Training them to your ICP and tone takes months. And when they leave, you start from zero — again.",
        "Contratar um SDR é caro. Manter ele motivado é mais difícil. Treinar pro seu ICP e voz leva meses. E quando ele sai, você volta para o zero — de novo.",
        "Contratar un SDR es caro. Mantenerlo motivado es más difícil. Entrenarlo en tu ICP y voz lleva meses. Y cuando se va, vuelves a cero — otra vez."
      ),
      consequence: L(
        "Without a reliable pipeline engine, growth becomes lumpy and referral-dependent. Founders end up doing SDR work themselves at CEO hourly rates, which means they're not closing, not building, and not sleeping.",
        "Sem um motor de pipeline confiável, o crescimento vira algo aos solavancos e dependente de indicação. Founders acabam fazendo o trabalho de SDR na hora-CEO, ou seja, não fecham, não constroem e não dormem.",
        "Sin un motor de pipeline confiable, el crecimiento se vuelve a saltos y dependiente del referido. Los founders terminan haciendo trabajo de SDR a tarifa-CEO, o sea, no cierran, no construyen y no duermen."
      ),
      whyChange: L(
        "AI SDRs don't call in sick, don't lose motivation, and don't need 90-day ramp time. They run the same cadence quality on Tuesday morning as Friday afternoon — and they get better as you tune them.",
        "SDRs com IA não pegam atestado, não perdem motivação e não precisam de 90 dias de ramp. Rodam a mesma qualidade de cadência terça de manhã ou sexta de tarde — e melhoram à medida que você ajusta.",
        "Los SDRs con IA no piden licencia, no pierden motivación y no necesitan 90 días de ramp. Corren la misma calidad de cadencia martes de mañana o viernes de tarde — y mejoran a medida que ajustas."
      ),
      whyNow: L(
        "Multichannel outreach tooling (email + LinkedIn + WhatsApp) is now commoditized. LLMs can personalize at scale with genuine quality. The cost of running an autonomous AI SDR at competitive quality has dropped to a fraction of one human hire.",
        "Ferramentas de outbound multicanal (e-mail + LinkedIn + WhatsApp) viraram commodity. LLMs personalizam em escala com qualidade real. O custo de rodar um SDR com IA autônomo competitivo caiu para uma fração de uma única contratação humana.",
        "Las herramientas de outbound multicanal (e-mail + LinkedIn + WhatsApp) ya son commodity. Los LLMs personalizan a escala con calidad real. El costo de correr un SDR con IA autónomo competitivo cayó a una fracción de una sola contratación humana."
      ),
      why10xai: L(
        "We don't hand you a tool — we run the ICP workshop, train the voice, wire the CRM, and manage the cadences. The first qualified meeting typically lands in week 3. We measure pipeline created, not software licenses deployed.",
        "A gente não te entrega uma ferramenta — a gente conduz o workshop de ICP, treina a voz, integra o CRM e gerencia as cadências. A primeira reunião qualificada costuma cair na semana 3. Medimos pipeline gerado, não licenças deployadas.",
        "Nosotros no te entregamos una herramienta — corremos el taller de ICP, entrenamos la voz, integramos el CRM y gestionamos las cadencias. La primera reunión calificada suele caer en la semana 3. Medimos pipeline generado, no licencias deployadas."
      ),
    },
    industries: [
      {
        name: L("B2B SaaS", "B2B SaaS", "B2B SaaS"),
        useCase: L(
          "Target VP Sales, RevOps, and CTO personas at companies in a defined tech stack or funding stage.",
          "Mire em VP de Vendas, RevOps e CTO em empresas com tech stack ou estágio de funding definidos.",
          "Apunta a VP de Ventas, RevOps y CTO en empresas con tech stack o etapa de funding definidos."
        ),
        impact: L(
          "Intent signal-based targeting cuts noise by 60%+",
          "Targeting por sinal de intenção corta o ruído em 60%+",
          "Targeting por señal de intención recorta el ruido en 60%+"
        ),
      },
      {
        name: L("Professional Services", "Serviços profissionais", "Servicios profesionales"),
        useCase: L(
          "Agencies and consultancies building outbound into new verticals where referrals aren't enough.",
          "Agências e consultorias construindo outbound em novas verticais onde indicação já não basta.",
          "Agencias y consultoras construyendo outbound en nuevas verticales donde la referencia ya no alcanza."
        ),
        impact: L(
          "Multichannel cadences generate 2–4× more replies than email alone",
          "Cadências multicanal geram 2–4× mais respostas que apenas e-mail",
          "Las cadencias multicanal generan 2–4× más respuestas que solo e-mail"
        ),
      },
      {
        name: L("Healthcare Technology", "Tecnologia em saúde", "Tecnología en salud"),
        useCase: L(
          "Reach clinical administrators and procurement leads with warm, HIPAA-aware outreach sequences.",
          "Alcance administradores clínicos e líderes de compras com sequências quentes e HIPAA-aware.",
          "Llega a administradores clínicos y líderes de compras con secuencias cálidas y HIPAA-aware."
        ),
        impact: L(
          "Compliance-ready templates built into every cadence",
          "Templates compliance-ready embarcados em toda cadência",
          "Templates compliance-ready integrados en toda cadencia"
        ),
      },
      {
        name: L("Financial Services", "Serviços financeiros", "Servicios financieros"),
        useCase: L(
          "Connect wealth managers, fintech founders, and CFOs with context-rich, regulation-aware messaging.",
          "Conecte gestores de patrimônio, founders de fintech e CFOs com mensagens contextualizadas e regulatórias.",
          "Conecta a gestores de patrimonio, founders de fintech y CFOs con mensajes contextualizados y regulatorios."
        ),
        impact: L(
          "Industry-specific personalization drives higher open rates",
          "Personalização específica do setor aumenta a taxa de abertura",
          "La personalización específica del sector eleva la tasa de apertura"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "meetingsPerMonth",
          label: L(
            "Qualified meetings / month today",
            "Reuniões qualificadas / mês hoje",
            "Reuniones calificadas / mes hoy"
          ),
          unit: "count",
          min: 0,
          max: 30,
          step: 1,
          default: 5,
        },
        {
          key: "dealValue",
          label: L("Average deal value", "Valor médio do deal", "Valor promedio del deal"),
          unit: "usd",
          min: 1000,
          max: 250000,
          step: 1000,
          default: 10000,
        },
        {
          key: "closeRate",
          label: L("Current close rate", "Taxa de fechamento atual", "Tasa de cierre actual"),
          unit: "percent",
          min: 5,
          max: 60,
          step: 1,
          default: 20,
        },
      ],
      outputs: [
        {
          key: "additionalMeetings",
          label: L(
            "Additional meetings / month",
            "Reuniões adicionais / mês",
            "Reuniones adicionales / mes"
          ),
          format: "count",
        },
        {
          key: "revenueImpact",
          label: L(
            "Estimated revenue impact / month",
            "Impacto estimado de receita / mês",
            "Impacto estimado de ingresos / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 3 — Care
  {
    slug: "care",
    iconKey: "care",
    name: L("Care Engine", "Motor de atendimento", "Motor de atención"),
    tag: L("Customer Success", "Customer Success", "Customer Success"),
    desc: L(
      "Real-time AI customer service, booking, and AI-powered review responses.",
      "Atendimento ao cliente em tempo real com IA, agendamento e respostas a avaliações com IA.",
      "Atención al cliente en tiempo real con IA, agendamiento y respuestas a reseñas con IA."
    ),
    valueProp: L(
      "A 24/7 customer-service operating system across web, WhatsApp, and email — plus booking automation and AI-powered review responses.",
      "Um sistema operacional de atendimento 24/7 em web, WhatsApp e e-mail — mais automação de agendamento e respostas com IA a avaliações.",
      "Un sistema operativo de atención 24/7 en web, WhatsApp y e-mail — más automatización de agendamiento y respuestas con IA a reseñas."
    ),
    longDesc: L(
      "Care Engine is what happens when an AI agent actually understands your business, your hours, your services, and your tone. It triages tier-1 support, books appointments, recovers abandoned carts, and responds to public reviews — all while routing the genuinely hard issues to a human.",
      "O Motor de Atendimento é o que acontece quando um agente de IA realmente entende seu negócio, seus horários, seus serviços e a sua voz. Ele faz triagem do tier-1, agenda atendimentos, recupera carrinhos e responde a avaliações públicas — sempre roteando o que é realmente difícil para um humano.",
      "El Motor de Atención es lo que pasa cuando un agente de IA realmente entiende tu negocio, tus horarios, tus servicios y tu voz. Hace triaje del tier-1, agenda citas, recupera carritos y responde a reseñas públicas — siempre derivando lo realmente difícil a un humano."
    ),
    details: LA(
      [
        "24/7 AI agent handles tier-1 support across web + WhatsApp + email",
        "Booking automation tied to your calendar and team availability",
        "AI review responses that protect and grow your reputation",
      ],
      [
        "Agente de IA 24/7 cuida do tier-1 em web + WhatsApp + e-mail",
        "Automação de agendamento ligada ao seu calendário e disponibilidade do time",
        "Respostas com IA a avaliações que protegem e expandem a sua reputação",
      ],
      [
        "Agente de IA 24/7 cubre el tier-1 en web + WhatsApp + e-mail",
        "Automatización de agendamiento ligada a tu calendario y disponibilidad del equipo",
        "Respuestas con IA a reseñas que protegen y expanden tu reputación",
      ]
    ),
    bestFor: L(
      "Service businesses with customer-volume pressure",
      "Negócios de serviço sob pressão de volume de clientes",
      "Negocios de servicio bajo presión de volumen de clientes"
    ),
    anchor: L(
      "From $1,500 + $499/mo",
      "A partir de US$ 1.500 + US$ 499/mês",
      "Desde US$ 1.500 + US$ 499/mes"
    ),
    whoFor: LA(
      [
        "Clinics, salons, and service shops getting buried in WhatsApp",
        "E-commerce brands with high-volume tier-1 inquiries",
        "Businesses with a Google review profile they're not actively responding to",
        "Owner-operators losing evenings to customer messaging",
      ],
      [
        "Clínicas, salões e oficinas soterrados de WhatsApp",
        "Marcas de e-commerce com alto volume de tier-1",
        "Negócios com perfil no Google que não estão respondendo às avaliações",
        "Donos-operadores perdendo o fim do dia respondendo cliente",
      ],
      [
        "Clínicas, salones y talleres ahogados en WhatsApp",
        "Marcas de e-commerce con alto volumen de tier-1",
        "Negocios con perfil en Google que no están respondiendo reseñas",
        "Dueños-operadores perdiendo las noches respondiendo a clientes",
      ]
    ),
    features: [
      {
        title: L(
          "Real-time multichannel agent",
          "Agente multicanal em tempo real",
          "Agente multicanal en tiempo real"
        ),
        desc: L(
          "Same agent across your website chat, WhatsApp inbox, and email. Context follows the customer across channels.",
          "O mesmo agente no chat do site, no WhatsApp e no e-mail. O contexto segue o cliente entre canais.",
          "El mismo agente en el chat del sitio, en WhatsApp y en e-mail. El contexto sigue al cliente entre canales."
        ),
      },
      {
        title: L("Smart booking", "Agendamento inteligente", "Agendamiento inteligente"),
        desc: L(
          "Live calendar sync, rules for staff and service durations, deposit collection, automated reminders, no-show recovery.",
          "Sync com calendário, regras de equipe e duração de serviço, cobrança de sinal, lembretes automáticos, recuperação de no-show.",
          "Sync con calendario, reglas de equipo y duración de servicio, cobro de seña, recordatorios automáticos, recuperación de no-show."
        ),
      },
      {
        title: L(
          "AI review responses",
          "Respostas com IA a avaliações",
          "Respuestas con IA a reseñas"
        ),
        desc: L(
          "Drafts personalized responses to every Google review on autopilot — human reviews the queue once a week, then publishes.",
          "Rascunha respostas personalizadas para toda avaliação do Google no piloto automático — humano revisa a fila uma vez por semana e publica.",
          "Borradores de respuestas personalizadas a toda reseña de Google en piloto automático — humano revisa la cola una vez por semana y publica."
        ),
      },
      {
        title: L(
          "Human escalation by design",
          "Escalonamento humano por design",
          "Escalamiento humano por diseño"
        ),
        desc: L(
          "Hard rules: refunds, complaints, anything price-changing — the agent collects context and routes to a human within minutes.",
          "Regras duras: reembolsos, reclamações, qualquer mudança de preço — o agente coleta contexto e rotea para humano em minutos.",
          "Reglas duras: reembolsos, quejas, cualquier cambio de precio — el agente recoge contexto y deriva a humano en minutos."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1", "Semana 1", "Semana 1"),
        deliverable: L(
          "Service catalog + FAQ + escalation rules captured. Calendar + WhatsApp wired.",
          "Catálogo de serviços + FAQ + regras de escalonamento capturados. Calendário + WhatsApp conectados.",
          "Catálogo de servicios + FAQ + reglas de escalamiento capturados. Calendario + WhatsApp conectados."
        ),
      },
      {
        week: L("Week 2", "Semana 2", "Semana 2"),
        deliverable: L(
          "Agent trained, voice tuned, shadow-mode deployment for QA.",
          "Agente treinado, voz afinada, deploy em shadow mode para QA.",
          "Agente entrenado, voz afinada, deploy en shadow mode para QA."
        ),
      },
      {
        week: L("Week 3", "Semana 3", "Semana 3"),
        deliverable: L(
          "Go-live on web + WhatsApp. Review-response queue starts.",
          "Go-live em web + WhatsApp. Fila de respostas a avaliações começa.",
          "Go-live en web + WhatsApp. Cola de respuestas a reseñas comienza."
        ),
      },
      {
        week: L("Week 4", "Semana 4", "Semana 4"),
        deliverable: L(
          "First-month metrics: response time, resolution rate, booked appointments. Tuning.",
          "Métricas do primeiro mês: tempo de resposta, taxa de resolução, agendamentos. Ajuste.",
          "Métricas del primer mes: tiempo de respuesta, tasa de resolución, agendamientos. Ajuste."
        ),
      },
    ],
    integrations: [
      "WhatsApp Business",
      "Cal.com",
      "Acuity",
      "Google Business Profile",
      "Stripe (deposits)",
      "Twilio",
      "Resend",
    ],
    narrative: {
      problem: L(
        "Customer service is the last thing a founder wants to spend evenings on — but the first thing that kills a reputation when it fails. Slow replies mean bad reviews. Bad reviews mean lost customers. Lost customers are permanent.",
        "Atendimento é a última coisa em que um founder quer gastar a noite — mas a primeira que mata a reputação quando falha. Resposta lenta gera review ruim. Review ruim gera cliente perdido. Cliente perdido é permanente.",
        "La atención es la última cosa en la que un founder quiere gastar las noches — pero la primera que mata la reputación cuando falla. Respuesta lenta genera reseña mala. Reseña mala genera cliente perdido. Cliente perdido es permanente."
      ),
      challenge: L(
        "Hiring a support team scales cost linearly with volume. Free-tier chatbots can't handle anything beyond a static FAQ. And WhatsApp — the primary customer channel for most SMBs in Latin America and a growing share in the US — is drowning teams who try to manage it manually.",
        "Contratar um time de suporte escala custo linearmente com volume. Chatbots gratuitos não passam de FAQ estático. E o WhatsApp — canal principal das PMEs na América Latina e crescendo nos EUA — afoga quem tenta operar na unha.",
        "Contratar un equipo de soporte escala costo linealmente con volumen. Los chatbots gratuitos no pasan de un FAQ estático. Y WhatsApp — canal principal de las PyMEs en Latinoamérica y creciendo en EE.UU. — ahoga a quien intenta operarlo a mano."
      ),
      consequence: L(
        "Every slow response compounds. Customers who wait more than 10 minutes are 40% less likely to buy. Unresponded reviews signal neglect to every future prospect. This gap doesn't close by itself — it grows as volume grows.",
        "Toda resposta lenta gera composto. Cliente que espera mais que 10 minutos compra 40% menos. Avaliação sem resposta sinaliza descaso para todo futuro prospect. Essa lacuna não fecha sozinha — só cresce com o volume.",
        "Toda respuesta lenta compone. Un cliente que espera más de 10 minutos compra 40% menos. Una reseña sin respuesta señala descuido a todo prospecto futuro. Esta brecha no se cierra sola — solo crece con el volumen."
      ),
      whyChange: L(
        "AI customer service has crossed the quality threshold where most customers can't distinguish it from a human for tier-1 inquiries. The question is no longer whether AI can do this — it's whether you can afford not to have it.",
        "O atendimento com IA cruzou o limiar de qualidade onde a maioria dos clientes não distingue de um humano em casos de tier-1. A pergunta não é mais se a IA dá conta — é se você pode bancar não tê-la.",
        "La atención con IA cruzó el umbral de calidad donde la mayoría de clientes no la distingue de un humano en casos de tier-1. La pregunta ya no es si la IA puede — es si puedes permitirte no tenerla."
      ),
      whyNow: L(
        "WhatsApp Business API, Claude's context window, and real-time booking integrations now combine to make a genuine 24/7 service agent feasible without enterprise infrastructure or enterprise budget.",
        "A API do WhatsApp Business, a janela de contexto do Claude e integrações de booking em tempo real se combinam para tornar um agente 24/7 viável sem infraestrutura nem orçamento enterprise.",
        "La API de WhatsApp Business, la ventana de contexto de Claude e integraciones de booking en tiempo real se combinan para que un agente 24/7 sea viable sin infraestructura ni presupuesto enterprise."
      ),
      why10xai: L(
        "We build the escalation rules, train the agent on your actual service catalog and tone, and wire the human handoff from day one. You don't get a generic chatbot — you get an agent that sounds like your best team member.",
        "Construímos as regras de escalonamento, treinamos o agente no seu catálogo de serviços e voz reais e conectamos o handoff humano desde o dia 1. Você não recebe um chatbot genérico — você recebe um agente que soa como o seu melhor colaborador.",
        "Construimos las reglas de escalamiento, entrenamos al agente con tu catálogo de servicios y voz reales y conectamos el handoff humano desde el día 1. No recibes un chatbot genérico — recibes un agente que suena como tu mejor colaborador."
      ),
    },
    industries: [
      {
        name: L(
          "Health & Wellness Clinics",
          "Clínicas de saúde & bem-estar",
          "Clínicas de salud & bienestar"
        ),
        useCase: L(
          "Handle appointment booking, rescheduling, pre-visit instructions, and review responses — across WhatsApp and web.",
          "Cuide de agendamento, remarcação, instruções pré-consulta e respostas a avaliações — em WhatsApp e web.",
          "Cubre agendamiento, reagendamiento, instrucciones previas y respuestas a reseñas — en WhatsApp y web."
        ),
        impact: L(
          "No-show rate reduced by automated 24h reminders",
          "Taxa de no-show reduzida com lembretes automáticos de 24h",
          "Tasa de no-show reducida con recordatorios automáticos de 24h"
        ),
      },
      {
        name: L(
          "Beauty & Personal Care",
          "Beleza & cuidados pessoais",
          "Belleza & cuidado personal"
        ),
        useCase: L(
          "Book appointments, answer service questions, and recover abandoned bookings — in any language the customer messages in.",
          "Agende, responda dúvidas de serviço e recupere agendamentos abandonados — no idioma em que o cliente escreve.",
          "Agenda, responde dudas de servicio y recupera agendamientos abandonados — en el idioma en que el cliente escribe."
        ),
        impact: L(
          "Response time from hours to seconds on WhatsApp",
          "Tempo de resposta cai de horas para segundos no WhatsApp",
          "Tiempo de respuesta cae de horas a segundos en WhatsApp"
        ),
      },
      {
        name: L("E-commerce & Retail", "E-commerce & Varejo", "E-commerce y Retail"),
        useCase: L(
          "Triage order status, returns, and product questions automatically — escalate only billing disputes and exceptions.",
          "Triagem automática de status de pedido, devoluções e dúvidas de produto — escala apenas disputas e exceções.",
          "Triaje automático de estado de pedido, devoluciones y dudas de producto — escala solo disputas y excepciones."
        ),
        impact: L(
          "70%+ of tier-1 tickets resolved without human touch",
          "70%+ dos tickets de tier-1 resolvidos sem toque humano",
          "70%+ de los tickets de tier-1 resueltos sin toque humano"
        ),
      },
      {
        name: L("Home Services", "Serviços para residências", "Servicios para hogar"),
        useCase: L(
          "Route service requests, confirm appointments, and collect pre-job information — before your crew shows up.",
          "Encaminhe pedidos, confirme agendamentos e colete dados pré-serviço — antes da equipe chegar.",
          "Enruta pedidos, confirma agendamientos y recoge datos previos al servicio — antes de que el equipo llegue."
        ),
        impact: L(
          "Same-day booking confirmation via WhatsApp automation",
          "Confirmação de agendamento no mesmo dia via WhatsApp",
          "Confirmación de agendamiento el mismo día vía WhatsApp"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "ticketsPerMonth",
          label: L(
            "Customer messages / month",
            "Mensagens de cliente / mês",
            "Mensajes de cliente / mes"
          ),
          unit: "count",
          min: 50,
          max: 5000,
          step: 50,
          default: 300,
        },
        {
          key: "avgHandleMinutes",
          label: L(
            "Avg. handle time per message (min)",
            "Tempo médio por mensagem (min)",
            "Tiempo medio por mensaje (min)"
          ),
          unit: "count",
          min: 3,
          max: 30,
          step: 1,
          default: 10,
        },
        {
          key: "staffCostHour",
          label: L("Staff cost / hour", "Custo de equipe / hora", "Costo de equipo / hora"),
          unit: "usd",
          min: 12,
          max: 80,
          step: 1,
          default: 20,
        },
      ],
      outputs: [
        {
          key: "hoursSaved",
          label: L(
            "Staff hours saved / month",
            "Horas de equipe poupadas / mês",
            "Horas de equipo ahorradas / mes"
          ),
          format: "hours",
        },
        {
          key: "costSaved",
          label: L(
            "Estimated savings / month",
            "Economia estimada / mês",
            "Ahorro estimado / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 4 — Reach
  {
    slug: "reach",
    iconKey: "reach",
    name: L("Reach Engine", "Motor de alcance", "Motor de alcance"),
    tag: L("Marketing", "Marketing", "Marketing"),
    desc: L(
      "Content, social, and ads on one autonomous track — in your brand voice.",
      "Conteúdo, social e mídia paga em um trilho autônomo — na voz da sua marca.",
      "Contenido, social y medios pagos en una sola pista autónoma — en la voz de tu marca."
    ),
    valueProp: L(
      "Content generation, social orchestration, and ad operations on one autonomous track — trained on your tone, multilingual where it matters.",
      "Geração de conteúdo, orquestração social e operação de mídia paga em um trilho autônomo — treinado na sua voz, multilíngue onde importa.",
      "Generación de contenido, orquestación social y operación de medios pagos en una sola pista autónoma — entrenado en tu voz, multilingüe donde importa."
    ),
    longDesc: L(
      "Marketing teams of one (or zero) can't keep up with the channels their buyers expect. Reach Engine runs the constant work — blog posts, LinkedIn carousels, Instagram reels copy, ad variations — in your brand voice, in three languages, with a human approval gate before publish.",
      "Times de marketing de uma (ou zero) pessoa não dão conta dos canais que seus clientes esperam. O Motor de Alcance roda o trabalho contínuo — posts de blog, carrosséis no LinkedIn, copy de reels, variações de anúncio — na sua voz, em três idiomas, com aprovação humana antes de publicar.",
      "Equipos de marketing de una (o cero) persona no dan abasto con los canales que sus clientes esperan. El Motor de Alcance corre el trabajo continuo — posts de blog, carruseles en LinkedIn, copy de reels, variaciones de anuncio — en tu voz, en tres idiomas, con aprobación humana antes de publicar."
    ),
    details: LA(
      [
        "Content generation in your brand voice, multilingual",
        "Social orchestration across LinkedIn, Instagram, Facebook",
        "Ad operations with performance feedback loops",
      ],
      [
        "Geração de conteúdo na voz da marca, multilíngue",
        "Orquestração social em LinkedIn, Instagram, Facebook",
        "Operação de anúncios com feedback de performance",
      ],
      [
        "Generación de contenido en la voz de la marca, multilingüe",
        "Orquestación social en LinkedIn, Instagram, Facebook",
        "Operación de anuncios con feedback de performance",
      ]
    ),
    bestFor: L(
      "Brands needing constant content with lean teams",
      "Marcas que precisam de conteúdo constante com times enxutos",
      "Marcas que necesitan contenido constante con equipos magros"
    ),
    anchor: L(
      "From $2,500 + $799/mo",
      "A partir de US$ 2.500 + US$ 799/mês",
      "Desde US$ 2.500 + US$ 799/mes"
    ),
    whoFor: LA(
      [
        "Founder-led brands posting inconsistently because the founder is busy",
        "Agencies that want to scale client deliverables without scaling headcount",
        "Multilingual brands tired of low-quality machine translations",
        "Anyone running ads without the time to test 30 creative variations a week",
      ],
      [
        "Marcas founder-led postando sem ritmo porque o founder está ocupado",
        "Agências que querem escalar entrega sem escalar headcount",
        "Marcas multilíngues cansadas de tradução automática ruim",
        "Quem roda anúncios mas não tem tempo de testar 30 variações por semana",
      ],
      [
        "Marcas founder-led publicando sin ritmo porque el founder está ocupado",
        "Agencias que quieren escalar entrega sin escalar headcount",
        "Marcas multilingües cansadas de traducción automática mala",
        "Quien corre anuncios pero no tiene tiempo de probar 30 variaciones por semana",
      ]
    ),
    features: [
      {
        title: L("Brand-voice training", "Treino de voz da marca", "Entrenamiento de voz de marca"),
        desc: L(
          "We feed the agent your past 50 best posts, top-performing ads, and a one-page voice guide. Output reads like you, not like a generic generator.",
          "Alimentamos o agente com seus 50 melhores posts, anúncios top e um guia de voz de uma página. O output lê como você, não como um gerador genérico.",
          "Alimentamos al agente con tus 50 mejores posts, anuncios top y una guía de voz de una página. El output lee como tú, no como un generador genérico."
        ),
      },
      {
        title: L(
          "Multichannel calendars",
          "Calendários multicanal",
          "Calendarios multicanal"
        ),
        desc: L(
          "Blog, LinkedIn, Instagram, Facebook, X — one source of truth, native publishing per channel, no copy-paste fatigue.",
          "Blog, LinkedIn, Instagram, Facebook, X — uma fonte única, publicação nativa por canal, sem fadiga de copy-paste.",
          "Blog, LinkedIn, Instagram, Facebook, X — una fuente única, publicación nativa por canal, sin fatiga de copy-paste."
        ),
      },
      {
        title: L("Ad-variant factory", "Fábrica de variantes de anúncio", "Fábrica de variantes de anuncio"),
        desc: L(
          "Spin up 15–30 variants per campaign. Auto-pause losers, scale winners, keep your spend efficient without constant manual review.",
          "Crie 15–30 variantes por campanha. Pausa automática dos perdedores, escala dos vencedores, gasto eficiente sem revisão manual constante.",
          "Crea 15–30 variantes por campaña. Pausa automática a los perdedores, escala a los ganadores, gasto eficiente sin revisión manual constante."
        ),
      },
      {
        title: L(
          "Human approval gates",
          "Portões de aprovação humana",
          "Compuertas de aprobación humana"
        ),
        desc: L(
          "Nothing publishes without a quick human review. The agent does the 90% of work; you keep editorial control on the last 10%.",
          "Nada publica sem revisão humana rápida. O agente faz 90% do trabalho; você mantém o controle editorial dos últimos 10%.",
          "Nada se publica sin una revisión humana rápida. El agente hace el 90% del trabajo; tú mantienes el control editorial del último 10%."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1", "Semana 1", "Semana 1"),
        deliverable: L(
          "Voice guide, content pillars, channel inventory, brand voice training data captured.",
          "Guia de voz, pilares de conteúdo, inventário de canais, dados de treino capturados.",
          "Guía de voz, pilares de contenido, inventario de canales, datos de entrenamiento capturados."
        ),
      },
      {
        week: L("Week 2", "Semana 2", "Semana 2"),
        deliverable: L(
          "First content week drafted, scheduling system live, ad-variant generator wired.",
          "Primeira semana de conteúdo redigida, sistema de agendamento no ar, gerador de variantes plugado.",
          "Primera semana de contenido redactada, sistema de agendamiento en vivo, generador de variantes conectado."
        ),
      },
      {
        week: L("Week 3", "Semana 3", "Semana 3"),
        deliverable: L(
          "First two weeks of content published. Engagement baselines measured.",
          "Primeiras duas semanas de conteúdo publicadas. Baselines de engajamento medidos.",
          "Primeras dos semanas de contenido publicadas. Baselines de engagement medidos."
        ),
      },
      {
        week: L("Week 4", "Semana 4", "Semana 4"),
        deliverable: L(
          "Voice tuning, performance review, scale-up plan for month 2.",
          "Ajuste fino da voz, revisão de performance, plano de scale-up para o mês 2.",
          "Ajuste fino de la voz, revisión de performance, plan de scale-up para el mes 2."
        ),
      },
    ],
    integrations: [
      "LinkedIn",
      "Instagram Graph API",
      "Facebook Pages",
      "X (Twitter)",
      "Beehiiv",
      "Resend",
      "Google Ads",
      "Meta Ads",
    ],
    narrative: {
      problem: L(
        "Marketing requires consistent, high-quality output across multiple channels every single week. But most SMBs have one person (or zero) dedicated to marketing — and that person is already stretched across six other jobs.",
        "Marketing exige output consistente, de alta qualidade, em múltiplos canais, toda semana. Mas a maioria das PMEs tem uma (ou zero) pessoa dedicada ao marketing — e essa pessoa já cobre seis outras funções.",
        "El marketing exige output consistente, de alta calidad, en múltiples canales, cada semana. Pero la mayoría de PyMEs tiene una (o cero) persona dedicada al marketing — y esa persona ya cubre seis funciones más."
      ),
      challenge: L(
        "Inconsistent posting loses algorithmic momentum overnight. Generic AI content doesn't just underperform — it actively damages brand trust. And most small teams post in bursts when they have time, go dark for weeks, then wonder why growth stalled.",
        "Postagem inconsistente perde momentum algorítmico em uma noite. Conteúdo genérico de IA não só performa mal — corrói a confiança da marca. E a maioria dos times pequenos posta em surtos quando dá, some por semanas, e depois pergunta por que o crescimento parou.",
        "Postear sin ritmo pierde momentum algorítmico de un día al otro. El contenido genérico de IA no solo rinde mal — daña la confianza de la marca. Y la mayoría de equipos pequeños postean a ráfagas cuando hay tiempo, desaparecen por semanas y luego se preguntan por qué se frenó el crecimiento."
      ),
      consequence: L(
        "Brands that go silent lose search ranking, social followers, and the compound interest of content marketing. Every week without content is a week competitors gain ground. The longer you wait, the more expensive recovery becomes.",
        "Marcas que ficam em silêncio perdem ranking de busca, seguidores e o juros composto do conteúdo. Cada semana sem conteúdo é uma semana em que o concorrente ganha terreno. Quanto mais demora, mais cara é a recuperação.",
        "Las marcas que se silencian pierden ranking de búsqueda, seguidores y el interés compuesto del contenido. Cada semana sin contenido es una semana en que el competidor gana terreno. Cuanto más tardas, más cara es la recuperación."
      ),
      whyChange: L(
        "AI-generated content has crossed brand-quality thresholds when properly trained on voice samples and editorial guidelines. Reach Engine doesn't replace human creativity — it eliminates the 80% of content work that is production, not thinking.",
        "Conteúdo gerado por IA cruzou o limiar de qualidade quando treinado direito na voz e nas diretrizes editoriais. O Motor de Alcance não substitui a criatividade humana — elimina os 80% do trabalho de produção que não é pensar.",
        "El contenido generado por IA cruzó el umbral de calidad cuando se entrena bien con la voz y las pautas editoriales. El Motor de Alcance no reemplaza la creatividad humana — elimina el 80% del trabajo de producción que no es pensar."
      ),
      whyNow: L(
        "LLMs trained on brand voice can now produce on-brand content at near-human quality in seconds. Native social publishing APIs, ad platform integrations, and automated approval flows make a real autonomous content pipeline possible today.",
        "LLMs treinados em voz de marca produzem conteúdo on-brand em qualidade quase humana em segundos. APIs nativas de social, integrações com plataformas de anúncio e fluxos de aprovação automatizados tornam um pipeline autônomo viável hoje.",
        "Los LLMs entrenados en voz de marca producen contenido on-brand en calidad casi humana en segundos. Las APIs nativas de social, las integraciones con plataformas de anuncio y los flujos de aprobación automatizados hacen viable hoy un pipeline autónomo."
      ),
      why10xai: L(
        "We do the voice training, the channel setup, the content calendar, and the human approval workflow. You review one queue per week and publish. We produce the rest — in three languages if your audience spans markets.",
        "A gente faz o treino de voz, o setup de canais, o calendário de conteúdo e o fluxo de aprovação. Você revisa uma fila por semana e publica. A gente produz o resto — em três idiomas se a sua audiência abrange mercados.",
        "Nosotros hacemos el entrenamiento de voz, el setup de canales, el calendario de contenido y el flujo de aprobación. Tú revisas una cola por semana y publicas. Nosotros producimos el resto — en tres idiomas si tu audiencia abarca mercados."
      ),
    },
    industries: [
      {
        name: L(
          "B2B Professional Services",
          "Serviços profissionais B2B",
          "Servicios profesionales B2B"
        ),
        useCase: L(
          "LinkedIn thought-leadership content, case study posts, and ad creative — consistently, in the founder's voice.",
          "Conteúdo de thought leadership no LinkedIn, posts de case e criativo de anúncio — sempre na voz do founder.",
          "Contenido de thought leadership en LinkedIn, posts de case y creativo de anuncio — siempre en la voz del founder."
        ),
        impact: L(
          "3× posting frequency with same team headcount",
          "3× a frequência de postagem com o mesmo time",
          "3× la frecuencia de posteo con el mismo equipo"
        ),
      },
      {
        name: L(
          "Healthcare & Wellness",
          "Saúde & bem-estar",
          "Salud & bienestar"
        ),
        useCase: L(
          "Patient education content, provider spotlights, and community-building posts — in multiple languages for diverse markets.",
          "Conteúdo de educação ao paciente, spotlights da equipe e posts de comunidade — em vários idiomas para mercados diversos.",
          "Contenido de educación al paciente, spotlights del equipo y posts de comunidad — en varios idiomas para mercados diversos."
        ),
        impact: L(
          "Compliant, brand-safe content without legal review bottlenecks",
          "Conteúdo compliance, brand-safe, sem gargalo de revisão jurídica",
          "Contenido compliance, brand-safe, sin cuello de botella de revisión legal"
        ),
      },
      {
        name: L("E-commerce & CPG", "E-commerce & CPG", "E-commerce & CPG"),
        useCase: L(
          "Product launch content, UGC-style creative, and ad variant factories for Meta and Google — refreshed weekly.",
          "Conteúdo de lançamento, criativo no estilo UGC e fábricas de variante para Meta e Google — atualizadas toda semana.",
          "Contenido de lanzamiento, creativo estilo UGC y fábricas de variantes para Meta y Google — actualizadas cada semana."
        ),
        impact: L(
          "30+ ad variants per campaign at a fraction of agency cost",
          "30+ variantes por campanha por uma fração do custo de agência",
          "30+ variantes por campaña a una fracción del costo de agencia"
        ),
      },
      {
        name: L(
          "Restaurants & Hospitality",
          "Restaurantes & Hospitalidade",
          "Restaurantes & Hospitalidad"
        ),
        useCase: L(
          "Menu features, event promotions, and review amplification — across Instagram, Facebook, and Google Business.",
          "Destaques de cardápio, promoção de evento e amplificação de avaliação — em Instagram, Facebook e Google Business.",
          "Destacados de menú, promoción de eventos y amplificación de reseñas — en Instagram, Facebook y Google Business."
        ),
        impact: L(
          "Consistent local brand presence without a marketing hire",
          "Presença local consistente sem contratar marketing",
          "Presencia local consistente sin contratar marketing"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "contentPiecesPerMonth",
          label: L(
            "Content pieces published / month today",
            "Peças de conteúdo / mês hoje",
            "Piezas de contenido / mes hoy"
          ),
          unit: "count",
          min: 0,
          max: 60,
          step: 2,
          default: 8,
        },
        {
          key: "hoursPerPiece",
          label: L(
            "Hours per piece (writing + design + posting)",
            "Horas por peça (escrita + design + posting)",
            "Horas por pieza (escritura + diseño + posting)"
          ),
          unit: "hours",
          min: 1,
          max: 8,
          step: 0.5,
          default: 3,
        },
        {
          key: "staffCostHour",
          label: L("Staff cost / hour", "Custo de equipe / hora", "Costo de equipo / hora"),
          unit: "usd",
          min: 20,
          max: 200,
          step: 5,
          default: 60,
        },
      ],
      outputs: [
        {
          key: "hoursSaved",
          label: L("Hours saved / month", "Horas poupadas / mês", "Horas ahorradas / mes"),
          format: "hours",
        },
        {
          key: "costSaved",
          label: L(
            "Estimated savings / month",
            "Economia estimada / mês",
            "Ahorro estimado / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 5 — Mind
  {
    slug: "mind",
    iconKey: "mind",
    name: L("Mind Engine", "Motor de conhecimento", "Motor de conocimiento"),
    tag: L("LMS / Onboarding", "LMS / Onboarding", "LMS / Onboarding"),
    desc: L(
      "Knowledge consolidation and role-based training, deployed as an AI tutor.",
      "Consolidação de conhecimento e treino por papel, entregue como tutor de IA.",
      "Consolidación de conocimiento y entrenamiento por rol, entregado como tutor de IA."
    ),
    valueProp: L(
      "Knowledge consolidation and role-based training deployed as an AI tutor — for onboarding new hires and continuously training the team you have.",
      "Consolidação de conhecimento e treino por papel entregue como tutor de IA — para onboarding de novos contratados e treino contínuo do time atual.",
      "Consolidación de conocimiento y entrenamiento por rol entregado como tutor de IA — para onboarding de nuevos contratados y entrenamiento continuo del equipo actual."
    ),
    longDesc: L(
      "Most SMBs lose three weeks of productivity every time they hire someone new because their training material is in three Slack channels, two Google Docs, and one founder's head. Mind Engine consolidates the actual knowledge into role-based AI tutors that ramp new hires in days — and keeps the team current as policies and products evolve.",
      "A maioria das PMEs perde três semanas de produtividade a cada nova contratação porque o material de treino mora em três canais de Slack, dois Google Docs e na cabeça do founder. O Motor de Conhecimento consolida o saber real em tutores de IA por papel que rampam novos contratados em dias — e mantém o time atualizado conforme políticas e produtos evoluem.",
      "La mayoría de PyMEs pierde tres semanas de productividad cada vez que contrata a alguien nuevo porque el material de entrenamiento vive en tres canales de Slack, dos Google Docs y la cabeza del founder. El Motor de Conocimiento consolida el saber real en tutores de IA por rol que rampean a nuevos contratados en días — y mantiene al equipo al día a medida que evolucionan políticas y productos."
    ),
    details: LA(
      [
        "Pulls knowledge from your existing docs, SOPs, and Slack",
        "Role-based onboarding paths that ramp new hires faster",
        "Continuous training on policy + product changes",
      ],
      [
        "Puxa conhecimento dos seus docs, SOPs e Slack já existentes",
        "Trilhas de onboarding por papel que rampam mais rápido",
        "Treino contínuo conforme políticas + produtos mudam",
      ],
      [
        "Trae conocimiento desde tus docs, SOPs y Slack existentes",
        "Itinerarios de onboarding por rol que rampean más rápido",
        "Entrenamiento continuo conforme cambian políticas + productos",
      ]
    ),
    bestFor: L(
      "Teams growing fast or with high turnover",
      "Times crescendo rápido ou com turnover alto",
      "Equipos creciendo rápido o con rotación alta"
    ),
    anchor: L("From $3,500", "A partir de US$ 3.500", "Desde US$ 3.500"),
    whoFor: LA(
      [
        "Service businesses with high front-line turnover",
        "Companies onboarding 3+ people per quarter",
        "Operators whose 'training material' is mostly tribal knowledge",
        "Teams running on documents nobody reads",
      ],
      [
        "Negócios de serviço com turnover alto na linha de frente",
        "Empresas que onboardam 3+ pessoas por trimestre",
        "Operadores cujo 'material de treino' é, na real, conhecimento tribal",
        "Times rodando em documentos que ninguém lê",
      ],
      [
        "Negocios de servicios con rotación alta en la primera línea",
        "Empresas que hacen onboarding a 3+ personas por trimestre",
        "Operadores cuyo 'material de entrenamiento' es, en realidad, conocimiento tribal",
        "Equipos corriendo sobre documentos que nadie lee",
      ]
    ),
    features: [
      {
        title: L("Knowledge ingestion", "Ingestão de conhecimento", "Ingesta de conocimiento"),
        desc: L(
          "We pull from Notion, Google Docs, Slack, Confluence, PDFs — whatever you have — and consolidate it into a single source of truth.",
          "Puxamos de Notion, Google Docs, Slack, Confluence, PDFs — o que você tiver — e consolidamos em uma fonte única.",
          "Traemos de Notion, Google Docs, Slack, Confluence, PDFs — lo que tengas — y consolidamos en una fuente única."
        ),
      },
      {
        title: L("Role-based tutoring", "Tutoria por papel", "Tutoría por rol"),
        desc: L(
          "Different roles, different paths. The AI tutor adapts to where someone is, what they need, and how they best learn.",
          "Papéis diferentes, trilhas diferentes. O tutor de IA adapta a onde a pessoa está, o que ela precisa e como ela aprende melhor.",
          "Roles distintos, itinerarios distintos. El tutor de IA se adapta a dónde está la persona, qué necesita y cómo aprende mejor."
        ),
      },
      {
        title: L("Always current", "Sempre atualizado", "Siempre actualizado"),
        desc: L(
          "When you change a policy or launch a new product, we re-ingest. Every team member gets the update without an all-hands.",
          "Quando você muda uma política ou lança um produto, a gente reingere. Todo mundo no time pega o update sem precisar de all-hands.",
          "Cuando cambias una política o lanzas un producto, reingerimos. Todo el equipo recibe el update sin necesidad de all-hands."
        ),
      },
      {
        title: L("ATD-grade pedagogy", "Pedagogia padrão ATD", "Pedagogía padrón ATD"),
        desc: L(
          "Built by an ATD Master Trainer-credentialed founder. Real instructional design, not just a chatbot wrapped around a doc.",
          "Construído por um founder com credencial ATD Master Trainer. Design instrucional de verdade, não um chatbot envolto num doc.",
          "Construido por un founder con credencial ATD Master Trainer. Diseño instruccional de verdad, no un chatbot envuelto en un doc."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1–2", "Semana 1–2", "Semana 1–2"),
        deliverable: L(
          "Knowledge audit, SME interviews, role-path mapping, content gap analysis.",
          "Auditoria de conhecimento, entrevistas com SMEs, mapeamento de trilhas, análise de gaps.",
          "Auditoría de conocimiento, entrevistas con SMEs, mapeo de itinerarios, análisis de gaps."
        ),
      },
      {
        week: L("Week 3–4", "Semana 3–4", "Semana 3–4"),
        deliverable: L(
          "Build the AI tutor, role-based onboarding paths, knowledge base wired in.",
          "Construir o tutor de IA, trilhas de onboarding e base de conhecimento conectada.",
          "Construir el tutor de IA, itinerarios de onboarding y base de conocimiento conectada."
        ),
      },
      {
        week: L("Week 5–6", "Semana 5–6", "Semana 5–6"),
        deliverable: L(
          "Pilot with 3–5 new hires or rotators. Measure ramp time, comprehension, retention.",
          "Piloto com 3–5 novos contratados ou rotações. Medir ramp, compreensão, retenção.",
          "Piloto con 3–5 nuevos contratados o rotaciones. Medir ramp, comprensión, retención."
        ),
      },
      {
        week: L("Week 7–8", "Semana 7–8", "Semana 7–8"),
        deliverable: L(
          "Tune, expand to remaining roles, set continuous-update cadence.",
          "Ajuste, expansão para os demais papéis, definir cadência de update contínuo.",
          "Ajuste, expansión a los demás roles, definir cadencia de update continuo."
        ),
      },
    ],
    integrations: ["Notion", "Google Docs", "Slack", "Confluence", "Loom", "Claude (Anthropic)"],
    narrative: {
      problem: L(
        "Onboarding is broken at most SMBs. The 'training material' is three Slack messages, two outdated Google Docs, and shadowing someone who is about to quit. New hires learn by making mistakes — on your customers.",
        "Onboarding está quebrado na maioria das PMEs. O 'material de treino' são três mensagens no Slack, dois Google Docs desatualizados e shadowing com alguém que está prestes a sair. Novos contratados aprendem errando — em cima dos seus clientes.",
        "El onboarding está roto en la mayoría de PyMEs. El 'material de entrenamiento' son tres mensajes de Slack, dos Google Docs desactualizados y shadowing con alguien que está por irse. Los nuevos contratados aprenden equivocándose — encima de tus clientes."
      ),
      challenge: L(
        "Building proper training content takes weeks of subject-matter expert time that nobody has. And even when it's built, it goes stale the moment you change a product, a policy, or a process — which is constantly.",
        "Construir treino direito exige semanas de tempo de SME que ninguém tem. E mesmo quando está pronto, envelhece no momento em que você muda produto, política ou processo — o que é o tempo todo.",
        "Construir entrenamiento bien hecho exige semanas de tiempo de SME que nadie tiene. Y aun cuando está listo, envejece en el momento en que cambias producto, política o proceso — o sea, todo el tiempo."
      ),
      consequence: L(
        "New hires take 2–3× longer to ramp than they should. They make avoidable mistakes. They quit. And the cycle repeats — except now you've lost both the training investment and the institutional knowledge they accumulated.",
        "Novos contratados levam 2–3× mais tempo de ramp do que deveriam. Cometem erros evitáveis. Pedem demissão. E o ciclo se repete — só que agora você perdeu o investimento em treino e o conhecimento institucional que eles acumularam.",
        "Los nuevos contratados tardan 2–3× más en rampear de lo que deberían. Cometen errores evitables. Renuncian. Y el ciclo se repite — solo que ahora perdiste tanto la inversión en entrenamiento como el conocimiento institucional que acumularon."
      ),
      whyChange: L(
        "AI tutors can deliver personalized, role-specific training at scale without creating a content bottleneck. The answer is no longer in another onboarding document nobody reads — it's in an agent that responds in real time to the actual question the new hire has.",
        "Tutores de IA entregam treino personalizado por papel em escala sem virar gargalo de conteúdo. A resposta já não está em mais um doc de onboarding que ninguém lê — está em um agente que responde em tempo real à pergunta real do novo contratado.",
        "Los tutores de IA entregan entrenamiento personalizado por rol a escala sin convertirse en cuello de botella de contenido. La respuesta ya no está en otro doc de onboarding que nadie lee — está en un agente que responde en tiempo real a la pregunta real del nuevo contratado."
      ),
      whyNow: L(
        "LLM context windows now support full SOPs and knowledge bases as live training material. The cost to build a custom AI tutor that knows your entire business dropped 95% in 24 months. The infrastructure is ready. The bottleneck is will.",
        "As janelas de contexto dos LLMs agora suportam SOPs e bases inteiras como material de treino vivo. O custo de construir um tutor de IA customizado caiu 95% em 24 meses. A infra está pronta. O gargalo é decisão.",
        "Las ventanas de contexto de los LLMs ya soportan SOPs y bases enteras como material de entrenamiento vivo. El costo de construir un tutor de IA a medida cayó 95% en 24 meses. La infraestructura está lista. El cuello de botella es decisión."
      ),
      why10xai: L(
        "Our founder is an ATD Master Trainer with a formal instructional design credential. Every Mind Engine is built with real pedagogy — not just a chatbot wrapper around your Notion. We measure ramp time reduction, not documents uploaded.",
        "Nosso founder é ATD Master Trainer com credencial formal de design instrucional. Todo Motor de Conhecimento é montado com pedagogia de verdade — não um chatbot que embrulha o seu Notion. A gente mede redução de ramp, não documentos uploadados.",
        "Nuestro founder es ATD Master Trainer con credencial formal de diseño instruccional. Cada Motor de Conocimiento se arma con pedagogía de verdad — no un chatbot que envuelve tu Notion. Medimos reducción de ramp, no documentos subidos."
      ),
    },
    industries: [
      {
        name: L(
          "Healthcare & Clinical",
          "Saúde & Clínico",
          "Salud & Clínico"
        ),
        useCase: L(
          "Role-specific training for nurses, front desk, and billing staff — with HIPAA-aware content controls baked in.",
          "Treino por papel para enfermagem, recepção e faturamento — com controles HIPAA-aware embarcados.",
          "Entrenamiento por rol para enfermería, recepción y facturación — con controles HIPAA-aware integrados."
        ),
        impact: L(
          "Ramp time reduced 40–60% in pilot deployments",
          "Tempo de ramp reduzido em 40–60% nos pilotos",
          "Tiempo de ramp reducido en 40–60% en los pilotos"
        ),
      },
      {
        name: L(
          "Hospitality & Food Service",
          "Hospitalidade & alimentação",
          "Hospitalidad & alimentación"
        ),
        useCase: L(
          "Brand standards, service protocols, and POS training for high-turnover front-line staff — available 24/7 in any language.",
          "Padrões de marca, protocolos de serviço e treino de POS para frente alta-rotativa — 24/7, em qualquer idioma.",
          "Estándares de marca, protocolos de servicio y entrenamiento de POS para frente con rotación alta — 24/7, en cualquier idioma."
        ),
        impact: L(
          "Consistent quality across locations without a training manager",
          "Qualidade consistente entre unidades sem gerente de treino",
          "Calidad consistente entre sucursales sin gerente de entrenamiento"
        ),
      },
      {
        name: L(
          "Professional Services Firms",
          "Empresas de serviços profissionais",
          "Empresas de servicios profesionales"
        ),
        useCase: L(
          "Client onboarding playbooks, methodology training, and compliance updates delivered as interactive AI sessions — not PDFs.",
          "Playbooks de onboarding de cliente, treino de metodologia e updates de compliance entregues como sessões interativas de IA — não PDFs.",
          "Playbooks de onboarding de cliente, entrenamiento de metodología y updates de compliance entregados como sesiones interactivas de IA — no PDFs."
        ),
        impact: L(
          "Senior consultants spend 3h less per new hire on shadowing",
          "Consultores sêniores gastam 3h a menos de shadowing por nova contratação",
          "Los consultores senior gastan 3h menos en shadowing por nueva contratación"
        ),
      },
      {
        name: L(
          "Technology Companies",
          "Empresas de tecnologia",
          "Empresas de tecnología"
        ),
        useCase: L(
          "Product training, sales playbooks, and support runbooks that update automatically when the product changes.",
          "Treino de produto, playbooks de vendas e runbooks de suporte que atualizam sozinhos quando o produto muda.",
          "Entrenamiento de producto, playbooks de ventas y runbooks de soporte que se actualizan solos cuando cambia el producto."
        ),
        impact: L(
          "Zero lag between product release and team readiness",
          "Zero lag entre release do produto e preparo do time",
          "Cero lag entre release del producto y preparación del equipo"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "hiresPerQuarter",
          label: L(
            "New hires per quarter",
            "Novas contratações por trimestre",
            "Nuevas contrataciones por trimestre"
          ),
          unit: "count",
          min: 1,
          max: 30,
          step: 1,
          default: 4,
        },
        {
          key: "rampWeeks",
          label: L(
            "Current ramp time (weeks)",
            "Ramp atual (semanas)",
            "Ramp actual (semanas)"
          ),
          unit: "count",
          min: 2,
          max: 20,
          step: 1,
          default: 6,
        },
        {
          key: "weeklyCost",
          label: L(
            "Cost per employee per week (salary + overhead)",
            "Custo por colaborador por semana (salário + encargos)",
            "Costo por colaborador por semana (salario + cargas)"
          ),
          unit: "usd",
          min: 500,
          max: 6000,
          step: 100,
          default: 1500,
        },
      ],
      outputs: [
        {
          key: "weeksSaved",
          label: L(
            "Ramp weeks saved / quarter",
            "Semanas de ramp poupadas / trimestre",
            "Semanas de ramp ahorradas / trimestre"
          ),
          format: "count",
        },
        {
          key: "costSaved",
          label: L(
            "Estimated savings / quarter",
            "Economia estimada / trimestre",
            "Ahorro estimado / trimestre"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 6 — Bid
  {
    slug: "bid",
    iconKey: "bid",
    name: L("Bid Engine", "Motor de propostas", "Motor de propuestas"),
    tag: L("RFP intelligence", "Inteligência de RFP", "Inteligencia de RFP"),
    desc: L(
      "AI agents that interpret RFPs, qualify the opportunity, and draft the response.",
      "Agentes de IA que interpretam RFPs, qualificam a oportunidade e redigem a resposta.",
      "Agentes de IA que interpretan RFPs, califican la oportunidad y redactan la respuesta."
    ),
    valueProp: L(
      "Read every RFP in minutes. Qualify the opportunity, surface the risk, and draft a tailored response — using your past wins as the source.",
      "Leia toda RFP em minutos. Qualifique a oportunidade, exponha o risco e redija uma resposta sob medida — usando seus ganhos passados como fonte.",
      "Lee toda RFP en minutos. Califica la oportunidad, expone el riesgo y redacta una respuesta a medida — usando tus victorias pasadas como fuente."
    ),
    longDesc: L(
      "RFPs eat senior time. Most are unwinnable. The few that are winnable get a worse response than they deserve because the team is exhausted. Bid Engine reads incoming RFPs, scores fit, surfaces risks, and drafts a response anchored on your actual past wins — so your team focuses on the qualified ones and ships better answers, faster.",
      "RFPs comem o tempo dos sênior. A maioria não tem como ganhar. As que têm acabam recebendo resposta pior do que merecem porque o time está esgotado. O Motor de Propostas lê os RFPs que chegam, dá score de fit, expõe os riscos e redige uma resposta ancorada nos seus ganhos reais — para que o time foque nos qualificados e entregue respostas melhores, mais rápido.",
      "Los RFPs comen el tiempo de los senior. La mayoría no se gana. Los pocos que sí se ganan reciben respuestas peores de lo que merecen porque el equipo está agotado. El Motor de Propuestas lee los RFPs entrantes, da score de fit, expone los riesgos y redacta una respuesta anclada en tus victorias reales — para que el equipo enfoque en los calificados y entregue respuestas mejores, más rápido."
    ),
    details: LA(
      [
        "Reads RFPs and surfaces fit, risk, and competition in minutes",
        "Drafts tailored responses anchored on your past wins",
        "Tracks every bid against win-loss patterns",
      ],
      [
        "Lê RFPs e expõe fit, risco e concorrência em minutos",
        "Redige respostas sob medida ancoradas nos seus ganhos passados",
        "Trackeia toda proposta contra padrões de win-loss",
      ],
      [
        "Lee RFPs y expone fit, riesgo y competencia en minutos",
        "Redacta respuestas a medida ancladas en tus victorias pasadas",
        "Rastrea cada propuesta contra patrones de win-loss",
      ]
    ),
    bestFor: L(
      "Service firms responding to RFPs/RFQs regularly",
      "Empresas de serviço respondendo RFPs/RFQs com frequência",
      "Empresas de servicios respondiendo RFPs/RFQs con frecuencia"
    ),
    anchor: L("From $5,000", "A partir de US$ 5.000", "Desde US$ 5.000"),
    whoFor: LA(
      [
        "Service firms (consulting, engineering, IT, marketing) responding to 5+ RFPs/month",
        "Sales-ops teams drowning in proposals during peak season",
        "Companies bidding on government, healthcare, or enterprise contracts",
        "Anyone losing to competitors because they couldn't ship a polished response in time",
      ],
      [
        "Empresas de serviço (consultoria, engenharia, TI, marketing) respondendo 5+ RFPs/mês",
        "Times de sales-ops afogados em propostas na alta temporada",
        "Empresas concorrendo a contratos de governo, saúde ou enterprise",
        "Quem perde para o concorrente porque não conseguiu entregar uma resposta polida a tempo",
      ],
      [
        "Empresas de servicios (consultoría, ingeniería, TI, marketing) respondiendo 5+ RFPs/mes",
        "Equipos de sales-ops ahogados en propuestas en temporada alta",
        "Empresas concursando por contratos de gobierno, salud o enterprise",
        "Quien pierde frente al competidor porque no logró entregar una respuesta pulida a tiempo",
      ]
    ),
    features: [
      {
        title: L(
          "RFP intake + qualification",
          "Recepção + qualificação de RFP",
          "Recepción + calificación de RFP"
        ),
        desc: L(
          "Drop the PDF in. Get a fit score, top three risks, competitive analysis, and recommended bid/no-bid decision in minutes.",
          "Solte o PDF. Receba score de fit, três principais riscos, análise competitiva e decisão recomendada bid/no-bid em minutos.",
          "Suelta el PDF. Recibe score de fit, los tres principales riesgos, análisis competitivo y decisión recomendada bid/no-bid en minutos."
        ),
      },
      {
        title: L(
          "Response drafting from your wins",
          "Redação a partir dos seus ganhos",
          "Redacción a partir de tus victorias"
        ),
        desc: L(
          "We index your past winning proposals. The agent drafts a tailored response that uses your real proof points — not generic boilerplate.",
          "Indexamos suas propostas vencedoras. O agente redige uma resposta sob medida usando suas provas reais — não boilerplate genérico.",
          "Indexamos tus propuestas ganadoras. El agente redacta una respuesta a medida usando tus pruebas reales — no boilerplate genérico."
        ),
      },
      {
        title: L(
          "Compliance + risk flags",
          "Compliance + flags de risco",
          "Cumplimiento + flags de riesgo"
        ),
        desc: L(
          "Highlights every clause that needs legal/finance/security review. Nothing slips through to submission unreviewed.",
          "Marca cada cláusula que precisa de revisão jurídica/financeira/segurança. Nada vai a submission sem revisão.",
          "Marca cada cláusula que requiere revisión legal/financiera/seguridad. Nada va a submission sin revisión."
        ),
      },
      {
        title: L(
          "Win-loss intelligence",
          "Inteligência de win-loss",
          "Inteligencia de win-loss"
        ),
        desc: L(
          "Every bid contributes to your pattern library. Over time the engine gets sharper at predicting which RFPs are worth your time.",
          "Toda proposta contribui para a sua biblioteca de padrões. Com o tempo o motor afia ao prever quais RFPs valem o seu tempo.",
          "Cada propuesta contribuye a tu biblioteca de patrones. Con el tiempo el motor se afila al predecir qué RFPs valen tu tiempo."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1–2", "Semana 1–2", "Semana 1–2"),
        deliverable: L(
          "Past-wins ingestion, RFP taxonomy, scoring criteria capture, integration with intake channel.",
          "Ingestão de ganhos passados, taxonomia de RFP, captura de critérios de score, integração com canal de intake.",
          "Ingesta de victorias pasadas, taxonomía de RFP, captura de criterios de score, integración con canal de intake."
        ),
      },
      {
        week: L("Week 3–4", "Semana 3–4", "Semana 3–4"),
        deliverable: L(
          "Live with first 3–5 RFPs in production. Human review of every output.",
          "Ao vivo com os primeiros 3–5 RFPs em produção. Revisão humana de todo output.",
          "En vivo con los primeros 3–5 RFPs en producción. Revisión humana de todo output."
        ),
      },
      {
        week: L("Week 5–6", "Semana 5–6", "Semana 5–6"),
        deliverable: L(
          "Tune scoring, expand drafting templates, integrate with proposal tools.",
          "Ajustar score, expandir templates de redação, integrar com ferramentas de proposta.",
          "Ajustar score, expandir templates de redacción, integrar con herramientas de propuesta."
        ),
      },
      {
        week: L("Week 7–8", "Semana 7–8", "Semana 7–8"),
        deliverable: L(
          "Win-rate baseline measured, risk-flag accuracy reviewed, scale plan for month 3.",
          "Baseline de win-rate medido, acurácia das flags revisada, plano de scale para o mês 3.",
          "Baseline de win-rate medido, exactitud de las flags revisada, plan de scale para el mes 3."
        ),
      },
    ],
    integrations: ["Notion", "SharePoint", "Salesforce", "HubSpot", "DocuSign", "Adobe Sign"],
    narrative: {
      problem: L(
        "RFPs eat senior time. Most are unwinnable before you read page two. But you can't know which ones are worth pursuing until someone has read all of them — which means your best people spend weeks on bids that lose.",
        "RFPs comem o tempo dos sênior. A maioria não tem como ganhar antes da página dois. Mas você não sabe quais valem antes que alguém leia todos — o que significa que seus melhores gastam semanas em propostas que perdem.",
        "Los RFPs comen el tiempo de los senior. La mayoría no se gana antes de la página dos. Pero no sabes cuáles valen hasta que alguien los lea todos — lo que significa que tus mejores gastan semanas en propuestas que pierden."
      ),
      challenge: L(
        "No-bid decisions require reading the full document. Proposal quality requires your most experienced writers. Both are expensive resources being pulled away from active clients and real revenue — every bid season.",
        "Decisão de no-bid exige ler o documento todo. Qualidade da proposta exige seus melhores redatores. Ambos são recursos caros sendo puxados de clientes ativos e receita real — toda temporada.",
        "La decisión de no-bid exige leer el documento entero. La calidad de la propuesta exige a tus mejores redactores. Ambos son recursos caros que se sacan de clientes activos y de ingresos reales — cada temporada."
      ),
      consequence: L(
        "Companies respond to everything because they can't afford to miss a winner, and exhaust their best people doing it. Win rates stay low because the effort is spread thin. The team burns out. The next bid season is even harder.",
        "As empresas respondem a tudo porque não dá pra perder uma vencedora, e queimam seus melhores no processo. As win rates ficam baixas porque o esforço se dilui. O time se esgota. A próxima temporada fica ainda mais difícil.",
        "Las empresas responden a todo porque no se pueden permitir perder una ganadora, y queman a sus mejores en el proceso. Las win rates se mantienen bajas porque el esfuerzo se diluye. El equipo se agota. La próxima temporada es aún más dura."
      ),
      whyChange: L(
        "AI can read and qualify an RFP in minutes and draft a tailored response anchored on your past wins in hours — freeing your senior people to focus only on deals that actually deserve their time.",
        "A IA lê e qualifica um RFP em minutos e redige uma resposta sob medida ancorada nos seus ganhos em horas — liberando os sênior para focar só nos deals que merecem o tempo deles.",
        "La IA lee y califica un RFP en minutos y redacta una respuesta a medida anclada en tus victorias en horas — liberando a los senior para enfocarse solo en deals que merecen su tiempo."
      ),
      whyNow: L(
        "LLMs can now handle multi-hundred-page RFPs with structured extraction, compliance-flag detection, and competitive analysis. Past-win pattern matching at scale is feasible today in a way it wasn't 18 months ago.",
        "LLMs hoje aguentam RFPs de centenas de páginas com extração estruturada, detecção de flags de compliance e análise competitiva. Pattern matching de ganhos passados em escala é viável hoje como não era há 18 meses.",
        "Los LLMs hoy aguantan RFPs de cientos de páginas con extracción estructurada, detección de flags de cumplimiento y análisis competitivo. El pattern matching de victorias pasadas a escala es viable hoy como no lo era hace 18 meses."
      ),
      why10xai: L(
        "We index your past winning proposals, build the scoring model against your actual criteria, and run the first five RFPs end-to-end with your team watching. You see the quality — and the time savings — before you commit.",
        "Indexamos suas propostas vencedoras, construímos o modelo de score sobre os seus critérios reais e rodamos os 5 primeiros RFPs end-to-end com seu time observando. Você vê a qualidade — e o ganho de tempo — antes de comprometer.",
        "Indexamos tus propuestas ganadoras, construimos el modelo de score sobre tus criterios reales y corremos los 5 primeros RFPs end-to-end con tu equipo mirando. Ves la calidad — y el ahorro de tiempo — antes de comprometerte."
      ),
    },
    industries: [
      {
        name: L(
          "IT & Technology Services",
          "Serviços de TI & tecnologia",
          "Servicios de TI & tecnología"
        ),
        useCase: L(
          "Qualify government and enterprise IT RFPs, surface compliance requirements, and draft responses from your technical wins.",
          "Qualifique RFPs de TI de governo e enterprise, exponha requisitos de compliance e redija respostas a partir dos seus ganhos técnicos.",
          "Califica RFPs de TI de gobierno y enterprise, expone requisitos de cumplimiento y redacta respuestas a partir de tus victorias técnicas."
        ),
        impact: L(
          "Proposal drafting time reduced from days to hours",
          "Tempo de redação cai de dias para horas",
          "Tiempo de redacción cae de días a horas"
        ),
      },
      {
        name: L(
          "Engineering & Construction",
          "Engenharia & construção",
          "Ingeniería & construcción"
        ),
        useCase: L(
          "Score RFQs for fit against your capacity, license requirements, and past-project profile — before committing to respond.",
          "Score de RFQ contra sua capacidade, exigências de licença e perfil de projetos passados — antes de comprometer a responder.",
          "Score de RFQ contra tu capacidad, exigencias de licencia y perfil de proyectos pasados — antes de comprometerte a responder."
        ),
        impact: L(
          "Bid/no-bid decision in under 30 minutes per opportunity",
          "Decisão bid/no-bid em menos de 30 minutos por oportunidade",
          "Decisión bid/no-bid en menos de 30 minutos por oportunidad"
        ),
      },
      {
        name: L(
          "Healthcare Services",
          "Serviços de saúde",
          "Servicios de salud"
        ),
        useCase: L(
          "Navigate complex healthcare procurement requirements, HIPAA clauses, and insurance contracting language — automatically flagged.",
          "Navegue exigências complexas de compras em saúde, cláusulas HIPAA e linguagem contratual de seguros — sinalizadas automaticamente.",
          "Navega exigencias complejas de compras en salud, cláusulas HIPAA y lenguaje contractual de seguros — flagueado automáticamente."
        ),
        impact: L(
          "Zero compliance gaps missed in review",
          "Zero gaps de compliance perdidos na revisão",
          "Cero brechas de cumplimiento perdidas en la revisión"
        ),
      },
      {
        name: L(
          "Marketing & Creative Agencies",
          "Agências de marketing e criação",
          "Agencias de marketing y creación"
        ),
        useCase: L(
          "Draft RFP responses that lead with creative case studies and ROI data matched to the prospect's vertical and stated criteria.",
          "Redija respostas de RFP que abrem com cases criativos e dados de ROI casados com a vertical e os critérios do prospect.",
          "Redacta respuestas de RFP que abren con casos creativos y datos de ROI casados con la vertical y los criterios del prospecto."
        ),
        impact: L(
          "Win rate improvement through tailored, evidence-based responses",
          "Win rate melhora com respostas sob medida e baseadas em evidência",
          "La win rate mejora con respuestas a medida y basadas en evidencia"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "rfpsPerMonth",
          label: L("RFPs received per month", "RFPs recebidos por mês", "RFPs recibidos por mes"),
          unit: "count",
          min: 2,
          max: 50,
          step: 1,
          default: 8,
        },
        {
          key: "hoursPerRfp",
          label: L(
            "Hours spent per RFP (eval + write)",
            "Horas por RFP (avaliação + redação)",
            "Horas por RFP (evaluación + redacción)"
          ),
          unit: "hours",
          min: 5,
          max: 80,
          step: 5,
          default: 20,
        },
        {
          key: "staffCostHour",
          label: L(
            "Senior staff cost / hour",
            "Custo da equipe sênior / hora",
            "Costo del equipo senior / hora"
          ),
          unit: "usd",
          min: 50,
          max: 400,
          step: 10,
          default: 150,
        },
      ],
      outputs: [
        {
          key: "hoursSaved",
          label: L("Hours saved / month", "Horas poupadas / mês", "Horas ahorradas / mes"),
          format: "hours",
        },
        {
          key: "costSaved",
          label: L(
            "Estimated savings / month",
            "Economia estimada / mês",
            "Ahorro estimado / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },

  // Engine 7 — Bernie
  {
    slug: "bernie",
    iconKey: "bernie",
    name: L("Bernie", "Bernie", "Bernie"),
    tag: L("AI SDR Agent", "Agente SDR com IA", "Agente SDR con IA"),
    desc: L(
      "An AI sales development rep embedded on your site — qualifies visitors, handles objections, and books calls. Trilingual. Never sleeps.",
      "Um SDR de IA embarcado no seu site — qualifica visitantes, lida com objeções e agenda calls. Trilíngue. Nunca dorme.",
      "Un SDR de IA embebido en tu sitio — califica visitantes, maneja objeciones y agenda llamadas. Trilingüe. Nunca duerme."
    ),
    valueProp: L(
      "A real-time AI sales concierge on your website. Trilingual. Trained on your services, FAQs, and tone. Books meetings while you sleep.",
      "Um concierge de vendas em tempo real no seu site. Trilíngue. Treinado nos seus serviços, FAQs e voz. Agenda reuniões enquanto você dorme.",
      "Un conserje de ventas en tiempo real en tu sitio. Trilingüe. Entrenado en tus servicios, FAQs y voz. Agenda reuniones mientras duermes."
    ),
    longDesc: L(
      "Bernie is the agent on this very site — the same one we deploy for clients. He answers questions about your services, qualifies the visitor, and books a call without anyone refreshing their inbox. Trained on your tone of voice, capped at 10 turns per chat, and hardened against prompt-injection from day one.",
      "O Bernie é o agente que está neste site — o mesmo que a gente coloca para os clientes. Ele responde sobre seus serviços, qualifica o visitante e agenda call sem ninguém ficar atualizando inbox. Treinado na sua voz, com limite de 10 turnos por chat e blindado contra prompt-injection desde o dia 1.",
      "Bernie es el agente que está en este sitio — el mismo que desplegamos para clientes. Responde sobre tus servicios, califica al visitante y agenda llamadas sin que nadie esté refrescando inbox. Entrenado en tu voz, con límite de 10 turnos por chat y blindado contra prompt-injection desde el día 1."
    ),
    details: LA(
      [
        "Qualifies visitors using MEDDIC + Challenger methodology",
        "Handles objections, books meetings, escalates hot leads to human",
        "Trilingual (EN/PT-BR/ES) — auto-detects visitor language",
      ],
      [
        "Qualifica visitantes com MEDDIC + Challenger",
        "Lida com objeções, agenda reuniões e escala lead quente para humano",
        "Trilíngue (EN/PT-BR/ES) — detecta o idioma do visitante automaticamente",
      ],
      [
        "Califica visitantes con MEDDIC + Challenger",
        "Maneja objeciones, agenda reuniones y escala leads calientes a humano",
        "Trilingüe (EN/PT-BR/ES) — autodetecta el idioma del visitante",
      ]
    ),
    bestFor: L(
      "Any B2B or service business with web traffic and a sales motion",
      "Qualquer B2B ou serviço com tráfego web e processo de vendas",
      "Cualquier B2B o servicio con tráfico web y proceso de ventas"
    ),
    anchor: L("From $99/mo", "A partir de US$ 99/mês", "Desde US$ 99/mes"),
    variant: "concierge",
    whoFor: LA(
      [
        "Service businesses with steady web traffic but slow lead response",
        "Brands with multilingual buyers (especially EN/PT-BR/ES)",
        "Founders tired of writing the same answers over and over",
        "Anyone whose 'contact form' converts under 1%",
      ],
      [
        "Negócios de serviço com tráfego constante mas resposta lenta",
        "Marcas com compradores multilíngues (especialmente EN/PT-BR/ES)",
        "Founders cansados de escrever as mesmas respostas várias vezes",
        "Qualquer um cujo 'formulário de contato' converte abaixo de 1%",
      ],
      [
        "Negocios de servicios con tráfico constante pero respuesta lenta",
        "Marcas con compradores multilingües (especialmente EN/PT-BR/ES)",
        "Founders cansados de escribir las mismas respuestas una y otra vez",
        "Cualquiera cuyo 'formulario de contacto' convierte debajo del 1%",
      ]
    ),
    features: [
      {
        title: L("Trained on your business", "Treinado no seu negócio", "Entrenado en tu negocio"),
        desc: L(
          "We feed Bernie your services, pricing rules, FAQs, founder bio, and tone-of-voice samples. Every answer is on-brand.",
          "Alimentamos o Bernie com seus serviços, regras de preço, FAQs, bio do founder e amostras de voz. Toda resposta é on-brand.",
          "Alimentamos a Bernie con tus servicios, reglas de precio, FAQs, bio del founder y muestras de voz. Cada respuesta es on-brand."
        ),
      },
      {
        title: L("Trilingual native", "Trilíngue nativo", "Trilingüe nativo"),
        desc: L(
          "Auto-detects EN, PT-BR, or ES from the visitor's first message. Replies in their language with regional register.",
          "Detecta EN, PT-BR ou ES da primeira mensagem do visitante. Responde no idioma com o registro regional.",
          "Detecta EN, PT-BR o ES desde el primer mensaje del visitante. Responde en su idioma con registro regional."
        ),
      },
      {
        title: L(
          "Sales-methodology trained",
          "Treinado em metodologias de vendas",
          "Entrenado en metodologías de ventas"
        ),
        desc: L(
          "Implicitly applies Corporate Visions, MEDDIC, Challenger, SPIN, and Voss-style mirroring. Always closes with a clear next step.",
          "Aplica implicitamente Corporate Visions, MEDDIC, Challenger, SPIN e mirroring estilo Voss. Sempre fecha com um próximo passo claro.",
          "Aplica implícitamente Corporate Visions, MEDDIC, Challenger, SPIN y mirroring estilo Voss. Siempre cierra con un próximo paso claro."
        ),
      },
      {
        title: L("Hardened by default", "Blindado por padrão", "Blindado por defecto"),
        desc: L(
          "Refuses prompt-injection, never reveals the system prompt, caps at 10 turns per chat, redirects compliance topics to humans.",
          "Rejeita prompt-injection, nunca revela o system prompt, limita 10 turnos por chat, redireciona temas de compliance para humanos.",
          "Rechaza prompt-injection, nunca revela el system prompt, limita 10 turnos por chat, redirige temas de cumplimiento a humanos."
        ),
      },
    ],
    process: [
      {
        week: L("Week 1", "Semana 1", "Semana 1"),
        deliverable: L(
          "Knowledge ingestion (services, FAQs, founder bio), voice samples, escalation rules.",
          "Ingestão de conhecimento (serviços, FAQs, bio do founder), amostras de voz, regras de escalonamento.",
          "Ingesta de conocimiento (servicios, FAQs, bio del founder), muestras de voz, reglas de escalamiento."
        ),
      },
      {
        week: L("Week 2", "Semana 2", "Semana 2"),
        deliverable: L(
          "Bernie deployed to staging. Internal QA across all three languages.",
          "Bernie em staging. QA interno nos três idiomas.",
          "Bernie en staging. QA interno en los tres idiomas."
        ),
      },
      {
        week: L("Week 3", "Semana 3", "Semana 3"),
        deliverable: L(
          "Go-live on production. Monitoring, conversation review, leak-bypass testing.",
          "Go-live em produção. Monitoramento, revisão de conversas, teste de bypass.",
          "Go-live en producción. Monitoreo, revisión de conversaciones, test de bypass."
        ),
      },
      {
        week: L("Week 4", "Semana 4", "Semana 4"),
        deliverable: L(
          "First-month metrics: chat-to-booking rate, conversion lift, voice tuning.",
          "Métricas do primeiro mês: chat-para-booking, lift de conversão, ajuste de voz.",
          "Métricas del primer mes: chat-a-booking, lift de conversión, ajuste de voz."
        ),
      },
    ],
    integrations: ["Anthropic Claude", "HubSpot", "Cal.com", "Resend", "Vercel"],
    primaryCta: {
      label: L("Talk to Bernie now", "Falar com o Bernie agora", "Hablar con Bernie ahora"),
      href: "#",
    },
    narrative: {
      problem: L(
        "Your website has traffic but most visitors leave without converting. A contact form converts under 1%. No human can staff the chat window 24/7 — and even if they could, they'd be answering the same five questions on repeat.",
        "Seu site tem tráfego mas a maioria dos visitantes vai embora sem converter. Formulário de contato converte abaixo de 1%. Nenhum humano cobre o chat 24/7 — e mesmo se cobrisse, ficaria respondendo as mesmas cinco perguntas em loop.",
        "Tu sitio tiene tráfico pero la mayoría de visitantes se va sin convertir. El formulario de contacto convierte debajo del 1%. Ningún humano cubre el chat 24/7 — y aun si pudiera, estaría respondiendo las mismas cinco preguntas en loop."
      ),
      challenge: L(
        "Generic chatbots feel generic. They damage trust more than they build it. Truly good sales conversations require knowing your services, your pricing logic, your competitive positioning, and your voice — none of which comes out of the box.",
        "Chatbots genéricos parecem genéricos. Eles destroem mais confiança do que constroem. Conversa de venda boa de verdade exige conhecer seus serviços, sua lógica de preço, seu posicionamento competitivo e a sua voz — nada disso vem de fábrica.",
        "Los chatbots genéricos se sienten genéricos. Destruyen más confianza de la que construyen. Una conversación de ventas realmente buena exige conocer tus servicios, tu lógica de precio, tu posicionamiento competitivo y tu voz — nada de eso viene de fábrica."
      ),
      consequence: L(
        "Every visitor who doesn't convert is pipeline you paid to acquire but never captured. At scale — 1,000 visitors per month, 1% conversion rate — you're losing 990 warm opportunities every single month. The cost compounds silently.",
        "Cada visitante que não converte é pipeline que você pagou para adquirir e nunca capturou. Em escala — 1.000 visitantes/mês, conversão de 1% — você perde 990 oportunidades quentes todo mês. O custo se compõe em silêncio.",
        "Cada visitante que no convierte es pipeline que pagaste para adquirir y nunca capturaste. A escala — 1.000 visitantes/mes, conversión 1% — pierdes 990 oportunidades calientes cada mes. El costo se compone en silencio."
      ),
      whyChange: L(
        "AI agents trained on your specific business can now have real qualification conversations, not keyword matching. The quality bar for AI-assisted sales chat has crossed the human threshold for most tier-1 conversations — in any language.",
        "Agentes de IA treinados no seu negócio específico já têm conversas reais de qualificação, não keyword matching. A qualidade do chat de vendas com IA cruzou o limiar humano na maioria das conversas tier-1 — em qualquer idioma.",
        "Los agentes de IA entrenados en tu negocio específico ya tienen conversaciones reales de calificación, no keyword matching. La calidad del chat de ventas con IA cruzó el umbral humano en la mayoría de conversaciones tier-1 — en cualquier idioma."
      ),
      whyNow: L(
        "LLMs with system-prompt training can hold brand-consistent, multi-turn sales conversations with sub-second response time and genuine sales methodology built in. The infrastructure to deploy this is a week of work, not a quarter.",
        "LLMs com treino de system prompt sustentam conversas multi-turno consistentes com a marca, resposta em menos de um segundo e metodologia de vendas embutida. A infra para deployar isso é uma semana de trabalho, não um trimestre.",
        "Los LLMs con entrenamiento de system prompt sostienen conversaciones multi-turno consistentes con la marca, respuesta en menos de un segundo y metodología de ventas integrada. La infraestructura para desplegar esto es una semana de trabajo, no un trimestre."
      ),
      why10xai: L(
        "Bernie is the same agent we run on 10xai.us right now. You see it working before you buy it. We train it on your business, test it in staging across all three languages, and go live in week 2. From $99/mo.",
        "O Bernie é o mesmo agente que a gente roda em 10xai.us agora. Você vê funcionando antes de comprar. A gente treina no seu negócio, testa em staging nos três idiomas e vai ao ar na semana 2. A partir de US$ 99/mês.",
        "Bernie es el mismo agente que corremos en 10xai.us ahora. Lo ves funcionando antes de comprarlo. Lo entrenamos en tu negocio, lo probamos en staging en los tres idiomas y va en vivo en la semana 2. Desde US$ 99/mes."
      ),
    },
    industries: [
      {
        name: L(
          "B2B Services & Agencies",
          "Serviços B2B & agências",
          "Servicios B2B & agencias"
        ),
        useCase: L(
          "Qualify inbound leads, explain service tiers, handle pricing objections, and book discovery calls — without a sales rep on standby.",
          "Qualifique leads inbound, explique tiers de serviço, lide com objeções de preço e agende discovery calls — sem rep de vendas em standby.",
          "Califica leads inbound, explica niveles de servicio, maneja objeciones de precio y agenda discovery calls — sin rep de ventas en standby."
        ),
        impact: L(
          "Chat-to-booking rate 3–5× higher than contact form alone",
          "Chat-para-booking 3–5× maior que só o formulário",
          "Chat-a-booking 3–5× mayor que solo el formulario"
        ),
      },
      {
        name: L(
          "Healthcare & Wellness",
          "Saúde & bem-estar",
          "Salud & bienestar"
        ),
        useCase: L(
          "Answer patient questions, explain service offerings, and route to booking — in English, Portuguese, or Spanish.",
          "Responda dúvidas de paciente, explique ofertas e direcione para booking — em inglês, português ou espanhol.",
          "Responde dudas de paciente, explica las ofertas y deriva al booking — en inglés, portugués o español."
        ),
        impact: L(
          "Immediate response regardless of office hours or timezone",
          "Resposta imediata independente do horário ou fuso",
          "Respuesta inmediata sin importar horario u zona horaria"
        ),
      },
      {
        name: L(
          "Real Estate & Finance",
          "Imobiliário & finanças",
          "Inmobiliario & finanzas"
        ),
        useCase: L(
          "Pre-qualify prospects, explain product options, and book appointments with advisors — with full compliance guardrails built in.",
          "Pré-qualifique prospects, explique opções de produto e agende com advisors — com guardrails de compliance embarcados.",
          "Precalifica prospectos, explica opciones de producto y agenda con asesores — con guardrails de cumplimiento integrados."
        ),
        impact: L(
          "No-show rate reduced by pre-qualification step",
          "No-show reduzido pela etapa de pré-qualificação",
          "No-show reducido por la etapa de precalificación"
        ),
      },
      {
        name: L("E-commerce & Retail", "E-commerce & varejo", "E-commerce & retail"),
        useCase: L(
          "Handle product questions, shipping inquiries, and return policies — escalating only complex cases to a human agent.",
          "Cuide de dúvidas de produto, envio e política de troca — escalando só casos complexos para um humano.",
          "Cubre dudas de producto, envío y política de devolución — escalando solo casos complejos a un humano."
        ),
        impact: L(
          "70%+ of pre-sale questions resolved instantly",
          "70%+ das dúvidas pré-venda resolvidas na hora",
          "70%+ de las dudas previas a venta resueltas al instante"
        ),
      },
    ],
    roi: {
      inputs: [
        {
          key: "visitorsPerMonth",
          label: L(
            "Monthly website visitors",
            "Visitantes do site / mês",
            "Visitantes del sitio / mes"
          ),
          unit: "count",
          min: 100,
          max: 50000,
          step: 100,
          default: 1000,
        },
        {
          key: "currentConversion",
          label: L(
            "Current conversion rate (%)",
            "Conversão atual (%)",
            "Conversión actual (%)"
          ),
          unit: "percent",
          min: 0.1,
          max: 5,
          step: 0.1,
          default: 0.5,
        },
        {
          key: "dealValue",
          label: L("Average deal value", "Valor médio do deal", "Valor promedio del deal"),
          unit: "usd",
          min: 500,
          max: 50000,
          step: 500,
          default: 2500,
        },
      ],
      outputs: [
        {
          key: "additionalLeads",
          label: L(
            "Additional leads / month",
            "Leads adicionais / mês",
            "Leads adicionales / mes"
          ),
          format: "count",
        },
        {
          key: "revenueImpact",
          label: L(
            "Estimated revenue impact / month",
            "Impacto estimado de receita / mês",
            "Impacto estimado de ingresos / mes"
          ),
          format: "usd",
        },
        {
          key: "payback",
          label: L("Estimated payback period", "Payback estimado", "Payback estimado"),
          format: "months",
        },
      ],
    },
  },
];

// ── Localization helpers + public API ───────────────────────────

function localizeEngine(raw: RawEngine, locale: Locale): EngineDetail {
  return {
    slug: raw.slug,
    iconKey: raw.iconKey,
    name: pick(raw.name, locale),
    tag: pick(raw.tag, locale),
    desc: pick(raw.desc, locale),
    valueProp: pick(raw.valueProp, locale),
    longDesc: pick(raw.longDesc, locale),
    details: pick(raw.details, locale),
    bestFor: pick(raw.bestFor, locale),
    anchor: pick(raw.anchor, locale),
    href: raw.href,
    whoFor: pick(raw.whoFor, locale),
    features: raw.features.map((f) => ({
      title: pick(f.title, locale),
      desc: pick(f.desc, locale),
    })),
    process: raw.process.map((p) => ({
      week: pick(p.week, locale),
      deliverable: pick(p.deliverable, locale),
    })),
    integrations: raw.integrations,
    primaryCta: raw.primaryCta
      ? { label: pick(raw.primaryCta.label, locale), href: raw.primaryCta.href }
      : undefined,
    narrative: {
      problem: pick(raw.narrative.problem, locale),
      challenge: pick(raw.narrative.challenge, locale),
      consequence: pick(raw.narrative.consequence, locale),
      whyChange: pick(raw.narrative.whyChange, locale),
      whyNow: pick(raw.narrative.whyNow, locale),
      why10xai: pick(raw.narrative.why10xai, locale),
    },
    industries: raw.industries.map((i) => ({
      name: pick(i.name, locale),
      useCase: pick(i.useCase, locale),
      impact: pick(i.impact, locale),
    })),
    roi: {
      inputs: raw.roi.inputs.map((i) => ({ ...i, label: pick(i.label, locale) })),
      outputs: raw.roi.outputs.map((o) => ({ ...o, label: pick(o.label, locale) })),
    },
    variant: raw.variant,
  };
}

function normalizeLocale(locale: string | undefined): Locale {
  if (locale === "pt" || locale === "pt-BR" || locale?.startsWith("pt")) return "pt";
  if (locale === "es" || locale?.startsWith("es")) return "es";
  return "en";
}

export function getEngines(locale: string = "en"): EngineDetail[] {
  const loc = normalizeLocale(locale);
  return RAW_ENGINES.map((r) => localizeEngine(r, loc));
}

export function getEngine(slug: string, locale: string = "en"): EngineDetail | undefined {
  const raw = RAW_ENGINES.find((r) => r.slug === slug);
  if (!raw) return undefined;
  return localizeEngine(raw, normalizeLocale(locale));
}

export function getAllEngineSlugs(): string[] {
  return RAW_ENGINES.map((r) => r.slug);
}

/** Subset used by the home page card grid (shape that EngineCard expects). */
export function getHomeEngines(locale: string = "en"): Engine[] {
  return getEngines(locale).map((engine) => {
    return {
      iconKey: engine.iconKey,
      name: engine.name,
      tag: engine.tag,
      desc: engine.desc,
      details: engine.details,
      bestFor: engine.bestFor,
      anchor: engine.anchor,
      href:
        engine.name === "Lighthouse"
          ? "/lighthouse-demo"
          : `/engines/${engine.slug}`,
    };
  });
}

// Backward-compat: default English export so any caller that hasn't been
// migrated still works (will show English content in non-EN locales until
// the call site is updated to pass a locale).
export const ENGINES: EngineDetail[] = getEngines("en");
