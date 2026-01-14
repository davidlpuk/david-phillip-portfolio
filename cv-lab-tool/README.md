# 🔒 CV Lab - AI-Powered Resume Helper

A personal, local AI-powered tool for tailoring resumes to job descriptions.

## Features

- **NLP Keyword Extraction**: Uses spaCy to identify hard skills, soft skills, and requirements
- **ATS Score Calculation**: Get a compatibility score with detailed breakdown
- **Smart Reordering**: Automatically prioritizes skills matching job requirements
- **Cover Letter Generation**: Creates tailored cover letters with your highlights
- **PDF Export**: ATS-friendly PDF output with clean formatting
- **Fully Editable**: Edit generated content before exporting

## Quick Start

```bash
# Navigate to the tool directory
cd cv-lab-tool

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download spaCy model
python -m spacy download en_core_web_sm

# Run the app
streamlit run app.py
```

## Usage

1. **Paste your CV** in the sidebar (Markdown format with ## headers)
2. **Paste a job description** you're targeting
3. Click **Generate Tailored Resume**
4. Review the ATS score and keyword analysis
5. **Edit** the generated resume and cover letter as needed
6. **Export** as Markdown, TXT, or PDF

## ATS Scoring Breakdown

| Component | Weight | Description |
|-----------|--------|-------------|
| Keywords | 40% | Hard skill matches (Figma, Python, etc.) |
| Soft Skills | 20% | Implied traits (leadership, collaboration) |
| Structure | 20% | Has standard ATS sections |
| Relevance | 20% | Semantic similarity to job description |

## Tech Stack

- **Streamlit**: Web UI framework
- **spaCy**: NLP processing (en_core_web_sm model)
- **scikit-learn**: TF-IDF and cosine similarity
- **reportlab**: PDF generation

## Privacy

This tool runs **100% locally**. No data is sent to external servers.

---

🔒 *For David's eyes only*
