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

export async function generateAcronym(text, forceRegenerate = false) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000))
  
  if (!text || text.trim().length < 10) {
    throw new Error("Text must be at least 10 characters long")
  }
  
  const keyWords = extractKeyWords(text)
  
  if (keyWords.length === 0) {
    throw new Error("Unable to extract meaningful words from the text")
  }
  
  // Generate multiple attempts and pick the best one
  const attempts = []
  for (let i = 0; i < 3; i++) {
    const result = generateAcronymFromWords(keyWords, null)
    if (result) {
      attempts.push(result)
    }
  }
  
  if (attempts.length === 0) {
    throw new Error("Failed to generate acronym from the provided text")
  }
  
  // Pick the attempt with the most pronounceable acronym
  const bestAttempt = attempts.reduce((best, current) => {
    const bestScore = scoreAcronym(best.acronym)
    const currentScore = scoreAcronym(current.acronym)
    return currentScore > bestScore ? current : best
  })
  
  return bestAttempt
}

function scoreAcronym(acronym) {
  let score = 0
  
  // Prefer shorter acronyms (3-5 letters)
  if (acronym.length >= 3 && acronym.length <= 5) {
    score += 10
  }
  
  // Bonus for having vowels (more pronounceable)
  const vowels = (acronym.match(/[AEIOU]/g) || []).length
  score += vowels * 2
  
  // Bonus for alternating consonants and vowels
  let alternating = 0
  for (let i = 0; i < acronym.length - 1; i++) {
    const current = /[AEIOU]/.test(acronym[i])
    const next = /[AEIOU]/.test(acronym[i + 1])
    if (current !== next) alternating++
  }
  score += alternating
  
  return score
}