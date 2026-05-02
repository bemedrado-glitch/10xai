-- 10XAI Lighthouse — Personas & Cadences Seed (v2 — enrollment-safe)
-- Run in Supabase SQL Editor against the "10xai" project (ytmanuajkffzoegkmqeb).
--
-- v1 used DELETE + INSERT, which cascade-deleted enrollments via the
-- enrollments.cadence_id FK ON DELETE CASCADE constraint. v2 fixes this:
--   • Personas: UPSERT by name (same id preserved across re-runs)
--   • Cadences: UPSERT by name (same id preserved → enrollments survive)
--   • Cadence_steps: still DELETE + INSERT for content updates (no FKs ref them)

-- ============================================================
-- 0. Ensure unique constraints on personas.name and cadences.name
--    Required for ON CONFLICT(name) DO UPDATE.
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'personas_name_unique'
  ) THEN
    ALTER TABLE personas ADD CONSTRAINT personas_name_unique UNIQUE (name);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'cadences_name_unique'
  ) THEN
    ALTER TABLE cadences ADD CONSTRAINT cadences_name_unique UNIQUE (name);
  END IF;
END $$;

-- ============================================================
-- 1. UPSERT personas — preserves IDs, no cascade triggered
-- ============================================================

INSERT INTO personas (name, description, filters, active) VALUES
('Local Service · No Website',
 'HVAC, plumbing, landscaping, cleaning, electricians — review-rich but no web presence. Lighthouse wedge.',
 '{"rating_min":4.5,"min_reviews":20,"no_website":true,"category":"plumber","country":"US","service":"Lighthouse","tags":["trades","wedge"]}'::jsonb,
 true),
('Restaurant · Insta-only (BR)',
 'Independent restaurants/cafés that use Instagram as their de-facto website. WhatsApp-native buyers.',
 '{"rating_min":4.3,"min_reviews":30,"no_website":true,"category":"restaurant","country":"BR","service":"Lighthouse + Dez WhatsApp","tags":["fnb","whatsapp"]}'::jsonb,
 true),
('Auto / Taller · No Website (LatAm)',
 'Talleres y servicios automotrices con grandes reseñas pero sin presencia web. WhatsApp como canal principal.',
 '{"rating_min":4.5,"min_reviews":30,"no_website":true,"category":"car_repair","country":"MX","service":"Lighthouse + Dez WhatsApp","tags":["auto","latam","whatsapp"]}'::jsonb,
 true),
('Clinic · Booking Bottleneck',
 'Dental, aesthetic, fitness, wellness — already have a website, but losing 8–12 bookings/week to missed phone calls and slow responses. Care Engine + Dez wedge.',
 '{"rating_min":4.5,"min_reviews":50,"no_website":false,"category":"dentist","country":"US","service":"Care Engine + Dez","tags":["clinic","booking"]}'::jsonb,
 true),
('SMB · No CRM',
 'Professional services or B2B SMB with website but no real CRM/sales motion — leads tracked in spreadsheets or inbox. Sales Engine wedge.',
 '{"rating_min":4.5,"min_reviews":25,"no_website":false,"category":"real_estate_agency","country":"US","service":"Sales Engine","tags":["no-crm","b2b"],"manual_qualify":"verify no HubSpot/Salesforce embed on contact form"}'::jsonb,
 true),
('Pro Firm · Content Gap',
 'Accounting, law, financial advisory firms that haven''t published thought-leadership content in 6+ months while competitors have. Reach Engine + Mind Engine wedge.',
 '{"rating_min":4.5,"min_reviews":25,"no_website":false,"category":"lawyer","country":"US","service":"Reach Engine + Mind Engine","tags":["pro-services","content"],"manual_qualify":"check blog last-updated date"}'::jsonb,
 true),
('SMB · No Social Presence',
 'Has a website but no active Instagram/Facebook/TikTok presence (or last post 90+ days ago). Losing organic reach to competitors. Reach Engine wedge.',
 '{"rating_min":4.5,"min_reviews":25,"no_website":false,"category":"beauty_salon","country":"US","service":"Reach Engine","tags":["no-social","reach"],"manual_qualify":"verify IG/FB/TikTok dormant before sending"}'::jsonb,
 true),
('SMB · Review Backlog',
 '50+ Google reviews but <30% response rate. Auto-review-response is the wedge. Highest-velocity Care Engine entry point.',
 '{"rating_min":4.4,"min_reviews":50,"no_website":false,"category":"restaurant","country":"US","service":"Care Engine","tags":["reviews","quick-win"]}'::jsonb,
 true),
('D2C · Support Overload',
 'Shopify brands $500K–$10M revenue drowning in WISMO + size + return tickets. Real-time AI on PDP + Gorgias/Zendesk deflection. Care Engine + Dez wedge.',
 '{"rating_min":4.0,"min_reviews":10,"no_website":false,"category":"clothing_store","country":"US","service":"Care Engine + Dez","tags":["d2c","ecom","manual-source"],"manual_qualify":"source via LinkedIn/SimilarWeb, not Places"}'::jsonb,
 true),
('Pro Firm · RFP Throughput',
 'Mid-size firms (50–500 employees) that bid on government / enterprise RFPs and lose senior partner time on qualification. Bid Engine wedge.',
 '{"rating_min":4.5,"min_reviews":25,"no_website":false,"category":"consultant","country":"US","service":"Bid Engine + Mind Engine","tags":["rfp","high-deal-value"]}'::jsonb,
 true)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  filters = EXCLUDED.filters,
  active = EXCLUDED.active;

-- ============================================================
-- 2. UPSERT cadences — same IDs preserved, enrollments survive
-- ============================================================

WITH p AS (SELECT id, name FROM personas WHERE name IN (
  'Local Service · No Website','Restaurant · Insta-only (BR)','Auto / Taller · No Website (LatAm)',
  'Clinic · Booking Bottleneck','SMB · No CRM','Pro Firm · Content Gap',
  'SMB · No Social Presence','SMB · Review Backlog','D2C · Support Overload','Pro Firm · RFP Throughput'
))
INSERT INTO cadences (name, description, persona_id, active)
SELECT c.cad_name, c.cad_desc, p.id, true
FROM (VALUES
  ('Local Service · No Website',     'Lighthouse — Local Service / Trades',          'Gift-first preview-site opener for tradespeople. 7 email touches over 21 days.'),
  ('Restaurant · Insta-only (BR)',   'Lighthouse — Restaurants (Insta-only, BR-PT)', 'WhatsApp-first cadence for BR restaurants. PT-BR copy. 7 touches.'),
  ('Auto / Taller · No Website (LatAm)', 'Lighthouse — Talleres / Auto (LatAm-ES)',  'Cadencia para talleres LatAm. ES copy. 7 touches.'),
  ('Clinic · Booking Bottleneck',    'Care Engine — Clinics (Booking Gap)',          'Care Engine pitch focused on missed-bookings cost. 7 touches.'),
  ('SMB · No CRM',                   'Sales Engine — Pro Services No CRM',           'Sales Engine wedge: leads-in-spreadsheets pain. 7 touches.'),
  ('Pro Firm · Content Gap',         'Reach Engine — Content Gap (Pro Firms)',       'Authority-stack cadence for accountants/lawyers/financial firms. 7 touches.'),
  ('SMB · No Social Presence',       'Reach Engine — No Social Presence',            'Social-media-revival pitch for SMBs with dormant IG/FB/TikTok. 7 touches.'),
  ('SMB · Review Backlog',           'Care Engine — Review Backlog',                 'Quick-win: auto-review-response as the wedge. 7 touches.'),
  ('D2C · Support Overload',         'Care Engine — D2C Support Overload',           'D2C pitch with deflection math + AOV lift. 7 touches.'),
  ('Pro Firm · RFP Throughput',      'Bid Engine — RFP Throughput',                  'Bid Engine pitch focused on senior partner time saved on RFP qualification. 7 touches.')
) AS c(persona_name, cad_name, cad_desc)
JOIN p ON p.name = c.persona_name
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  persona_id = EXCLUDED.persona_id,
  active = EXCLUDED.active;

-- ============================================================
-- 3. Replace cadence steps — safe because no FK references cadence_steps
-- ============================================================

DELETE FROM cadence_steps WHERE cadence_id IN (
  SELECT id FROM cadences WHERE name IN (
    'Lighthouse — Local Service / Trades','Lighthouse — Restaurants (Insta-only, BR-PT)',
    'Lighthouse — Talleres / Auto (LatAm-ES)','Care Engine — Clinics (Booking Gap)',
    'Sales Engine — Pro Services No CRM','Reach Engine — Content Gap (Pro Firms)',
    'Reach Engine — No Social Presence','Care Engine — Review Backlog',
    'Care Engine — D2C Support Overload','Bid Engine — RFP Throughput'
  )
);

WITH cad AS (
  SELECT id, name FROM cadences WHERE name IN (
    'Lighthouse — Local Service / Trades','Lighthouse — Restaurants (Insta-only, BR-PT)',
    'Lighthouse — Talleres / Auto (LatAm-ES)','Care Engine — Clinics (Booking Gap)',
    'Sales Engine — Pro Services No CRM','Reach Engine — Content Gap (Pro Firms)',
    'Reach Engine — No Social Presence','Care Engine — Review Backlog',
    'Care Engine — D2C Support Overload','Bid Engine — RFP Throughput'
  )
)
INSERT INTO cadence_steps (cadence_id, step_number, delay_days, type, subject, body, active)
SELECT cad.id, s.step_number, s.delay_days, 'email', s.subject, s.body, true
FROM cad
JOIN (VALUES

-- Lighthouse — Local Service / Trades
('Lighthouse — Local Service / Trades', 1, 0,
 'Built {business_name} a website — want to see it?',
 E'{contact_name},\n\n{business_name} has {rating} stars across {review_count} reviews — top-tier in {city}. But Google search "[your service] near me" doesn''t show your business as a clickable result, because there''s no website tied to your profile. Customers click your competitor''s link and call them.\n\nI built {business_name} a real website using your reviews, your photos, your service list. It''s live at a preview URL right now and I''ll send it on reply.\n\nIt''s yours to keep. To put it under your own domain with the phone ringing tomorrow: $497 setup + $49/mo.\n\nThis preview stays live until next Friday — after that we recycle it.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Lighthouse — Local Service / Trades', 2, 5,
 'What {business_name} is missing on the phone',
 E'{contact_name},\n\nTwo things happen when a tradesman doesn''t have a website:\n1. Half your "I''ll call later" leads never call back — they assume you''re not real.\n2. The other half who do call get voicemail, then call your competitor.\n\nConservative math on {business_name}:\n• 4 missed calls/week × 60% would''ve booked × $400 avg ticket = ~$960/week, or roughly $50,000/year walking past you.\n\nThe website is half the fix. The other half is something that picks up when you''re under a sink. Both are part of the package — $497 setup, $49/mo.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Local Service / Trades', 3, 6,
 'What next month looks like with this live',
 E'{contact_name},\n\nImagine next month:\n• A customer in {city} googles "[your service] near me" — they see {business_name}, click your site, see your stars and your real photos.\n• They click "Get a quote" — that goes straight to your phone as a text.\n• The 8 missed lunch calls a week? An AI receptionist handles them, books them on your calendar, and you walk into the next job already paid for.\n\nThat''s two trades shops in similar markets we set up last month. Both with similar review counts to yours.\n\nWant me to keep the preview live another week, or close the file?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Local Service / Trades', 4, 3,
 'Closing the {business_name} preview Friday',
 E'{contact_name},\n\nClosing this preview Friday at 5pm. After that the URL goes dark and we move to the next shop in the area.\n\nIf you want it under your domain, just reply "let''s go" and we have it live by Monday.\n\nIf now''s not the time, "later" works and I''ll circle back in 90 days.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Local Service / Trades', 5, 7,
 'Last note — {business_name}',
 E'{contact_name},\n\nClosed the {business_name} file last week. Two things before signing off:\n\n1. The website pattern works — the gap doesn''t go away just because we didn''t deliver it. Whoever you hire, make sure your reviews and photos go on it.\n\n2. If your phones go to voicemail more than 3x/week, the AI receptionist piece is what makes the website actually convert.\n\nIf you want to revisit, just reply "open file."\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Lighthouse — Restaurants (Insta-only, BR-PT)
('Lighthouse — Restaurants (Insta-only, BR-PT)', 1, 0,
 'Construí o site do {business_name} — dá uma olhada?',
 E'Oi {contact_name},\n\nDado rápido:\n\n{business_name} — {rating} estrelas, {review_count} avaliações em {city}. Top em {city}. Mas quando alguém procura "restaurante perto de mim" no Google, sai o concorrente, não você — porque não tem site ligado ao seu perfil.\n\nJá montei o site do {business_name} com suas avaliações reais, fotos do Insta, cardápio. Tá no ar agora numa URL de prévia (mando no reply).\n\nÉ seu. Se quiser colocar no seu domínio (com WhatsApp integrado pra reservas), a gente coloca no ar amanhã por R$ 2.497 + R$ 247/mês.\n\nA URL fica viva até sexta. Depois disso a gente recicla.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Lighthouse — Restaurants (Insta-only, BR-PT)', 2, 5,
 'As 200 mensagens não-respondidas do WhatsApp',
 E'{contact_name},\n\nCálculo cru:\n\nRestaurante seu tamanho perde em média 15–25 reservas por semana porque o WhatsApp lota e ninguém responde a tempo. Ticket médio R$ 90 × 20 reservas/semana = R$ 7.200/semana, ou R$ 28.800/mês na mesa que você nunca viu.\n\nA gente faz duas coisas:\n1) O site (já tá pronto)\n2) Um agente de WhatsApp em PT-BR que responde reserva, cardápio e horário em segundos, na sua voz, 24/7\n\nR$ 2.497 setup + R$ 247/mês inclui as duas.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Restaurants (Insta-only, BR-PT)', 3, 6,
 'Como fica o {business_name} com isso rodando',
 E'{contact_name},\n\nImagina o próximo mês:\n• Cliente abre o WhatsApp do {business_name} sábado às 19h, pergunta "tem mesa pra 4 hoje?", recebe resposta em 8 segundos com confirmação.\n• Você não tá no celular durante o serviço.\n• Google "[tipo de cozinha] em {city}" mostra o {business_name} primeiro.\n• Reviews respondidas em 5 minutos por dia.\n\nFoi o que fizemos pro Restaurante (case) em SP no mês passado. R$ 12.000/mês de ticket recuperado.\n\nMantém o link aberto mais uma semana?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Restaurants (Insta-only, BR-PT)', 4, 3,
 'Fechando o arquivo do {business_name}',
 E'{contact_name},\n\nA URL do {business_name} fecha sexta às 17h. Depois disso fecho o arquivo daqui.\n\nTrês opções:\n1) "Vamos" — coloco no ar segunda\n2) "Mais tarde" — fecho e volto daqui 90 dias\n3) Silêncio — interpreto como #2\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Restaurants (Insta-only, BR-PT)', 5, 7,
 'Última nota — {business_name}',
 E'{contact_name},\n\nFechei o arquivo do {business_name}. Quando voltar a fazer sentido — ou quando o WhatsApp passar de 500 não-lidas — manda "abre" e retomamos.\n\nBoas vendas pro próximo trimestre.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Lighthouse — Talleres / Auto (LatAm-ES)
('Lighthouse — Talleres / Auto (LatAm-ES)', 1, 0,
 'Le construí una página al {business_name} — ¿quiere verla?',
 E'{contact_name},\n\nDatos rápidos del taller:\n\n{business_name} — {rating} estrellas, {review_count} reseñas en {city}. Está usted en el top de {city}. Pero cuando alguien busca "[su servicio] cerca de mí" en Google, sale la competencia — no usted — porque no tiene página ligada al perfil.\n\nLe construí una página real al {business_name} con sus reseñas, fotos, lista de servicios. Está al aire ahorita en una URL de muestra (la mando al reply).\n\nEs suya. Si la quiere bajo su propio dominio con WhatsApp integrado: MX$ 7,500 inicial + MX$ 750/mes.\n\nLa URL queda viva hasta el viernes. Después la reciclamos.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Lighthouse — Talleres / Auto (LatAm-ES)', 2, 5,
 'Las cotizaciones por WhatsApp que no aterrizan',
 E'{contact_name},\n\nLo que pasa en talleres como el suyo:\n\n• Recibe 30–50 cotizaciones por WhatsApp/semana\n• Cierra el 30%\n• El otro 70%: no contestó a tiempo, no dio precio claro, no hizo seguimiento\n• Ticket promedio MX$ 3,500 × 15 cotizaciones perdidas = ~MX$ 52,500/semana, o MX$ 210,000/mes que se va al taller de al lado\n\nHacemos dos cosas:\n1) La página (ya está lista)\n2) Un agente de WhatsApp en español que responde, agenda y hace seguimiento — en su voz, 24/7\n\nMX$ 7,500 inicial + MX$ 750/mes incluye las dos.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Talleres / Auto (LatAm-ES)', 3, 6,
 'Cómo se ve el {business_name} con esto corriendo',
 E'{contact_name},\n\nImagínese el próximo mes:\n• Cliente busca "[su servicio] en {city}" → ve a {business_name} de primero\n• Hace clic en "Cotizar" → cae directo en su WhatsApp como cita agendada\n• Cotizaciones de las 9pm: el agente responde en segundos\n• Usted entra al taller el lunes con 8 citas confirmadas\n\nLo armamos para un taller en Monterrey hace 2 meses: pasaron de 30% a 52% de cierre sin trabajar más horas.\n\n¿Mantengo la URL viva una semana más?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Talleres / Auto (LatAm-ES)', 4, 3,
 'Cerrando el archivo del {business_name}',
 E'{contact_name},\n\nLa URL del {business_name} la cierro el viernes a las 5pm. Después reciclamos al siguiente taller.\n\nTres opciones:\n1) "Vamos" — la dejamos en su dominio el lunes\n2) "Más tarde" — cierro archivo y le escribo en 90 días\n3) Silencio — lo interpreto como #2\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Lighthouse — Talleres / Auto (LatAm-ES)', 5, 7,
 'Última nota — {business_name}',
 E'{contact_name},\n\nCerré el archivo del {business_name}. Cuando le haga sentido — o cuando el WhatsApp pase de 200 cotizaciones no-respondidas — mande "abrir" y retomamos.\n\nSuerte con el próximo trimestre.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Care Engine — Clinics (Booking Gap)
('Care Engine — Clinics (Booking Gap)', 1, 0,
 '{business_name} — {review_count} reviews, 1 unanswered question',
 E'{contact_name},\n\nQuick math on {business_name}:\n\n{rating} stars across {review_count} reviews — top 5% in {city}. You''ve responded to fewer than half of them.\n\nReviews you don''t reply to are the only marketing channel where you''re paying with attention and getting silence back. Most of your competitors are silent too — that''s the opening.\n\nI run 10XAI. We build finished AI operations for practices like yours — not a chatbot, a system. Reviews, missed phone calls during lunch, morning insurance questions — all handled in your voice, while you''re chairside.\n\nReply "send it" and I''ll have a working demo of your review-response system live in your inbox by 9am tomorrow.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Care Engine — Clinics (Booking Gap)', 2, 5,
 '8 missed bookings a week',
 E'{contact_name},\n\nThe hidden cost no one talks about in dental/aesthetic/wellness practices:\n\nAverage phone-call abandonment between 11:30am–1:15pm is 38%. At average new-patient LTV of $1,800–$3,200, a practice your size loses ~$8,000–$25,000/month to lunchtime no-answers. That''s $96K–$300K annually. Your front desk is excellent — but they''re human, and humans eat.\n\nWe built a system that picks up every call you don''t, books straight into your PMS, and confirms via SMS. Insurance questions get answered in your voice using your actual coverage rules.\n\nWe''re onboarding 5 practices in your state this month. 2 spots remain.\n\nWant me to send the live demo?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Clinics (Booking Gap)', 3, 6,
 'What {business_name} looks like with this running',
 E'{contact_name},\n\nPicture next month:\n• Sunday night you''re not answering Sunday reviews from your couch — they''re handled.\n• Monday morning your front desk walks in to 11 confirmed bookings already in the schedule.\n• Insurance questions that used to take 2 hours of front-desk time now take 10 minutes.\n• 5-star reviews get a thoughtful, personalized reply within 4 hours, every time.\n\nThat''s the actual operating state of two practices we onboarded in March. Similar size to {business_name}.\n\n25-min call this week to see how it maps onto your setup?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Clinics (Booking Gap)', 4, 3,
 'Closing the loop on {business_name}',
 E'{contact_name},\n\nClosing my file on {business_name} on Friday at 5pm Eastern unless I hear back.\n\nThree options:\n1) "Yes" — I hold a 25-min slot Friday or Monday\n2) "Not now" — I mark for Q3 and don''t touch your inbox until then\n3) "Send the demo" — get it, decide on your own time, no call\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Clinics (Booking Gap)', 5, 7,
 'Last note — {business_name}',
 E'{contact_name},\n\nClosed my file on {business_name}. Wanted to leave one thing.\n\nWhat we''d build for you is documented at 10xai.us/engines/care. If your front-desk turnover hits or your review backlog hits 100+, that''s the natural moment. Reply "open file" and we pick up.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Sales Engine — Pro Services No CRM
('Sales Engine — Pro Services No CRM', 1, 0,
 'How does {business_name} track leads today?',
 E'{contact_name},\n\nLooked at {business_name} — {rating} stars, {review_count} reviews. Strong inbound demand signal.\n\nQuick question: how does {business_name} actually track who reached out, what stage they''re at, and whose follow-up is owed today?\n\nFor most firms your size the honest answer is some combination of "inbox," "sticky note," and "I''ll remember." That works at 5 leads/week. Stops working at 15. By 30 you''re losing 30–40% of inbound to silence — and you don''t know which 30%.\n\nWe build the AI sales motion that captures every inbound, qualifies it overnight, and tells you Monday morning which 3 are worth calling first. No CRM to learn — we run it for you.\n\nWorth a 20-min walk-through?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Sales Engine — Pro Services No CRM', 2, 5,
 'The lost-lead math nobody runs',
 E'{contact_name},\n\nIf {business_name} is doing $X/year in revenue and has {review_count}+ reviews, my conservative estimate is 80–150 inbound contacts/year — between web forms, referrals, calls, and DMs.\n\nIndustry data: firms without a real lead-management system close 12% of inbound. With one, that lifts to 22–28%. On a $5K average engagement, that''s $50K–$80K in revenue you''re not seeing — every year.\n\nThe Sales Engine costs less than that recovers in a single quarter.\n\nWalk-through?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Sales Engine — Pro Services No CRM', 3, 6,
 'How {business_name} could run its sales motion in 30 days',
 E'{contact_name},\n\nWhat 30 days looks like with the Sales Engine running:\n• Every inbound (web, phone, referral, LinkedIn DM) lands in one place automatically\n• AI scores fit + intent overnight; you see Monday''s top 5 by 7am\n• Outbound follow-ups to no-replies fire on a 7-touch cadence in your voice\n• Calendar sync — qualified leads book themselves\n• You see exactly $X of pipeline that wasn''t there before\n\nWe ran this with a {city}-area firm in March. 14 net-new closed engagements in 60 days that wouldn''t have happened.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Sales Engine — Pro Services No CRM', 4, 3,
 'Closing the {business_name} file Friday',
 E'{contact_name},\n\nClosing the file Friday. If now''s not the moment, "Q3" puts you back on my list mid-July.\n\nIf it is the moment: 20 minutes, Cal.com link in my signature, no slides. Just a working demo against {business_name}''s actual public surface.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Sales Engine — Pro Services No CRM', 5, 7,
 'Last note — {business_name}',
 E'{contact_name},\n\nFile closed. Two thoughts:\n\n1) The CRM-less state has a cost; you can run the math any month.\n2) When the next associate quits and the leads they were "managing" disappear with them — that''s the natural reopen. Reply "open" and we pick up.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Reach Engine — Content Gap (Pro Firms)
('Reach Engine — Content Gap (Pro Firms)', 1, 0,
 '{business_name} hasn''t published in 11 months — a thought',
 E'{contact_name},\n\nNoticed two things scanning {business_name}''s public surface:\n\n1. The last public-facing thought-leadership piece I can find is from mid-2025.\n2. Two of your direct competitors in {city} have published 14 and 22 pieces, respectively, in the same window.\n\nNot selling content writing. The model where a junior associate ghost-writes for a partner is dead and you know it. What I help firms like yours do is run a structured production pipeline — partner voice captured in 30-min interviews, AI structures the argument, partner approves a near-final draft, ships in 4 days.\n\nThree boutique firms ran this last quarter; 2 of 3 added six-figure inbound pipeline within 90 days.\n\n15-min call, or send the case-study deck async?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Reach Engine — Content Gap (Pro Firms)', 2, 9,
 'What 14 published pieces did for your competitor',
 E'{contact_name},\n\nWhy this matters more in your space than most:\n\nBuying decisions in your industry ride on perceived expertise. When a CFO of a $40M company asks Google "[your specialty] firm in {city}," what they read decides who they call. Right now they''re reading your competitor''s 14 pieces, not yours.\n\nA few questions before suggesting a path:\n• Who at {business_name} owns the marketing function today?\n• If you wanted a piece per partner per quarter, what''s the bottleneck?\n• Have you tried AI-assisted writing internally? What stuck?\n\n15 min on Cal.com if easier.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — Content Gap (Pro Firms)', 3, 5,
 'A second angle — RFP throughput',
 E'{contact_name},\n\nSecond angle in case content isn''t the priority:\n\nYour pipeline-of-RFPs throughput. Most firms your size qualify 1 of every 4 RFPs they review, and senior partner time on the qualification step costs ~$1,500/RFP. If {business_name} sees 20 RFPs/quarter, that''s ~$30K of partner time on RFPs that won''t go anywhere.\n\nWe built a system for a {city} firm that scores each RFP for fit, win-probability, and partner-effort estimate in <15 minutes. They went from 1-in-4 to 1-in-3 win-rate without doing more bids — they just stopped wasting time on bad ones.\n\nWould the RFP angle resonate more than content?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — Content Gap (Pro Firms)', 4, 7,
 'Closing the loop on {business_name}',
 E'{contact_name},\n\nClosing the file on {business_name} Friday. If now''s not right, "later" lands you in my queue 90 days from today. If your partner committee runs in Q3/Q4 I''d rather be early in that conversation.\n\nIf the answer is "we hired internally / already have an agency," I''d love to know — both for my own learning and to remove this thread from your inbox.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — Content Gap (Pro Firms)', 5, 7,
 'Last note',
 E'{contact_name},\n\nClosed the file. The content gap pattern doesn''t go away because we didn''t deliver — whoever you choose, the production pipeline matters more than the writers. If that becomes the moment, reply "open" and we restart.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Reach Engine — No Social Presence
('Reach Engine — No Social Presence', 1, 0,
 '{business_name} on Instagram — last post Sept 2024',
 E'{contact_name},\n\n{business_name} is doing the hard part right — {rating} stars, {review_count} reviews in {city}. People love the experience.\n\nBut your Instagram looks like the lights went out 8 months ago. Same on Facebook. TikTok — empty.\n\nThis matters because in your category 60–70% of your future customers discover businesses on social before they search them on Google. Right now those customers are finding your competitor''s reels and not knowing you exist.\n\nWe run AI-powered content engines that ship 12–15 pieces of content/month per channel — branded to you, captioned in your voice, scheduled, posted, with a real human producer behind it. No team for you to manage.\n\nSee the case study? 15-min call?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Reach Engine — No Social Presence', 2, 5,
 'The discovery math nobody runs',
 E'{contact_name},\n\nIf {business_name} is in the {category} category and has {review_count}+ reviews, 60–70% of your future customers find businesses like yours on Instagram or TikTok before they search Google. That means dormant social = invisible to roughly two-thirds of potential first-time customers.\n\nIn dollar terms: at average customer LTV of $X, if dormant social costs you 1 new customer per week, that''s $50K–$150K/year in invisible loss.\n\nReach Engine is what fills that gap. 12–15 posts/month per channel, AI-generated and human-reviewed, branded to {business_name}.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — No Social Presence', 3, 6,
 'How {business_name}''s social would feel in 30 days',
 E'{contact_name},\n\n30 days from kickoff:\n• 15 reels/posts already out on Instagram\n• 8 short-form pieces on TikTok (or Reels-mirror if TikTok isn''t yet a priority)\n• 12 Facebook posts (auto-cross from Insta)\n• Captions in your voice — we extract it from your existing review responses + your real speaking style\n• A monthly content review where you spend 20 min and we ship for the next 4 weeks\n\nDid this for a salon in NC last quarter — 8K → 22K Insta followers in 90 days, 14 net-new clients attributed to discovery.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — No Social Presence', 4, 3,
 'Closing the file Friday',
 E'{contact_name},\n\nClosing the file Friday at 5pm. If now isn''t the moment, "Q3" or "later" works.\n\nIf it is: 15 minutes is enough to scope. The first month''s content can be live within 2 weeks of kickoff.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Reach Engine — No Social Presence', 5, 7,
 'Last note — {business_name}',
 E'{contact_name},\n\nClosed the file. The dormant-social pattern doesn''t fix itself. When a slow week makes social production top-of-mind, reply "open" and we restart.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Care Engine — Review Backlog
('Care Engine — Review Backlog', 1, 0,
 '{review_count} reviews, no replies — quick fix',
 E'{contact_name},\n\nLooked at {business_name}:\n\n{review_count} Google reviews. {rating} stars. You''ve replied to a small fraction of them.\n\nUnreplied reviews look fine when you''re running a business — they''re a problem when a future customer is researching you and sees a wall of customer enthusiasm with zero owner engagement. Best research on this: businesses that respond to ≥80% of reviews convert 12–18% more first-time visitors than those that don''t.\n\nWe ship a system that drafts a personalized reply to every review, in your voice, within 4 hours. You spend 5 minutes a day approving or editing. Backlog cleared in week one.\n\n$199/mo standalone, or included in the Care Engine bundle.\n\nWant me to draft 5 sample replies to your existing reviews so you can see what they''d look like?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Care Engine — Review Backlog', 2, 5,
 'The replies-to-reviews conversion lift',
 E'{contact_name},\n\nOne specific data point in case useful:\n\nHarvard Business Review study (2024): SMBs that responded to ≥80% of reviews saw conversion lift of 12–18% on first-time visitors vs. control. The mechanism is trust: a future customer reading 200 enthusiastic reviews and 0 owner replies subconsciously codes that as a business that doesn''t pay attention.\n\nFor {business_name}, with {review_count} reviews and (estimated) <30% reply rate, the gap is real. Quick fix.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Review Backlog', 3, 6,
 'What we''d ship for {business_name}',
 E'{contact_name},\n\nIf we kicked this off this week:\n• Day 1–2: setup. We connect to your Google profile + extract your voice from your existing replies.\n• Day 3–7: backlog. Drafts for every unreplied review, in batches you approve.\n• Day 8+: forward operations. Every new review gets a draft within 4 hours, you approve via mobile in seconds.\n\nMonth 1 cleared backlog. Month 2+ is steady-state at 5 min/day.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Review Backlog', 4, 3,
 'Closing the loop',
 E'{contact_name},\n\nClosing the file Friday. If you want sample drafts of 5 replies to your existing reviews, reply "samples" and they''re in your inbox tomorrow morning. No call, no pitch.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — Review Backlog', 5, 7,
 'Last note',
 E'{contact_name},\n\nClosed the file. The review backlog doesn''t go away — it just keeps growing. When your team turnover means nobody''s touched reviews in 60 days, that''s the moment. Reply "open" and we pick up.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Care Engine — D2C Support Overload
('Care Engine — D2C Support Overload', 1, 0,
 '{business_name} ticket volume is the bottleneck',
 E'{contact_name},\n\nThree numbers most D2C founders your size already feel:\n\n• Average D2C support ticket = 8 minutes of a $25/hr rep = $3.30\n• 30 hrs/week of $25/hr support = $39,000/year just on tickets\n• ~62% of those tickets are "where''s my order" + "return policy" + "size" — fully deflectable\n\nWe don''t sell a chatbot. We operate a real-time agent on your PDP and in Gorgias/Zendesk that deflects the 62% and routes the rest to humans with full context. Three Shopify brands, 1,200 → 450 tickets/month in 60 days.\n\nFree 14-day pilot. If we don''t hit 50%+ deflection, we walk and you owe nothing.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Care Engine — D2C Support Overload', 2, 5,
 'The AOV side most founders miss',
 E'{contact_name},\n\nThe pitch above is defensive (deflect tickets). The under-told side is offensive:\n\nA real-time agent on the PDP that handles size, fit, comparison, ingredient, and shipping questions — *before* abandonment — lifts AOV 8–14% in our pilot data. Not because it pushes upsell. Because it removes the 4 reasons people abandon mid-cart.\n\nThat''s revenue you don''t currently see. Pilot covers both sides.\n\nReply "in" and we set it up.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — D2C Support Overload', 3, 6,
 'The math your CFO will want',
 E'{contact_name},\n\nPretending I''m in your shoes:\n• Ticket-deflection saving: $39K × 0.55 = $21K saved\n• AOV lift on PDP traffic: 8% on 25% of sessions = roughly $80K–$200K/yr on a $2M brand\n• Setup + monthly: ~$20K/yr for our package\n\nNet positive year 1 = $80K+ on the conservative end.\n\nIf those numbers are wrong for {business_name}, the 14-day pilot tells us exactly. No commitment past that.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — D2C Support Overload', 4, 3,
 'Closing the {business_name} file',
 E'{contact_name},\n\nClosing Friday. If 14-days-free isn''t a fit now, we re-engage in Q3.\n\nThree responses:\n• "In" — pilot kicks off Monday\n• "Q3" — I file and ping July 15\n• "Pass" — clean close, no follow-up\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Care Engine — D2C Support Overload', 5, 7,
 'Last note',
 E'{contact_name},\n\nClosed the file. If a Q4 BFCM volume spike makes ticket deflection top-of-mind, "open" gets you back in my queue.\n\nBest of luck on the season.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),

-- Bid Engine — RFP Throughput
('Bid Engine — RFP Throughput', 1, 0,
 'How much partner time does {business_name} spend on RFP qualification?',
 E'{contact_name},\n\nFor mid-size firms in your space, the unspoken cost is RFP qualification — not the bids themselves, the bids you bid on that you never had a real shot at.\n\nIndustry average: firms see ~20 RFPs/quarter, qualify 1-of-4, win 1-of-3 of those. The time cost on a single qualification by a senior partner is ~$1,500. For {business_name} that''s plausibly $30K/quarter of partner time on RFPs that won''t go anywhere.\n\nWe built a system that scores each incoming RFP for fit, win-probability, and partner-effort estimate in under 15 minutes. One {city} firm went from 1-in-4 win to 1-in-3 in 60 days — same number of bids, just stopped wasting time on bad ones.\n\n20 min, or send the case study?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo Medrado\n10XAI · 10xai.us'),
('Bid Engine — RFP Throughput', 2, 7,
 'The capability map',
 E'{contact_name},\n\nWhat the Bid Engine does, concretely:\n\n• Ingests an RFP (PDF, Word, link)\n• Extracts requirements, scoring criteria, evaluation timeline\n• Maps requirements to {business_name}''s capabilities — flags gaps\n• Estimates senior partner hours required to bid + draft\n• Outputs a fit/probability/effort score with a recommendation: bid / no-bid / bid-if-X-changes\n\nThe partner spends 15 minutes reviewing the score, not 4–8 hours doing the qualification.\n\nWorth a 20-min walk-through against an example RFP?\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Bid Engine — RFP Throughput', 3, 7,
 'Pilot offer for {business_name}',
 E'{contact_name},\n\nSpecific offer:\n\n• Pick 3 recent RFPs you''ve seen — won, lost, or no-bid\n• We process them through Bid Engine free\n• You see what we would have recommended + the time savings\n• If the read matches your gut, we move forward\n\nTakes 48 hours after you send the docs. No commitment past the 3-RFP test.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Bid Engine — RFP Throughput', 4, 7,
 'Closing the loop',
 E'{contact_name},\n\nClosing the file end of next week. If the 3-RFP test isn''t the right fit, "next quarter" or "pass" both work.\n\nBetween now and then, the partner time spent on bad-fit RFPs continues. Your call.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo'),
('Bid Engine — RFP Throughput', 5, 7,
 'Last note',
 E'{contact_name},\n\nClosed the file. The RFP throughput problem compounds — every quarter you don''t fix it, the cost of senior time on bad qualifications stays a hidden $30K+ line item.\n\nWhen partner-time becomes the limiter, reply "open" and we pick up.\n\nBook 15 min: https://cal.com/10xai\n— Bernardo')

) AS s(cad_name, step_number, delay_days, subject, body)
ON cad.name = s.cad_name;

-- ============================================================
-- 4. (Bonus) Heal lead status drift — for v1 victims
-- ============================================================
-- If running this v2 after v1 wiped enrollments, any leads still
-- marked status='enrolled' but with no enrollment row are orphans.
-- Reset them so they can be re-enrolled cleanly.

UPDATE leads
SET status = 'new'
WHERE status = 'enrolled'
  AND id NOT IN (SELECT lead_id FROM enrollments);

-- ============================================================
-- 5. Verify
-- ============================================================
-- SELECT
--   (SELECT count(*) FROM personas) AS personas,
--   (SELECT count(*) FROM cadences) AS cadences,
--   (SELECT count(*) FROM cadence_steps) AS steps,
--   (SELECT count(*) FROM enrollments) AS enrollments,
--   (SELECT count(*) FROM leads WHERE status = 'enrolled') AS enrolled_leads;
