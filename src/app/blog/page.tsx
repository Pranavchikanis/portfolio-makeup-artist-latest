import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

const posts = [
  {
    slug: "how-to-prep-skin-for-bridal-makeup",
    title: "How to Prep Your Skin 30 Days Before Your Wedding",
    excerpt: "The secret to flawless bridal makeup starts weeks before your wedding day. From retinol to hydration, here's your complete skincare roadmap.",
    category: "Skincare Tips",
    readTime: "5 min read",
    date: "March 12, 2026",
    image: "/images/makeup_before.png",
  },
  {
    slug: "trending-bridal-looks-2026",
    title: "Top 5 Bridal Makeup Trends Dominating 2026",
    excerpt: "Glazed skin, architectural brows, and architectural lip liners are taking over bridal suites. Here's what brides are choosing this season.",
    category: "Trends",
    readTime: "4 min read",
    date: "February 28, 2026",
    image: "/images/hero_bridal_makeup.png",
  },
  {
    slug: "what-to-expect-on-your-makeup-trial",
    title: "What to Expect During Your Makeup Trial",
    excerpt: "Your first trial session can feel overwhelming. Here's exactly what we cover and how to make the most of it to lock in your perfect bridal look.",
    category: "Bridal Guide",
    readTime: "6 min read",
    date: "February 10, 2026",
    image: "/images/makeup_after.png",
  },
];

export const metadata = {
  title: "Beauty Blog | HappyFaces Makeup",
  description: "Expert makeup tips, bridal guides, and skincare advice from professional makeup artist Nisha Kapoor.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <h1 className="font-serif text-5xl md:text-6xl font-semibold text-foreground">Beauty Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert tips, bridal guides, skincare secrets, and makeup trends from the studio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group bg-card border border-muted rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-56 overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand text-brand-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h2 className="font-serif text-xl font-semibold text-card-foreground leading-snug group-hover:text-brand transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Button asChild variant="ghost" size="sm" className="text-brand hover:text-brand p-0 h-auto font-medium">
                  <Link href={`/blog/${post.slug}`}>Read more →</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
