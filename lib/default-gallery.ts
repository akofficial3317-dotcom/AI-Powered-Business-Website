export interface DefaultGalleryImage {
  id: number
  title: string
  category: string
  description: string
  imageUrl: string
  url: string
  createdAt: string
  isDefault: true
}

export const HIDDEN_DEFAULT_GALLERY_CATEGORY = "__hidden_default_gallery__"

export const defaultGalleryImages: DefaultGalleryImage[] = [
  {
    id: -1,
    title: "AI Dashboard Project",
    category: "Web Development",
    description: "Modern analytics dashboard for enterprise clients",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-01T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -2,
    title: "Chatbot Interface",
    category: "AI Solutions",
    description: "Conversational AI interface design",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-02T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -3,
    title: "Data Visualization",
    category: "Analytics",
    description: "Real-time data visualization platform",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-03T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -4,
    title: "Mobile App Design",
    category: "Web Development",
    description: "Cross-platform mobile application",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-04T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -5,
    title: "ML Pipeline",
    category: "AI Solutions",
    description: "Machine learning pipeline architecture",
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-05T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -6,
    title: "Client Portal",
    category: "Web Development",
    description: "Secure client management portal",
    imageUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-06T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -7,
    title: "Automation Workflow",
    category: "Automation",
    description: "Business process automation system",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-07T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -8,
    title: "NLP Engine",
    category: "AI Solutions",
    description: "Natural language processing engine",
    imageUrl:
      "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-08T00:00:00.000Z",
    isDefault: true,
  },
  {
    id: -9,
    title: "Analytics Suite",
    category: "Analytics",
    description: "Comprehensive analytics solution",
    imageUrl:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-01-09T00:00:00.000Z",
    isDefault: true,
  },
]

export const findDefaultGalleryImageById = (id: number) =>
  defaultGalleryImages.find((image) => image.id === id)

export const findDefaultGalleryImageByTitle = (title: string) =>
  defaultGalleryImages.find(
    (image) => image.title.toLowerCase() === title.toLowerCase()
  )
