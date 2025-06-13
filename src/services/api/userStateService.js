import userStateData from '../mockData/userState.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// In-memory state that persists during the session
let currentState = { ...userStateData }

const userStateService = {
  async get() {
    await delay(100)
    return { ...currentState }
  },

  async updateCurrentMood(mood) {
    await delay(100)
    currentState.currentMood = mood
    return { ...currentState }
  },

  async updateCurrentQuote(quoteId) {
    await delay(100)
    currentState.currentQuoteId = quoteId
    return { ...currentState }
  },

  async addViewedQuote(quoteId) {
    await delay(100)
    if (!currentState.viewedQuotes.includes(quoteId)) {
      currentState.viewedQuotes.push(quoteId)
    }
    return { ...currentState }
  },

  async toggleFavoriteQuote(quoteId) {
    await delay(100)
    const index = currentState.favoriteQuotes.indexOf(quoteId)
    if (index === -1) {
      currentState.favoriteQuotes.push(quoteId)
    } else {
      currentState.favoriteQuotes.splice(index, 1)
    }
    return { ...currentState }
  },

  async getViewedQuotesForMood(mood) {
    await delay(100)
    // This would typically involve filtering quotes by mood and checking viewed status
    // For now, return the viewed quotes array
    return [...currentState.viewedQuotes]
  },

  async reset() {
    await delay(100)
    currentState = { ...userStateData }
    return { ...currentState }
  }
}

export default userStateService