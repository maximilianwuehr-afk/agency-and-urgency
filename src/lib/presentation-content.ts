// Presentation content for EN and DE versions
// Tailored for external SME executives

export interface WhyIBuiltThisContent {
  title: string;
  subtitle: string;
  reasons: {
    title: string;
    description: string;
  }[];
  closingLine: string;
}

export interface SpeakerBackgroundContent {
  eyebrow: string;
  title: string;
  intro: string;
  proofPoints: {
    label: string;
    title: string;
    text: string;
  }[];
  takeaway: string;
}

export interface ExecSummaryContent {
  title: string;
  points: {
    highlight: string;
    text: string;
  }[];
  statLabel: string;
}

export interface RealityCheckContent {
  title: string;
  intro: string;
  canTitle: string;
  cantTitle: string;
  aiCan: string[];
  aiCant: string[];
  quote: string;
  quoteAuthor: string;
  quoteSource: string;
}

export interface SuccessFactorsContent {
  title: string;
  subtitle: string;
  factors: {
    title: string;
    icon: string;
    description: string;
    highlight: string;
  }[];
}

export interface ToolsPrimerContent {
  title: string;
  subtitle: string;
  conceptsTitle: string;
  concepts: {
    concept: string;
    meaning: string;
    simple: string;
    icon: string;
  }[];
  toolsTitle: string;
  categories: {
    category: string;
    icon: string;
    description: string;
    tools: { name: string; note: string }[];
    canDo: string[];
    cantDo: string[];
    bonus?: string;
  }[];
  recommendation: {
    title: string;
    text: string;
  };
}

export interface ExamplesContent {
  title: string;
  subtitle: string;
  externalTitle: string;
  external: {
    name: string;
    stat: string;
    description: string;
    source: string;
  }[];
  personalTitle: string;
  personal: {
    name: string;
    by: string;
    description: string;
    stat?: string;
  }[];
}

export interface WhatThisMeansContent {
  title: string;
  statements: {
    title: string;
    description: string;
    accent: string;
  }[];
}

export interface SessionInsightContent {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  points: {
    title: string;
    text: string;
  }[];
  takeaway: string;
  accent: string;
}

export interface SessionInsightsContent {
  governance: SessionInsightContent;
  careers: SessionInsightContent;
  customerContact: SessionInsightContent;
}

export interface HowToStartContent {
  title: string;
  subtitle: string;
  steps: {
    number: number;
    title: string;
    description: string;
    bad: string;
    good: string;
  }[];
}

export interface ClosingContent {
  title: string;
  message: string;
  cta: string;
}

export interface PresentationContent {
  lang: 'en' | 'de';
  hero: {
    title: string;
    subtitle: string;
  };
  speakerBackground: SpeakerBackgroundContent;
  whyIBuiltThis: WhyIBuiltThisContent;
  execSummary: ExecSummaryContent;
  realityCheck: RealityCheckContent;
  successFactors: SuccessFactorsContent;
  toolsPrimer: ToolsPrimerContent;
  examples: ExamplesContent;
  whatThisMeans: WhatThisMeansContent;
  sessionInsights: SessionInsightsContent;
  howToStart: HowToStartContent;
  closing: ClosingContent;
}

export const EN_CONTENT: PresentationContent = {
  lang: 'en',
  hero: {
    title: 'AI with agency & urgency',
    subtitle: 'A practical guide for business leaders — January 2026',
  },
  speakerBackground: {
    eyebrow: 'Why me',
    title: 'Operator, not AI pundit',
    intro: 'I am Maximilian Wühr, CEO of FINN. FINN is a car-subscription company in Germany and the US, with digital demand, financing, fleet operations, logistics and customer operations in one operating system.',
    proofPoints: [
      {
        label: 'Context',
        title: 'SME constraints, at scale',
        text: 'Speed, margin, quality and customer trust matter at the same time. AI is not a lab topic; it is a leadership and execution topic.',
      },
      {
        label: 'Surface',
        title: 'Real operating breadth',
        text: 'We see AI in recruiting, customer service, engineering, data, marketing and internal workflows, where the work actually happens.',
      },
      {
        label: 'Practice',
        title: 'Personal daily usage',
        text: 'I use these tools myself to build products, automate workflows and prepare better decisions.',
      },
    ],
    takeaway: 'FINN is not the point. The point is that these patterns transfer to every organization with too much work, too little time and high quality expectations.',
  },
  whyIBuiltThis: {
    title: 'Why I Built This',
    subtitle: 'A personal note',
    reasons: [
      {
        title: 'To inspire action',
        description: 'I created this as an internal memo at FINN to encourage our teams to embrace AI tools. The response was overwhelming — people wanted to share it externally.',
      },
      {
        title: 'Because I believe in the impact',
        description: "I've seen firsthand how AI transforms work. Analysts query databases without writing SQL. Designers generate images in seconds. PMs ship fixes without waiting for engineering queues.",
      },
      {
        title: 'Because I use it every day',
        description: 'I built a Slack CLI in 10 hours. An Obsidian plugin in 3 hours. These aren\'t hypotheticals — they\'re my actual workflow. The productivity gains are real.',
      },
    ],
    closingLine: 'This guide is what I wish I had when I started. I hope it helps you too.',
  },
  execSummary: {
    title: 'Executive Summary',
    points: [
      {
        highlight: 'The shift is here.',
        text: 'AI is at >80% human quality in any discipline.',
      },
      {
        highlight: 'This is not optional.',
        text: 'Companies using AI tools are shipping faster. Your competitors are already experimenting.',
      },
      {
        highlight: 'The reality check:',
        text: "AI won't do the hard parts — you still prioritize, decide, and own tradeoffs.",
      },
      {
        highlight: 'Start now.',
        text: 'Pick one idea this week. Be specific. Accept imperfection.',
      },
    ],
    statLabel: 'human-level quality across disciplines',
  },
  realityCheck: {
    title: 'The Reality Check',
    intro: 'AI will not take your job. It will replace parts of it — the repetitive, the tedious, the "I could do this but it takes 3 hours" parts.',
    canTitle: 'AI can',
    cantTitle: "AI can't",
    aiCan: [
      'Write production-ready software',
      'Search and synthesize information',
      'Execute repetitive tasks at scale',
      "Explore possibilities you wouldn't have time to try",
    ],
    aiCant: [
      'Make difficult decisions',
      'Know your context without you providing it',
      'Compensate for lack of planning',
      'Own outcomes',
    ],
    quote: "If you work them and if you learn them, you'll be, no exaggeration, 20x as productive.",
    quoteAuthor: 'Peter Steinberger',
    quoteSource: 'steipete.me',
  },
  successFactors: {
    title: 'What Makes the Difference',
    subtitle: "The traits that separate those who thrive from those who struggle.",
    factors: [
      {
        title: 'Curiosity',
        icon: '[?]',
        description: 'Dive into areas outside your expertise. AI will help you bridge the knowledge gap.',
        highlight: 'The barrier to entry has collapsed.',
      },
      {
        title: 'Agency',
        icon: '[►]',
        description: "You are in the driver's seat. AI proposes; you decide. Don't accept outputs blindly.",
        highlight: 'You can literally just do things.',
      },
      {
        title: 'Knowing When to Stop',
        icon: '[■]',
        description: 'AI is a slot machine for productivity. The hardest skill: recognizing when to start fresh with a clearer prompt.',
        highlight: 'Sometimes delete everything.',
      },
      {
        title: 'Accepting Imperfection',
        icon: '[~]',
        description: "You won't get 100%. That's fine. The goal isn't perfection; it's progress.",
        highlight: 'Be specific. Start small. Improve over time.',
      },
    ],
  },
  toolsPrimer: {
    title: 'A map for AI tools',
    subtitle: 'Quick vocabulary, then what to try.',
    conceptsTitle: 'Three Things to Know',
    concepts: [
      {
        concept: 'LLM',
        meaning: 'Large Language Model — the AI "brain" that reads and generates text',
        simple: 'Think: a very fast reader and writer',
        icon: '[◉]',
      },
      {
        concept: 'Context',
        meaning: 'What the AI can "see" — your documents, code, instructions',
        simple: 'More context = smarter responses',
        icon: '[▣]',
      },
      {
        concept: 'Tools',
        meaning: 'Actions AI can take: search files, run code, browse the web, send emails',
        simple: 'Skills, plugins, integrations — all just "tools"',
        icon: '[⚙]',
      },
    ],
    toolsTitle: 'What Should You Try? (January 2026)',
    categories: [
      {
        category: 'Chat Interfaces for LLMs',
        icon: '[◯]',
        description: 'Chat UIs for questions, writing, brainstorming, and quick analysis.',
        tools: [
          { name: 'ChatGPT', note: 'Most popular, good all-rounder' },
          { name: 'Claude', note: 'Best for long documents and nuanced writing' },
          { name: 'Gemini', note: 'Google integration, real-time web access' },
          { name: 'Perplexity', note: 'Search-first, cites sources' },
        ],
        canDo: ['Answer questions', 'Write and edit text', 'Analyze documents', 'Brainstorm ideas'],
        cantDo: ['Take actions on your behalf', 'Access your local files', 'Remember past conversations long-term'],
      },
      {
        category: 'Apps integrating AI with work',
        icon: '[▶]',
        description: 'AI connected to workflows: can take action across multiple tools and apps.',
        tools: [
          { name: 'Manus', note: 'Research agent, can browse and synthesize' },
          { name: 'Claude Cowork', note: 'Task-focused agent for work coordination' },
          { name: 'Relevance.ai', note: 'Workflow automation and AI pipelines for teams' },
          { name: 'Claude Work', note: 'Coming soon — Claude with computer use' },
        ],
        canDo: [
          'Connect multiple tools in one workflow',
          'Trigger actions across apps (docs, email, CRM)',
          'Handle multi-step tasks with handoffs/approvals',
          'Keep work moving in the background',
        ],
        cantDo: [
          'Act without permission or access',
          'Know your business rules unless you define them',
          'Work across tools that are not connected',
        ],
      },
      {
        category: 'Coding Agents',
        icon: '[<>]',
        description: 'AI agents for software development. Also useful for non-coding work.',
        tools: [
          { name: 'Cursor', note: 'AI-native IDE, great for existing projects' },
          { name: 'Claude Code', note: 'Terminal agent, maximum autonomy' },
          { name: 'Codex', note: "OpenAI's agent, slow and thorough" },
          { name: 'Antigravity', note: 'Free, team-friendly, multiple models' },
        ],
        canDo: ['Write and edit code', 'Read your entire codebase', 'Run commands', 'Create files and projects'],
        cantDo: ['Replace human judgment', 'Know your context without you providing it'],
        bonus: "Pro tip: These tools work great for non-code tasks too — writing docs, analyzing data, automating workflows.",
      },
    ],
    recommendation: {
      title: 'Where to start?',
      text: "You probably already use ChatGPT or Claude. Good. Next step: try a coding agent like Cursor — even if you don't code. They're powerful for any complex task.",
    },
  },
  examples: {
    title: 'Real Examples',
    subtitle: 'What people are actually building with AI tools.',
    externalTitle: 'External',
    external: [
      {
        name: 'Peter Steinberger',
        stat: '2 afternoons',
        description: 'Rebuilt a fitness tracking app (originally maintained by 100 engineers)',
        source: 'steipete.me',
      },
      {
        name: 'Claude Code',
        stat: '99%',
        description: 'Built 99% using Claude Code itself — recursive AI development',
        source: 'Anthropic',
      },
      {
        name: 'Duolingo',
        stat: '25% + 70%',
        description: '25% faster onboarding, 70% more PRs merged',
        source: 'faros.ai',
      },
    ],
    personalTitle: 'My Own Experience',
    personal: [
      {
        name: 'Slack CLI',
        by: 'Max W.',
        description: 'Full command-line tool in <10 hours with Claude Code',
        stat: '<10h',
      },
      {
        name: 'CV Screener',
        by: 'Jan Heiselbetz',
        description: 'AI pre-screens applications and drafts recruiter summaries',
      },
      {
        name: 'CV Screening Agents',
        by: 'FINN HR',
        description: 'AI agents pre-screen applications, reducing recruiter workload by 60%',
      },
      {
        name: 'Customer Service AI',
        by: 'FINN CX',
        description: 'Agents handle 40% of customer inquiries end-to-end',
      },
    ],
  },
  whatThisMeans: {
    title: 'What This Means',
    statements: [
      {
        title: 'AI usage is becoming table stakes.',
        description: "This is not a \"nice to have.\" Not using AI is like not using email in 2005 — technically possible, but you're handicapping yourself.",
        accent: 'var(--accent-finn)',
      },
      {
        title: 'You can enter areas outside your competence.',
        description: 'A PM can prototype. A designer can analyze data. An ops manager can automate workflows. The barriers have fallen.',
        accent: 'var(--accent-success)',
      },
      {
        title: 'You can ship faster.',
        description: 'AI lets you do in hours what used to take weeks. Every improvement shipped faster is value delivered sooner.',
        accent: 'var(--text-primary)',
      },
    ],
  },
  sessionInsights: {
    governance: {
      id: 'quality-governance',
      label: 'From the last session',
      title: 'Quality comes from judgement, not from banning the tool',
      subtitle: 'Good AI usage needs rules, but the operating model is still human accountability.',
      points: [
        {
          title: 'AI remains a tool',
          text: 'The person using it still owns prioritization, decisions and outcomes.',
        },
        {
          title: 'Regulation should focus the work',
          text: 'Clear criteria, approval paths and guardrails matter more than broad fear-based bans.',
        },
        {
          title: 'AI can improve quality',
          text: 'Use it as a review layer for drafts, analyses and decisions before a human signs off.',
        },
      ],
      takeaway: 'The bar is not “AI produced it”. The bar is “a responsible person reviewed it and stands behind it”.',
      accent: 'var(--accent-finn)',
    },
    careers: {
      id: 'career-shift',
      label: 'From the last session',
      title: 'Careers will change, but expertise compounds',
      subtitle: 'AI makes expertise more accessible, but it also makes expert judgement more valuable.',
      points: [
        {
          title: 'Expert value scales',
          text: 'Experts become more important because AI multiplies the reach of good judgement.',
        },
        {
          title: 'Junior roles get more leverage',
          text: 'Juniors can onboard faster, generate more impact earlier and explore solutions more fearlessly.',
        },
        {
          title: 'The shape changes',
          text: 'Some tasks disappear. The need for learning, taste, judgement and ownership does not.',
        },
      ],
      takeaway: 'AI does not remove the career ladder. It changes what people need to learn first.',
      accent: 'var(--accent-glow)',
    },
    customerContact: {
      id: 'customer-contact',
      label: 'From the last session',
      title: 'Customer centricity still differentiates',
      subtitle: 'AI can make companies more customer-centric, but it does not replace prioritization or trust.',
      points: [
        {
          title: 'Feedback becomes easier to use',
          text: 'AI helps understand customer signals, summarize patterns and translate them into action.',
        },
        {
          title: 'Human contact is not always the answer',
          text: 'For simple jobs-to-be-done, less handoff and more disintermediation can be the better experience.',
        },
        {
          title: 'Trust still needs people',
          text: 'When the product is an experience or a trust question, human interaction remains hard to replace.',
        },
      ],
      takeaway: 'You do not win because humans talk to customers. You win because the organization makes better customer-prioritized decisions.',
      accent: 'var(--accent-success)',
    },
  },
  howToStart: {
    title: 'Practical Guide',
    subtitle: 'How to actually use AI effectively, step by step.',
    steps: [
      {
        number: 1,
        title: 'Think First',
        description: 'Spend 2 minutes clarifying what you want. The clearer your request, the better the result.',
        bad: '"Summarize this meeting"',
        good: '"Turn a messy meeting + Slack thread into a clean recap and action plan, then draft the follow-up email and tasks."',
      },
      {
        number: 2,
        title: 'Be Specific',
        description: 'Vague requests produce vague results.',
        bad: '"Make a recap from this meeting and Slack thread"',
        good: '"From the notes below, write a 6-bullet recap for the team, then list owners + due dates for each action item."',
      },
      {
        number: 3,
        title: 'Tell It What NOT to Do',
        description: 'Constraints help more than you think.',
        bad: '"Create a recap and tasks from this meeting"',
        good: '"Create a recap and tasks. Do not invent decisions or owners; mark unknowns as [TBD]."',
      },
      {
        number: 4,
        title: 'Explain Why',
        description: 'Context matters. "This is for leadership" leads to a different result than "this is just for my team."',
        bad: '"Draft a follow-up email"',
        good: '"Draft a follow-up email so stakeholders who missed the meeting can approve next steps today."',
      },
      {
        number: 5,
        title: 'Clean Slate When Stuck',
        description: 'If AI keeps failing, start fresh. Copy only essential context. Performance improves dramatically.',
        bad: 'Keep pushing the same broken conversation',
        good: 'New chat, paste only the meeting notes + Slack thread',
      },
      {
        number: 6,
        title: 'Experiment',
        description: "You don't need every tool. But try them. If you're not experimenting, you're losing out.",
        bad: 'Stick with what you know',
        good: 'Try a workflow tool that can create tasks for you',
      },
    ],
  },
  closing: {
    title: 'Final Thought',
    message: 'The tools will only get better. The question is whether you\'ll be ready. Start small. Stay curious. Ship something this week.',
    cta: 'Start now →',
  },
};

export const DE_CONTENT: PresentationContent = {
  lang: 'de',
  hero: {
    title: 'KI mit Selbstbestimmtheit & Dringlichkeit',
    subtitle: 'Ein praktischer Leitfaden für Führungskräfte — Januar 2026',
  },
  speakerBackground: {
    eyebrow: 'Warum ich?',
    title: 'Praktiker, nicht KI-Kommentator',
    intro: 'Ich bin Maximilian Wühr, CEO von FINN. FINN ist eine Car-Subscription-Plattform in Deutschland und den USA: digitale Nachfrage, Finanzierung, Flotte, Logistik und Kundenservice in einem operativen System.',
    proofPoints: [
      {
        label: 'Kontext',
        title: 'KMU-Realität, nur größer',
        text: 'Auch bei FINN sind Geschwindigkeit, Marge, Qualität und Kundenvertrauen gleichzeitig relevant. KI ist kein Laborthema, sondern ein Führungs- und Umsetzungsthema.',
      },
      {
        label: 'Fläche',
        title: 'Breite operative Praxis',
        text: 'Wir sehen KI in Recruiting, Customer Service, Engineering, Data, Marketing und internen Workflows, also dort, wo Arbeit tatsächlich passiert.',
      },
      {
        label: 'Praxis',
        title: 'Eigene Nutzung jeden Tag',
        text: 'Ich nutze diese Tools selbst, um Produkte zu bauen, Workflows zu automatisieren und Entscheidungen besser vorzubereiten.',
      },
    ],
    takeaway: 'FINN ist nicht der Punkt. Der Punkt ist: Die Muster übertragen sich auf jede Organisation mit zu viel Arbeit, zu wenig Zeit und hohen Qualitätsansprüchen.',
  },
  whyIBuiltThis: {
    title: 'Warum ich das gemacht habe',
    subtitle: 'Eine persönliche Anmerkung',
    reasons: [
      {
        title: 'Um zum Handeln zu inspirieren',
        description: 'Ich habe dies ursprünglich als internes Memo bei FINN erstellt, um unsere Teams zu ermutigen, KI-Tools zu nutzen. Die Resonanz war überwältigend — viele wollten es extern teilen.',
      },
      {
        title: 'Weil ich an die Wirkung glaube',
        description: 'Ich habe aus erster Hand erlebt, wie KI die Arbeit transformiert. Analysten fragen Datenbanken ab, ohne SQL zu schreiben. Designer generieren Bilder in Sekunden. PMs liefern Fixes, ohne auf Engineering-Queues zu warten.',
      },
      {
        title: 'Weil ich es jeden Tag nutze',
        description: 'Ich habe ein Slack CLI in 10 Stunden gebaut. Ein Obsidian-Plugin in 3 Stunden. Das sind keine Hypothesen — das ist mein tatsächlicher Workflow. Die Produktivitätsgewinne sind real.',
      },
    ],
    closingLine: '',
  },
  execSummary: {
    title: 'Zusammenfassung',
    points: [
      {
        highlight: 'Der Wandel ist da.',
        text: 'KI erreicht >80% menschliche Qualität in jeder Disziplin.',
      },
      {
        highlight: 'Nichts zu tun ist keine Option.',
        text: 'Unternehmen, die KI-Tools nutzen, liefern schneller. Deine Wettbewerber experimentieren bereits.',
      },
      {
        highlight: 'Der Reality-Check:',
        text: 'KI macht nicht die schweren Teile — du priorisierst, entscheidest und trägst die Verantwortung für Tradeoffs.',
      },
      {
        highlight: 'Fang jetzt an.',
        text: 'Wähle diese Woche eine Idee. Sei spezifisch. Akzeptiere Unvollkommenheit.',
      },
    ],
    statLabel: 'menschliches Qualitätsniveau über alle Disziplinen',
  },
  realityCheck: {
    title: 'Der Reality-Check',
    intro: 'KI wird deinen Job nicht übernehmen. Sie wird Teile davon ersetzen — das Repetitive, das Mühsame, das "Ich könnte das machen, aber es dauert 3 Stunden".',
    canTitle: 'KI kann',
    cantTitle: 'KI kann nicht',
    aiCan: [
      'Produktionsreife Software schreiben',
      'Informationen suchen und zusammenfassen',
      'Repetitive Aufgaben skaliert ausführen',
      'Möglichkeiten erkunden, für die du keine Zeit hättest',
    ],
    aiCant: [
      'Schwierige Entscheidungen treffen',
      'Deinen Kontext kennen, ohne dass du ihn bereitstellst',
      'Mangelnde Planung kompensieren',
      'Ergebnisse verantworten',
    ],
    quote: 'Wenn du sie nutzt und wenn du sie lernst, wirst du, ohne Übertreibung, 20x so produktiv sein.',
    quoteAuthor: 'Peter Steinberger',
    quoteSource: 'steipete.me',
  },
  successFactors: {
    title: 'Was den Unterschied macht',
    subtitle: 'Die Eigenschaften, die erfolgreiche von struggelnden unterscheiden.',
    factors: [
      {
        title: 'Neugier',
        icon: '[?]',
        description: 'Tauche in Bereiche außerhalb deiner Expertise ein. KI hilft dir, Wissenslücken zu überbrücken.',
        highlight: 'Die Einstiegshürde ist gefallen.',
      },
      {
        title: 'Selbstbestimmtheit',
        icon: '[►]',
        description: 'Du sitzt am Steuer. KI schlägt vor; du entscheidest. Akzeptiere Outputs nicht blind.',
        highlight: 'Du kannst einfach Dinge tun.',
      },
      {
        title: 'Wissen, wann man aufhört',
        icon: '[■]',
        description: 'KI ist ein Spielautomat für Produktivität. Die schwierigste Fähigkeit: erkennen, wann man mit einem klareren Prompt neu anfangen sollte.',
        highlight: 'Manchmal alles löschen.',
      },
      {
        title: 'Unvollkommenheit akzeptieren',
        icon: '[~]',
        description: 'Du wirst keine 100% erreichen. Das ist okay. Das Ziel ist nicht Perfektion; es ist Fortschritt.',
        highlight: 'Sei spezifisch. Fang klein an. Verbessere mit der Zeit.',
      },
    ],
  },
  toolsPrimer: {
    title: 'Karte für KI-Tools',
    subtitle: 'Kurzes Vokabular, dann was du ausprobieren solltest.',
    conceptsTitle: 'Drei Dinge zum Wissen',
    concepts: [
      {
        concept: 'LLM',
        meaning: 'Large Language Model — das KI-"Gehirn", das Text liest und generiert',
        simple: 'Denk: ein sehr schneller Leser und Schreiber',
        icon: '[◉]',
      },
      {
        concept: 'Kontext',
        meaning: 'Was die KI "sehen" kann — deine Dokumente, Code, Anweisungen',
        simple: 'Mehr Kontext = klügere Antworten',
        icon: '[▣]',
      },
      {
        concept: 'Tools',
        meaning: 'Aktionen, die KI ausführen kann: Dateien durchsuchen, Code ausführen, im Web browsen, E-Mails senden',
        simple: 'Skills, Plugins, Integrationen — alles nur "Tools"',
        icon: '[⚙]',
      },
    ],
    toolsTitle: 'Was solltest du ausprobieren? (Januar 2026)',
    categories: [
      {
        category: 'Chat-Interfaces für LLMs',
        icon: '[◯]',
        description: 'Chat-UIs für Fragen, Schreiben, Brainstorming und schnelle Analysen.',
        tools: [
          { name: 'ChatGPT', note: 'Am beliebtesten, guter Allrounder' },
          { name: 'Claude', note: 'Am besten für lange Dokumente und nuanciertes Schreiben' },
          { name: 'Gemini', note: 'Google-Integration, Echtzeit-Webzugang' },
          { name: 'Perplexity', note: 'Such-fokussiert, zitiert Quellen' },
        ],
        canDo: ['Fragen beantworten', 'Text schreiben und bearbeiten', 'Dokumente analysieren', 'Ideen brainstormen'],
        cantDo: ['Aktionen in deinem Namen ausführen', 'Auf deine lokalen Dateien zugreifen', 'Vergangene Gespräche langfristig merken'],
      },
      {
        category: 'Apps mit KI im Arbeitsfluss',
        icon: '[▶]',
        description: 'KI im Workflow: kann Aktionen über mehrere Tools und Apps ausführen.',
        tools: [
          { name: 'Manus', note: 'Recherche-Agent, kann browsen und zusammenfassen' },
          { name: 'Claude Cowork', note: 'Aufgaben-Agent für Koordination bei der Arbeit' },
          { name: 'Relevance.ai', note: 'Workflow-Automation und KI-Pipelines für Teams' },
          { name: 'Claude Work', note: 'Kommt bald — Claude mit Computer-Nutzung' },
        ],
        canDo: [
          'Mehrere Tools in einem Workflow verbinden',
          'Aktionen über Apps hinweg auslösen (Docs, E-Mail, CRM)',
          'Mehrstufige Aufgaben mit Übergaben/Freigaben erledigen',
          'Arbeit im Hintergrund vorantreiben',
        ],
        cantDo: [
          'Ohne Erlaubnis oder Zugriff handeln',
          'Geschäftsregeln kennen, wenn du sie nicht definierst',
          'Über Apps arbeiten, die nicht verbunden sind',
        ],
      },
      {
        category: 'Coding Agents',
        icon: '[<>]',
        description: 'KI-Agenten für Softwareentwicklung. Auch hilfreich für Nicht-Code-Arbeit.',
        tools: [
          { name: 'Cursor', note: 'KI-native IDE, gut für bestehende Projekte' },
          { name: 'Claude Code', note: 'Terminal-Agent, maximale Autonomie' },
          { name: 'Codex', note: 'OpenAIs Agent, langsam und gründlich' },
          { name: 'Antigravity', note: 'Kostenlos, team-freundlich, mehrere Modelle' },
        ],
        canDo: ['Code schreiben und bearbeiten', 'Deine gesamte Codebase lesen', 'Befehle ausführen', 'Dateien und Projekte erstellen'],
        cantDo: ['Menschliches Urteilsvermögen ersetzen', 'Deinen Kontext kennen, ohne dass du ihn bereitstellst'],
        bonus: 'Pro-Tipp: Diese Tools funktionieren auch großartig für Nicht-Code-Aufgaben — Dokumentation schreiben, Daten analysieren, Workflows automatisieren.',
      },
    ],
    recommendation: {
      title: 'Wo anfangen?',
      text: 'Du nutzt wahrscheinlich schon ChatGPT oder Claude. Gut. Nächster Schritt: Probier einen Coding-Agenten wie Cursor — auch wenn du nicht programmierst. Sie sind mächtig für jede komplexe Aufgabe.',
    },
  },
  examples: {
    title: 'Echte Beispiele',
    subtitle: 'Was Leute tatsächlich mit KI-Tools bauen.',
    externalTitle: 'Extern',
    external: [
      {
        name: 'Peter Steinberger',
        stat: '2 Nachmittage',
        description: 'Hat eine Fitness-Tracking-App neu gebaut (ursprünglich von 100 Ingenieuren gewartet)',
        source: 'steipete.me',
      },
      {
        name: 'Claude Code',
        stat: '99%',
        description: 'Zu 99% mit Claude Code selbst gebaut — rekursive KI-Entwicklung',
        source: 'Anthropic',
      },
      {
        name: 'Duolingo',
        stat: '25% + 70%',
        description: '25% schnelleres Onboarding, 70% mehr PRs gemerged',
        source: 'faros.ai',
      },
    ],
    personalTitle: 'Meine eigene Erfahrung',
    personal: [
      {
        name: 'Slack CLI',
        by: 'Max W.',
        description: 'Vollständiges Kommandozeilen-Tool in <10 Stunden mit Claude Code',
        stat: '<10h',
      },
      {
        name: 'CV-Screener',
        by: 'Jan Heiselbetz',
        description: 'KI übernimmt das Vorscreening und erstellt Recruiter-Zusammenfassungen',
      },
      {
        name: 'CV-Screening Agents',
        by: 'FINN HR',
        description: 'KI-Agents screenen Bewerbungen vor, 60% weniger Aufwand für Recruiter',
      },
      {
        name: 'Kundenservice-KI',
        by: 'FINN CX',
        description: 'Agents bearbeiten 40% der Kundenanfragen vollständig',
      },
    ],
  },
  whatThisMeans: {
    title: 'Was das bedeutet',
    statements: [
      {
        title: 'KI-Nutzung wird zum Standard.',
        description: 'Das ist kein "Nice to have". KI nicht zu nutzen ist wie keine E-Mail in 2005 zu nutzen — technisch möglich, aber du handicapst dich selbst.',
        accent: 'var(--accent-finn)',
      },
      {
        title: 'Du kannst Bereiche außerhalb deiner Kompetenz betreten.',
        description: 'Ein PM kann prototypen. Ein Designer kann Daten analysieren. Ein Ops-Manager kann Workflows automatisieren. Die Barrieren sind gefallen.',
        accent: 'var(--accent-success)',
      },
      {
        title: 'Du kannst schneller liefern.',
        description: 'KI lässt dich in Stunden erledigen, was früher Wochen gedauert hat. Jede schneller gelieferte Verbesserung ist früher gelieferter Wert.',
        accent: 'var(--text-primary)',
      },
    ],
  },
  sessionInsights: {
    governance: {
      id: 'quality-governance',
      label: 'Aus der letzten Session',
      title: 'Qualität entsteht durch Judgement, nicht durch Tool-Verbot',
      subtitle: 'Gute KI-Nutzung braucht Regeln, aber das Operating Model bleibt menschliche Verantwortung.',
      points: [
        {
          title: 'KI bleibt ein Tool',
          text: 'Die Person, die es nutzt, verantwortet weiterhin Priorisierung, Entscheidungen und Ergebnisse.',
        },
        {
          title: 'Reglementierung fokussiert die Arbeit',
          text: 'Klare Kriterien, Freigabewege und Guardrails sind hilfreicher als pauschale Verbote aus Angst.',
        },
        {
          title: 'KI kann Qualität verbessern',
          text: 'Nutze sie als Review-Layer für Texte, Analysen und Entscheidungen, bevor ein Mensch final freigibt.',
        },
      ],
      takeaway: 'Der Standard ist nicht: “KI hat es erstellt.” Der Standard ist: “Ein verantwortlicher Mensch hat es geprüft und steht dahinter.”',
      accent: 'var(--accent-finn)',
    },
    careers: {
      id: 'career-shift',
      label: 'Aus der letzten Session',
      title: 'Karrieren verändern sich, aber Expertise skaliert',
      subtitle: 'KI macht Expertise leichter zugänglich, aber gutes Experten-Judgement wird dadurch wertvoller.',
      points: [
        {
          title: 'Expertenwert vervielfältigt sich',
          text: 'Experten werden nicht weniger wichtig, weil KI die Reichweite von gutem Urteil erhöht.',
        },
        {
          title: 'Juniorrollen bekommen mehr Hebel',
          text: 'Junioren können schneller onboarden, früher Impact erzeugen und oft furchtloser experimentieren.',
        },
        {
          title: 'Die Form verändert sich',
          text: 'Manche Aufgaben verschwinden. Lernen, Taste, Urteilskraft und Ownership bleiben zentral.',
        },
      ],
      takeaway: 'KI schafft die Karriereleiter nicht ab. Sie verändert, was Menschen zuerst lernen müssen.',
      accent: 'var(--accent-glow)',
    },
    customerContact: {
      id: 'customer-contact',
      label: 'Aus der letzten Session',
      title: 'Kundenzentrierung bleibt Differenzierung',
      subtitle: 'KI kann Unternehmen kundenzentrierter machen, ersetzt aber weder Priorisierung noch Vertrauen.',
      points: [
        {
          title: 'Feedback wird leichter nutzbar',
          text: 'KI hilft, Kundensignale zu verstehen, Muster zu erkennen und sie in konkrete Aktionen zu übersetzen.',
        },
        {
          title: 'Menschlicher Kontakt ist nicht immer besser',
          text: 'Bei einfachen Jobs-to-be-done kann weniger Übergabe und mehr Disintermediation die bessere Nutzererfahrung sein.',
        },
        {
          title: 'Vertrauen braucht weiter Menschen',
          text: 'Wenn es um eine Erfahrung oder Vertrauensfrage geht, bleibt menschliche Interaktion schwer ersetzbar.',
        },
      ],
      takeaway: 'Man gewinnt nicht, weil Menschen mit Kunden sprechen. Man gewinnt, weil die Organisation bessere kundenzentrierte Entscheidungen trifft.',
      accent: 'var(--accent-success)',
    },
  },
  howToStart: {
    title: 'Praktischer Leitfaden',
    subtitle: 'Wie du KI tatsächlich effektiv nutzt, Schritt für Schritt.',
    steps: [
      {
        number: 1,
        title: 'Erst denken',
        description: 'Nimm dir 2 Minuten, um zu klären, was du willst. Je klarer deine Anfrage, desto besser das Ergebnis.',
        bad: '"Fass das Meeting zusammen"',
        good: '"Mach aus einem chaotischen Meeting + Slack-Thread eine klare Zusammenfassung und einen Aktionsplan, dann entwirf die Follow-up-E-Mail und Tasks."',
      },
      {
        number: 2,
        title: 'Sei spezifisch',
        description: 'Vage Anfragen produzieren vage Ergebnisse.',
        bad: '"Mach eine Zusammenfassung aus Meeting und Slack-Thread"',
        good: '"Aus den Notizen unten: 6 Bullet-Recap fürs Team, dann Action Items mit Verantwortlichen und Fälligkeiten."',
      },
      {
        number: 3,
        title: 'Sag, was es NICHT tun soll',
        description: 'Einschränkungen helfen mehr als du denkst.',
        bad: '"Erstelle Recap und Tasks aus dem Meeting"',
        good: '"Erstelle Recap und Tasks. Keine Entscheidungen oder Owner erfinden; Unklares als [TBD] markieren."',
      },
      {
        number: 4,
        title: 'Erkläre warum',
        description: 'Kontext zählt. "Für Leadership" führt zu anderem Output als "nur fürs Team."',
        bad: '"Schreibe eine Follow-up-Mail"',
        good: '"Schreibe die Follow-up-Mail, damit Stakeholder, die nicht dabei waren, die nächsten Schritte heute freigeben können."',
      },
      {
        number: 5,
        title: 'Neustart wenn blockiert',
        description: 'Wenn KI immer wieder scheitert, fang neu an. Kopiere nur essentiellen Kontext. Performance verbessert sich dramatisch.',
        bad: 'Immer weiter mit derselben kaputten Konversation',
        good: 'Neuer Chat, nur Meeting-Notizen + Slack-Thread einfügen',
      },
      {
        number: 6,
        title: 'Experimentieren',
        description: 'Du brauchst nicht jedes Tool. Aber probier sie. Wenn du nicht experimentierst, verlierst du.',
        bad: 'Immer nur dasselbe Chat-Tool nutzen',
        good: 'Einmal ein Workflow-Tool testen, das Tasks für dich anlegt',
      },
    ],
  },
  closing: {
    title: 'Abschließender Gedanke',
    message: 'Die Tools werden nur besser werden. Die Frage ist, ob du bereit sein wirst. Fang klein an. Bleib neugierig. Liefere diese Woche etwas.',
    cta: 'Jetzt starten →',
  },
};

export function getContent(lang: 'en' | 'de'): PresentationContent {
  return lang === 'de' ? DE_CONTENT : EN_CONTENT;
}
