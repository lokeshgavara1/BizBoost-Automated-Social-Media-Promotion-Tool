const OpenAI = require('openai');

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

// Generate Instagram caption and hashtags
const generateInstagramContent = async (req, res) => {
  try {
    const { description, tone = 'casual', industry = 'general' } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    console.log('Generating Instagram content for:', description);

    // Create a comprehensive prompt for better results
    const prompt = `Generate an engaging Instagram post with the following requirements:

Description: ${description}
Tone: ${tone}
Industry: ${industry}

Please provide:
1. A compelling caption (2-3 sentences) that's engaging and relevant
2. 5-8 relevant hashtags that are popular and trending
3. A call-to-action if appropriate

Format the response as:
CAPTION:
[Your caption here]

HASHTAGS:
#hashtag1 #hashtag2 #hashtag3 #hashtag4 #hashtag5

Make it authentic, engaging, and optimized for Instagram's algorithm.`;

    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured. Please set OPENAI_API_KEY.' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a social media expert specializing in Instagram content creation. You create engaging, authentic captions and relevant hashtags that drive engagement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    const generatedContent = response.choices[0].message.content;
    
    // Parse the response to separate caption and hashtags
    const lines = generatedContent.split('\n');
    let caption = '';
    let hashtags = '';
    let isCaption = false;
    let isHashtags = false;

    for (const line of lines) {
      if (line.trim().toUpperCase().includes('CAPTION:')) {
        isCaption = true;
        isHashtags = false;
        continue;
      }
      if (line.trim().toUpperCase().includes('HASHTAGS:')) {
        isCaption = false;
        isHashtags = true;
        continue;
      }
      
      if (isCaption && line.trim()) {
        caption += line.trim() + ' ';
      }
      if (isHashtags && line.trim()) {
        hashtags += line.trim() + ' ';
      }
    }

    // Clean up the content
    caption = caption.trim();
    hashtags = hashtags.trim();

    // If parsing failed, use the raw content
    if (!caption && !hashtags) {
      caption = generatedContent;
      hashtags = '';
    }

    console.log('Generated content successfully');

    res.json({
      success: true,
      caption,
      hashtags,
      fullContent: generatedContent,
      description,
      tone,
      industry
    });

  } catch (error) {
    console.error('Error generating Instagram content:', error);
    
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'OpenAI API quota exceeded. Please try again later.' 
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Invalid OpenAI API key. Please check your configuration.' 
      });
    }

    res.status(500).json({ 
      error: 'Failed to generate content. Please try again.' 
    });
  }
};

// Generate multiple content variations
const generateContentVariations = async (req, res) => {
  try {
    const { description, count = 3, tone = 'casual' } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    console.log('Generating content variations for:', description);

    const variations = [];

    for (let i = 0; i < count; i++) {
      const prompt = `Generate Instagram content variation ${i + 1} for: ${description}
      
Tone: ${tone}
Style: ${i === 0 ? 'Casual and friendly' : i === 1 ? 'Professional and informative' : 'Creative and inspiring'}

Provide:
1. A unique caption (different from other variations)
2. 5-8 relevant hashtags

Format as:
CAPTION: [caption]
HASHTAGS: [hashtags]`;

      const openai = getOpenAIClient();
      if (!openai) {
        return res.status(503).json({ error: 'AI service not configured. Please set OPENAI_API_KEY.' });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a creative social media expert. Generate unique, engaging Instagram content variations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.8
      });

      const content = response.choices[0].message.content;
      
      // Parse the content
      const captionMatch = content.match(/CAPTION:\s*(.+?)(?=\nHASHTAGS:|$)/s);
      const hashtagsMatch = content.match(/HASHTAGS:\s*(.+?)(?=\n|$)/s);
      
      variations.push({
        id: i + 1,
        caption: captionMatch ? captionMatch[1].trim() : content,
        hashtags: hashtagsMatch ? hashtagsMatch[1].trim() : '',
        fullContent: content
      });
    }

    console.log(`Generated ${variations.length} content variations`);

    res.json({
      success: true,
      variations,
      description,
      tone
    });

  } catch (error) {
    console.error('Error generating content variations:', error);
    res.status(500).json({ 
      error: 'Failed to generate content variations. Please try again.' 
    });
  }
};

// Generate hashtag suggestions
const generateHashtagSuggestions = async (req, res) => {
  try {
    const { description, industry = 'general', count = 15 } = req.body;

    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    console.log('Generating hashtag suggestions for:', description);

    const prompt = `Generate ${count} relevant and trending Instagram hashtags for: ${description}

Industry: ${industry}

Requirements:
- Mix of popular and niche hashtags
- Relevant to the content
- Currently trending
- Appropriate for Instagram

Format as a simple list with # symbols.`;

    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured. Please set OPENAI_API_KEY.' });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a hashtag expert. Generate relevant, trending Instagram hashtags."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.6
    });

    const hashtags = response.choices[0].message.content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('#'))
      .slice(0, count);

    console.log('Generated hashtag suggestions successfully');

    res.json({
      success: true,
      hashtags,
      description,
      industry
    });

  } catch (error) {
    console.error('Error generating hashtag suggestions:', error);
    res.status(500).json({ 
      error: 'Failed to generate hashtag suggestions. Please try again.' 
    });
  }
};

module.exports = {
  generateInstagramContent,
  generateContentVariations,
  generateHashtagSuggestions
};

// Image generation (DALL·E 3 / gpt-image-1)
const generateImage = async (req, res) => {
  try {
    const { prompt, size = '1024x1024' } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const openai = getOpenAIClient();
    if (!openai) {
      return res.status(503).json({ error: 'AI service not configured. Please set OPENAI_API_KEY.' });
    }

    // OpenAI Node SDK v5 images.generate
    const response = await openai.images.generate({
      model: 'gpt-image-1',
      prompt,
      size
    });

    const data = response.data?.[0];
    if (!data) return res.status(500).json({ error: 'No image generated' });

    // Prefer base64 and let client show it
    const b64 = data.b64_json;
    const url = data.url;

    res.json({ success: true, b64, url });
  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
};

module.exports.generateImage = generateImage;
