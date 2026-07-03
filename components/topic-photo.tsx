import { cn } from "@/lib/utils";

const topicPhotos = {
  ai: [
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  ],
  chatbot: [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
  ],
  analytics: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
  ],
  automation: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=80",
  ],
  development: [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
  ],
  security: [
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  ],
  career: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
  ],
  event: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  ],
  team: [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
  ],
};

type Topic = keyof typeof topicPhotos;

const getTopic = (value: string): Topic => {
  const label = value.toLowerCase();

  if (
    label.includes("chat") ||
    label.includes("nlp") ||
    label.includes("support")
  )
    return "chatbot";
  if (
    label.includes("data") ||
    label.includes("analytics") ||
    label.includes("dashboard")
  )
    return "analytics";
  if (label.includes("automation") || label.includes("workflow"))
    return "automation";
  if (
    label.includes("development") ||
    label.includes("software") ||
    label.includes("web") ||
    label.includes("code")
  )
    return "development";
  if (label.includes("security") || label.includes("secure")) return "security";
  if (
    label.includes("career") ||
    label.includes("role") ||
    label.includes("human")
  )
    return "career";
  if (
    label.includes("event") ||
    label.includes("summit") ||
    label.includes("workshop") ||
    label.includes("recap")
  )
    return "event";
  if (
    label.includes("team") ||
    label.includes("founder") ||
    label.includes("cto") ||
    label.includes("engineering")
  )
    return "team";
  if (
    label.includes("ai") ||
    label.includes("machine") ||
    label.includes("learning") ||
    label.includes("ml")
  )
    return "ai";

  return "default";
};

interface TopicPhotoProps {
  topic: string;
  alt?: string;
  className?: string;
  compact?: boolean;
}

export function TopicPhoto({
  topic,
  alt,
  className,
  compact = false,
}: TopicPhotoProps) {
  const resolvedTopic = getTopic(topic);
  const photos = topicPhotos[resolvedTopic];
  const key = `${topic}-${alt || ""}`;
  const index =
    Array.from(key).reduce((total, char) => total + char.charCodeAt(0), 0) %
    photos.length;

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-md border bg-muted",
        compact ? "aspect-[4/3] min-h-36" : "aspect-video min-h-48",
        className,
      )}
    >
      <img
        src={photos[index]}
        alt={alt || topic}
        loading="lazy"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
    </figure>
  );
}
