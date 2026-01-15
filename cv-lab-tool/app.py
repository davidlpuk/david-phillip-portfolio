"""
🔒 CAS (Content Administration System) - CV Module
====================================================
Admin tool for editing and managing CV/resume content.

Author: David Phillip
Version: 1.0.0

Run Instructions:
1. pip install -r requirements.txt
2. python -m spacy download en_core_web_sm
3. streamlit run app.py

Features:
- Parse job descriptions for keywords and requirements
- Match against your CV using NLP similarity
- Generate ATS-optimized resumes
- Create tailored cover letters
- Calculate match scores with breakdowns
- Export to Markdown, TXT, or PDF
"""

import streamlit as st
import spacy
import re
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from io import BytesIO
import logging
from datetime import datetime
from typing import Dict, List, Tuple, Optional
import json

# Configure logging for debugging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# =============================================================================
# CONFIGURATION & CONSTANTS
# =============================================================================

# ATS-friendly section names (standard format)
STANDARD_SECTIONS = ['contact', 'summary', 'experience', 'skills', 'education']

# Weight distribution for scoring
SCORING_WEIGHTS = {
    'keywords': 0.40,      # Hard skill keyword matches
    'soft_skills': 0.20,   # Implied soft skills
    'structure': 0.20,     # ATS structure compliance
    'relevance': 0.20      # Overall semantic relevance
}

# Common soft skill indicators and their mappings
SOFT_SKILL_MAPPINGS = {
    # Teamwork & Collaboration
    'agile': ['collaboration', 'adaptability', 'teamwork', 'flexibility'],
    'team': ['collaboration', 'communication', 'teamwork'],
    'collaborate': ['collaboration', 'teamwork', 'communication'],
    'cross-functional': ['collaboration', 'communication', 'adaptability'],
    'partner': ['collaboration', 'relationship building', 'stakeholder management'],
    # Leadership
    'lead': ['leadership', 'management', 'mentorship', 'influence'],
    'manage': ['leadership', 'organization', 'planning', 'accountability'],
    'mentor': ['leadership', 'coaching', 'development', 'teaching'],
    'scale': ['leadership', 'growth mindset', 'strategic thinking'],
    'director': ['leadership', 'strategy', 'vision', 'decision making'],
    'head of': ['leadership', 'strategy', 'executive presence'],
    'senior': ['leadership', 'expertise', 'mentorship'],
    # Communication
    'communicate': ['communication', 'presentation', 'interpersonal'],
    'stakeholder': ['communication', 'relationship building', 'influence'],
    'present': ['presentation', 'communication', 'storytelling'],
    'storytell': ['storytelling', 'communication', 'influence'],
    'workshop': ['facilitation', 'communication', 'collaboration'],
    'facilitate': ['facilitation', 'communication', 'leadership'],
    # Problem Solving
    'problem': ['problem-solving', 'analytical', 'critical thinking'],
    'innovate': ['creativity', 'initiative', 'problem-solving'],
    'innovative': ['creativity', 'initiative', 'problem-solving'],
    'solution': ['problem-solving', 'analytical', 'creativity'],
    'design thinking': ['problem-solving', 'creativity', 'empathy'],
    # Strategy & Planning
    'strategic': ['planning', 'vision', 'analytical', 'strategic thinking'],
    'strategy': ['planning', 'vision', 'analytical', 'strategic thinking'],
    'roadmap': ['planning', 'vision', 'organization'],
    'vision': ['strategic thinking', 'leadership', 'creativity'],
    # Execution
    'deliver': ['execution', 'accountability', 'results-oriented'],
    'ship': ['execution', 'results-oriented', 'accountability'],
    'deadline': ['time management', 'prioritization', 'reliability'],
    'priorit': ['prioritization', 'decision making', 'time management'],
    'execut': ['execution', 'accountability', 'results-oriented'],
    # Growth & Learning
    'growth': ['growth mindset', 'adaptability', 'learning'],
    'learn': ['growth mindset', 'curiosity', 'adaptability'],
    'develop': ['development', 'growth mindset', 'learning'],
    # User Focus
    'user': ['empathy', 'user-centered', 'customer focus'],
    'customer': ['customer focus', 'empathy', 'service orientation'],
    'empathy': ['empathy', 'emotional intelligence', 'user-centered'],
    'research': ['analytical', 'curiosity', 'attention to detail'],
    # Quality
    'quality': ['attention to detail', 'standards', 'craftsmanship'],
    'detail': ['attention to detail', 'thoroughness', 'precision'],
    'craft': ['craftsmanship', 'attention to detail', 'pride'],
}

# Sample data for demo/testing
SAMPLE_CV = """
# DAVID PHILLIP
**Head of Design | AI-Native Design Leader | Fintech & SaaS | London**
London, UK | david.phillip@gmail.com | https://www.linkedin.com/in/davidphillip/

## SUMMARY
Design leader with 20+ years in financial services and SaaS, operating as an AI-native practitioner who orchestrates design, research, and engineering into unified delivery systems. Track record of scaling teams (5→15), launching award-winning products, and driving measurable business impact ($20M→$80M revenue).

## EXPERIENCE

### Head of UX – Product Design | Cognism | Jul 2022 – Jun 2024
*B2B SaaS scale-up, sales intelligence platform*
- Led Product Design function covering Design and DesignOps
- Drove $20M → $80M revenue growth with design enabling product-led expansion
- Built first Product Design team from scratch; modernised tools and processes
- Created cross-functional Design System in Figma
- Integrated AI tools into design workflows, accelerating ideation and prototyping
- Led design thinking workshops embedding user-centric problem-solving

### Director, Design Lead | Coutts Private Bank | Jun 2020 – Jun 2022
*Private banking for high-net-worth clients*
- Scaled team 200% (5→15 specialists), introduced dedicated UX Research practice
- Directed launch of new mobile banking app – 70% customer activation
- Achieved 11% new client growth and £1.4bn net new flows
- Implemented Figma across NatWest Group
- Built multi-branded Design System

### UX Lead | HSBC Kinetic | May 2019 – Nov 2019
*Mobile-first banking app*
- Led design team delivering user experiences for 5 business lending products
- Implemented design sprints reducing concept-to-prototype cycles
- Delivered end-to-end products contributing to $14bn banking initiative

## SKILLS
**Design & Prototyping:** Figma (Advanced), Framer, FigJam, Adobe Creative Suite
**AI Tools:** ChatGPT, Midjourney, AI-assisted prototyping and research synthesis
**Research & Testing:** Maze, Lookback, UserTesting, Dovetail
**Dev Tools:** GitHub, GitLab, Vercel, Firebase
**Frameworks:** Design Sprints, Jobs-to-be-Done, Design Systems governance

## EDUCATION
- Accredited Spotlight Practitioner (2020)
- CIM e-Marketing – Distinction
- UXPA Member
"""

SAMPLE_JOB_DESCRIPTION = """
Senior Product Designer - FinTech Start-up

About Us:
We're a fast-growing fintech company revolutionizing payments for small businesses. Our team is passionate about creating intuitive, beautiful products that solve real problems.

Role Overview:
We're looking for a Senior Product Designer to lead our design efforts and help scale our product. You'll work closely with product managers, engineers, and stakeholders to deliver exceptional user experiences.

Requirements:
- 7+ years of experience in product design, preferably in fintech or SaaS
- Strong portfolio demonstrating end-to-end product design process
- Expert proficiency in Figma and prototyping tools
- Experience building and maintaining design systems
- Track record of shipping products that drive business metrics
- Excellent communication skills and ability to influence stakeholders
- Experience with user research and data-driven design decisions
- Leadership experience, including mentoring junior designers

Nice to Have:
- Experience with AI/ML product design
- Knowledge of mobile-first design patterns
- Background in banking or payments
- Familiarity with agile methodologies

What We Offer:
- Competitive salary and equity
- Remote-first culture
- Learning and development budget
- Health benefits
"""


# =============================================================================
# NLP UTILITIES
# =============================================================================

@st.cache_resource
def load_spacy_model():
    """
    Load spaCy model with caching for performance.
    Uses en_core_web_sm for free local processing.
    
    Future: Could integrate en_core_web_lg for better accuracy,
    or add multilingual support with xx_ent_wiki_sm
    """
    try:
        nlp = spacy.load("en_core_web_sm")
        logger.info("spaCy model loaded successfully")
        return nlp
    except OSError:
        st.error("⚠️ spaCy model not found. Please run: python -m spacy download en_core_web_sm")
        logger.error("Failed to load spaCy model")
        return None


def extract_keywords(text: str, nlp) -> Dict[str, List[str]]:
    """
    Extract keywords from text using NLP.
    
    Returns dict with:
    - hard_skills: Technical skills, tools, technologies
    - soft_skills: Implied interpersonal/management skills
    - entities: Named entities (companies, dates, etc.)
    - verbs: Action verbs for experience matching
    
    Non-obvious: Also detects implied soft skills from context phrases
    """
    doc = nlp(text.lower())
    
    keywords = {
        'hard_skills': [],
        'soft_skills': [],
        'entities': [],
        'verbs': [],
        'nouns': []
    }
    
    # Extract named entities
    for ent in doc.ents:
        if ent.label_ in ['ORG', 'PRODUCT', 'GPE', 'MONEY', 'PERCENT']:
            keywords['entities'].append(ent.text)
    
    # Extract nouns (potential skills/tools)
    for token in doc:
        # Filter for meaningful tokens
        if token.is_alpha and not token.is_stop and len(token.text) > 2:
            if token.pos_ in ['NOUN', 'PROPN']:
                keywords['nouns'].append(token.lemma_)
            elif token.pos_ == 'VERB':
                keywords['verbs'].append(token.lemma_)
    
    # COMPREHENSIVE hard skills patterns for Design/UX/Product roles
    hard_skill_patterns = [
        # Design Tools
        r'\b(figma|sketch|adobe|xd|photoshop|illustrator|indesign|after effects|principle|invision|axure|balsamiq|framer|figjam|miro|lucidchart|whimsical)\b',
        # Prototyping & Design
        r'\b(prototyping?|wireframe?s?|mockups?|high[- ]?fidelity|lo[- ]?fi|hi[- ]?fi|design systems?|component librar(?:y|ies)|style guides?|brand guidelines?)\b',
        # UX/UI Terms
        r'\b(ux|ui|user experience|user interface|interaction design|visual design|product design|service design|information architecture|ia)\b',
        # Research Methods
        r'\b(user research|usability|usability testing|a/?b testing|user testing|user interviews?|personas?|journey map(?:ping|s)?|experience map(?:ping|s)?|card sorting|tree testing|heuristic|cognitive walkthrough)\b',
        # Research Tools
        r'\b(maze|lookback|usertesting|hotjar|fullstory|dovetail|optimal workshop|userlytics|whatusersdo|validately|dscout)\b',
        # Analytics
        r'\b(analytics|google analytics|mixpanel|amplitude|heap|segment|pendo|data[- ]?driven|metrics|kpis?|conversion rate|cro)\b',
        # Development & Technical
        r'\b(html|css|javascript|react|vue|angular|node|python|sql|api|apis|git|github|gitlab|vercel|firebase|aws|responsive design|mobile[- ]?first|accessibility|wcag|aria)\b',
        # Methodologies
        r'\b(agile|scrum|kanban|lean|waterfall|design thinking|design sprints?|google ventures|gv sprint|double diamond|human[- ]?centered|jobs[- ]?to[- ]?be[- ]?done|jtbd)\b',
        # Collaboration Tools
        r'\b(jira|confluence|notion|asana|trello|monday|productboard|linear|slack|teams)\b',
        # Leadership & Management
        r'\b(leadership|management|mentoring?|coaching|team building|hiring|recruiting|performance reviews?|1[- ]?on[- ]?1s?|design ops?|designops|design operations)\b',
        # Strategy
        r'\b(strategy|strategic|roadmap(?:ping|s)?|okrs?|stakeholder|cross[- ]?functional|product[- ]?led|data[- ]?informed|evidence[- ]?based)\b',
        # Industry/Domain
        r'\b(saas|fintech|b2b|b2c|mobile|web|banking|finance|payments?|wealth management|private banking|enterprise|startup|scale[- ]?up)\b',
        # AI/Modern Tools
        r'\b(ai|artificial intelligence|machine learning|ml|chatgpt|gpt|midjourney|dall[- ]?e|copilot|ai[- ]?assisted|ai[- ]?augmented|ai[- ]?native|generative ai)\b',
        # Specific Skills
        r'\b(workshop(?:s|ping)?|facilitation|presentations?|storytelling|communication|collaboration|innovation|ideation|brainstorming)\b',
        # Deliverables
        r'\b(case stud(?:y|ies)|portfolio|specifications?|requirements?|documentation|handoff|dev handoff|design handoff)\b',
    ]
    
    text_lower = text.lower()
    for pattern in hard_skill_patterns:
        matches = re.findall(pattern, text_lower)
        keywords['hard_skills'].extend(matches)
    
    # Also extract multi-word phrases that might be skills
    skill_phrases = [
        'design system', 'user research', 'user experience', 'product design',
        'user interface', 'design thinking', 'design sprint', 'journey mapping',
        'a/b testing', 'usability testing', 'stakeholder management', 'team leadership',
        'design ops', 'mobile app', 'web app', 'cross functional', 'data driven',
        'product led', 'end to end', 'full stack', 'design lead', 'design director',
        'head of design', 'head of ux', 'senior designer', 'principal designer',
        'design manager', 'ux lead', 'visual design', 'interaction design',
        'information architecture', 'service design', 'brand design', 'motion design',
        'responsive design', 'mobile first', 'accessibility', 'inclusive design',
        'design critique', 'design review', 'design handoff', 'developer handoff',
        'figma', 'sketch', 'adobe xd', 'prototyping', 'wireframing'
    ]
    
    for phrase in skill_phrases:
        if phrase in text_lower:
            keywords['hard_skills'].append(phrase)
    
    # Extract implied soft skills (non-obvious)
    for key, soft_skills in SOFT_SKILL_MAPPINGS.items():
        if key in text_lower:
            keywords['soft_skills'].extend(soft_skills)
    
    # Deduplicate and clean
    for key in keywords:
        # Remove empty strings and deduplicate
        keywords[key] = list(set([k for k in keywords[key] if k and len(str(k)) > 1]))
    
    logger.info(f"Extracted {len(keywords['hard_skills'])} hard skills, {len(keywords['soft_skills'])} soft skills")
    return keywords


def extract_job_title(job_desc: str) -> str:
    """
    Extract the job title from a job description.
    
    Looks for common patterns at the start of job postings
    or specific title markers.
    """
    # Common patterns for job titles
    title_patterns = [
        r'^([A-Z][^\n]{5,60})(?:\s*[-–—]|\n)',  # Title at start of text
        r'(?:position|role|job title|title)[:\s]+([A-Za-z][^\n]{5,60})',
        r'(?:hiring|looking for|seeking)[\s:]+(?:a\s+)?([A-Z][^\n]{5,50})',
        r'^#*\s*([A-Z][^\n]{5,60})$',  # Markdown header
    ]
    
    lines = job_desc.strip().split('\n')
    
    # First, check the first non-empty line (often the title)
    for line in lines[:5]:
        line = line.strip()
        if line and not line.lower().startswith(('about', 'we ', 'our ')):
            # Clean up common suffixes
            title = re.sub(r'\s*[-–—].*$', '', line)
            title = re.sub(r'^#*\s*', '', title)
            if 10 < len(title) < 80:
                logger.info(f"Extracted job title: {title}")
                return title
    
    # Try regex patterns
    for pattern in title_patterns:
        match = re.search(pattern, job_desc, re.MULTILINE | re.IGNORECASE)
        if match:
            title = match.group(1).strip()
            if len(title) > 10:
                logger.info(f"Extracted job title via pattern: {title}")
                return title
    
    return "the advertised position"


def extract_company_info(job_desc: str) -> Dict[str, str]:
    """
    Extract company name and contact info from job description.
    Uses regex patterns for common formats.
    
    Non-obvious: Handles various formats like "About [Company]", 
    "Join [Company]", company email domains, etc.
    """
    info = {
        'company_name': '',
        'contact_email': '',
        'location': '',
        'job_title': extract_job_title(job_desc)
    }
    
    # Extract company name patterns
    company_patterns = [
        r'about\s+(?:us\s+at\s+)?([A-Z][a-zA-Z0-9\s&]+?)(?:\.|,|\n)',
        r'join\s+(?:us\s+at\s+)?([A-Z][a-zA-Z0-9\s&]+?)(?:\.|,|\n)',
        r'([A-Z][a-zA-Z0-9]+)\s+is\s+(?:a\s+)?(?:looking|hiring|seeking)',
        r'at\s+([A-Z][a-zA-Z0-9\s&]+?)\s+we'
    ]
    
    for pattern in company_patterns:
        match = re.search(pattern, job_desc, re.IGNORECASE)
        if match:
            info['company_name'] = match.group(1).strip()
            break
    
    # Extract email
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', job_desc)
    if email_match:
        info['contact_email'] = email_match.group()
    
    # Extract location (common patterns)
    location_patterns = [
        r'(?:location|based in|office in)[:|\s]+([A-Za-z\s,]+)',
        r'(London|New York|San Francisco|Berlin|Remote|Hybrid)',
    ]
    
    for pattern in location_patterns:
        match = re.search(pattern, job_desc, re.IGNORECASE)
        if match:
            info['location'] = match.group(1).strip()
            break
    
    logger.info(f"Extracted company info: {info}")
    return info


def calculate_similarity(text1: str, text2: str, nlp) -> float:
    """
    Calculate semantic similarity between two texts using spaCy.
    
    Uses document vectors for comparison.
    Returns similarity score 0-1.
    """
    doc1 = nlp(text1.lower())
    doc2 = nlp(text2.lower())
    
    # Handle empty documents
    if not doc1.vector.any() or not doc2.vector.any():
        return 0.0
    
    similarity = doc1.similarity(doc2)
    return max(0.0, min(1.0, similarity))  # Clamp to 0-1


def calculate_keyword_overlap(cv_keywords: Dict, job_keywords: Dict) -> Tuple[float, Dict]:
    """
    Calculate keyword overlap between CV and job description.
    
    Returns:
    - Overall overlap score (0-1)
    - Detailed breakdown by category
    """
    breakdown = {}
    total_score = 0.0
    
    for category in ['hard_skills', 'soft_skills']:
        cv_set = set(cv_keywords.get(category, []))
        job_set = set(job_keywords.get(category, []))
        
        if job_set:
            overlap = len(cv_set.intersection(job_set))
            score = overlap / len(job_set)
            breakdown[category] = {
                'matched': list(cv_set.intersection(job_set)),
                'missing': list(job_set - cv_set),
                'score': score
            }
            total_score += score
        else:
            breakdown[category] = {'matched': [], 'missing': [], 'score': 1.0}
            total_score += 1.0
    
    return total_score / 2, breakdown


# =============================================================================
# RESUME GENERATION
# =============================================================================

def parse_cv_sections(cv_text: str) -> Dict[str, str]:
    """
    Parse CV text into structured sections.
    Handles markdown format with ## headers.
    
    Validates for required sections and returns structured dict.
    """
    sections = {}
    current_section = 'header'
    current_content = []
    
    lines = cv_text.strip().split('\n')
    
    for line in lines:
        # Check for section headers (## or #)
        if line.startswith('## '):
            # Save previous section
            if current_content:
                sections[current_section] = '\n'.join(current_content).strip()
            
            # Start new section
            section_name = line.replace('## ', '').strip().lower()
            current_section = section_name
            current_content = []
        elif line.startswith('# ') and current_section == 'header':
            # Main title goes to header
            current_content.append(line)
        else:
            current_content.append(line)
    
    # Save last section
    if current_content:
        sections[current_section] = '\n'.join(current_content).strip()
    
    logger.info(f"Parsed CV sections: {list(sections.keys())}")
    return sections


def reorder_skills(cv_skills: str, job_keywords: Dict, nlp) -> str:
    """
    Reorder skills in CV to prioritize those matching job requirements.
    
    Non-obvious: Preserves original order for ties, uses similarity
    for fuzzy matching (e.g., "develop" matches "build")
    """
    # Extract skill lines/items
    skill_items = []
    
    for line in cv_skills.split('\n'):
        if line.strip().startswith('**') or line.strip().startswith('-'):
            skill_items.append(line.strip())
    
    if not skill_items:
        return cv_skills
    
    # Score each skill item by job keyword relevance
    job_text = ' '.join(job_keywords.get('hard_skills', []) + job_keywords.get('soft_skills', []))
    
    scored_items = []
    for idx, item in enumerate(skill_items):
        similarity = calculate_similarity(item, job_text, nlp)
        # Use original index as tiebreaker
        scored_items.append((similarity, idx, item))
    
    # Sort by similarity (desc), then original order (asc)
    scored_items.sort(key=lambda x: (-x[0], x[1]))
    
    return '\n'.join([item[2] for item in scored_items])


def rephrase_with_keywords(text: str, keywords: List[str], nlp) -> str:
    """
    Naturally incorporate keywords into text without forcing them.
    
    Uses synonym replacement and contextual insertion.
    Non-obvious: Only replaces when semantic similarity is high.
    """
    doc = nlp(text)
    result_tokens = []
    
    keywords_lower = [k.lower() for k in keywords]
    
    for token in doc:
        # Check if token has a similar keyword we should highlight
        if token.pos_ in ['NOUN', 'VERB'] and token.is_alpha:
            best_match = None
            best_sim = 0.6  # Threshold for replacement
            
            for kw in keywords_lower:
                kw_doc = nlp(kw)
                if kw_doc.vector.any():
                    sim = nlp(token.text).similarity(kw_doc)
                    if sim > best_sim:
                        best_sim = sim
                        best_match = kw
            
            if best_match and best_match.lower() != token.text.lower():
                # Only add emphasis, don't replace
                result_tokens.append(token.text)
            else:
                result_tokens.append(token.text)
        else:
            result_tokens.append(token.text_with_ws)
    
    return ''.join(result_tokens)


def generate_tailored_resume(cv_sections: Dict, job_keywords: Dict, company_info: Dict, nlp) -> str:
    """
    Generate a tailored, ATS-friendly resume.
    
    Preserves ALL sections from the original CV but reorders skills
    within sections to prioritize job-relevant ones.
    
    Handles various section naming conventions:
    - "Professional Experience" / "Experience" / "Work History"
    - "Core Capabilities" / "Skills" / "Tools & Methods"
    - etc.
    """
    resume_parts = []
    
    # Section name mappings (normalize different naming conventions)
    section_order = [
        ('header', ['header']),
        ('summary', ['summary', 'profile', 'about']),
        ('capabilities', ['core capabilities', 'capabilities', 'key skills', 'competencies']),
        ('experience', ['professional experience', 'experience', 'work history', 'employment']),
        ('earlier_career', ['earlier career', 'previous experience', 'career history']),
        ('tools', ['tools & methods', 'tools and methods', 'tools', 'technologies', 'tech stack']),
        ('skills', ['skills', 'technical skills', 'expertise']),
        ('education', ['education', 'education & development', 'qualifications', 'certifications']),
        ('personal', ['personal', 'interests', 'hobbies', 'about me']),
    ]
    
    # Track which sections we've processed
    processed_sections = set()
    
    # Process sections in our preferred order
    for category, names in section_order:
        for section_key, section_content in cv_sections.items():
            section_key_lower = section_key.lower().strip()
            
            # Check if this section matches any of our expected names
            if section_key_lower in [n.lower() for n in names] or any(n.lower() in section_key_lower for n in names):
                if section_key not in processed_sections:
                    processed_sections.add(section_key)
                    
                    if category == 'header':
                        # Header doesn't need a ## prefix
                        resume_parts.append(section_content)
                    elif category in ['tools', 'skills', 'capabilities']:
                        # For skills sections, reorder items by job relevance
                        resume_parts.append(f'## {section_key.title()}')
                        reordered = reorder_skills(section_content, job_keywords, nlp)
                        resume_parts.append(reordered)
                    else:
                        # For other sections, preserve as-is
                        resume_parts.append(f'## {section_key.title()}')
                        resume_parts.append(section_content)
                    
                    resume_parts.append('')  # Blank line between sections
    
    # Add any remaining sections that weren't in our expected order
    for section_key, section_content in cv_sections.items():
        if section_key not in processed_sections and section_content.strip():
            resume_parts.append(f'## {section_key.title()}')
            resume_parts.append(section_content)
            resume_parts.append('')
    
    result = '\n'.join(resume_parts)
    logger.info(f"Generated resume with {len(processed_sections)} sections")
    return result


# =============================================================================
# COVER LETTER GENERATION
# =============================================================================

def extract_cv_highlights(cv_text: str) -> Dict[str, str]:
    """
    Extract key highlights from CV for use in cover letter.
    
    Returns:
    - current_role: Most recent job title
    - current_company: Most recent employer
    - key_achievements: List of notable achievements
    - years_experience: Approximate years
    - summary: Professional summary
    """
    highlights = {
        'current_role': '',
        'current_company': '',
        'key_achievements': [],
        'years_experience': '15+',
        'summary': ''
    }
    
    lines = cv_text.split('\n')
    
    # Find first job entry (### pattern)
    for i, line in enumerate(lines):
        if line.startswith('### '):
            # Parse: ### Job Title | Company | Dates
            job_line = line.replace('### ', '').strip()
            parts = [p.strip() for p in job_line.split('|')]
            if len(parts) >= 2:
                highlights['current_role'] = parts[0]
                highlights['current_company'] = parts[1]
            break
    
    # Find summary (first paragraph after name)
    in_header = True
    for line in lines:
        if line.startswith('## '):
            in_header = False
            break
        if in_header and line.strip() and not line.startswith('#') and not line.startswith('**'):
            if not any(x in line.lower() for x in ['linkedin', '@', 'london']):
                if len(line.strip()) > 50:
                    highlights['summary'] = line.strip()
                    break
    
    # Find key achievements (lines with $, %, numbers)
    achievement_patterns = [
        r'\$[\d]+[MBK]?',  # Dollar amounts
        r'\d+%',  # Percentages
        r'\d+→\d+',  # Growth notation
        r'(?:won|winner|award)',  # Awards
    ]
    
    for line in lines:
        if line.strip().startswith('-') or line.strip().startswith('**Impact'):
            for pattern in achievement_patterns:
                if re.search(pattern, line, re.IGNORECASE):
                    # Clean the achievement
                    achievement = line.strip().lstrip('-').lstrip('*').strip()
                    if achievement and len(achievement) > 20:
                        highlights['key_achievements'].append(achievement)
                        if len(highlights['key_achievements']) >= 3:
                            break
    
    logger.info(f"Extracted CV highlights: {highlights}")
    return highlights


def generate_cover_letter(cv_sections: Dict, job_keywords: Dict, company_info: Dict, user_info: Dict, cv_text: str = '') -> str:
    """
    Generate a tailored cover letter using actual CV content and job details.
    
    Structure:
    - Greeting (personalized with company name)
    - Intro paragraph (why you're a fit)
    - Body (2-3 paragraphs with specific examples from CV)
    - Closing
    
    Non-obvious: Ties transferable skills to requirements,
    only uses info from CV (ethical/truthful).
    """
    company_name = company_info.get('company_name', 'your company')
    job_title = company_info.get('job_title', 'the advertised position')
    user_name = user_info.get('name', 'David Phillip')
    user_email = user_info.get('email', '')
    
    # Extract highlights from actual CV
    cv_highlights = extract_cv_highlights(cv_text)
    current_role = cv_highlights.get('current_role', 'my current role')
    current_company = cv_highlights.get('current_company', 'my current company')
    summary = cv_highlights.get('summary', '')
    achievements = cv_highlights.get('key_achievements', [])
    
    # Extract matched skills for highlighting
    matched_skills = job_keywords.get('hard_skills', [])[:5]
    skills_text = ', '.join(matched_skills[:3]) if matched_skills else 'product design'
    
    # Build achievement highlights
    achievement_text = ''
    if achievements:
        achievement_text = ' Key highlights include: ' + '; '.join(achievements[:2]) + '.'
    
    # Personalize based on job type detection
    is_leadership = any(word in job_title.lower() for word in ['head', 'director', 'lead', 'senior', 'manager', 'principal'])
    is_design = any(word in job_title.lower() for word in ['design', 'ux', 'ui', 'product'])
    
    letter = f"""{user_name}
{user_email}
{datetime.now().strftime('%B %d, %Y')}

Dear Hiring Manager{f' at {company_name}' if company_name != 'your company' else ''},

I am writing to express my strong interest in the **{job_title}** position{f' at {company_name}' if company_name != 'your company' else ''}. {summary if summary else 'With extensive experience in design leadership across financial services and technology, I am confident in my ability to contribute significantly to your team.'}

In my most recent role as **{current_role}** at **{current_company}**, I have developed deep expertise in {skills_text}.{achievement_text}

My background spans both strategic leadership and hands-on delivery, which allows me to {'scale teams and establish design practices while maintaining craft quality' if is_leadership else 'contribute immediately while also thinking strategically about design systems and user experience'}. I am particularly drawn to this opportunity because of {'the chance to shape design direction at a senior level' if is_leadership else 'the focus on creating exceptional user experiences'}.

Thank you for considering my application. I would welcome the opportunity to discuss how my experience and approach could benefit {company_name if company_name != 'your company' else 'your organization'}.

Best regards,
{user_name}
"""
    
    return letter.strip()


# =============================================================================
# SCORING SYSTEM
# =============================================================================

def calculate_ats_score(cv_text: str, job_text: str, cv_keywords: Dict, job_keywords: Dict, nlp) -> Dict:
    """
    Calculate comprehensive ATS match score with breakdown.
    
    Scoring components:
    - Keyword match (40%): Hard skills overlap
    - Soft skills (20%): Implied trait matches
    - Structure (20%): Has required ATS sections
    - Relevance (20%): Semantic similarity
    
    Returns score 0-100 with detailed breakdown.
    """
    scores = {}
    
    # 1. Keyword Match (hard skills)
    hard_skill_overlap = len(set(cv_keywords['hard_skills']).intersection(set(job_keywords['hard_skills'])))
    job_hard_count = max(len(job_keywords['hard_skills']), 1)
    scores['keywords'] = min(hard_skill_overlap / job_hard_count, 1.0) * 100
    
    # 2. Soft Skills Match
    soft_skill_overlap = len(set(cv_keywords['soft_skills']).intersection(set(job_keywords['soft_skills'])))
    job_soft_count = max(len(job_keywords['soft_skills']), 1)
    scores['soft_skills'] = min(soft_skill_overlap / job_soft_count, 1.0) * 100
    
    # 3. Structure Check
    cv_sections = parse_cv_sections(cv_text)
    cv_section_names = [s.lower() for s in cv_sections.keys()]
    
    structure_score = 0
    for section in STANDARD_SECTIONS:
        if any(section in s for s in cv_section_names):
            structure_score += 20
    scores['structure'] = min(structure_score, 100)
    
    # 4. Semantic Relevance
    relevance = calculate_similarity(cv_text, job_text, nlp)
    scores['relevance'] = relevance * 100
    
    # Calculate weighted total
    total = (
        scores['keywords'] * SCORING_WEIGHTS['keywords'] +
        scores['soft_skills'] * SCORING_WEIGHTS['soft_skills'] +
        scores['structure'] * SCORING_WEIGHTS['structure'] +
        scores['relevance'] * SCORING_WEIGHTS['relevance']
    )
    
    scores['total'] = round(total, 1)
    
    # Add matched/missing details
    scores['matched_keywords'] = list(set(cv_keywords['hard_skills']).intersection(set(job_keywords['hard_skills'])))
    scores['missing_keywords'] = list(set(job_keywords['hard_skills']) - set(cv_keywords['hard_skills']))
    
    logger.info(f"ATS Score calculated: {scores['total']}%")
    return scores


# =============================================================================
# PDF EXPORT
# =============================================================================

def export_to_pdf(content: str, filename: str) -> bytes:
    """
    Export content to PDF using reportlab.
    
    Uses simple, ATS-friendly formatting:
    - Standard fonts (Helvetica)
    - No tables, images, or colors
    - Clean structure with proper spacing
    """
    try:
        from reportlab.lib.pagesizes import A4
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.units import inch
        
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4, 
                               leftMargin=0.75*inch, rightMargin=0.75*inch,
                               topMargin=0.75*inch, bottomMargin=0.75*inch)
        
        styles = getSampleStyleSheet()
        
        # Custom styles for ATS-friendly format
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=16,
            spaceAfter=6
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=12,
            spaceBefore=12,
            spaceAfter=6
        )
        
        body_style = ParagraphStyle(
            'CustomBody',
            parent=styles['Normal'],
            fontSize=10,
            leading=14
        )
        
        story = []
        
        for line in content.split('\n'):
            line = line.strip()
            
            if not line:
                story.append(Spacer(1, 6))
            elif line.startswith('# '):
                story.append(Paragraph(line[2:], title_style))
            elif line.startswith('## '):
                story.append(Paragraph(line[3:], heading_style))
            elif line.startswith('### '):
                story.append(Paragraph(f"<b>{line[4:]}</b>", body_style))
            elif line.startswith('**') and line.endswith('**'):
                story.append(Paragraph(f"<b>{line[2:-2]}</b>", body_style))
            elif line.startswith('- '):
                story.append(Paragraph(f"• {line[2:]}", body_style))
            elif line.startswith('*') and line.endswith('*'):
                story.append(Paragraph(f"<i>{line[1:-1]}</i>", body_style))
            else:
                # Clean markdown formatting
                clean_line = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', line)
                clean_line = re.sub(r'\*(.*?)\*', r'<i>\1</i>', clean_line)
                story.append(Paragraph(clean_line, body_style))
        
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()
        
    except ImportError:
        logger.warning("reportlab not installed, PDF export unavailable")
        return None
    except Exception as e:
        logger.error(f"PDF export failed: {e}")
        return None


# =============================================================================
# STREAMLIT UI
# =============================================================================

def main():
    """
    Main Streamlit application.
    
    UI Flow:
    1. Sidebar: Input CV and Job Description
    2. Main: Preview, Edit, Score, Export
    3. Cover Letter section below
    """
    
    # Page config
    st.set_page_config(
        page_title="🔒 CV Lab - Resume Helper",
        page_icon="🔒",
        layout="wide",
        initial_sidebar_state="expanded"
    )
    
    # Note: Custom CSS removed to ensure visibility
    # The app uses Streamlit's default light theme
    
    # Initialize session state
    if 'tailored_resume' not in st.session_state:
        st.session_state.tailored_resume = ''
    if 'cover_letter' not in st.session_state:
        st.session_state.cover_letter = ''
    if 'scores' not in st.session_state:
        st.session_state.scores = None
    
    # Load NLP model
    nlp = load_spacy_model()
    
    if nlp is None:
        st.stop()
    
    # =========================================================================
    # SIDEBAR - INPUTS
    # =========================================================================
    
    with st.sidebar:
        st.markdown("## 🔒 CV Lab")
        st.markdown("*AI-Powered Resume Helper*")
        st.divider()
        
        # User Info
        st.markdown("### 👤 Your Info")
        user_name = st.text_input("Full Name", value="David Phillip")
        user_email = st.text_input("Email", value="david.phillip@gmail.com")
        
        st.divider()
        
        # CV Input
        st.markdown("### 📄 Your CV")
        cv_input = st.text_area(
            "Paste your CV (Markdown format)",
            value=SAMPLE_CV,
            height=200,
            help="Use ## for section headers"
        )
        
        st.divider()
        
        # Job Description Input
        st.markdown("### 💼 Job Description")
        job_input = st.text_area(
            "Paste the job description",
            value=SAMPLE_JOB_DESCRIPTION,
            height=200,
            help="Include requirements, responsibilities, etc."
        )
        
        st.divider()
        
        # Generate Button
        generate_btn = st.button("🚀 Generate Tailored Resume", type="primary", use_container_width=True)
    
    # =========================================================================
    # MAIN CONTENT
    # =========================================================================
    
    st.markdown("# 🔒 CV Lab - AI Resume Helper")
    st.markdown("*Generate ATS-optimized resumes tailored to specific job descriptions*")
    
    # Validation
    if not cv_input.strip():
        st.warning("⚠️ Please provide your CV in the sidebar.")
        st.stop()
    
    if not job_input.strip():
        st.warning("⚠️ Please provide a job description in the sidebar.")
        st.stop()
    
    # Process on button click
    if generate_btn:
        with st.spinner("🔍 Analyzing job requirements..."):
            # Extract keywords
            cv_keywords = extract_keywords(cv_input, nlp)
            job_keywords = extract_keywords(job_input, nlp)
            company_info = extract_company_info(job_input)
            
            # Parse CV
            cv_sections = parse_cv_sections(cv_input)
            
            # Generate tailored resume
            st.session_state.tailored_resume = generate_tailored_resume(
                cv_sections, job_keywords, company_info, nlp
            )
            
            # Generate cover letter
            user_info = {'name': user_name, 'email': user_email}
            st.session_state.cover_letter = generate_cover_letter(
                cv_sections, job_keywords, company_info, user_info, cv_input
            )
            
            # Calculate scores
            st.session_state.scores = calculate_ats_score(
                cv_input, job_input, cv_keywords, job_keywords, nlp
            )
            
            st.success("✅ Resume and cover letter generated!")
    
    # Display results if available
    if st.session_state.tailored_resume:
        
        # Score Display
        if st.session_state.scores:
            scores = st.session_state.scores
            
            col1, col2, col3, col4 = st.columns(4)
            
            with col1:
                score_class = "score-high" if scores['total'] >= 80 else "score-medium" if scores['total'] >= 60 else "score-low"
                st.metric("🎯 ATS Score", f"{scores['total']}%")
            
            with col2:
                st.metric("🔧 Keywords", f"{scores['keywords']:.0f}%")
            
            with col3:
                st.metric("🤝 Soft Skills", f"{scores['soft_skills']:.0f}%")
            
            with col4:
                st.metric("📋 Structure", f"{scores['structure']:.0f}%")
            
            # Keyword details
            with st.expander("📊 Keyword Analysis"):
                col_match, col_miss = st.columns(2)
                with col_match:
                    st.markdown("**✅ Matched Keywords:**")
                    st.write(", ".join(scores['matched_keywords']) or "None")
                with col_miss:
                    st.markdown("**❌ Missing Keywords:**")
                    st.write(", ".join(scores['missing_keywords'][:10]) or "None")
        
        st.divider()
        
        # Resume Editor
        tab1, tab2 = st.tabs(["📄 Tailored Resume", "✉️ Cover Letter"])
        
        with tab1:
            st.markdown("### Tailored Resume (Editable)")
            edited_resume = st.text_area(
                "Edit your resume below:",
                value=st.session_state.tailored_resume,
                height=500,
                key="resume_editor"
            )
            
            # Update score button
            if st.button("🔄 Recalculate Score"):
                cv_keywords = extract_keywords(edited_resume, nlp)
                job_keywords = extract_keywords(job_input, nlp)
                st.session_state.scores = calculate_ats_score(
                    edited_resume, job_input, cv_keywords, job_keywords, nlp
                )
                st.rerun()
            
            # Export buttons
            col_exp1, col_exp2, col_exp3 = st.columns(3)
            
            with col_exp1:
                st.download_button(
                    "📥 Download as Markdown",
                    data=edited_resume,
                    file_name="resume.md",
                    mime="text/markdown"
                )
            
            with col_exp2:
                st.download_button(
                    "📥 Download as TXT",
                    data=edited_resume.replace('**', '').replace('##', '').replace('#', ''),
                    file_name="resume.txt",
                    mime="text/plain"
                )
            
            with col_exp3:
                pdf_bytes = export_to_pdf(edited_resume, "resume.pdf")
                if pdf_bytes:
                    st.download_button(
                        "📥 Download as PDF",
                        data=pdf_bytes,
                        file_name="resume.pdf",
                        mime="application/pdf"
                    )
                else:
                    st.info("PDF export requires reportlab. Run: pip install reportlab")
        
        with tab2:
            st.markdown("### Cover Letter (Editable)")
            edited_letter = st.text_area(
                "Edit your cover letter below:",
                value=st.session_state.cover_letter,
                height=400,
                key="letter_editor"
            )
            
            col_let1, col_let2 = st.columns(2)
            
            with col_let1:
                st.download_button(
                    "📥 Download Cover Letter",
                    data=edited_letter,
                    file_name="cover_letter.txt",
                    mime="text/plain"
                )
            
            with col_let2:
                pdf_bytes = export_to_pdf(edited_letter, "cover_letter.pdf")
                if pdf_bytes:
                    st.download_button(
                        "📥 Download as PDF",
                        data=pdf_bytes,
                        file_name="cover_letter.pdf",
                        mime="application/pdf"
                    )
    
    else:
        # Initial state
        st.info("👈 Paste your CV and a job description in the sidebar, then click **Generate Tailored Resume**")
        
        with st.expander("ℹ️ How it works"):
            st.markdown("""
            1. **Paste your CV** in markdown format (use ## for sections)
            2. **Paste a job description** you're applying to
            3. **Generate** a tailored resume optimized for ATS systems
            4. **Edit** the generated content as needed
            5. **Export** as Markdown, TXT, or PDF
            
            The tool uses NLP to:
            - Extract keywords from the job description
            - Match your experience to requirements
            - Reorder skills by relevance
            - Calculate an ATS compatibility score
            - Generate a matching cover letter
            """)
    
    # Footer
    st.divider()
    st.markdown("*🔒 CV Lab v1.0 | For David's eyes only | Ethical AI - Only uses your provided information*")


# =============================================================================
# ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    main()


# =============================================================================
# FUTURE IMPROVEMENTS (TODO)
# =============================================================================
"""
Future enhancements to consider:

1. OpenAI Integration:
   - Add optional API key input for GPT-powered text enhancement
   - Better synonym suggestions and natural rephrasing
   
2. Unit Tests:
   - Add pytest tests for keyword extraction
   - Test scoring calculations
   - Validate PDF export

3. Multilingual Support:
   - Use spaCy multilingual models (xx_ent_wiki_sm)
   - Add language detection
   
4. Advanced Features:
   - Multiple resume versions/A-B testing
   - Job application tracking
   - Resume history/versioning
   
5. UI Enhancements:
   - Visual diff between original and tailored CV
   - Drag-and-drop section reordering
   - Real-time score updates while typing
"""
