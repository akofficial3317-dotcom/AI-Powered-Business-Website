export interface DefaultBlogPost {
  id: number
  title: string
  slug: string
  description: string
  content: string
  image: string | null
  category: string
  published: boolean
  createdAt: string
  updatedAt: string
  readTime: string
  author: {
    name: string
    role: string
  }
  isDefault: true
}

export const HIDDEN_DEFAULT_BLOG_CATEGORY = "__hidden_default_blog__"

export const defaultBlogPosts: DefaultBlogPost[] = [
  {
    id: -1,
    title: "The Future of AI in Business: Trends to Watch in 2024",
    slug: "future-of-ai-business-2024",
    description:
      "Explore the emerging AI technologies that are reshaping how businesses operate and compete in the digital age.",
    content: `
      <p>Artificial Intelligence has moved beyond the realm of science fiction to become a crucial component of modern business strategy. As we navigate through 2024, several key trends are shaping how organizations leverage AI to gain competitive advantages.</p>

      <h2>1. Generative AI Goes Mainstream</h2>
      <p>The explosion of generative AI tools has democratized access to powerful content creation capabilities. Businesses are now using these tools for everything from marketing copy to code generation, dramatically reducing time-to-market for new initiatives.</p>

      <h2>2. AI-Powered Customer Experience</h2>
      <p>Customer expectations continue to rise, and AI is the key to meeting them. Intelligent chatbots, personalization engines, and predictive service tools are becoming table stakes for businesses serious about customer satisfaction.</p>

      <h2>3. Edge AI and Real-Time Processing</h2>
      <p>The need for instant decision-making is driving AI processing closer to the data source. Edge AI enables real-time analytics and actions without the latency of cloud communication, opening new possibilities in manufacturing, retail, and healthcare.</p>

      <h2>4. Responsible AI and Governance</h2>
      <p>As AI becomes more pervasive, organizations are implementing robust governance frameworks. Ethical AI practices, bias detection, and transparent decision-making are no longer optional; they are business imperatives.</p>

      <h2>5. AI-Human Collaboration</h2>
      <p>The most successful AI implementations augment human capabilities rather than replace them. This collaborative approach leads to better outcomes and higher adoption rates across organizations.</p>

      <h2>Looking Ahead</h2>
      <p>The businesses that thrive in this AI-driven era will be those that embrace these trends while maintaining focus on their core mission and values. The technology is powerful, but it is the human vision and strategy that ultimately determines success.</p>
    `,
    image: null,
    category: "AI Trends",
    published: true,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
    readTime: "8 min read",
    author: { name: "Dr. Alexandra Chen", role: "CEO & Founder" },
    isDefault: true,
  },
  {
    id: -2,
    title: "How AI Chatbots Are Revolutionizing Customer Service",
    slug: "ai-chatbots-customer-service",
    description:
      "Discover how intelligent chatbots are transforming customer support with 24/7 availability and instant responses.",
    content: `
      <p>The customer service landscape is undergoing a dramatic transformation, driven by advances in artificial intelligence and natural language processing. AI chatbots have evolved from simple rule-based systems to sophisticated virtual assistants capable of handling complex customer interactions.</p>

      <h2>The Rise of Intelligent Chatbots</h2>
      <p>Modern AI chatbots leverage advanced NLP and machine learning to understand context, sentiment, and intent. They can handle multiple conversations simultaneously, provide instant responses 24/7, and continuously learn from each interaction.</p>

      <h2>Key Benefits for Businesses</h2>
      <p>Organizations implementing AI chatbots report significant improvements in customer satisfaction, reduced support costs, and faster resolution times. The technology also frees human agents to focus on complex issues that require empathy and creative problem-solving.</p>

      <h2>Implementation Best Practices</h2>
      <p>Successful chatbot deployments start with clear objectives and carefully designed conversation flows. Integration with existing systems, robust training data, and seamless human handoff protocols are essential for delivering exceptional customer experiences.</p>

      <h2>The Future of Customer Service</h2>
      <p>As AI technology continues to advance, we can expect even more natural and helpful customer interactions. Voice-enabled assistants, proactive service, and hyper-personalization will define the next generation of customer support.</p>
    `,
    image: null,
    category: "Chatbots",
    published: true,
    createdAt: "2024-01-10T00:00:00.000Z",
    updatedAt: "2024-01-10T00:00:00.000Z",
    readTime: "6 min read",
    author: { name: "Marcus Williams", role: "CTO" },
    isDefault: true,
  },
  {
    id: -3,
    title: "Data Analytics: Turning Information into Business Intelligence",
    slug: "data-analytics-business-intelligence",
    description:
      "Learn how modern data analytics tools can help you make better decisions and gain competitive advantages.",
    content: `
      <p>Data becomes valuable when teams can understand it, trust it, and act on it. Business intelligence brings raw information together through dashboards, reports, and clear metrics that support faster decisions.</p>

      <h2>From Raw Data to Useful Insight</h2>
      <p>Most organizations already collect useful data through websites, sales systems, support channels, and operations. The challenge is connecting that data and presenting it in a way that leaders can use every day.</p>

      <h2>Dashboards That Guide Action</h2>
      <p>A good dashboard does more than show numbers. It highlights trends, warns teams about problems, and makes performance visible across departments.</p>

      <h2>Predictive Analytics</h2>
      <p>With historical patterns, businesses can forecast demand, identify risk, estimate customer behavior, and prepare better strategies before problems become expensive.</p>

      <h2>How Nexa AI Helps</h2>
      <p>Nexa AI Systems builds analytics workflows, visual reports, and dashboard experiences that help businesses move from guesswork to confident decisions.</p>
    `,
    image: null,
    category: "Analytics",
    published: true,
    createdAt: "2024-01-05T00:00:00.000Z",
    updatedAt: "2024-01-05T00:00:00.000Z",
    readTime: "10 min read",
    author: { name: "Prof. Rajan Adhikari", role: "Data Science Mentor" },
    isDefault: true,
  },
  {
    id: -4,
    title: "Implementing Machine Learning in Small Businesses",
    slug: "machine-learning-small-business",
    description:
      "A practical guide to adopting ML solutions that don't require enterprise-level budgets or resources.",
    content: `
      <p>Machine learning is not only for large enterprises. Small businesses can use focused ML solutions to improve customer response, forecast sales, personalize marketing, and reduce repetitive work.</p>

      <h2>Start With a Real Business Problem</h2>
      <p>The best ML projects begin with a clear goal: reduce manual work, predict demand, classify inquiries, or improve customer experience. Starting small keeps the project useful and affordable.</p>

      <h2>Use the Data You Already Have</h2>
      <p>Customer inquiries, sales records, website interactions, and support messages can become training signals for practical AI systems.</p>

      <h2>Keep the First Model Simple</h2>
      <p>Small teams do not need complex infrastructure on day one. A simple, well-tested model connected to a useful workflow is often more valuable than an overbuilt system.</p>

      <h2>Measure Impact</h2>
      <p>Track time saved, response speed, accuracy, and business outcomes. These metrics show whether the ML solution is truly helping.</p>
    `,
    image: null,
    category: "Machine Learning",
    published: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    readTime: "7 min read",
    author: { name: "Dr. Elena Rai", role: "Machine Learning Professor" },
    isDefault: true,
  },
  {
    id: -5,
    title: "The Role of NLP in Modern Business Applications",
    slug: "nlp-modern-business",
    description:
      "Understanding how Natural Language Processing is enabling new ways of human-computer interaction.",
    content: `
      <p>Natural Language Processing helps software understand, classify, summarize, and respond to human language. It powers chatbots, search tools, document automation, and customer support systems.</p>

      <h2>Better Customer Conversations</h2>
      <p>NLP allows chatbots to understand intent, detect context, and respond naturally. This makes support faster and more available without removing human escalation.</p>

      <h2>Document and Message Automation</h2>
      <p>Businesses can use NLP to summarize long messages, classify inquiries, extract key details, and route tasks to the right team.</p>

      <h2>Search and Knowledge Access</h2>
      <p>Modern NLP improves internal knowledge bases by helping teams ask questions naturally and find relevant answers quickly.</p>

      <h2>Practical Implementation</h2>
      <p>Nexa AI Systems applies NLP through customer assistants, admin tools, and automation workflows that match each business's content and process.</p>
    `,
    image: null,
    category: "AI Trends",
    published: true,
    createdAt: "2023-12-28T00:00:00.000Z",
    updatedAt: "2023-12-28T00:00:00.000Z",
    readTime: "9 min read",
    author: { name: "Dr. Maya Gurung", role: "NLP & Chatbot Lead" },
    isDefault: true,
  },
  {
    id: -6,
    title: "Automation Best Practices for Enterprise Operations",
    slug: "automation-enterprise-operations",
    description:
      "Strategic approaches to implementing automation that maximizes efficiency while minimizing disruption.",
    content: `
      <p>Automation works best when it improves a clear process instead of simply replacing manual steps. The goal is to reduce errors, save time, and make operations easier to manage.</p>

      <h2>Map the Workflow First</h2>
      <p>Before building automation, teams should identify inputs, approvals, repeated tasks, handoffs, and failure points. This prevents automating a broken process.</p>

      <h2>Automate High-Volume Tasks</h2>
      <p>Good candidates include data entry, email routing, report generation, status updates, document processing, and repetitive internal notifications.</p>

      <h2>Keep Humans in Control</h2>
      <p>Important decisions should include review points, audit trails, and clear escalation paths. Automation should support teams, not hide responsibility.</p>

      <h2>Improve Over Time</h2>
      <p>Measure time saved, error reduction, and user adoption. Use those results to refine the workflow and expand automation carefully.</p>
    `,
    image: null,
    category: "Automation",
    published: true,
    createdAt: "2023-12-20T00:00:00.000Z",
    updatedAt: "2023-12-20T00:00:00.000Z",
    readTime: "11 min read",
    author: { name: "Dr. Nisha Basnet", role: "Automation Consultant" },
    isDefault: true,
  },
]

export const findDefaultBlogBySlug = (slug: string) =>
  defaultBlogPosts.find((post) => post.slug === slug)

export const findDefaultBlogById = (id: number) =>
  defaultBlogPosts.find((post) => post.id === id)
