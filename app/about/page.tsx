"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { TopicPhoto } from "@/components/topic-photo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Lightbulb,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Clock
} from "lucide-react"

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We constantly push boundaries to deliver cutting-edge AI solutions that set new industry standards.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We build trust through transparency, ethical practices, and unwavering commitment to our clients.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work as true partners with our clients, understanding their unique challenges and goals.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from code quality to customer service.",
  },
]

const team = [
  {
    name: "Dr. Asha Shrestha",
    role: "Chief AI Strategist",
    bio: "AI systems professor and advisor focused on practical machine learning for business.",
    education: "PhD in Artificial Intelligence, University of Edinburgh",
    experience: "14+ years in AI research, enterprise strategy, and graduate teaching.",
    email: "asha.shrestha@nexaai.edu.np",
    phone: "+977-1-555-0131",
    office: "AI Strategy Lab, Block A-204",
    availability: "Sunday, Tuesday, Thursday - 10:00 AM to 1:00 PM",
    expertise: ["AI Strategy", "Machine Learning", "Responsible AI", "Business Transformation"],
    courses: ["AI Product Strategy", "Machine Learning for Business", "Ethics in AI Systems"],
    achievements: [
      "Advised 40+ industry AI adoption projects.",
      "Published research on explainable and human-centered AI.",
      "Leads the Nexa AI mentor review board.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Prof. Rajan Adhikari",
    role: "Data Science Mentor",
    bio: "Senior analytics teacher guiding dashboard design, forecasting, and data storytelling.",
    education: "MSc in Data Science, Asian Institute of Technology",
    experience: "12+ years teaching analytics, BI, statistics, and forecasting systems.",
    email: "rajan.adhikari@nexaai.edu.np",
    phone: "+977-1-555-0132",
    office: "Data Studio, Block B-112",
    availability: "Monday and Wednesday - 11:00 AM to 3:00 PM",
    expertise: ["Data Analytics", "Forecasting", "Power BI", "Data Storytelling"],
    courses: ["Business Analytics", "Dashboard Design", "Predictive Forecasting"],
    achievements: [
      "Mentored award-winning student analytics projects.",
      "Designed executive dashboards for finance and retail teams.",
      "Conducts weekly data storytelling clinics.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Maya Gurung",
    role: "NLP & Chatbot Lead",
    bio: "Research educator specializing in conversational AI, NLP, and human-centered support systems.",
    education: "PhD in Computational Linguistics, National University of Singapore",
    experience: "10+ years building NLP pipelines, multilingual bots, and support automation.",
    email: "maya.gurung@nexaai.edu.np",
    phone: "+977-1-555-0133",
    office: "Language AI Lab, Block A-301",
    availability: "Sunday and Friday - 9:30 AM to 12:30 PM",
    expertise: ["NLP", "Chatbots", "Prompt Design", "Multilingual AI"],
    courses: ["Natural Language Processing", "Conversational AI", "AI Assistant Design"],
    achievements: [
      "Built Nepali-English chatbot prototypes for service desks.",
      "Published on low-resource language NLP.",
      "Supervises chatbot UX and evaluation projects.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Prof. Suman Karki",
    role: "Software Engineering Advisor",
    bio: "Full-stack systems teacher helping teams build secure, maintainable web platforms.",
    education: "MTech in Software Engineering, Kathmandu University",
    experience: "13+ years in full-stack development, architecture, and engineering mentorship.",
    email: "suman.karki@nexaai.edu.np",
    phone: "+977-1-555-0134",
    office: "Engineering Hub, Block C-205",
    availability: "Tuesday and Thursday - 1:00 PM to 4:00 PM",
    expertise: ["Full-Stack Development", "System Design", "Next.js", "API Security"],
    courses: ["Web Application Development", "Software Architecture", "Secure Coding"],
    achievements: [
      "Reviewed architecture for 30+ capstone products.",
      "Introduced code review and testing practices across teams.",
      "Maintains the department engineering standards guide.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Nisha Basnet",
    role: "Automation Consultant",
    bio: "Business process expert teaching workflow automation, integrations, and operations design.",
    education: "DBA in Operations Management, University of Melbourne",
    experience: "11+ years optimizing operations through automation and integrated systems.",
    email: "nisha.basnet@nexaai.edu.np",
    phone: "+977-1-555-0135",
    office: "Automation Lab, Block B-208",
    availability: "Monday, Wednesday, Friday - 10:00 AM to 12:00 PM",
    expertise: ["Workflow Automation", "Process Mapping", "Integrations", "Operations Design"],
    courses: ["Business Process Automation", "Operations Systems", "No-Code AI Workflows"],
    achievements: [
      "Automated admission, CRM, and reporting workflows for partner teams.",
      "Runs process discovery workshops for student product groups.",
      "Developed the automation readiness checklist used by Nexa AI.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Prof. Bikash Thapa",
    role: "Cybersecurity Lecturer",
    bio: "Security mentor focused on access control, privacy, and reliable digital management.",
    education: "MSc in Cybersecurity, University of Warwick",
    experience: "9+ years teaching secure systems, compliance, and incident response basics.",
    email: "bikash.thapa@nexaai.edu.np",
    phone: "+977-1-555-0136",
    office: "Security Lab, Block C-108",
    availability: "Sunday and Wednesday - 2:00 PM to 5:00 PM",
    expertise: ["Cybersecurity", "Privacy", "Access Control", "Risk Assessment"],
    courses: ["Web Security", "Digital Privacy", "Security for AI Products"],
    achievements: [
      "Leads security review sessions before product demos.",
      "Created a practical threat-modeling template for students.",
      "Guided teams on authentication, authorization, and data protection.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1562788869-4ed32648eb72?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Dr. Elena Rai",
    role: "Machine Learning Professor",
    bio: "Applied ML teacher supporting model design, evaluation, and responsible AI practices.",
    education: "PhD in Machine Learning, University of Toronto",
    experience: "15+ years in applied ML, model evaluation, and research-led teaching.",
    email: "elena.rai@nexaai.edu.np",
    phone: "+977-1-555-0137",
    office: "Model Lab, Block A-206",
    availability: "Tuesday and Friday - 10:30 AM to 2:30 PM",
    expertise: ["Applied ML", "Model Evaluation", "MLOps", "Responsible AI"],
    courses: ["Applied Machine Learning", "Model Evaluation", "MLOps Fundamentals"],
    achievements: [
      "Built model evaluation rubrics used across product teams.",
      "Coached students on bias testing and validation planning.",
      "Published practical guides on reproducible ML experiments.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Prof. Kiran Joshi",
    role: "Product Development Coach",
    bio: "Product mentor connecting client needs with AI features, UX, and launch planning.",
    education: "MBA in Product Innovation, Indian School of Business",
    experience: "12+ years coaching product discovery, UX planning, and go-to-market launches.",
    email: "kiran.joshi@nexaai.edu.np",
    phone: "+977-1-555-0138",
    office: "Product Studio, Block B-304",
    availability: "Monday and Thursday - 9:00 AM to 12:00 PM",
    expertise: ["Product Discovery", "UX Planning", "Launch Strategy", "Client Research"],
    courses: ["Product Development", "AI Feature Planning", "User Research for Startups"],
    achievements: [
      "Coached 50+ MVPs from discovery to launch demo.",
      "Facilitates client interview and validation workshops.",
      "Built the Nexa AI product canvas for student teams.",
    ],
    linkedin: "#",
    twitter: "#",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80",
  },
]

const timeline = [
  { year: "2014", title: "Foundation", description: "Started with a mission to make practical AI accessible for growing businesses." },
  { year: "2016", title: "Research Focus", description: "Expanded work into machine learning, NLP, and analytics-led business solutions." },
  { year: "2018", title: "Automation Practice", description: "Introduced workflow automation and reporting tools for client operations." },
  { year: "2020", title: "Digital Services", description: "Strengthened web applications, dashboards, and secure admin management systems." },
  { year: "2022", title: "AI Assistant Systems", description: "Built website-specific chatbot and customer support automation workflows." },
  { year: "2024", title: "Integrated Platform", description: "Combined AI chat, analytics, events, content, and admin tools in one ecosystem." },
  { year: "2025", title: "Education-Led Growth", description: "Added expert mentors and teacher-led guidance for AI, data, and software projects." },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Pioneering the Future of AI-Powered Business
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                At Nexa AI Systems, we&apos;re on a mission to make artificial intelligence 
                accessible, practical, and transformative for businesses of all sizes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2014, Nexa AI Systems emerged from a simple yet powerful idea: 
                    that artificial intelligence should be a tool for empowerment, not just 
                    for tech giants, but for every business seeking to innovate and grow.
                  </p>
                  <p>
                    Our founders, a team of AI researchers and business strategists, saw the 
                    gap between cutting-edge AI capabilities and practical business applications. 
                    They set out to bridge that gap.
                  </p>
                  <p>
                    Today, we&apos;re proud to serve hundreds of clients across industries, from 
                    nimble startups to established enterprises, helping them harness the power 
                    of AI to transform their operations and customer experiences.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <TopicPhoto topic="AI business human team" alt="Team building AI business solutions" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Target className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                    <p className="text-muted-foreground">
                      To empower businesses with intelligent AI solutions that automate processes, 
                      enhance decision-making, and create exceptional customer experiences. We believe 
                      every organization deserves access to world-class AI technology.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                      <Eye className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be the global leader in AI-powered business transformation, known for 
                      innovation, reliability, and genuine partnership with our clients. We envision 
                      a world where AI amplifies human potential in every industry.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Values</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">What We Stand For</h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Journey</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">A Decade of Innovation</h2>
            </motion.div>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 mb-8 last:mb-0"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {item.year}
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Team</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">Meet the Experts</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our expert team combines AI teaching, product development,
                software engineering, analytics, and automation experience.
              </p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        role="button"
                        tabIndex={0}
                        className="h-full cursor-pointer overflow-hidden group transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <div className="h-36 overflow-hidden bg-muted sm:h-40">
                          <img
                            src={member.image}
                            alt={`${member.name}, ${member.role}`}
                            loading="lazy"
                            className="h-full w-full object-cover object-[50%_28%] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold leading-tight text-foreground">{member.name}</h3>
                          <p className="mb-2 text-sm leading-snug text-primary">{member.role}</p>
                          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                          <div className="mt-3 flex items-center justify-between gap-2">
                            <span className="text-xs font-medium text-primary">View full profile</span>
                            <div className="flex gap-2 text-muted-foreground">
                              <Linkedin className="h-4 w-4" />
                              <Twitter className="h-4 w-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{member.name}</DialogTitle>
                        <DialogDescription>{member.role} full profile information.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                        <div>
                          <div className="overflow-hidden rounded-lg border bg-muted">
                            <img
                              src={member.image}
                              alt={`${member.name}, ${member.role}`}
                              className="aspect-[4/5] w-full object-cover object-[50%_28%]"
                            />
                          </div>
                          <div className="mt-4 flex gap-2">
                            <Button asChild variant="outline" size="sm" className="flex-1">
                              <a href={member.linkedin} aria-label={`${member.name} LinkedIn profile`}>
                                <Linkedin className="mr-2 h-4 w-4" />
                                LinkedIn
                              </a>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="flex-1">
                              <a href={member.twitter} aria-label={`${member.name} Twitter profile`}>
                                <Twitter className="mr-2 h-4 w-4" />
                                Twitter
                              </a>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-5">
                          <div>
                            <h3 className="text-2xl font-bold leading-tight text-foreground">{member.name}</h3>
                            <p className="mt-1 font-medium text-primary">{member.role}</p>
                            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex gap-3 rounded-lg border p-3">
                              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Education</p>
                                <p className="text-sm text-foreground">{member.education}</p>
                              </div>
                            </div>
                            <div className="flex gap-3 rounded-lg border p-3">
                              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Experience</p>
                                <p className="text-sm text-foreground">{member.experience}</p>
                              </div>
                            </div>
                            <div className="flex gap-3 rounded-lg border p-3">
                              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Email</p>
                                <a href={`mailto:${member.email}`} className="break-all text-sm text-foreground hover:text-primary">
                                  {member.email}
                                </a>
                              </div>
                            </div>
                            <div className="flex gap-3 rounded-lg border p-3">
                              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Phone</p>
                                <a href={`tel:${member.phone}`} className="text-sm text-foreground hover:text-primary">
                                  {member.phone}
                                </a>
                              </div>
                            </div>
                            <div className="flex gap-3 rounded-lg border p-3">
                              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Office</p>
                                <p className="text-sm text-foreground">{member.office}</p>
                              </div>
                            </div>
                            <div className="flex gap-3 rounded-lg border p-3">
                              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <div>
                                <p className="text-xs font-medium uppercase text-muted-foreground">Availability</p>
                                <p className="text-sm text-foreground">{member.availability}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="mb-2 font-semibold text-foreground">Expertise</h4>
                            <div className="flex flex-wrap gap-2">
                              {member.expertise.map((skill) => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                              <h4 className="mb-2 font-semibold text-foreground">Courses</h4>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {member.courses.map((course) => (
                                  <li key={course} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    {course}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="mb-2 font-semibold text-foreground">Achievements</h4>
                              <ul className="space-y-2 text-sm text-muted-foreground">
                                {member.achievements.map((achievement) => (
                                  <li key={achievement} className="flex gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join hundreds of companies that trust Nexa AI Systems for their digital transformation journey.
              </p>
              <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
