export type KnowledgeEntry = {
  keywords: string[];
  response: string;
  followUps?: string[];
};

export const DV_KNOWLEDGE: KnowledgeEntry[] = [
  // ── GREETING ──────────────────────────────────────────────────────────────
  {
    keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "howdy", "hujambo", "habari", "sasa"],
    response: `👋 Hello! I'm **DIVA** — D&V Technologies' AI assistant.

I know everything about D&V Technologies: our services, pricing, location, contact details, payment methods, and more.

How can I help you today? You can ask me anything like:
- *"What services do you offer?"*
- *"How much does the Basic package cost?"*
- *"How do I pay with M-Pesa?"*
- *"Where are you located?"*`,
    followUps: ["What services do you offer?", "Tell me about your pricing", "How do I contact you?"],
  },

  // ── COMPANY OVERVIEW ──────────────────────────────────────────────────────
  {
    keywords: ["who are you", "about", "company", "what is dv", "what is d&v", "tell me about", "overview", "background", "founded", "history"],
    response: `**D&V Technologies** is Nairobi's next-generation technology company — part of the **Silicon Savannah 2030** movement.

🏢 **What we do:** We deliver 12+ comprehensive IT, software, AI, cybersecurity, hardware, cloud, and digital transformation services to businesses across Kenya and East Africa.

📍 **Based in:** Lower Kabete, Nairobi, Kenya

🎯 **Mission:** To empower Kenyan businesses and communities through innovative technology, problem-solving, and a passion for excellence in AI, IoT, and digital transformation.

🌍 **Vision:** Make Nairobi the Silicon Savannah of Africa by 2030.

**We accept:** M-Pesa, Bitcoin, Paystack (card/mobile money), and bank transfer.`,
    followUps: ["What services do you offer?", "How can I work with you?", "Where are you located?"],
  },

  // ── SERVICES ──────────────────────────────────────────────────────────────
  {
    keywords: ["service", "services", "what do you do", "what do you offer", "offer", "provide", "specialise", "specialize", "work"],
    response: `D&V Technologies offers **12 comprehensive services**:

1. 💻 **Software Engineering** — Custom apps, websites, APIs, and enterprise systems
2. 🤖 **AI & Machine Learning** — AI chatbots, automation, data analytics, ML models
3. 🛡️ **Cybersecurity** — Penetration testing, security audits, firewalls, incident response
4. ☁️ **Cloud Solutions** — AWS, Azure, Google Cloud setup, migration & management
5. 🌐 **Networking & Infrastructure** — LAN/WAN, VPN, routers, structured cabling
6. 🖥️ **Hardware Repair & Support** — Laptops, desktops, servers, printers
7. 📊 **Data Analytics & BI** — Dashboards, reporting, data pipelines, visualisation
8. 📱 **Mobile App Development** — Android & iOS apps, cross-platform solutions
9. 🔧 **Managed IT Services** — 24/7 IT support, helpdesk, system monitoring
10. 🌍 **Digital Transformation** — Full-scale ICT strategy and implementation
11. 📡 **IoT Solutions** — Smart systems, sensors, automation for businesses
12. 🎓 **IT Training & Consulting** — Staff training, workshops, IT consulting

**All services available to businesses in Nairobi, across Kenya, and East Africa.**`,
    followUps: ["Tell me more about software development", "What is your pricing?", "How do I get started?"],
  },

  // ── SOFTWARE / WEB DEV ───────────────────────────────────────────────────
  {
    keywords: ["software", "web", "website", "app", "application", "develop", "build", "create", "custom", "api", "system"],
    response: `**Software Engineering at D&V Technologies:**

We build custom software tailored for African businesses:

- 🌐 **Websites & Web Apps** — Business sites, e-commerce, portals, dashboards
- 📱 **Mobile Apps** — Android, iOS, and cross-platform (React Native / Flutter)
- 🔌 **APIs & Integrations** — M-Pesa, Paystack, SMS, third-party system integrations
- 🏗️ **Enterprise Systems** — ERP, CRM, inventory management, custom platforms
- ⚡ **Tech Stack** — React, TypeScript, Node.js, Python, Supabase, and more

📞 **Contact us to discuss your project:**
- WhatsApp: **+254 719 576 326** or **+254 759 075 816**
- Email: **info@dvtechnologies.xyz**`,
    followUps: ["What is your pricing?", "How do I contact you?", "How long does a project take?"],
  },

  // ── AI / ML ──────────────────────────────────────────────────────────────
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "ml", "chatbot", "automation", "intelligent", "data science"],
    response: `**AI & Machine Learning at D&V Technologies:**

We bring AI capabilities to Kenyan and African businesses:

- 🤖 **AI Chatbots** — Custom chatbots for customer service, sales, and support
- 📊 **Data Analytics** — Turn your raw business data into actionable insights
- 🔮 **Predictive Models** — Forecasting, demand planning, risk analysis
- ⚡ **Process Automation** — RPA, workflow automation, smart notifications
- 🧠 **Custom AI Solutions** — Tailored to your business needs and data

We can integrate AI into your existing systems or build from scratch. Affordable AI — designed for the Silicon Savannah!`,
    followUps: ["What packages do you have?", "How do I get an AI chatbot?", "How do I contact you?"],
  },

  // ── CYBERSECURITY ────────────────────────────────────────────────────────
  {
    keywords: ["cyber", "security", "hack", "secure", "firewall", "protect", "penetration", "pentest", "antivirus", "vulnerability"],
    response: `**Cybersecurity at D&V Technologies:**

We protect your business from digital threats:

- 🔍 **Penetration Testing** — Find vulnerabilities before hackers do
- 🛡️ **Security Audits** — Full review of your IT security posture
- 🔥 **Firewall Setup** — Configure and manage enterprise firewalls
- 🚨 **Incident Response** — Fast action when a breach occurs
- 📋 **Compliance** — Help with GDPR, Kenya Data Protection Act
- 🔐 **Endpoint Security** — Antivirus, MDM, device management

**Protect your business today — contact us:**
📞 +254 719 576 326 | 📧 info@dvtechnologies.xyz`,
    followUps: ["What is the pricing?", "How do I book a consultation?"],
  },

  // ── PRICING / PACKAGES ───────────────────────────────────────────────────
  {
    keywords: ["price", "pricing", "cost", "how much", "package", "plan", "basic", "premium", "exclusive", "fee", "rate", "charge", "affordable"],
    response: `**D&V Technologies Service Packages:**

| Package | Price (USD) | ~KES |
|---------|------------|------|
| 🟢 **Basic** | $300/mo | ~KES 38,700 |
| 🔵 **Premium** | $650/mo | ~KES 83,850 |
| 🟣 **Exclusive** | $900/mo | ~KES 116,100 |

**Basic** — Core IT support, basic maintenance, standard support hours
**Premium** — Advanced services, priority support, expanded coverage, cloud management
**Exclusive** — Full-service managed IT, dedicated support, AI integration, custom development included

💳 **Payment methods:** M-Pesa, Bitcoin, Paystack (card), bank transfer

👉 Need a custom quote? Contact us on WhatsApp or email — we tailor solutions to your budget.`,
    followUps: ["How do I pay?", "What is included in the Basic package?", "How do I get started?"],
  },

  // ── PAYMENT METHODS ──────────────────────────────────────────────────────
  {
    keywords: ["pay", "payment", "mpesa", "m-pesa", "bitcoin", "btc", "crypto", "paystack", "card", "bank", "how to pay", "invoice"],
    response: `**Payment Methods at D&V Technologies:**

We accept multiple convenient payment options:

📱 **M-Pesa** — Send to our M-Pesa business line (fastest for Kenyan clients)
🪙 **Bitcoin (BTC)** — For crypto payments; send BTC and WhatsApp us the transaction ID
💳 **Paystack** — Pay with card (Visa/Mastercard), M-Pesa, or Airtel Money via Paystack checkout
🏦 **Bank Transfer** — Available on request

You can initiate payment directly from our website on the **Services** or **Pricing** pages.

**Questions about payment?**
📞 WhatsApp: **+254 719 576 326**`,
    followUps: ["What is your pricing?", "How do I get started?", "Where are you located?"],
  },

  // ── CONTACT / REACH ──────────────────────────────────────────────────────
  {
    keywords: ["contact", "reach", "call", "phone", "email", "whatsapp", "message", "talk", "speak", "enquire", "inquire", "appointment"],
    response: `**Contact D&V Technologies:**

📞 **Phone / WhatsApp:**
- +254 719 576 326
- +254 759 075 816

📧 **Email:**
- info@dvtechnologies.xyz
- contact@dvtechnologies.xyz

🌐 **Website:** dvtechnologies.xyz

📍 **Office:** Lower Kabete, Nairobi, Kenya

⏰ **Working Hours:** Mon–Sat, 8:00 AM – 6:00 PM EAT

💬 **Fastest way to reach us:** WhatsApp — we usually reply within minutes!

You can also **book an appointment** via the Contact page on our website.`,
    followUps: ["How do I book an appointment?", "Where are you located?", "What services do you offer?"],
  },

  // ── LOCATION ─────────────────────────────────────────────────────────────
  {
    keywords: ["where", "location", "address", "office", "nairobi", "kenya", "find you", "kabete", "visit", "physical"],
    response: `**D&V Technologies Location:**

📍 **Lower Kabete, Nairobi, Kenya**
(Near the Nairobi–Nakuru highway corridor)

We serve clients:
- 🏙️ Across Nairobi and all counties
- 🌍 Across Kenya — remote/on-site support available
- 🌐 East Africa — remote services available regionally

💡 **Can't visit?** No problem! We offer:
- Remote IT support & consultations
- Online project management
- Video calls for client meetings

📞 Call/WhatsApp: **+254 719 576 326**`,
    followUps: ["How do I contact you?", "What services do you offer?"],
  },

  // ── HOW TO GET STARTED ───────────────────────────────────────────────────
  {
    keywords: ["get started", "start", "begin", "how to", "first step", "new client", "onboard", "hire", "work with you", "engage"],
    response: `**How to Get Started with D&V Technologies:**

It's simple! Here's the process:

1. 📞 **Contact us** — WhatsApp (+254 719 576 326) or email (info@dvtechnologies.xyz)
2. 💬 **Tell us your needs** — What problem are you solving? What's your timeline?
3. 📋 **We assess & propose** — We'll provide a customised solution and quote
4. 💳 **Choose your package** — Basic, Premium, or Exclusive (or custom)
5. ✅ **We get to work** — Our team begins delivering your solution
6. 🔄 **Ongoing support** — We stay with you after delivery

**Quick start:** You can also book directly from our website's Contact page and select "Book an Appointment" via email.

⚡ We typically respond within **a few hours** during business hours.`,
    followUps: ["What is your pricing?", "What services do you offer?", "How do I contact you?"],
  },

  // ── HARDWARE / REPAIR ────────────────────────────────────────────────────
  {
    keywords: ["hardware", "repair", "laptop", "computer", "desktop", "server", "printer", "screen", "broken", "fix", "maintenance"],
    response: `**Hardware Repair & Support at D&V Technologies:**

We handle all your hardware needs:

🖥️ **What we repair/support:**
- Laptops & desktops (all brands)
- Servers and network equipment
- Printers, scanners, peripherals
- Screens, keyboards, batteries
- Data recovery from damaged devices

🔧 **Services include:**
- Diagnostics and repairs
- Upgrades (RAM, SSD, GPU)
- Preventive maintenance
- Hardware procurement & setup

📍 **Drop-in or collect:** Lower Kabete, Nairobi
📞 **Book a repair:** WhatsApp +254 719 576 326`,
    followUps: ["What is your pricing?", "Where are you located?", "How do I contact you?"],
  },

  // ── CLOUD ────────────────────────────────────────────────────────────────
  {
    keywords: ["cloud", "aws", "azure", "google cloud", "hosting", "server", "storage", "backup", "migration"],
    response: `**Cloud Solutions at D&V Technologies:**

We help businesses move to and thrive in the cloud:

☁️ **Platforms we work with:** AWS, Azure, Google Cloud, DigitalOcean
🚀 **Services:**
- Cloud migration (on-prem → cloud)
- Infrastructure setup & management
- Backup and disaster recovery
- Cost optimisation
- Cloud security and compliance
- Scalable hosting for your applications

🌍 We make cloud accessible and affordable for Kenyan SMEs — you don't need a big budget to get started.

📞 Talk to us: **+254 719 576 326**`,
    followUps: ["What is your pricing?", "What other services do you offer?"],
  },

  // ── NETWORKING ───────────────────────────────────────────────────────────
  {
    keywords: ["network", "internet", "wifi", "lan", "wan", "vpn", "router", "cable", "cabling", "structured", "connectivity"],
    response: `**Networking & Infrastructure at D&V Technologies:**

We design, install, and manage enterprise-grade networks:

🌐 **Services:**
- Structured cabling (LAN/WAN)
- WiFi network design and installation
- VPN setup for remote teams
- Router and switch configuration
- Network security and monitoring
- ISP integration and redundancy

🏢 **Ideal for:** offices, schools, hospitals, retail chains, warehouses

📞 Get a site survey: **+254 719 576 326** | 📧 info@dvtechnologies.xyz`,
    followUps: ["What is your pricing?", "How do I get started?"],
  },

  // ── MANAGED IT ───────────────────────────────────────────────────────────
  {
    keywords: ["managed", "support", "helpdesk", "maintenance", "monitoring", "24/7", "outsource", "it support"],
    response: `**Managed IT Services at D&V Technologies:**

Let us handle your entire IT so you can focus on your business:

🔧 **What's included:**
- 24/7 system monitoring
- Remote and on-site helpdesk support
- Proactive maintenance and updates
- Vendor management
- IT asset tracking
- Monthly reporting

✅ **Perfect for SMEs** who want enterprise-level IT without hiring a full internal team.

📦 Available under our **Premium** and **Exclusive** packages.

📞 WhatsApp: **+254 719 576 326**`,
    followUps: ["Tell me about your packages", "How do I get started?"],
  },

  // ── DIGITAL TRANSFORMATION ───────────────────────────────────────────────
  {
    keywords: ["digital", "transform", "transformation", "digitize", "digitise", "modernise", "modernize", "strategy", "innovation"],
    response: `**Digital Transformation at D&V Technologies:**

We help traditional businesses go digital — end to end:

🔄 **Our approach:**
- Assess your current systems and processes
- Design a tailored digital strategy
- Implement new tools, software, and infrastructure
- Train your team
- Provide ongoing optimisation

📈 **Results our clients see:**
- Faster operations
- Reduced costs
- Better customer experience
- Data-driven decision making

Kenya is becoming the Silicon Savannah — let us help your business be part of the future.

📞 Start your journey: **+254 719 576 326**`,
    followUps: ["What is your pricing?", "Tell me about your AI services", "How do I contact you?"],
  },

  // ── TRAINING ─────────────────────────────────────────────────────────────
  {
    keywords: ["train", "training", "course", "learn", "workshop", "consulting", "consult", "teach", "staff"],
    response: `**IT Training & Consulting at D&V Technologies:**

We upskill your team and provide expert consulting:

🎓 **Training areas:**
- Cybersecurity awareness
- Microsoft Office & productivity tools
- Cloud fundamentals
- Basic IT / digital literacy
- AI tools for business

🧠 **Consulting:**
- IT strategy and roadmap
- Technology procurement advice
- System architecture review
- Vendor selection

📍 **Delivered:** On-site in Nairobi/Kenya or online (Zoom/Teams)

📞 Book a session: **+254 719 576 326**`,
    followUps: ["What does it cost?", "How do I book?", "What other services do you offer?"],
  },

  // ── TESTIMONIALS / REVIEWS ───────────────────────────────────────────────
  {
    keywords: ["review", "testimonial", "client", "customer", "feedback", "experience", "trust", "reputation"],
    response: `**What our clients say about D&V Technologies:**

⭐⭐⭐⭐⭐ **James Kamau**, CEO, Nairobi Tech Solutions:
*"D&V Technologies transformed our IT infrastructure. Highly professional team!"*

⭐⭐⭐⭐⭐ **Grace Wanjiku**, Operations Manager, Mombasa:
*"Working with D&V has been a game-changer. They fixed our network and set up a robust security system."*

⭐⭐⭐⭐⭐ **David Ochieng**, Founder, Kisumu Innovation Hub:
*"The AI solutions were exactly what we needed to stay competitive."*

⭐⭐⭐⭐⭐ **Mercy Akinyi**, Director, Eldoret Medical Centre:
*"They helped us digitize patient records with outstanding attention to detail."*

We've served **50+ businesses** across Kenya. Visit our website to read more.`,
    followUps: ["What services do you offer?", "What is your pricing?", "How do I contact you?"],
  },

  // ── WEBSITE / PORTFOLIO ──────────────────────────────────────────────────
  {
    keywords: ["portfolio", "work", "example", "project", "case study", "previous", "done", "built", "client project"],
    response: `**D&V Technologies Portfolio:**

We've delivered projects across multiple industries in Kenya:

🏥 **Healthcare** — Patient record digitisation, secure health IT systems
🏢 **Corporate** — Network infrastructure, managed IT, cloud migration
🛒 **Retail & E-commerce** — POS integration, inventory systems, e-commerce sites
🎓 **Education** — LMS platforms, school management systems, WiFi networks
🔐 **Security firms** — Cybersecurity assessments and monitoring systems
🤖 **Startups** — Custom software, AI tools, mobile apps

View our full portfolio at: **dvtechnologies.xyz/portfolio**

📞 Want to discuss a similar project? **+254 719 576 326**`,
    followUps: ["What services do you offer?", "How do I get started?"],
  },

  // ── PARTNERSHIP / NDAKARU / CLIENTS ─────────────────────────────────────
  {
    keywords: ["partner", "partnership", "ndakaru", "varratek", "bridan", "collaborate", "associate"],
    response: `**D&V Technologies Partners:**

We work with trusted Kenyan technology partners:

🤝 **Bridan Design Build** (buildwithbridan.com) — Design & Build
🛡️ **VarraTek** (varratek.xyz) — Cybersecurity specialists
💡 **Ndakaru** (ndakaru.co.ke) — Kenyan digital solutions
🚀 **D&V Technologies** — Next-gen tech (that's us!)

Together we form a strong ecosystem of Kenyan tech companies delivering world-class services. We are proud to be part of the **Silicon Savannah** movement.`,
    followUps: ["Tell me about your services", "How do I work with you?"],
  },

  // ── SILICON SAVANNAH ─────────────────────────────────────────────────────
  {
    keywords: ["silicon savannah", "2030", "vision", "nairobi tech", "africa tech", "african", "kenya tech"],
    response: `**Silicon Savannah 2030 — D&V Technologies' Vision:**

The **Silicon Savannah** is Kenya's (and Africa's) growing tech ecosystem — named as a nod to Silicon Valley but rooted in African innovation.

🌍 **Our vision:** Make Nairobi the Silicon Savannah of Africa by **2030** — a world-class tech hub serving the continent.

🚀 **How we contribute:**
- Building affordable, enterprise-grade technology for African businesses
- Training the next generation of Kenyan tech talent
- Creating locally-relevant AI and digital solutions
- Empowering SMEs to compete globally

We believe technology should be accessible to every African business, not just large corporations. That's the D&V promise.`,
    followUps: ["What services do you offer?", "How can I join this movement?", "Contact D&V Technologies"],
  },

  // ── IOT ──────────────────────────────────────────────────────────────────
  {
    keywords: ["iot", "internet of things", "smart", "sensor", "automation", "connected", "device", "raspberry", "arduino"],
    response: `**IoT Solutions at D&V Technologies:**

We build smart, connected systems for businesses:

📡 **What we deliver:**
- Smart office/warehouse automation
- Environmental monitoring (temperature, humidity, access)
- Asset tracking systems
- Smart energy management
- Custom sensor dashboards
- Integration with existing business systems

💡 Perfect for: manufacturing, agriculture, logistics, retail, healthcare

📞 Discuss your IoT project: **+254 719 576 326** | info@dvtechnologies.xyz`,
    followUps: ["What is your pricing?", "Tell me about your AI services"],
  },

  // ── FALLBACK ─────────────────────────────────────────────────────────────
  {
    keywords: ["__fallback__"],
    response: `I'm not sure I fully understood that — let me try to help!

Here are the things I know best about **D&V Technologies**:

- 🛠️ **Services** — Ask "What services do you offer?"
- 💰 **Pricing** — Ask "What are your packages?"
- 📞 **Contact** — Ask "How do I contact D&V?"
- 📍 **Location** — Ask "Where are you located?"
- 💳 **Payment** — Ask "How can I pay?"
- 🚀 **Getting started** — Ask "How do I get started?"

Or you can reach the team directly:
📞 WhatsApp: **+254 719 576 326**
📧 Email: **info@dvtechnologies.xyz**`,
    followUps: ["What services do you offer?", "What is your pricing?", "How do I contact you?"],
  },
];

export const QUICK_PROMPTS = [
  { text: "What services does D&V Technologies offer?" },
  { text: "What are your packages and pricing?" },
  { text: "How do I contact D&V Technologies?" },
  { text: "How do I pay with M-Pesa or Bitcoin?" },
  { text: "Where is D&V Technologies located?" },
  { text: "How do I get started with a project?" },
];
