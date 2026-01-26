# Project Structure Refactoring Plan

## Current Structure Analysis

The project currently has a somewhat scattered structure:

```
david-phillip-portfolio/
├── api/                      # Minimal API exports
├── chrome-extension/         # Chrome extension code (should be separate)
├── client/                   # Frontend React application
│   ├── chrome-extension/     # Duplicate? Should be consolidated
│   ├── public/              # Static assets
│   └── src/
│       ├── articles/
│       ├── components/      # Mix of page components and UI components
│       ├── config/
│       ├── const/           # Duplicate of const.ts
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/           # Page components
│       ├── styles/
│       └── types/
├── cv-lab-tool/             # Python tool (should be separate)
├── patches/                 # NPM patches
├── plans/                   # Planning documents
├── server/                  # Backend Express server
│   └── src/
│       ├── routes/
│       ├── rag-service.ts
│       ├── knowledge-base.ts
│       └── index.ts
├── shared/                  # Shared code
└── docs/                    # Various markdown files at root

**Issues Identified:**
1. Documentation files scattered at root level
2. Chrome extension duplicated in two locations
3. `const` folder duplicates `const.ts`
4. Components folder mixes UI components with feature components
5. CV-lab-tool should be in a separate tools directory
6. No clear separation between features and shared UI
7. No dedicated assets management structure
8. Server structure is flat without proper organization

## Proposed Structure

```
david-phillip-portfolio/
├── .agent/                   # AI agent configurations
├── .gemini/                  # Gemini configurations
├── apps/
│   ├── client/              # Main React application
│   │   ├── public/          # Static assets
│   │   │   ├── articles/
│   │   │   ├── docs/
│   │   │   ├── images/
│   │   │   └── videos/
│   │   └── src/
│   │       ├── app/         # Application core
│   │       │   ├── App.tsx
│   │       │   ├── main.tsx
│   │       │   └── router.tsx (if needed)
│   │       ├── features/    # Feature-based modules
│   │       │   ├── ai-assistant/
│   │       │   ├── articles/
│   │       │   ├── chat/
│   │       │   ├── cv-builder/
│   │       │   ├── cv-lab/
│   │       │   ├── design-system/
│   │       │   ├── hero/
│   │       │   ├── portfolio/
│   │       │   ├── skills-orchestration/
│   │       │   └── testimonials/
│   │       ├── shared/      # Shared client code
│   │       │   ├── components/  # Reusable UI components
│   │       │   │   └── ui/     # Base UI components
│   │       │   ├── config/
│   │       │   ├── constants/
│   │       │   ├── contexts/
│   │       │   ├── hooks/
│   │       │   ├── lib/
│   │       │   ├── styles/
│   │       │   └── types/
│   │       └── views/       # Page-level components
│   │           ├── Article.tsx
│   │           ├── ArticleGenerator.tsx
│   │           ├── Articles.tsx
│   │           ├── CaseStudy.tsx
│   │           ├── CV.tsx
│   │           ├── CVBuilder.tsx
│   │           ├── CVLab.tsx
│   │           ├── DesignSystem.tsx
│   │           ├── Home.tsx
│   │           └── NotFound.tsx
│   │
│   ├── server/              # Backend Express server
│   │   ├── src/
│   │   │   ├── api/         # API routes
│   │   │   │   ├── index.ts
│   │   │   │   └── routes/
│   │   │   │       ├── chat.routes.ts
│   │   │   │       ├── health.routes.ts
│   │   │   │       └── index.ts
│   │   │   ├── config/      # Server configuration
│   │   │   │   └── environment.ts
│   │   │   ├── middleware/  # Express middleware
│   │   │   │   ├── cors.ts
│   │   │   │   └── error-handler.ts
│   │   │   ├── services/    # Business logic
│   │   │   │   ├── knowledge-base.service.ts
│   │   │   │   └── rag.service.ts
│   │   │   ├── types/       # Server types
│   │   │   └── index.ts     # Server entry
│   │   └── index.ts         # Server bootstrap
│   │
│   └── chrome-extension/    # Chrome extension
│       ├── dist/
│       ├── icons/
│       ├── src/
│       │   ├── background/
│       │   ├── content/
│       │   ├── manifest/
│       │   ├── popup/
│       │   ├── types/
│       │   └── utils/
│       └── manifest.json
│
├── packages/                # Shared packages
│   └── shared/             # Code shared between apps
│       ├── types/
│       └── utils/
│
├── tools/                   # Development tools
│   └── cv-lab-tool/        # Python CV tool
│       ├── venv/
│       └── *.py
│
├── docs/                    # Project documentation
│   ├── CLAUDE.MD
│   ├── HEADLINE_ANALYSIS.md
│   ├── SKILLS_ORCHESTRATION_IMPLEMENTATION.md
│   ├── SKILLS_ORCHESTRATION_QUICK_REFERENCE.md
│   ├── SKILLS_ORCHESTRATION_REVISION_v2.md
│   ├── ideas.md
│   ├── plans/
│   └── testimonial-requests.md
│
├── config/                  # Root-level config files
│   ├── .env.example
│   ├── components.json
│   ├── postcss.config.js
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── scripts/                 # Build and setup scripts
│   ├── setup-ollama.sh
│   └── build.sh (if needed)
│
├── patches/                 # NPM patches
├── .gitignore
├── package.json
├── pnpm-lock.yaml
├── vercel.json
└── README.md
```

## Key Improvements

### 1. **Monorepo Structure**
- Clear separation between `apps/`, `packages/`, `tools/`, and `docs/`
- Each app is self-contained but can share code via `packages/`

### 2. **Feature-Based Architecture (Client)**
- Features are self-contained modules with their own components, hooks, and logic
- Better scalability and maintainability
- Easier to locate feature-specific code

### 3. **Clearer Server Organization**
- Routes separated from services
- Middleware in dedicated folder
- Configuration centralized

### 4. **Documentation Organization**
- All markdown docs moved to `docs/` folder
- Plans subdirectory for planning documents
- Clean root directory

### 5. **Configuration Centralization**
- All config files in `config/` (optional, can keep at root for tool discoverability)
- Easier to manage and maintain

### 6. **Shared Code Strategy**
- `packages/shared/` for true cross-app sharing
- `apps/client/src/shared/` for client-only shared code
- Clear boundaries and dependencies

## Migration Path

The refactoring will be done in phases to minimize risk:

### Phase 1: Documentation & Tools
1. Move all markdown files to `docs/`
2. Move `cv-lab-tool` to `tools/`
3. Consolidate chrome-extension folders

### Phase 2: Client Restructure
1. Create new directory structure
2. Move UI components to `shared/components/ui/`
3. Organize feature components into `features/`
4. Move page components to `views/`
5. Consolidate `const` and `const/` into `shared/constants/`

### Phase 3: Server Restructure
1. Create proper service layer
2. Split routes into separate files
3. Add middleware folder
4. Add config folder

### Phase 4: Path Aliases Update
1. Update `tsconfig.json` with new path aliases
2. Update `vite.config.ts` with new aliases
3. Test all imports

### Phase 5: Testing & Validation
1. Ensure all imports work
2. Test build process
3. Test development server
4. Validate deployment

## Benefits

1. **Improved Developer Experience**: Easier to find and organize code
2. **Better Scalability**: Feature-based architecture scales better
3. **Cleaner Codebase**: Separation of concerns is clearer
4. **Easier Onboarding**: New developers can understand structure quickly
5. **Maintainability**: Related code is grouped together
6. **Professional Standards**: Follows industry best practices

## Notes

- All existing functionality will be preserved
- No links or imports will be broken
- Changes are purely organizational
- Can be done incrementally with minimal risk
