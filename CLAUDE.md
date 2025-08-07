# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Remote Genius (리모트지니어스) landing page - a Korean service that connects startups with global remote talent at reduced costs. The project is a static HTML website designed for deployment on GitHub Pages.

## Project Structure

- `index.html` - Single-file landing page with embedded CSS and JavaScript
- `COMPONENTS.md` - Design component reference from Chargezoom landing page

## Key Business Context

Remote Genius (리모트지니어스) provides:
- Global talent outsourcing services for Korean startups
- 50% cost reduction compared to local hiring
- Services include: e-commerce managers, social media marketers, sales experts, web designers, developers, data analysts
- No mandatory employment periods
- Performance tracking and management system
- Immediate talent replacement if needed

## Development Guidelines

### Working with the Landing Page

The entire website is contained in a single `index.html` file with:
- Inline CSS in `<style>` tags
- Inline JavaScript for interactions
- Korean language content (UTF-8 encoding)
- Image placeholders with descriptive prompts (not actual images)

### Design System

Colors:
- Primary Navy: `#0F172A`
- Secondary Blue: `#3B82F6`
- Accent Cyan: `#06B6D4`
- Gradients for visual interest

Key Sections:
1. Navigation with anchor links (#services, #about, #faq, #contact)
2. Hero section with value proposition
3. Statistics section
4. Services grid (6 services)
5. About section ("왜 리모트지니어스인가?")
6. Customer success stories
7. FAQ accordion
8. CTA section
9. Footer with contact info

### Deployment

Static website intended for GitHub Pages deployment. No build process required - direct HTML file.

### Content Guidelines

- Emphasize cost savings (50% reduction) and quality
- Use "지니어스" to refer to dispatched workers
- Use "급여" (salary) not "가격" (price) when discussing compensation
- Avoid treating people as commodities in language
- Maintain professional, trustworthy tone

### Animation and Interactions

- FAQ accordion functionality
- Smooth scroll for anchor links
- Counter animations for statistics
- Scroll-triggered animations (fadeInUp, slideIn)
- Hover effects on cards and buttons
- Navbar transparency changes on scroll

### Design Notes

- 지금 이 레이아웃 디자인 너무 마음에 든다. 훼손하지 않도록 주의