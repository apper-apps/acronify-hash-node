// Simulated AI-powered acronym generator
const commonWords = [
  // Action words
  "Achieve", "Advance", "Aspire", "Build", "Create", "Develop", "Excel", "Focus", "Generate", "Improve",
  "Lead", "Master", "Optimize", "Perform", "Quality", "Reach", "Succeed", "Transform", "Unite", "Win",
  
  // Descriptive words
  "Amazing", "Brilliant", "Creative", "Dynamic", "Effective", "Fantastic", "Great", "Innovative", "Outstanding", "Perfect",
  "Smart", "Strategic", "Strong", "Unique", "Valuable", "Wonderful",
  
  // Concepts
  "Balance", "Change", "Direction", "Energy", "Freedom", "Growth", "Harmony", "Impact", "Knowledge", "Learning",
  "Mission", "Progress", "Results", "Success", "Vision", "Wisdom"
]

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "by", "for", "from", "has", "he", "in", "is", "it",
  "its", "of", "on", "that", "the", "to", "was", "will", "with", "you", "your", "we", "our", "us",
  "or", "but", "if", "this", "they", "them", "their", "can", "could", "would", "should", "have",
  "had", "do", "does", "did", "get", "got", "make", "made", "take", "took", "go", "went", "come",
  "came", "see", "saw", "know", "knew", "think", "thought", "say", "said", "tell", "told"
])

function extractKeyWords(text) {
  // Split into words and clean them
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
  
  // Score words based on length and position (earlier words get higher scores)
  const wordScores = words.map((word, index) => ({
    word,
    score: word.length + (words.length - index) * 0.5,
    originalIndex: index
  }))
  
  // Sort by score and take top words
  return wordScores
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(8, words.length))
    .map(item => item.word)
}

function generateAcronymFromWords(keyWords, targetLength = null) {
  if (keyWords.length === 0) return null
  
  // Determine optimal acronym length (3-7 letters)
  const idealLength = targetLength || Math.max(3, Math.min(7, Math.ceil(keyWords.length * 0.7)))
  
  // Take the most important words up to ideal length
  const selectedWords = keyWords.slice(0, idealLength)
  
  // Create acronym from first letters
  const acronym = selectedWords
    .map(word => word.charAt(0).toUpperCase())
    .join("")
  
  // Create breakdown with enhanced words
  const breakdown = selectedWords.map((word, index) => {
    const letter = acronym[index]
    const enhancedWord = enhanceWord(word, keyWords)
    
    return {
      letter,
      word: enhancedWord.charAt(0).toUpperCase() + enhancedWord.slice(1).toLowerCase()
    }
  })
  
  return { acronym, breakdown }
}

function enhanceWord(originalWord, allWords) {
  // Sometimes replace with a more impactful synonym
  if (Math.random() < 0.3) {
    const firstLetter = originalWord.charAt(0).toLowerCase()
    const alternatives = commonWords.filter(word => 
      word.charAt(0).toLowerCase() === firstLetter
    )
    
    if (alternatives.length > 0) {
      return alternatives[Math.floor(Math.random() * alternatives.length)]
    }
  }
  
  return originalWord
}

export async function summarizeText(text, forceRegenerate = false) {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
  
  if (!text || text.trim().length < 50) {
    throw new Error("Text must be at least 50 characters long for effective summarization")
  }
  
  const keyWords = extractKeyWords(text)
  
  if (keyWords.length === 0) {
    throw new Error("Unable to extract meaningful concepts from the text")
  }
  
  // Generate a concise summary focused on key concepts
  const summary = generateConceptSummary(text, keyWords)
  
  return { summary }
}

function generateConceptSummary(originalText, keyWords) {
  // Split text into sentences for analysis
  const sentences = originalText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10)
  
  // Score sentences based on keyword presence and position
  const scoredSentences = sentences.map((sentence, index) => {
    let score = 0
    
    // Higher score for sentences containing key words
    keyWords.forEach(keyword => {
      if (sentence.toLowerCase().includes(keyword.toLowerCase())) {
        score += 2
      }
    })
    
    // Bonus for position (beginning and end sentences are often important)
    if (index === 0 || index === sentences.length - 1) {
      score += 1
    }
    
    // Bonus for sentence length (not too short, not too long)
    if (sentence.length >= 20 && sentence.length <= 100) {
      score += 1
    }
    
    return { sentence, score, index }
  })
  
  // Sort by score and select top sentences
  const topSentences = scoredSentences
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(5, sentences.length))
    .sort((a, b) => a.index - b.index) // Restore original order
  
  // Build summary ensuring it's around 150 words
  let summary = ""
  let wordCount = 0
  const targetWords = 150
  
  for (const item of topSentences) {
    const sentenceWords = item.sentence.split(/\s+/).length
    
    if (wordCount + sentenceWords <= targetWords + 20) { // Allow slight overflow
      summary += (summary ? " " : "") + item.sentence + "."
      wordCount += sentenceWords
    }
    
    if (wordCount >= targetWords - 20) { // Stop when we reach target range
      break
    }
  }
  
  // If summary is too short, add more content
  if (wordCount < 100 && sentences.length > topSentences.length) {
    const remainingSentences = scoredSentences
      .filter(item => !topSentences.some(selected => selected.index === item.index))
      .sort((a, b) => b.score - a.score)
    
    for (const item of remainingSentences) {
      const sentenceWords = item.sentence.split(/\s+/).length
      if (wordCount + sentenceWords <= targetWords + 30) {
        summary += " " + item.sentence + "."
        wordCount += sentenceWords
      }
      if (wordCount >= 120) break
    }
  }
  
  return summary.trim()
}