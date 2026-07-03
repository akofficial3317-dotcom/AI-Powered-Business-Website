const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const testimonials = [
  {
    userName: "Aarav Sharma",
    userRole: "Founder, Himalayan Retail",
    rating: 5,
    feedback:
      "In 2014, Nexa AI Systems helped us organize our first digital customer inquiry workflow. It gave our small retail team a cleaner way to manage requests and follow up with customers.",
    approved: true,
    createdAt: new Date("2014-09-12T10:00:00.000Z"),
  },
  {
    userName: "Priya Mehta",
    userRole: "Managing Director, CloudBridge Consulting",
    rating: 5,
    feedback:
      "The 2015 automation setup made our client reporting process faster and more consistent. Nexa AI Systems understood our manual work and turned it into a smooth digital process.",
    approved: true,
    createdAt: new Date("2015-06-18T10:00:00.000Z"),
  },
  {
    userName: "Rajan Adhikari",
    userRole: "Operations Lead, MetroServe",
    rating: 4,
    feedback:
      "Our support team started using Nexa AI Systems in 2016 for inquiry tracking. The platform improved response ownership and helped us reduce missed customer messages.",
    approved: true,
    createdAt: new Date("2016-11-03T10:00:00.000Z"),
  },
  {
    userName: "Nisha Gurung",
    userRole: "Product Manager, EduSpark",
    rating: 5,
    feedback:
      "In 2017, Nexa AI Systems helped us build a practical dashboard for student engagement and course inquiries. It was simple, useful, and matched how our team worked every day.",
    approved: true,
    createdAt: new Date("2017-08-24T10:00:00.000Z"),
  },
  {
    userName: "Daniel Brooks",
    userRole: "CEO, FinEdge Analytics",
    rating: 5,
    feedback:
      "The 2018 analytics work from Nexa AI Systems gave our leadership team clearer visibility into business performance. Their team translated complex data into decisions we could act on.",
    approved: true,
    createdAt: new Date("2018-04-09T10:00:00.000Z"),
  },
  {
    userName: "Meera Joshi",
    userRole: "Head of Customer Success, TravelNest",
    rating: 5,
    feedback:
      "Nexa AI Systems helped us streamline customer questions in 2019 before peak travel season. The solution improved our response speed and made our support team much more confident.",
    approved: true,
    createdAt: new Date("2019-10-16T10:00:00.000Z"),
  },
  {
    userName: "Owen Williams",
    userRole: "Technology Director, HealthSync",
    rating: 4,
    feedback:
      "During 2020, Nexa AI Systems helped us move several manual workflows online. Their practical approach made remote coordination easier for our operations and support teams.",
    approved: true,
    createdAt: new Date("2020-07-21T10:00:00.000Z"),
  },
  {
    userName: "Anjali Karki",
    userRole: "Founder, SkillBridge Academy",
    rating: 5,
    feedback:
      "The 2021 chatbot and inquiry flow helped our academy manage course questions without overwhelming staff. Students received quicker answers, and our team had better follow-up records.",
    approved: true,
    createdAt: new Date("2021-05-14T10:00:00.000Z"),
  },
  {
    userName: "Kiran Thapa",
    userRole: "COO, SupplyPro Logistics",
    rating: 5,
    feedback:
      "In 2022, Nexa AI Systems improved how we tracked operational requests and internal updates. The automation reduced repetitive admin work and helped managers respond faster.",
    approved: true,
    createdAt: new Date("2022-12-02T10:00:00.000Z"),
  },
  {
    userName: "Liam Thompson",
    userRole: "Head of Product, NovaWorks",
    rating: 5,
    feedback:
      "In 2023, Nexa AI Systems helped us connect product inquiries, lead tracking, and internal updates into one workflow. It made our product and sales teams work with much better clarity.",
    approved: true,
    createdAt: new Date("2023-09-19T10:00:00.000Z"),
  },
  {
    userName: "Sophia Carter",
    userRole: "Marketing Lead, BrandVista",
    rating: 5,
    feedback:
      "Our 2024 customer insight dashboard from Nexa AI Systems helped connect website inquiries, campaign performance, and client follow-ups in one place. It made planning much easier.",
    approved: true,
    createdAt: new Date("2024-03-27T10:00:00.000Z"),
  },
]

async function main() {
  let created = 0
  let updated = 0

  for (const testimonial of testimonials) {
    const existing = await prisma.feedback.findFirst({
      where: {
        userName: testimonial.userName,
        userRole: testimonial.userRole,
      },
    })

    if (existing) {
      await prisma.feedback.update({
        where: { id: existing.id },
        data: testimonial,
      })
      updated += 1
    } else {
      await prisma.feedback.create({ data: testimonial })
      created += 1
    }
  }

  console.log(`Seeded testimonials. Created: ${created}, updated: ${updated}.`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
