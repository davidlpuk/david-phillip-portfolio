export default {
  manifest_version: 3,
  name: 'LinkedIn Article to Markdown',
  version: '1.0.0',
  description: 'Extract LinkedIn articles and convert them to Markdown files for your portfolio',
  icons: {
    16: 'icons/icon16.png',
    48: 'icons/icon48.png',
    128: 'icons/icon128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: {
      16: 'icons/icon16.png',
      48: 'icons/icon48.png',
      128: 'icons/icon128.png',
    },
  },
  background: {
    service_worker: 'background.js',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['*://*.linkedin.com/*'],
      js: ['content.js'],
      run_at: 'document_idle',
    },
  ],
  permissions: [
    'activeTab',
    'downloads',
    'storage',
    'notifications',
  ],
  host_permissions: [
    '*://*.linkedin.com/*',
    'http://localhost:3001/*',
  ],
};
