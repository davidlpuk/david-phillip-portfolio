#!/bin/bash

# Enhanced script to update import paths after refactoring
# This script will update all import statements to reflect the new directory structure

echo "🔧 Updating import paths in the codebase..."

# Function to update imports in a directory
update_imports() {
    local dir=$1
    
    echo "Processing $dir..."

    # Use | as delimiter to avoid issues with slashes in paths

    # 1. Update absolute imports using @ alias
    find "$dir" -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e 's|from "@/components/ui/|from "@/shared/components/ui/|g' \
        -e 's|import "@/components/ui/|import "@/shared/components/ui/|g' \
        -e 's|from "@/components/About"|from "@/features/about/About"|g' \
        -e 's|from "@/components/AIAssistant"|from "@/features/ai-assistant/AIAssistant"|g' \
        -e 's|from "@/components/ChatBot"|from "@/features/chat/ChatBot"|g' \
        -e 's|from "@/components/Contact"|from "@/features/contact/Contact"|g' \
        -e 's|from "@/components/CVPDF"|from "@/features/cv-pdf/CVPDF"|g' \
        -e 's|from "@/components/ErrorBoundary"|from "@/shared/components/ErrorBoundary"|g' \
        -e 's|from "@/components/Experience"|from "@/features/experience/Experience"|g' \
        -e 's|from "@/components/Header"|from "@/shared/components/Header"|g' \
        -e 's|from "@/components/Hero"|from "@/features/hero/Hero"|g' \
        -e 's|from "@/components/HowIUseAI"|from "@/features/skills-orchestration/HowIUseAI"|g' \
        -e 's|from "@/components/Map"|from "@/features/contact/Map"|g' \
        -e 's|from "@/components/MobileStickyCTA"|from "@/shared/components/MobileStickyCTA"|g' \
        -e 's|from "@/components/NovelEditor"|from "@/features/cv-pdf/NovelEditor"|g' \
        -e 's|from "@/components/PageTransition"|from "@/shared/components/PageTransition"|g' \
        -e 's|from "@/components/PasswordGate"|from "@/shared/components/PasswordGate"|g' \
        -e 's|from "@/components/SelectedWork"|from "@/features/portfolio/SelectedWork"|g' \
        -e 's|from "@/components/SelectedWorkFiltered"|from "@/features/portfolio/SelectedWorkFiltered"|g' \
        -e 's|from "@/components/SkillsOrchestration"|from "@/features/skills-orchestration/SkillsOrchestration"|g' \
        -e 's|from "@/components/Testimonials"|from "@/features/testimonials/Testimonials"|g' \
        -e 's|from "@/components/ThemeSwitcher"|from "@/shared/components/ThemeSwitcher"|g' \
        -e 's|from "@/components/WhatIDo"|from "@/features/portfolio/WhatIDo"|g' \
        -e 's|from "@/pages/|from "@/views/|g' \
        -e 's|from "@/config/|from "@/shared/config/|g' \
        -e 's|from "@/contexts/|from "@/shared/contexts/|g' \
        -e 's|from "@/hooks/|from "@/shared/hooks/|g' \
        -e 's|from "@/lib/|from "@/shared/lib/|g' \
        -e 's|from "@/types/|from "@/shared/types/|g' \
        -e 's|from "@/const"|from "@/shared/constants/const"|g' \
        -e 's|from "@/const/|from "@/shared/constants/|g' \
        -e 's|await import("@/lib/|await import("@/shared/lib/|g' \
        {} +

    # 2. Convert broken relative imports in moved files to absolute ones
    # This specifically targets files that were moved to shared/components or features/
    # and might have been using ../lib, ../hooks, etc.
    find "$dir" -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e 's|from "\.\./lib/|from "@/shared/lib/|g' \
        -e 's|from "\.\./hooks/|from "@/shared/hooks/|g' \
        -e 's|from "\.\./contexts/|from "@/shared/contexts/|g' \
        -e 's|from "\.\./types/|from "@/shared/types/|g' \
        -e 's|from "\.\./const/|from "@/shared/constants/|g' \
        -e 's|from "\.\./components/ui/|from "@/shared/components/ui/|g' \
        {} +

     # 3. Handle cases like ../../components/ui/
    find "$dir" -type f \( -name "*.tsx" -o -name "*.ts" \) -exec sed -i '' \
        -e 's|from "\.\./\.\./components/ui/|from "@/shared/components/ui/|g' \
        -e 's|from "\.\./\.\./lib/|from "@/shared/lib/|g' \
        -e 's|from "\.\./\.\./hooks/|from "@/shared/hooks/|g' \
        {} +

    echo "✅ Import paths updated in $dir"
}

# Update imports in the apps/client directory
if [ -d "apps/client" ]; then
    update_imports "apps/client"
fi

echo "✨ All import paths have been updated!"
