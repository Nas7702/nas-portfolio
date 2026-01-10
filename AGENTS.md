# Development Notes & Guidelines

This document contains important preferences and conventions for the Nas Portfolio project. Please review and follow these guidelines when making any changes to the codebase.

## 🇬🇧 British English Spelling Convention

**IMPORTANT**: This project uses British English spelling throughout. Always use British spellings, not American spellings.

### Common Spelling Conversions:
- ✅ **colour** (not color)
- ✅ **optimise** (not optimize)
- ✅ **organise** (not organize)
- ✅ **centre** (not center)
- ✅ **realise** (not realize)
- ✅ **analyse** (not analyze)
- ✅ **recognise** (not recognize)
- ✅ **specialise** (not specialize)
- ✅ **behaviour** (not behavior)
- ✅ **labour** (not labor)
- ✅ **favour** (not favor)
- ✅ **honour** (not honor)
- ✅ **neighbour** (not neighbor)
- ✅ **humour** (not humor)
- ✅ **defence** (not defense)
- ✅ **offence** (not offense)
- ✅ **licence** (not license - when used as a noun)
- ✅ **practise** (not practice - when used as a verb)

### Files to Check for Spelling:
- `/src/data/projects.ts` - Project descriptions and content
- `/src/app/about/page.tsx` - About page content
- `/src/app/contact/page.tsx` - Contact page content
- `/src/app/tech/page.tsx` - Technical page content
- `/src/app/create/page.tsx` - Creative page content
- `/src/app/page.tsx` - Homepage content
- All component files with user-facing text

## 📝 Content Guidelines

### Professional Tone
- Maintain a professional yet approachable tone
- Use active voice where possible
- Keep descriptions concise but informative

### Technical Descriptions
- Focus on impact and results, not just features
- Include quantifiable outcomes where possible
- Balance technical detail with accessibility

### Brand Voice
- Triple expertise: Software Engineering + Data Science + Visual Storytelling
- Emphasis on bridging technical, analytical and creative worlds
- Professional competency across multiple disciplines with creative passion
- Positioning for software engineering roles, data science roles, and creative client work

## 🎨 Design Consistency

### Colour Palette
- Primary: Blue (software engineering/data science/technical)
- Secondary: Purple (creative/visual)
- Ensure contrast ratios meet accessibility standards

### Component Usage
- Use `ScrollReveal` for animations
- Implement `PageTransition` for all pages
- Maintain consistent spacing and typography

## 🔧 Technical Standards

### Code Quality
- Use TypeScript for type safety
- Follow Next.js 14 best practices
- Implement proper SEO meta tags
- Ensure responsive design across all devices

### Performance
- Optimise images and media assets
- Use lazy loading where appropriate
- Maintain Lighthouse scores above 90

### Accessibility
- Follow WCAG 2.1 AA guidelines
- Ensure proper heading hierarchy
- Include alt text for all images
- Test with screen readers

## 📱 Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Key Considerations
- Touch-friendly interface elements
- Readable text sizes across all devices
- Proper spacing and layout adaptation

## 🚀 Deployment

### Git LFS and Image Storage
⚠️ **CRITICAL**: Do NOT use Git LFS for images in this project!

- Vercel does not automatically fetch Git LFS files during deployment
- Images tracked with Git LFS will appear broken on the live site (404 errors)
- All images (`.jpg`, `.jpeg`, `.png`) should be committed directly to git
- If you accidentally enable Git LFS for images:
  1. Run `git lfs untrack "*.jpg" "*.jpeg" "*.png"`
  2. Run `git lfs migrate export --include="*.jpg,*.jpeg,*.png" --everything`
  3. Force push the changes with `git push --force`

### Pre-deployment Checklist
- [ ] Spell check all content (British English)
- [ ] Test responsive design
- [ ] Verify all links work
- [ ] Check accessibility compliance
- [ ] Run Lighthouse audit
- [ ] Test dark/light mode functionality
- [ ] Verify no images are tracked by Git LFS (`git lfs ls-files` should be empty)

## 📋 Content Updates

When adding new projects or content:

1. **Spelling**: Always use British English spellings
2. **Structure**: Follow existing project data structure
3. **Images**: Optimise for web delivery
4. **Descriptions**: Balance technical detail with accessibility
5. **Categories**: Use existing categories (software, data-science, videography, photography)
6. **Career Focus**: Emphasise software engineering skills alongside data science for job applications

## 🎯 SEO Considerations

### Meta Information
- Use descriptive, keyword-rich titles
- Include proper meta descriptions
- Implement structured data where relevant

### Content Strategy
- Focus on triple expertise keywords (software engineering, data science, creative)
- Target technical job searches (software engineer, data scientist) and creative client searches
- Highlight full-stack development, machine learning, and visual storytelling capabilities
- Include location-based terms where relevant
- Position for both employment opportunities and freelance creative work

---

**Last Updated**: [Current Date]
**Version**: 1.0

> 💡 **Tip**: Before making any content changes, review this document to ensure consistency with project standards and preferences.
