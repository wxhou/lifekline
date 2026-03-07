# Export Report Capability

## Overview

Enable users to export their fortune analysis results as PNG images or PDF documents for sharing.

## User Stories

1. As a user, I want to export my analysis as PNG so I can share it on social media
2. As a user, I want to export my analysis as PDF so I can save it for offline viewing
3. As a user, I want the exported file to include the brand watermark so others know the source

## Requirements

### Functional

- Export button located at top of result page
- Support PNG format (image)
- Support PDF format (document)
- Include K-line chart in export
- Include analysis cards in export
- Include watermark at bottom
- Auto-generated filename with date

### UI/UX

- Dropdown menu for format selection
- Loading indicator during export
- Maintain current theme styling

## Acceptance Criteria

- [ ] Clicking "Export Report" shows dropdown with PNG/PDF options
- [ ] PNG export downloads a valid image file
- [ ] PDF export downloads a valid PDF document
- [ ] Exported content matches what's shown on screen
- [ ] Watermark appears at bottom of exported content
- [ ] Filename follows pattern: 卜算子_命理分析_{YYYYMMDD}.{ext}
