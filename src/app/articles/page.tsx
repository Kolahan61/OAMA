import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string | null;
}

export default function ArticlesPage() {
  const articlesDir = path.join(process.cwd(), 'src/articles');
  let articles: Article[] = [];
  if (fs.existsSync(articlesDir)) {
    const files = fs.readdirSync(articlesDir);
    articles = files.map((filename) => {
      const filePath = path.join(articlesDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || filename.replace(/\.md$/, ''),
        excerpt: data.excerpt || content.slice(0, 180) + '...',
        date: data.date || null,
      };
    });
    // Sort by date, newest first
    articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading text-brand-white mb-4">Articles</h1>
            <p className="text-xl text-brand-red font-medium">Latest in Muay Thai, BJJ, Martial Arts & Fitness</p>
          </div>
          <div className="grid gap-8 md:grid-cols-1">
            {articles.length === 0 && (
              <div className="text-brand-textMuted text-center">No articles yet. Check back soon!</div>
            )}
            {articles.map((article) => (
              <div key={article.slug} className="bg-brand-surface border border-brand-border rounded-lg p-8 flex flex-col md:flex-row items-start md:items-center justify-between shadow-lg">
                <div className="flex-1 mb-4 md:mb-0">
                  <h2 className="text-2xl font-heading text-brand-white mb-2">{article.title}</h2>
                  {article.date && <p className="text-xs text-brand-textMuted mb-2">{article.date}</p>}
                  <p className="text-brand-textMuted mb-4">{article.excerpt}</p>
                </div>
                <Link href={`/articles/${article.slug}`} className="bg-brand-red hover:bg-brand-redHover text-white font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                  Read More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 