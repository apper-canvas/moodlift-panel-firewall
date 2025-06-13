import moodThemesData from '../mockData/moodThemes.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const moodThemeService = {
  async getAll() {
    await delay(200)
    return [...moodThemesData]
  },

  async getById(mood) {
    await delay(200)
    const theme = moodThemesData.find(t => t.mood === mood)
    if (!theme) {
      throw new Error('Mood theme not found')
    }
    return { ...theme }
  },

  async create(theme) {
    await delay(300)
    const newTheme = {
      ...theme,
      id: Date.now().toString()
    }
    moodThemesData.push(newTheme)
    return { ...newTheme }
  },

  async update(mood, data) {
    await delay(300)
    const index = moodThemesData.findIndex(t => t.mood === mood)
    if (index === -1) {
      throw new Error('Mood theme not found')
    }
    moodThemesData[index] = { ...moodThemesData[index], ...data }
    return { ...moodThemesData[index] }
  },

  async delete(mood) {
    await delay(300)
    const index = moodThemesData.findIndex(t => t.mood === mood)
    if (index === -1) {
      throw new Error('Mood theme not found')
    }
    const deletedTheme = moodThemesData.splice(index, 1)[0]
    return { ...deletedTheme }
  }
}

export default moodThemeService