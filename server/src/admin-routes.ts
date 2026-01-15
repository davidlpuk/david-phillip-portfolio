import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Admin credentials (in production, use proper auth service)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-this-password';

// Session storage (in production, use Redis or proper session management)
const sessions = new Map();

// CV file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use /tmp for writable storage on Vercel
const CV_PATH = path.resolve(__dirname, '../../client/public/docs/DP CV - Download.md');
const CV_VERSIONS_DIR = process.env.VERCEL
  ? '/tmp/cv-versions'
  : path.resolve(__dirname, '../../client/public/docs/cv-versions');

// Ensure versions directory exists
async function ensureVersionsDir() {
  try {
    await fs.access(CV_VERSIONS_DIR);
  } catch {
    await fs.mkdir(CV_VERSIONS_DIR, { recursive: true });
  }
}

// Middleware to check authentication
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const session = sessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    sessions.delete(token);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = { username: session.username };
  next();
}

// Admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log('🔐 Login attempt:', { username, hasPassword: !!password });
  console.log('🔐 Expected credentials:', {
    username: ADMIN_USERNAME,
    passwordSet: !!ADMIN_PASSWORD && ADMIN_PASSWORD !== 'change-this-password'
  });

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours

    sessions.set(token, { username, expiresAt });
    console.log('✅ Login successful for:', username);

    res.json({
      token,
      expiresAt,
      user: { username }
    });
  } else {
    console.log('❌ Login failed - invalid credentials');
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Admin logout
router.post('/logout', requireAuth, (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    sessions.delete(token);
  }
  res.json({ success: true });
});

// Get current CV
router.get('/cv', requireAuth, async (req, res) => {
  try {
    const content = await fs.readFile(CV_PATH, 'utf-8');
    const stats = await fs.stat(CV_PATH);

    res.json({
      content,
      lastModified: stats.mtime,
      path: CV_PATH
    });
  } catch (error) {
    console.error('Error reading CV:', error);
    res.status(500).json({ error: 'Failed to read CV file' });
  }
});

// Save CV with versioning
router.post('/cv', requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Ensure versions directory exists
    await ensureVersionsDir();

    // Create backup of current CV
    try {
      const currentContent = await fs.readFile(CV_PATH, 'utf-8');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const versionPath = path.join(CV_VERSIONS_DIR, `CV-${timestamp}.md`);
      await fs.writeFile(versionPath, currentContent, 'utf-8');
      console.log('✅ Backup created:', versionPath);
    } catch (error) {
      console.warn('⚠️ Could not create backup:', error);
    }

    // Write new content (to /tmp on Vercel, to original location locally)
    const writePath = process.env.VERCEL ? `/tmp/DP-CV-Download.md` : CV_PATH;
    await fs.writeFile(writePath, content, 'utf-8');
    console.log('✅ CV saved to:', writePath);

    const message = process.env.VERCEL
      ? 'CV updated in session (temporary). Download to persist changes.'
      : 'CV updated successfully and saved to file.';

    res.json({
      success: true,
      message,
      timestamp: new Date().toISOString(),
      isTemporary: !!process.env.VERCEL
    });
  } catch (error) {
    console.error('❌ Error saving CV:', error);
    res.status(500).json({ error: 'Failed to save CV file', details: error.message });
  }
});

// Get CV version history
router.get('/cv/versions', requireAuth, async (req, res) => {
  try {
    await ensureVersionsDir();
    const files = await fs.readdir(CV_VERSIONS_DIR);

    const versions = await Promise.all(
      files
        .filter(f => f.endsWith('.md'))
        .map(async (filename) => {
          const filePath = path.join(CV_VERSIONS_DIR, filename);
          const stats = await fs.stat(filePath);
          return {
            filename,
            created: stats.birthtime,
            size: stats.size
          };
        })
    );

    // Sort by date, newest first
    versions.sort((a, b) => b.created.getTime() - a.created.getTime());

    res.json({ versions });
  } catch (error) {
    console.error('Error reading CV versions:', error);
    res.status(500).json({ error: 'Failed to read CV versions' });
  }
});

// Get specific CV version
router.get('/cv/versions/:filename', requireAuth, async (req, res) => {
  try {
    const { filename } = req.params;

    // Security: prevent path traversal
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(CV_VERSIONS_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');

    res.json({ content, filename });
  } catch (error) {
    console.error('Error reading CV version:', error);
    res.status(404).json({ error: 'Version not found' });
  }
});

export default router;
