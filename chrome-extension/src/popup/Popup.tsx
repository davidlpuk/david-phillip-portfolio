import React, { useEffect, useState } from 'react';
import { ArticleData } from '../utils/types';
import { generateMarkdown, generateSlug } from '../utils/md-converter';
import './Popup.css';

type State = 'idle' | 'extracting' | 'preview' | 'processing' | 'success' | 'error';

const Popup: React.FC = () => {
  const [state, setState] = useState<State>('idle');
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [error, setError] = useState<string>('');
  const [successUrl, setSuccessUrl] = useState<string>('');

  useEffect(() => {
    extractArticle();
  }, []);

  const extractArticle = async () => {
    setState('extracting');
    setError('');

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab?.id) {
        throw new Error('No active tab found');
      }

      const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractArticle' });

      if (response.success && response.article) {
        setArticle(response.article);
        setState('preview');
      } else {
        throw new Error('Could not extract article from this page. Make sure you are on a LinkedIn article page.');
      }
    } catch (err) {
      setError((err as Error).message);
      setState('error');
    }
  };

  const handleDownload = async () => {
    if (!article) return;

    setState('processing');
    setError('');

    try {
      const markdown = generateMarkdown(article);
      const slug = generateSlug(article.title);
      const filename = `${slug}.md`;

      const blob = new Blob([markdown], { type: 'text/markdown' });
      
      await chrome.downloads.download({
        url: URL.createObjectURL(blob),
        filename: filename,
        saveAs: true,
      });

      setState('success');
    } catch (err) {
      setError((err as Error).message);
      setState('error');
    }
  };

  const handleImport = async () => {
    if (!article) return;

    setState('processing');
    setError('');

    try {
      const response = await chrome.tabs.sendMessage(
        (await chrome.tabs.query({ active: true, currentWindow: true }))[0].id!,
        { action: 'importArticle', article }
      );

      if (response.success) {
        setSuccessUrl(response.url || '');
        setState('success');
      } else {
        throw new Error(response.error || 'Import failed');
      }
    } catch (err) {
      setError((err as Error).message);
      setState('error');
    }
  };

  const handleReset = () => {
    setArticle(null);
    setError('');
    setSuccessUrl('');
    setState('idle');
    extractArticle();
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'extracting':
        return (
          <div className="state">
            <div className="state-icon">📄</div>
            <h2>Extracting Article</h2>
            <p>Reading content from LinkedIn...</p>
            <div className="spinner" style={{ margin: '20px auto 0' }}></div>
          </div>
        );

      case 'preview':
        return (
          <>
            <div className="preview">
              <h3 className="preview-title">{article?.title}</h3>
              <div className="preview-meta">
                <span>✍️ {article?.author}</span>
                <span>📅 {formatDate(article?.publishDate || '')}</span>
                <span>⏱️ {article?.readingTime}</span>
              </div>
              <div className="preview-body">
                {article?.body.substring(0, 500)}
                {(article?.body.length || 0) > 500 && '...'}
              </div>
              {article?.tags && article.tags.length > 0 && (
                <div className="tags">
                  {article.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="actions">
              <button className="btn btn-secondary" onClick={handleDownload}>
                💾 Download MD
              </button>
              <button className="btn btn-primary" onClick={handleImport}>
                📤 Import to Portfolio
              </button>
            </div>
          </>
        );

      case 'processing':
        return (
          <div className="state">
            <div className="state-icon">⚙️</div>
            <h2>Processing</h2>
            <p>{article ? 'Saving article...' : 'Please wait...'}</p>
            <div className="spinner" style={{ margin: '20px auto 0' }}></div>
          </div>
        );

      case 'success':
        return (
          <div className="state">
            <div className="state-icon">✅</div>
            <h2>Article Saved!</h2>
            <p>Your article has been saved to drafts</p>
            {successUrl && (
              <a 
                href={successUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ marginTop: '16px', textDecoration: 'none', display: 'inline-flex' }}
              >
                View Article
              </a>
            )}
            <button 
              className="btn btn-secondary" 
              style={{ marginTop: '12px' }}
              onClick={handleReset}
            >
              Process Another
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="state">
            <div className="state-icon">❌</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <div className="actions" style={{ justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={handleReset}>
                Try Again
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="state">
            <div className="state-icon">📄</div>
            <h2>LinkedIn to Markdown</h2>
            <p>Extract articles and save as Markdown files</p>
            <button className="btn btn-primary" onClick={extractArticle}>
              Start Extraction
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-icon">📝</div>
        <div>
          <h1>Article to Markdown</h1>
          <p>Extract LinkedIn articles to Markdown</p>
        </div>
      </header>

      {renderContent()}

      <footer className="footer">
        Chrome Extension v1.0.0
      </footer>
    </div>
  );
};

export default Popup;
