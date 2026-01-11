function buildThumbnailPrompt({ category, title, description, ratio }) {
  return `
Create a professional YouTube thumbnail.

Category: ${category}

Main Text: "${title}"
Supporting Text: "${description}"

Design Rules:
- Bold, large readable text
- High contrast colors
- Eye-catching composition
- Cinematic lighting
- Clean background
- No watermark
- No blur
- Aspect ratio: ${ratio}

Style:
- Modern
- Viral YouTube thumbnail
- Emotional impact
`;
}

module.exports = buildThumbnailPrompt;
