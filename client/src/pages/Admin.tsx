import { useState, useEffect } from 'react';
import { Lock, Save, History, Download, LogOut, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:3001/api';

interface CVVersion {
  filename: string;
  created: string;
  size: number;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cvContent, setCvContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [versions, setVersions] = useState<CVVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showVersions, setShowVersions] = useState(false);
  const [preview, setPreview] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
      loadCV();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem('admin_token', data.token);
      setIsAuthenticated(true);
      loadCV();
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setCvContent('');
  };

  const loadCV = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/cv`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to load CV');
      }

      const data = await response.json();
      setCvContent(data.content);
      setOriginalContent(data.content);
    } catch (err: any) {
      setError(err.message || 'Failed to load CV');
    } finally {
      setIsLoading(false);
    }
  };

  const loadVersions = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/cv/versions`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load versions');

      const data = await response.json();
      setVersions(data.versions);
      setShowVersions(true);
    } catch (err: any) {
      setError(err.message || 'Failed to load versions');
    }
  };

  const loadVersion = async (filename: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/cv/versions/${filename}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to load version');

      const data = await response.json();
      setCvContent(data.content);
      setShowVersions(false);
      setSuccess(`Loaded version: ${filename}`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to load version');
    }
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${API_URL}/admin/cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: cvContent }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleLogout();
          throw new Error('Session expired');
        }
        throw new Error('Failed to save CV');
      }

      setOriginalContent(cvContent);
      setSuccess('CV saved successfully! Previous version backed up.');
      setTimeout(() => setSuccess(''), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to save CV');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCV = () => {
    const blob = new Blob([cvContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DP-CV-Download.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const hasChanges = cvContent !== originalContent;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-8">
              <Lock className="w-12 h-12 text-accent-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold text-center mb-2">Admin Login</h1>
            <p className="text-muted-foreground text-center mb-8">
              CV Management System
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-display font-bold">CV Editor</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPreview(!preview)}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              {preview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={loadVersions}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              <History className="w-4 h-4" />
              Versions
            </button>
            <button
              onClick={downloadCV}
              className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Status Messages */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mt-4"
          >
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 mt-4"
          >
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded-lg">
              {success}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showVersions ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">CV Version History</h2>
              <button
                onClick={() => setShowVersions(false)}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              {versions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No previous versions found</p>
              ) : (
                versions.map((version) => (
                  <div
                    key={version.filename}
                    className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors cursor-pointer"
                    onClick={() => loadVersion(version.filename)}
                  >
                    <div>
                      <p className="font-medium">{version.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(version.created).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {(version.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Editor */}
            {!preview && (
              <div className="bg-card border border-border rounded-2xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-display font-bold">Markdown Editor</h2>
                  <button
                    onClick={handleSave}
                    disabled={!hasChanges || isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save className="w-4 h-4" />
                    {hasChanges ? 'Save Changes' : 'No Changes'}
                  </button>
                </div>
                <textarea
                  value={cvContent}
                  onChange={(e) => setCvContent(e.target.value)}
                  className="flex-1 w-full px-4 py-3 bg-background border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  placeholder="Enter CV content in Markdown format..."
                  style={{ minHeight: '600px' }}
                />
              </div>
            )}

            {/* Preview */}
            <div className={`bg-card border border-border rounded-2xl p-6 ${preview ? 'col-span-full' : ''}`}>
              <h2 className="text-xl font-display font-bold mb-4">Preview</h2>
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(cvContent) }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return `<p>${html}</p>`;
}
