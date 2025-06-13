import quotesData from '../mockData/quotes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const quoteService = {
  async getAll() {
    await delay(200)
    return [...quotesData]
  },

  async getById(id) {
    await delay(200)
    const quote = quotesData.find(q => q.id === id)
    if (!quote) {
      throw new Error('Quote not found')
    }
    return { ...quote }
  },

  async getByMood(mood) {
    await delay(200)
    const moodQuotes = quotesData.filter(q => q.mood === mood)
    return [...moodQuotes]
  },

  async getRandomByMood(mood, excludeIds = []) {
    await delay(200)
    const moodQuotes = quotesData.filter(q => 
      q.mood === mood && !excludeIds.includes(q.id)
    )
    
    if (moodQuotes.length === 0) {
      // If all quotes have been viewed, reset and return any quote from this mood
      const allMoodQuotes = quotesData.filter(q => q.mood === mood)
      if (allMoodQuotes.length === 0) {
        throw new Error('No quotes found for this mood')
      }
      const randomIndex = Math.floor(Math.random() * allMoodQuotes.length)
      return { ...allMoodQuotes[randomIndex] }
    }
    
    const randomIndex = Math.floor(Math.random() * moodQuotes.length)
    return { ...moodQuotes[randomIndex] }
  },

  async create(quote) {
    await delay(300)
    const newQuote = {
      ...quote,
      id: `${quote.mood}_${Date.now()}`
    }
    quotesData.push(newQuote)
    return { ...newQuote }
  },

  async update(id, data) {
    await delay(300)
    const index = quotesData.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Quote not found')
    }
    quotesData[index] = { ...quotesData[index], ...data }
    return { ...quotesData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = quotesData.findIndex(q => q.id === id)
    if (index === -1) {
      throw new Error('Quote not found')
    }
    const deletedQuote = quotesData.splice(index, 1)[0]
    return { ...deletedQuote }
  }
}

export default quoteService