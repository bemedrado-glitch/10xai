// Persona-level sales playbook content
// Keyed by exact persona NAME (matches the value in the personas table).
// Source: research/22-market-research-icp-and-cadences.md + research/23-sales-plan-pricing-vw.md
//
// Each entry is the operational psychology of that persona: what they want,
// what they fear, the SPIN questions that move them, and the top objections
// you'll hear with mirror + positive responses for handling.

export type SpinQuestion = {
  type: "situation" | "problem" | "implication" | "need-payoff";
  question: string;
};

export type Objection = {
  objection: string;
  mirror: string;
  positive_response: string;
};

export type PlaybookEntry = {
  persona: string;
  worldview: string;
  needs: string[];
  desires: string[];
  pains: string[];
  fears: string[];
  spin_questions: SpinQuestion[];
  objections: Objection[];
};

export const PLAYBOOK: Record<string, PlaybookEntry> = {
  // ───────────────────────────────────────────────
  "Local Service · No Website": {
    persona: "Mike, the owner-operator (HVAC / plumbing / landscaping / cleaning)",
    worldview:
      "I built this business with my hands. The work is the product. Anyone in marketing trying to sell me 'leads' or 'SEO' has burned me before. If you can't show me results in the first month, I don't care how good your slide deck is.",
    needs: [
      "A way to show up on Google when someone searches my service",
      "Phones answered when I'm under a sink or on a roof",
      "An online presence that proves I'm a real, established business",
      "Customer reviews displayed somewhere visible",
      "A simple way to send quotes after a job site visit",
      "Photos of my actual work front-and-center",
      "A texting workflow because customers text more than call now",
      "A booking calendar that doesn't require my receptionist",
      "Something that handles after-hours leads while I sleep",
      "Proof I can show banks/lenders that the business is professional",
    ],
    desires: [
      "Stop losing jobs to the bigger company down the road that has a website",
      "Take Sundays off without losing weekend leads to competitors",
      "Hire a second crew without doubling my admin headache",
      "Send my kids to college off this business",
      "Sell the business in 10 years for retirement money",
      "Stop being the bottleneck for everything",
      "Have a real brand, not just my name on a truck",
      "Charge premium prices because the operation looks premium",
      "Get more 5-star reviews than the franchise competitor",
      "Sleep at night knowing the phone is being handled",
    ],
    pains: [
      "Half my voicemails go unanswered for 24+ hours",
      "I spend evenings doing quotes on paper",
      "Marketing agencies I've hired charged $1K+/mo and disappeared",
      "My nephew said he'd build me a website 14 months ago",
      "QuickBooks invoices look like they came from 1998",
      "I miss texts because my phone is in another room",
      "Customers ask for 'your website' and I have to say I don't have one",
      "Reviews pile up unanswered and I don't know which are bad ones",
      "Every Monday morning is chaos catching up on weekend missed calls",
      "Insurance and licensing renewals get forgotten and cost late fees",
    ],
    fears: [
      "Spending money on marketing that doesn't work — again",
      "Looking unprofessional in front of a big customer",
      "A competitor poaching my best regular customer",
      "Getting locked into a long contract I can't get out of",
      "Tech I can't operate myself when the vendor disappears",
      "A bad review I can't respond to going viral on NextDoor",
      "Hiring a marketing person and them not delivering",
      "My phone going down and losing a day of leads",
      "Being too dependent on one platform (Google, Angi, NextDoor)",
      "Not being able to read what an AI sends out in my name",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "When a new customer searches '[your service] near me' on their phone right now, what do they actually find that points to you?",
      },
      {
        type: "problem",
        question:
          "Of the calls that come in while you're on a job — say between 9am and 4pm — how many do you think get a callback within the same hour, honestly?",
      },
      {
        type: "implication",
        question:
          "If half your missed calls become missed jobs at $400 a ticket — what's that costing you over a 12-month period? Most guys haven't done this math.",
      },
      {
        type: "need-payoff",
        question:
          "If you walked into a Monday morning with 8 jobs already booked from the weekend — handled by a system that picks up every call, books in your calendar, and shows your real reviews — what would that be worth to you?",
      },
    ],
    objections: [
      {
        objection: "I tried a marketing agency last year — they took $1,200 a month and did nothing.",
        mirror: "They took $1,200 a month and did nothing?",
        positive_response:
          "That's exactly why we don't operate like an agency. We don't bill you to 'manage' something — we deliver a working website + a system that picks up your calls. You see exactly what we built before you decide. If it's not working in 60 days, we walk and you keep the site.",
      },
      {
        objection: "I don't really need a website — my customers come from word of mouth.",
        mirror: "Customers come from word of mouth?",
        positive_response:
          "That's actually proof your reputation is solid — top 5% in your area. Here's what you might be missing: when those word-of-mouth referrals try to find you online before calling, half don't follow through because there's nothing for them to verify. Adding the site doesn't replace word of mouth; it stops the leak in it.",
      },
      {
        objection: "I'll think about it — let me talk to my wife/business partner.",
        mirror: "You want to talk to her first?",
        positive_response:
          "Of course — this is a real decision. Here's what I'd do: forward her the preview URL of the website I already built for {business_name}. Let her see what we're talking about, not describe it. I'll keep that preview live until Friday so you both have time. Then she's deciding from facts, not a sales pitch.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "Restaurant · Insta-only (BR)": {
    persona: "Carla — dona de restaurante / café (Brazil)",
    worldview:
      "Meu Instagram é meu site. Meu WhatsApp é meu CRM. Eu vivo no celular durante o serviço e o admin é à noite. Confiar em alguém que vai 'cuidar' do meu canal de cliente é difícil — se quebrar no sábado às 19h, é meu problema, não do fornecedor.",
    needs: [
      "Um site real que o Google encontra quando alguém procura comida em {city}",
      "Cardápio sempre atualizado em um só lugar",
      "Reservas chegando direto no calendário sem 50 mensagens de WhatsApp",
      "Resposta rápida no WhatsApp mesmo no horário de pico",
      "Galeria de fotos boas do prato (não só Instagram)",
      "Avaliações respondidas com agilidade",
      "Integração com iFood / Rappi sem virar 4 planilhas",
      "Notificação no celular quando chega cliente importante (jornalista, influencer)",
      "Histórico de pedidos para identificar cliente fiel",
      "Algo que não exija que eu aprenda mais um app",
    ],
    desires: [
      "Tirar uma noite de folga sem perder reservas",
      "Aumentar ticket médio em 15% sem trocar a equipe",
      "Ser referência no bairro / zona",
      "Abrir uma segunda unidade sem dobrar o trabalho admin",
      "Ter dias de pico previsíveis e gerenciáveis",
      "Sair do WhatsApp pessoal para algo profissional",
      "Marketing automático que não soa robótico",
      "Coleta de email de clientes para campanhas próprias",
      "Reduzir 'no-show' em reservas",
      "Aparecer na primeira página do Google na minha categoria",
    ],
    pains: [
      "WhatsApp com 200+ mensagens não-lidas todo sábado",
      "Cliente perguntando 'tem mesa?' e ninguém responde a tempo",
      "Conta do Insta hackeada uma vez já — trauma",
      "Cardápio de PDF desatualizado circulando por aí",
      "iFood me cobra 25% e não tenho controle de fidelização",
      "Reviews 5 estrelas sem resposta — me dá ansiedade",
      "Toda quarta de manhã eu acordo com 30 cotações de evento por responder",
      "Funcionário de salão saiu e levou os contatos de cliente VIP",
      "Não sei quem são os meus clientes recorrentes",
      "Cliente me chama na DM do Insta e perdi a notificação",
    ],
    fears: [
      "Investir em tecnologia e o restaurante vazio",
      "Cliente perceber que sou eu respondendo (não a equipe) e parecer pequeno",
      "Mudar de plataforma e perder histórico de cliente",
      "Concorrente abrir do lado e ter sistema melhor que o meu",
      "Quebrar a voz do meu restaurante com automação genérica",
      "Travar em uma ferramenta cara que não consigo cancelar",
      "Aparecer no Google sem controle do que está sendo dito",
      "Spam ou bot na minha conta de WhatsApp Business",
      "LGPD e os emails que coletei sem permissão clara",
      "Desligar o iFood e não saber substituir o canal de delivery",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "Hoje, quando alguém te manda 'tem mesa pra hoje?' às 19h num sábado, qual é o caminho dessa mensagem até confirmar com o cliente — quem responde, em quanto tempo?",
      },
      {
        type: "problem",
        question:
          "Numa semana cheia de eventos, quantas reservas você acha que perde porque a resposta do WhatsApp demora demais? Não precisa ser exato.",
      },
      {
        type: "implication",
        question:
          "Se 5 reservas perdidas por semana × 4 pessoas × R$ 90 ticket = R$ 7.200/semana, ou R$ 28 mil/mês — esse número faria diferença pro próximo trimestre?",
      },
      {
        type: "need-payoff",
        question:
          "Se um agente de WhatsApp respondesse cada mensagem em 8 segundos com a sua voz, na sua agenda, e só te passasse o que precisa de você — você consegue imaginar como seria a sua próxima sexta-feira?",
      },
    ],
    objections: [
      {
        objection: "Eu não tenho tempo pra implantar mais um sistema agora.",
        mirror: "Não tem tempo pra mais um sistema?",
        positive_response:
          "Justamente — é por isso que a gente entrega o sistema rodando, não um software pra você operar. Em 7 dias o site está no ar e o agente de WhatsApp responde sozinho. Seu envolvimento são 30 minutos para revisar a voz, e mais nada até o primeiro relatório.",
      },
      {
        objection: "Já paguei agência de marketing antes — não funcionou.",
        mirror: "A agência não funcionou?",
        positive_response:
          "Faz sentido essa frustração — 80% das agências cobram pra 'gerenciar' sem entregar resultado mensurável. A gente cobra pra entregar dois resultados específicos: site no ar + WhatsApp respondendo 24/7. Se em 60 dias não houver pelo menos 8 reservas extras vindas desses dois canais, a gente devolve.",
      },
      {
        objection: "Meu Insta já funciona como site, não preciso de outro.",
        mirror: "O Insta já está funcionando?",
        positive_response:
          "Está mesmo — é por isso que você é top em {city}. Mas o Insta não aparece na primeira página do Google quando alguém pesquisa 'restaurante {city}'. O site não substitui o Insta, ele captura a outra metade dos clientes que procuram por busca, não por rede social. Posso te mostrar a prévia já pronta?",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "Auto / Taller · No Website (LatAm)": {
    persona: "Don Rafael / Seu João — dueño de taller mecánico (LatAm-ES)",
    worldview:
      "Yo soy mecánico. La página la hace mi sobrino — algún día. WhatsApp es mi ferramenta. La competencia que tiene página sale primero en Google y eso me molesta, pero no sé por dónde empezar sin que me cobren un dineral.",
    needs: [
      "Aparecer en Google cuando alguien busca '[mi servicio] cerca de mí'",
      "Una página real con fotos del taller y el equipo",
      "Cotizaciones por WhatsApp que no se pierdan",
      "Un sistema que filtre las consultas serias de las que no lo son",
      "Calendario de citas que no choque con visitas walk-in",
      "Recordatorios automáticos al cliente para servicios preventivos",
      "Mostrar mis reseñas de Google en algún lugar fijo",
      "Listado claro de servicios y precios indicativos",
      "Forma de cobrar adelanto / depósito para confirmar cita",
      "Algo que mi hijo o sobrino pueda mantener fácil",
    ],
    desires: [
      "Cerrar el doble de cotizaciones que llegan por WhatsApp",
      "Subir el ticket promedio sin que se sienta forzado",
      "Reducir 'no-show' de clientes que dijeron que venían",
      "Que el taller proyecte profesionalismo desde la primera impresión digital",
      "Tener clientes corporativos / flotas, no solo particulares",
      "Vender servicios complementarios (alineación, balanceo, neumáticos)",
      "Salir antes del taller los viernes",
      "Ser el taller de referencia del barrio / colonia",
      "Pasar el negocio a mi hijo en 5–10 años",
      "Cobrar precios premium sin perder clientes",
    ],
    pains: [
      "30 cotizaciones por WhatsApp por semana — cierro 9",
      "El cliente me pide foto del precio y se va con la competencia",
      "Olvido seguimiento a quien dijo 'lo pienso y te aviso'",
      "Mi WhatsApp se llena de gente preguntando precio sin querer comprar",
      "Citas se cruzan porque no hay agenda compartida con los técnicos",
      "Reseñas excelentes que nunca aprovecho en marketing",
      "El sobrino prometió la página hace 2 años",
      "No sé cuáles cotizaciones funcionaron vs cuáles no",
      "Pierdo seguimiento del mantenimiento preventivo del cliente",
      "Cuando viajo no atiende nadie las consultas online",
    ],
    fears: [
      "Pagar mucho por una página que nadie ve",
      "Quedarme atrapado en un contrato anual sin salida",
      "Que la tecnología se caiga el sábado y pierda todo el día",
      "Una mala reseña que no sepa cómo responder",
      "Que un cliente pague depósito y luego cancele sin recuperar el costo",
      "Modernizar y perder al cliente tradicional que me conoce",
      "Que un robot responda mal y dañe mi reputación",
      "Empleados nuevos sin saber operar el sistema digital",
      "Que la competencia copie mis precios fácilmente al estar online",
      "Tener que aprender otro app además de WhatsApp",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "Hoy, cuando llega una cotización por WhatsApp un sábado a las 8pm, ¿qué pasa? ¿La contesta usted, su hijo, nadie?",
      },
      {
        type: "problem",
        question:
          "De 30 cotizaciones que llegan por semana, ¿cuántas terminan en cita real? Si me dice 'unas 10 más o menos', está perdiendo dos tercios.",
      },
      {
        type: "implication",
        question:
          "Si su ticket promedio es MX$ 3,500 y pierde 15 cotizaciones por semana — eso es MX$ 52,500 por semana, o MX$ 210,000 al mes que se va a la competencia. ¿Ese número le cambia algo?",
      },
      {
        type: "need-payoff",
        question:
          "Imagínese llegando al taller el lunes con 8 citas confirmadas, depósito ya cobrado, y un agente de WhatsApp que respondió las cotizaciones del fin de semana en su voz, sin que usted tocara el celular. ¿Cómo sería esa semana?",
      },
    ],
    objections: [
      {
        objection: "Yo no necesito página, mis clientes me llegan por boca a boca.",
        mirror: "Le llegan por boca a boca?",
        positive_response:
          "Eso significa que su servicio es bueno — sus reseñas lo confirman. El boca a boca trae al cliente al WhatsApp. Lo que le falta es lo que pasa antes del WhatsApp: la persona que busca 'mecánico' en Google y no lo encuentra. La página no reemplaza el boca a boca, captura la mitad que no le está llegando.",
      },
      {
        objection: "Páginas son caras y las cobran por años.",
        mirror: "Caras y por años?",
        positive_response:
          "Por eso lo nuestro es diferente: MX$ 7,500 inicial y MX$ 750 al mes — y se cancela cuando quiera, sin penalización. Si en 90 días no le funciona, lo cancela y se queda con la página de regalo. La idea es que se gane sola con una sola cotización extra cerrada al mes.",
      },
      {
        objection: "No tengo tiempo de aprender un sistema nuevo.",
        mirror: "No tiene tiempo de aprender un sistema?",
        positive_response:
          "Por eso la operación queda con nosotros — usted no aprende nada nuevo. El WhatsApp es el mismo que ya usa. La página la administramos. Su única tarea son los 20 minutos de revisión mensual donde le mostramos qué cotizaciones cerró, cuáles no, y por qué.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "Clinic · Booking Bottleneck": {
    persona: "Dr. Jordan — practitioner-owner (dental / aesthetic / fitness / wellness)",
    worldview:
      "I'm a clinician first, business owner second. The business stuff is necessary but it's not why I went into this. I trust software the way I trust a new associate — slowly, after seeing it work, and only after my front desk is comfortable with it.",
    needs: [
      "Phone calls answered during lunch breaks without a human at the desk",
      "Bookings going straight into the practice management system, not duplicated",
      "Insurance verification questions answered without a 5-minute call",
      "Reviews responded to within 4 hours, in my actual voice",
      "After-hours bookings confirmed by the next morning",
      "A way to reduce no-shows without sounding pushy",
      "Reactivation of patients who haven't been in for 12+ months",
      "Patient intake forms filled out before they arrive",
      "Clear visibility into chair utilization vs scheduled hours",
      "Something my front desk doesn't have to be 'trained' on for weeks",
    ],
    desires: [
      "Reclaim my evenings and Sundays from review-response and admin",
      "Run two locations from one team without doubling overhead",
      "Premium positioning (5-star reviews + responsive online presence)",
      "Larger average case size from new patients",
      "Reduce front desk turnover by removing the highest-stress tasks",
      "Add a part-time hygienist without adding chaos",
      "Predictable revenue per chair per week",
      "More referrals from happy patients (programmatic, not random)",
      "Less time on insurance admin per patient",
      "A practice that doesn't need me physically present 5 days/week",
    ],
    pains: [
      "Lunch-hour phone abandonment is killing new patient acquisition",
      "Front desk turns over every 14–18 months and retraining is brutal",
      "Review backlog of 200+ unanswered 5-stars on Google",
      "Insurance/coverage questions eat 90 min/morning",
      "PMS doesn't talk to my booking software — duplicate data entry",
      "Patient intake forms are 50% incomplete on arrival",
      "Recall calls for hygiene (6-month checkups) get forgotten",
      "Marketing agency I tried last year delivered Facebook posts and nothing else",
      "Cancellations not being filled because nobody's actively managing the waitlist",
      "I'm answering basic patient questions on my phone at 9pm",
    ],
    fears: [
      "Patient data being mishandled — HIPAA violations terrify me",
      "An AI answering a patient incorrectly about a medical question",
      "Front desk feeling 'replaced' and quitting",
      "Locked into a contract with software that doesn't actually integrate with my PMS",
      "Vendor going out of business mid-implementation",
      "Compliance audit finding I delegated patient communication to a bot",
      "Reviews dropping from 4.9 to 4.7 because the AI was off-tone",
      "Spending $5K+ to find out it doesn't work for our specialty",
      "Switching costs if we need to leave",
      "Patients feeling the 'human touch' is gone",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "Walk me through what happens to a phone call that comes in between 12:15 and 1:30pm — when both your front-desk people are at lunch.",
      },
      {
        type: "problem",
        question:
          "If your chair sits empty 4 slots a week because someone called during lunch and didn't leave a voicemail — what do you think that's costing per quarter?",
      },
      {
        type: "implication",
        question:
          "At average new-patient LTV of $2,000 in your specialty, missing 4 lunch-hour callbacks a week × 50 weeks = $400K of LTV exposure annually. Add review-response delays and recall-call gaps, and the number doubles. Is that the size of problem you'd want to solve this quarter — or accept as the cost of doing business?",
      },
      {
        type: "need-payoff",
        question:
          "If your front desk walked in Monday to 11 confirmed bookings, every weekend review responded, and recall calls handled — what would they actually do with the freed-up 12 hours a week?",
      },
    ],
    objections: [
      {
        objection: "Patients want to talk to a human — they'll feel weird with AI.",
        mirror: "They want to talk to a human?",
        positive_response:
          "Absolutely true — and that's exactly the point. The AI handles the 60% of calls that are 'what's your hours' / 'do you take Aetna' / 'I want to book a cleaning.' The human at your desk gets to focus on the 40% that actually need human judgment — the nervous new patient, the insurance dispute, the complex case. Patients who need a human still get one — faster.",
      },
      {
        objection: "We tried a chatbot last year — it didn't work.",
        mirror: "The chatbot didn't work?",
        positive_response:
          "I bet it sat on the website doing FAQ answers nobody read. What we're talking about is different — it's a system that handles real phone calls, books real appointments in your real PMS, and responds to real reviews in your voice. Not a chat widget. Want me to send you a 90-second recording of what it sounds like answering a typical lunch-hour call?",
      },
      {
        objection: "It needs to integrate with our PMS or it's not happening.",
        mirror: "Integration with your PMS is non-negotiable?",
        positive_response:
          "Exactly right — without that it's a toy. Which PMS — Dentrix, Eaglesoft, Open Dental? We have direct integrations with the top 5 in dental, and for everything else we use a verified-input layer where the AI surfaces the booking and your front desk one-click confirms in the PMS. That's the v1; full sync is v2.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "SMB · No CRM": {
    persona: "Patricia — managing partner (accounting / law / financial advisory / B2B services)",
    worldview:
      "Our practice runs on relationships and trust. We're not selling widgets — we're selling judgment. CRMs feel like a thing salespeople use; we don't 'sell,' we 'develop relationships.' But I know we're losing leads in the cracks and it bothers me.",
    needs: [
      "Capture every inbound that comes through the website, phone, referral, or LinkedIn",
      "A view of what's owed to whom, today, this week",
      "Automatic follow-up on inquiries we haven't responded to in 5 days",
      "Tracking which referral sources are actually producing engaged clients",
      "A way to see the revenue pipeline without a partner-meeting deck",
      "Consistent messaging across all partners (no rogue replies)",
      "Search history of every interaction with a given prospect",
      "Clean handoff when an associate leaves the firm",
      "Something the senior partners don't refuse to use",
      "Compliance-friendly storage of client communications",
    ],
    desires: [
      "Convert a higher % of inbound RFPs into engagements",
      "Reduce partner time spent on lead qualification",
      "Win more 'qualified out' deals (the ones competitors didn't even pursue)",
      "Increase average matter / engagement size",
      "Make associate origination measurable for compensation purposes",
      "Decrease time-to-first-response on inbound (the 5-min rule)",
      "Have the firm operate without a single partner being a bottleneck",
      "Predictable revenue forecast for partner meetings",
      "Stop losing inbound because the associate who 'owned' it left",
      "A measurable answer to 'what does our marketing actually produce'",
    ],
    pains: [
      "Inbound emails get forwarded around for 3 days before someone responds",
      "We don't know who has reached out to us in the past 12 months",
      "RFPs sit in someone's inbox until the deadline forces action",
      "Lost 6 deals last year that 'someone forgot about'",
      "Senior partners refuse to log activities — won't trust a CRM",
      "Inconsistent voice across partner replies",
      "Multiple partners contacting the same prospect, looking unprofessional",
      "Conference leads collected on cards that never get followed up",
      "Marketing investments untraceable to revenue",
      "Two associates left and the firm lost 11 prospects with them",
    ],
    fears: [
      "A CRM the partners refuse to adopt and we paid $30K for nothing",
      "Compliance/privilege issues with conversations being logged in a third-party system",
      "Lock-in: all our client data inside a vendor we can't easily leave",
      "Salesforce-style implementation that drags 9 months",
      "Looking aggressive / sales-y to long-time clients",
      "An associate gaming the activity-logging for compensation",
      "Sensitive matters (disputes, litigation) being indexed by AI",
      "Email integration leaking confidential metadata",
      "Becoming dependent on a junior to operate the system",
      "Spending time learning software instead of practicing law / accounting",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "When a new prospect emails 'we'd like to talk to your firm about [matter]' — what's the actual workflow from inbox to first call?",
      },
      {
        type: "problem",
        question:
          "Of the inquiries that come in via website / referral / LinkedIn in any given month — what percentage do you think get a substantive response within 24 hours?",
      },
      {
        type: "implication",
        question:
          "Industry data: firms with no lead-management system convert 12% of inbound; firms with one convert 22–28%. On a $5K average engagement, the gap is roughly $50K–$80K/year for a firm your size — and that's just the inbound that reached you, not the silent attrition. Is that material to your partner mtg conversations?",
      },
      {
        type: "need-payoff",
        question:
          "If every Monday 7am, you got a single email saying 'these 3 inquiries are worth a call this week, here's why, here's the prior context' — and your partners stopped having to think about who-owes-what — what does that change about your week?",
      },
    ],
    objections: [
      {
        objection: "Our partners won't use it. They refuse to log activities.",
        mirror: "The partners won't log activities?",
        positive_response:
          "Same in every firm I've worked with. That's why we don't ask them to. The system pulls from email, calendar, and Zoom transcripts automatically. No data entry. The partners get a Monday digest that takes 90 seconds to read; they never log into the CRM. It's the only way it actually works at the partner level.",
      },
      {
        objection: "We've looked at Salesforce/HubSpot and it's just too much for us.",
        mirror: "Salesforce was too much?",
        positive_response:
          "It was — those are built for sales teams of 50 selling to enterprise. We built this for partner-led firms specifically. No pipeline stages, no activity points, no dashboards. Just: who reached out, who hasn't been responded to, what's at stake. Like a partner's weekly check-in note, but automated.",
      },
      {
        objection: "Privilege concerns — I can't have client communications in a third-party system.",
        mirror: "Privilege concerns are blocking it?",
        positive_response:
          "100% legitimate — I've worked with firms that won't sign a SaaS contract without a BAA-equivalent. We deploy in your tenant, your S3 bucket, your email server. No data leaves your infrastructure. The model runs on your encrypted store. Your IT lead reviews the architecture before any rollout. Want to send the architecture doc to your COO?",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "Pro Firm · Content Gap": {
    persona: "Patricia (alt)/Marketing-aware partner — accounting, law, financial firms",
    worldview:
      "Content is something we know we should do, but partners can't write fast enough and associates can't write at our level. The voice has to be ours or it's not worth publishing. AI scares me unless I see the partner approval step.",
    needs: [
      "Partner-voice writing without partner-time-cost",
      "Editorial calendar that reflects practice priorities",
      "Industry-relevant topics, not generic LinkedIn posts",
      "Distribution beyond just the firm website",
      "Compliance review built into the workflow",
      "SEO that ranks for our practice area + geo",
      "A way to repurpose long-form into LinkedIn / newsletter / video",
      "Measurable impact on inbound pipeline",
      "Internal stakeholder buy-in before publishing",
      "Brand consistency across all partners' bylines",
    ],
    desires: [
      "Be the firm cited by trade publications in our space",
      "Position our partners as the go-to experts in [practice area]",
      "Generate inbound that competes with the Big-Four-equivalents",
      "Build a content moat that compounds over 3–5 years",
      "Hire on the basis of brand strength, not just compensation",
      "Predictable inbound from organic / SEO",
      "Eliminate the 'we should publish more' guilt cycle",
      "Younger partners building a public profile that helps origination",
      "A real podcast / video presence",
      "Industry-conference speaking slots that flow from content",
    ],
    pains: [
      "Last published in 11 months — competitors published 14 in same window",
      "Junior associates can't capture partner voice",
      "Partner interview-then-write workflow takes 4 weeks per piece",
      "Marketing director keeps asking for content that nobody writes",
      "LinkedIn presence is dormant",
      "Trade publications stopped pitching us for quotes",
      "Content we did publish went nowhere because there was no distribution plan",
      "Compliance review adds 2 weeks to every piece",
      "Topics get chosen by enthusiasm, not strategy",
      "AI-generated content sounds like AI-generated content",
    ],
    fears: [
      "AI writing in our voice incorrectly — embarrassment",
      "Compliance issue from a published piece (forward-looking statement, unauthorized practice)",
      "A piece going viral for the wrong reason",
      "Spending 6 months on content with zero attribution to revenue",
      "Becoming dependent on content vendor and losing editorial control",
      "Plagiarism / sourcing issues from AI",
      "Partner refusing to approve drafts → backlog",
      "Newsletter sign-up rate so low it's embarrassing",
      "Competing against firms with 10× the content budget",
      "Content sounding 'younger' than the firm's actual sophistication",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "When was the last time {firm_name} shipped a piece of public-facing thought leadership — and what was the partner-time cost behind it?",
      },
      {
        type: "problem",
        question:
          "If you ran a search today for '[your practice area] firm in [your city]' — what shows up first, your firm or your two main competitors?",
      },
      {
        type: "implication",
        question:
          "If two competitors published 14 and 22 pieces in the same period {firm_name} published 0 — over 18 months, what does that mean for the inbound your associates inherit?",
      },
      {
        type: "need-payoff",
        question:
          "If your partners spent 30 minutes a quarter being interviewed, and you shipped 12 published pieces in their voice each year — what does that compound into over 3 years?",
      },
    ],
    objections: [
      {
        objection: "AI-written content can't capture our partners' voices.",
        mirror: "AI can't capture partner voices?",
        positive_response:
          "Generic AI can't — agreed. Our process starts with 30 minutes of partner audio per piece. The AI extracts the structure, the analogies, the position. The partner approves a near-final draft before it ships. Two firms ran this last quarter — partners said the published version was indistinguishable from their own writing. Want me to send the case study?",
      },
      {
        objection: "Compliance review will kill any AI workflow.",
        mirror: "Compliance review will kill it?",
        positive_response:
          "Most setups make compliance the bottleneck. We bake compliance review into the AI step itself — the model is trained on your firm's prior approved content, your style guide, your forbidden phrases. By the time a draft reaches compliance, 90% of historical issues are already resolved. Compliance review goes from 2 weeks to 2 days.",
      },
      {
        objection: "We've never seen ROI from content marketing.",
        mirror: "No ROI from content?",
        positive_response:
          "Most firms don't measure correctly — they look at page views. The ROI is in inbound pipeline at 9-month delay. Two firms running this saw 6-figure pipeline within 90 days; both attribute 80%+ to content. We track lead-source per inbound and produce the attribution report quarterly. If at month 6 there's no measurable pipeline impact, we revise the strategy or refund.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "SMB · No Social Presence": {
    persona: "Owner — service / retail / hospitality SMB with dormant Instagram, Facebook, TikTok",
    worldview:
      "Social media is supposed to grow my business, but I can't tell what works and the daily content treadmill is exhausting. I see competitors with great Insta accounts and assume they have a marketing person — must be nice.",
    needs: [
      "Consistent posting cadence I don't have to manage daily",
      "Captions that sound like me, not corporate AI",
      "Photo / video content from my actual business (not stock)",
      "A way to repurpose one event into 5 pieces of content",
      "Customers seeing my Insta and feeling 'this place is alive'",
      "Engagement responses (DMs, comments) without me checking 4× a day",
      "Posting at the right time of day for my audience",
      "Cross-posting to FB / TikTok / Reels without 4× the work",
      "Audience growth that translates to actual customers",
      "Insight into what content is actually working vs. just liked",
    ],
    desires: [
      "Be the local business everyone tags in their stories",
      "Build a 5-figure local Insta following over 12 months",
      "Get walk-in / call-in traffic specifically from social discovery",
      "Have content that helps my staff feel proud of where they work",
      "Post quality, not panic — be intentional about brand",
      "Repurpose to a YouTube / podcast presence eventually",
      "Have a content moat against newer competitors",
      "Run social campaigns around launches / events that actually convert",
      "Outsource the function entirely with predictable cost",
      "See conversion attribution from social → revenue",
    ],
    pains: [
      "Last post was 3+ months ago",
      "Got a hire to 'do social' — they posted 6 times and quit",
      "I have 200+ photos on my phone and zero published",
      "DMs going unanswered for days",
      "Reels feel intimidating — I'm not a 25-year-old creator",
      "Engagement rate is below 1% even on the posts I do publish",
      "Customer asks 'are you guys still open?' — felt as a punch",
      "Spend on boosted posts produced no measurable lift",
      "Algorithm changes I don't understand",
      "Don't know if I should be on TikTok or skip it",
    ],
    fears: [
      "Looking generic / corporate / AI",
      "A tone-deaf post during a sensitive news cycle",
      "Negative comment going viral",
      "Wasting money on content that doesn't move the business",
      "Hiring a creator and them ghosting after month 2",
      "TikTok / Insta ban on a specific category I'm in",
      "Overcommitting to a content calendar I can't sustain",
      "Younger team members using slang I don't understand",
      "Brand drift from too many cooks in the content kitchen",
      "Being seen as the 'old' option vs. trendy competitor",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "If I pulled up your Instagram right now, what's the date on the most recent post — and what's the gap to the one before that?",
      },
      {
        type: "problem",
        question:
          "When a customer in {city} discovers a business in your category for the first time — where do you think they're looking before they search Google?",
      },
      {
        type: "implication",
        question:
          "If 60–70% of first-time discovery in your category happens on Instagram or TikTok, and your accounts are dormant — that's roughly 2/3 of potential first-time customers who don't know you exist. On a $X average customer LTV, what's that gap costing across a year?",
      },
      {
        type: "need-payoff",
        question:
          "If 12 reels and 15 posts shipped a month, branded to {business_name}, captioned in your voice, and DMs answered within an hour — what does that look like for {business_name} 6 months from now?",
      },
    ],
    objections: [
      {
        objection: "I tried hiring a social media manager — didn't work.",
        mirror: "The social manager didn't work?",
        positive_response:
          "Same story I hear constantly. The problem is structural: a $50K/yr in-house person can't out-produce a content engine with the tools we use. We deliver 12 reels + 15 posts/month + DM coverage for less than 30% of an in-house salary, with consistent output regardless of vacation, sickness, or quitting.",
      },
      {
        objection: "AI captions sound fake. People can tell.",
        mirror: "AI captions sound fake?",
        positive_response:
          "If they're prompted lazily, yes. We extract your voice from your actual review responses, customer DMs, and a 30-min interview. The AI then writes in your patterns — your phrases, your humor, your sentence length. Show me 3 captions you've written in the past, and I'll send you 3 AI-written ones tomorrow. You tell me which is which.",
      },
      {
        objection: "I don't want to lock into a contract.",
        mirror: "No contract lock-in?",
        positive_response:
          "Reasonable — month-to-month, cancel anytime. The reason we feel comfortable offering that: by month 2, the content is producing measurable engagement and the math is obvious. If it's not, you cancel and we both move on.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "SMB · Review Backlog": {
    persona: "Owner — high-volume service business with hundreds of unanswered reviews",
    worldview:
      "Reviews matter, I know. But I have so many that responding feels like an unwinnable game. I respond when something is bad, but the 5-star ones pile up and I feel guilty.",
    needs: [
      "Personalized reply to every review within 4 hours",
      "Reply that captures what specifically the customer praised",
      "Automated draft I can approve in 5 seconds on my phone",
      "Visibility on which reviews still need a response",
      "Tracking how many reviews have a response (vs. don't)",
      "Negative review escalation to me personally",
      "Catching attempted fake reviews before they go up",
      "Cross-platform coverage (Google, Yelp, Facebook, TripAdvisor)",
      "Response tone that matches my voice, not corporate boilerplate",
      "A monthly summary of what customers are praising / complaining about",
    ],
    desires: [
      "Be in the top 10% of businesses with response rate ≥ 80%",
      "Increase first-time customer conversion from reading reviews",
      "Show competitors what 'engaged owner' looks like",
      "Use review patterns to inform service improvements",
      "Build review momentum that compounds over years",
      "Own the review section as a marketing surface, not a liability",
      "Have a record of customer language for marketing copy",
      "Be quoted in case studies on review response best practice",
      "Create a culture of pride in front-line staff (mentioned by name in replies)",
      "Free up the 5 hrs/week I currently spend on review admin",
    ],
    pains: [
      "200+ unanswered 5-star reviews on Google",
      "Negative reviews that festered for weeks before I saw them",
      "Front desk doesn't have authority to respond, so they don't",
      "Yelp wants me to log in separately — I never do",
      "Generic 'thank you for your review' replies feel insincere",
      "Researching what each customer specifically said takes too long",
      "Mistakenly responded to one review twice and looked incompetent",
      "Customer sends review screenshots — I have to find the original",
      "Marketing agency 'manages reviews' but their replies sound like a bot",
      "Negative review hit page 1 and I didn't see it for 3 days",
    ],
    fears: [
      "AI writing in a tone-deaf way to a sensitive review",
      "Mistakenly responding to a fake review and legitimizing it",
      "Customer feeling the response is auto-generated and writing about it",
      "Lawsuit from defamatory negative review (wrong response makes it worse)",
      "Front desk responding badly without my approval",
      "Brand voice drifting across hundreds of replies",
      "Becoming dependent on AI and losing the personal touch",
      "Privacy issue from referencing customer details",
      "Vendor goes down and I have a 48-hour silent gap",
      "Search ranking penalty for review manipulation",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "Of your last 100 reviews on Google — roughly how many got a response from you, and how many are sitting unanswered right now?",
      },
      {
        type: "problem",
        question:
          "When a future customer is researching {business_name}, they read 200+ enthusiastic reviews and 0 owner replies. What does that subconsciously tell them about how attentive your business is?",
      },
      {
        type: "implication",
        question:
          "Conversion lift from being in the top response-rate bracket is 12–18% on first-time visitors per HBR data. On a 10K-monthly-visit business, that's 1,200–1,800 incremental visits a year — what's the revenue impact at your average ticket?",
      },
      {
        type: "need-payoff",
        question:
          "If your backlog cleared in week one and every new review got a personalized reply within 4 hours — what does that 'attentive owner' positioning unlock for {business_name}?",
      },
    ],
    objections: [
      {
        objection: "I tried Birdeye / similar tools — felt fake and templatey.",
        mirror: "Felt fake?",
        positive_response:
          "Their templates are the giveaway. We don't use templates — every reply is personalized to what the specific customer said, in your voice extracted from your existing replies. If you can find two of our drafts that read the same, we comp the first quarter. Want to see 5 sample drafts on your existing reviews?",
      },
      {
        objection: "I want to read every reply before it goes out.",
        mirror: "You want to approve everything?",
        positive_response:
          "Exactly how we'd recommend running it for the first 30 days. Mobile push: tap to approve, edit, or skip. Average approval = 5 seconds per review. After 30 days you'll trust the voice; you can switch to 'auto for 5-star, approve for 3-star and below.' Or stay in full-approval forever — your call.",
      },
      {
        objection: "$199/mo for review responses is steep.",
        mirror: "Steep at $199?",
        positive_response:
          "Compared to what — keeping the backlog at 200+? The math: 12–18% conversion lift on a $2M revenue business = $40K minimum, often $300K+ added per year. The $199/mo isn't the comparison — the missed revenue from non-response is. Either way, the first month is free until backlog is cleared; you decide afterward.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "D2C · Support Overload": {
    persona: "Sam — DTC founder ($500K–$10M ARR, Shopify-native)",
    worldview:
      "Tickets are draining my margin and my team's energy, but I can't bring myself to install another chatbot — the last 3 sat there doing nothing. I need it to work, not look pretty.",
    needs: [
      "Real deflection on WISMO + return + sizing tickets",
      "Brand-voice consistency across all customer comms",
      "Integration with Gorgias / Zendesk / Helpscout",
      "PDP-level real-time agent for cart abandonment",
      "Email + SMS + chat under one ticket view",
      "Sentiment / urgency triage to surface escalations",
      "Multi-language support for international orders",
      "Refund / exchange initiation without human review",
      "Reorder prompts and post-purchase upsell",
      "Q4 / BFCM scaling without hiring temp agents",
    ],
    desires: [
      "Cut support headcount need by 50% during Q4",
      "Lift AOV through PDP-level agent answering pre-purchase questions",
      "Reduce CSAT damage from slow response times",
      "Run with one CX person instead of three",
      "Have a defensible operational moat against larger brands",
      "Be the brand referenced in 'how to scale support' case studies",
      "Free up CX leader to do design + retention work, not tickets",
      "Predictable cost per ticket regardless of volume",
      "Faster post-purchase NPS lift",
      "Quantifiable ROI on support tooling",
    ],
    pains: [
      "30 hrs/week of $25/hr support time",
      "62% of tickets are deflectable but currently aren't",
      "Q4 volume spike crashes response times to 36+ hours",
      "Returns are 18% of orders, eating support hours",
      "Three chatbots tried — all uninstalled within 60 days",
      "International returns generate 40% more tickets per order",
      "WISMO + size + ingredient questions repeating endlessly",
      "Gorgias macros are stale and inconsistent",
      "CSAT crashed from 4.7 to 4.1 in last BFCM",
      "Founder still personally responds to escalations at 11pm",
    ],
    fears: [
      "Bot writing tone-deaf reply to upset customer",
      "Wrong refund processed automatically — chargeback lawsuit",
      "AI hallucinating product specs",
      "Spending $20K/yr and getting same deflection as the free Shopify chatbot",
      "Privacy / data compliance issue across geos",
      "Chatbot triggering 'angry customer' viral moment on Twitter",
      "Implementation taking 90 days when team is already overloaded",
      "AI making promises (refund, replacement) that ops can't deliver",
      "Brand voice drift over hundreds of conversations",
      "Locked into vendor that gets acquired and pricing changes",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "What's your current ticket volume per month, and roughly what's the breakdown — WISMO, returns, sizing, product questions, complaints?",
      },
      {
        type: "problem",
        question:
          "Of those tickets, how many do you genuinely think require a human's judgment vs. could be answered by reading the order page and the policy?",
      },
      {
        type: "implication",
        question:
          "30 hrs/week × $25/hr × 50 weeks = $39K straight cost. Add CSAT damage from slow response = ~10% repurchase rate hit on a 3-year LTV. For a $2M brand, the all-in cost is closer to $150K/year. Is that what we're solving?",
      },
      {
        type: "need-payoff",
        question:
          "If 62% of tickets deflected automatically, AOV lifted 8–14% from PDP-level answers, and your CX lead spent zero hours on WISMO — what does the next BFCM look like?",
      },
    ],
    objections: [
      {
        objection: "We tried Gorgias / Tidio / Shopify Inbox AI — none worked.",
        mirror: "None of them worked?",
        positive_response:
          "Each of those is a chatbot bolted on top — they don't actually do real ticket deflection. We're operating ML models trained on your specific tickets, your products, your policies. Three brands in your size range went from 1,200 to 450 tickets/month in 60 days. Free 14-day pilot with the actual deflection rate guaranteed in writing.",
      },
      {
        objection: "Q4 starts in 12 weeks — too late to implement.",
        mirror: "Too late for Q4?",
        positive_response:
          "Reverse: 12 weeks is exactly the right runway. Setup is 2 weeks, training on your tickets is 4 weeks, and we have 6 weeks of pre-Q4 to refine before BFCM. If we wait until Q1, you eat one more bad season. Start the 14-day pilot now and you have the option of full activation by mid-September.",
      },
      {
        objection: "I don't want AI handling refunds without a human checking.",
        mirror: "No AI refunds?",
        positive_response:
          "Smart — that's a hard rule for us too. The system handles 80% of refund requests by gathering full context (order, return type, photos, eligibility) and presenting your CX lead with one-click approve. Approval time goes from 8 minutes to 12 seconds. Refund still gets human authority; the human just doesn't have to investigate.",
      },
    ],
  },

  // ───────────────────────────────────────────────
  "Pro Firm · RFP Throughput": {
    persona: "Patricia (RFP-flavor) — managing partner facing weekly RFP qualification load",
    worldview:
      "Partners' time is the firm's most expensive currency. Every RFP we pursue and lose costs 6-figures of opportunity cost. We need to qualify out faster, not chase more.",
    needs: [
      "Same-day qualification verdict per RFP (yes / no / yes-if)",
      "Win-probability scoring per opportunity",
      "Effort estimate before partner time is invested",
      "Centralized library of past responses to draft from",
      "Consistent format / boilerplate that compliance has approved",
      "Visibility into RFP win-rates by source / type",
      "Time-tracking on RFP work for ROI analysis",
      "Easy collaboration across partners on shared bids",
      "Compliance / conflict-check baked into the qualification step",
      "Post-win debrief loop for what made bids successful",
    ],
    desires: [
      "Lift firm win-rate from 1-in-4 to 1-in-3",
      "Cut senior partner RFP-qualification time by 70%",
      "Pursue bigger, higher-value RFPs we currently skip",
      "Be the firm with the fastest, most professional RFP responses",
      "Win the 'RFP-driven' work that competitors over-pursue",
      "Have a measurable competitive advantage at the bid stage",
      "Junior associates contributing meaningfully to bids",
      "Partner time freed for client work, not bid prep",
      "Repeatable process that survives partner turnover",
      "Higher-margin engagements via better qualification",
    ],
    pains: [
      "RFPs sit in someone's inbox for 5 days",
      "Senior partner spends 8 hrs qualifying each one",
      "Win-rate is 25% — 75% of bid effort wasted",
      "Same content rewritten across bids (no template library)",
      "Compliance review adds 4 days at the end",
      "Junior associates write boilerplate that partners rewrite anyway",
      "Lost a $300K engagement last quarter due to slow response",
      "Conflict checks done manually each time",
      "Past RFP wins not analyzed for what worked",
      "Government RFPs especially painful (compliance + format)",
    ],
    fears: [
      "Bidding on something with a hidden conflict — disqualification + reputational risk",
      "AI-generated response missing a deal-breaker requirement",
      "Plagiarism / incorrectly cited prior work in a bid",
      "Locking into a vendor that becomes the system-of-record for our bid history",
      "Audit trail not surviving litigation discovery",
      "Junior using AI without partner review — embarrassing submission",
      "Compliance issue because AI cited a regulation incorrectly",
      "Losing distinctive firm voice across submissions",
      "Vendor data residency issues with cross-border RFPs",
      "Becoming over-dependent on AI scoring and missing intuitive bids",
    ],
    spin_questions: [
      {
        type: "situation",
        question:
          "When an RFP arrives, walk me through the actual workflow — who sees it first, who decides whether to bid, how long until the decision is made?",
      },
      {
        type: "problem",
        question:
          "Of the RFPs you bid on in the past 12 months, what's the win-rate? And of the wins — were they the highest-margin or the highest-effort?",
      },
      {
        type: "implication",
        question:
          "If senior partner time on qualification costs ~$1,500/RFP and you process 20 a quarter, that's $30K/quarter, $120K/year of partner time on qualification alone. If lifting win-rate from 25% to 33% is achievable without bidding more — what's the all-in firm benefit at your typical engagement size?",
      },
      {
        type: "need-payoff",
        question:
          "If every incoming RFP got a fit / win-probability / effort score within 2 hours, and the partners only spent time on the top 8 of 20, while still maintaining win-rate — what does that compound into over a 3-year horizon?",
      },
    ],
    objections: [
      {
        objection: "Our RFPs are too specialized for AI to qualify properly.",
        mirror: "Too specialized for AI?",
        positive_response:
          "Generic AI yes — but we train the model on your firm's last 3 years of bids: your wins, your losses, your no-bids. The system learns 'we don't do bid types X, Y, Z' and 'we win when conditions A, B, C are present.' By month 2, the model's qualification matches partner judgment in 90%+ of cases. We measure that explicitly during the pilot.",
      },
      {
        objection: "Compliance won't approve AI processing client info from an RFP.",
        mirror: "Compliance won't approve?",
        positive_response:
          "Same constraint at every firm. We deploy fully on-prem or in your existing tenant — no client data leaves your environment. RFP content is processed by models running on your infrastructure. Compliance reviews the architecture once, not every transaction. Want me to send the compliance arch doc to your General Counsel?",
      },
      {
        objection: "We've invested in our existing RFP process — switching costs are real.",
        mirror: "Switching costs are too real?",
        positive_response:
          "We don't replace your process — we sit on top of it. Your current intake stays, your boilerplate library stays, your compliance review stays. We add a scoring layer at the front and a draft-generation layer in the middle. After 90 days, partners decide if they want to keep both layers or pull one out.",
      },
    ],
  },
};

export function playbookForPersonaName(name: string | null | undefined): PlaybookEntry | null {
  if (!name) return null;
  return PLAYBOOK[name] ?? null;
}

export const PLAYBOOK_PERSONA_NAMES = Object.keys(PLAYBOOK);
