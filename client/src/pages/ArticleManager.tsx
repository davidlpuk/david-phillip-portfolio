import { useEffect, useState } from "react";
import { ArrowLeft, Edit, Trash2, Eye, EyeOff, Plus, Search } from "lucide-react";
import Header from "@/components/Header";
import { getAllArticlesAdmin } from "@/lib/articles";
import type { ArticleMetadata } from "@/types/article";

export default function ArticleManager() {
    const [articles, setArticles] = useState<ArticleMetadata[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all');
    const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 10;

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        setLoading(true);
        try {
            const data = await getAllArticlesAdmin();
            setArticles(data);
        } catch (error) {
            console.error('Failed to load articles:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) return;

        try {
            const response = await fetch(`http://localhost:3003/api/articles/${slug}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Reload articles
                await loadArticles();
                alert('Article deleted successfully');
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete article');
            }
        } catch (error) {
            console.error('Failed to delete article:', error);
            alert('Failed to delete article');
        }
    };

    const handleStatusChange = async (slug: string, newStatus: 'draft' | 'published') => {
        const action = newStatus === 'published' ? 'publish' : 'unpublish';
        if (!confirm(`Are you sure you want to ${action} this article?`)) return;

        try {
            const response = await fetch(`http://localhost:3003/api/articles/${slug}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Reload articles
                await loadArticles();
                alert(`Article ${action}ed successfully`);
            } else {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update article status');
            }
        } catch (error) {
            console.error('Failed to update article status:', error);
            alert('Failed to update article status');
        }
    };

    const filteredArticles = articles
        .filter(article => {
            const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            let aValue: any, bValue: any;

            switch (sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'status':
                    aValue = a.status;
                    bValue = b.status;
                    break;
                case 'date':
                default:
                    aValue = new Date(a.date);
                    bValue = new Date(b.date);
                    break;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

    // Pagination
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
    const startIndex = (currentPage - 1) * articlesPerPage;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

    return (
        <>
            <Header />
            <div className="min-h-screen pt-24 md:pt-32">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-8">
                        <a
                            href="/articles"
                            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            <ArrowLeft size={16} />
                            Back to Articles
                        </a>
                        <a
                            href="/admin/article-generator"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                        >
                            <Plus size={16} />
                            New Article
                        </a>
                    </div>

                    <div className="mb-8">
                        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                            Article Manager
                        </h1>
                        <p className="font-sans text-lg md:text-xl text-muted-foreground">
                            Manage all articles, publish drafts, and organize your content.
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'draft' | 'published')}
                                className="px-3 py-2 border border-border rounded-md bg-background"
                            >
                                <option value="all">All Status</option>
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'status')}
                                className="px-3 py-2 border border-border rounded-md bg-background"
                            >
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="status">Sort by Status</option>
                            </select>
                            <button
                                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                className="px-3 py-2 border border-border rounded-md bg-background hover:bg-secondary"
                                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                            >
                                {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </div>
                    </div>

                    {/* Articles Table */}
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="bg-card rounded-lg border border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-secondary/50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Article
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {paginatedArticles.map((article) => (
                                            <tr key={article.id} className="hover:bg-secondary/20">
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="font-medium text-foreground">{article.title}</div>
                                                        <div className="text-sm text-muted-foreground line-clamp-2">
                                                            {article.excerpt}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    {article.category}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${article.status === 'published'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {article.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                                    {article.formattedDate}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <a
                                                            href={`/articles/${article.slug}`}
                                                            className="p-1 text-muted-foreground hover:text-foreground"
                                                            title="Preview"
                                                        >
                                                            <Eye size={16} />
                                                        </a>
                                                        <button
                                                            onClick={() => handleStatusChange(article.slug, article.status === 'published' ? 'draft' : 'published')}
                                                            className="p-1 text-muted-foreground hover:text-foreground"
                                                            title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                                                        >
                                                            {article.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                                                        </button>
                                                        <a
                                                            href={`/admin/article-generator?edit=${article.slug}`}
                                                            className="p-1 text-muted-foreground hover:text-foreground"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </a>
                                                        <button
                                                            onClick={() => handleDelete(article.slug)}
                                                            className="p-1 text-red-500 hover:text-red-700"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {filteredArticles.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-muted-foreground">No articles found.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {paginatedArticles.map((article) => (
                            <div key={article.id} className="bg-card rounded-lg border border-border p-4">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground mb-1">{article.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                                    </div>
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${article.status === 'published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                        {article.status}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
                                    <span>{article.category}</span>
                                    <span>{article.formattedDate}</span>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <a
                                        href={`/articles/${article.slug}`}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        title="Preview"
                                    >
                                        <Eye size={16} />
                                    </a>
                                    <button
                                        onClick={() => handleStatusChange(article.slug, article.status === 'published' ? 'draft' : 'published')}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        title={article.status === 'published' ? 'Unpublish' : 'Publish'}
                                    >
                                        {article.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <a
                                        href={`/admin/article-generator?edit=${article.slug}`}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </a>
                                    <button
                                        onClick={() => handleDelete(article.slug)}
                                        className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 border border-border rounded-md bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-2 border border-border rounded-md ${currentPage === page
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-background hover:bg-secondary'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 border border-border rounded-md bg-background hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <div className="text-2xl font-bold text-foreground">{articles.length}</div>
                            <div className="text-sm text-muted-foreground">Total Articles</div>
                        </div>
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <div className="text-2xl font-bold text-green-600">
                                {articles.filter(a => a.status === 'published').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Published</div>
                        </div>
                        <div className="bg-card p-6 rounded-lg border border-border">
                            <div className="text-2xl font-bold text-yellow-600">
                                {articles.filter(a => a.status === 'draft').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Drafts</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}