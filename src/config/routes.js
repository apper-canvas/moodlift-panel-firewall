import MoodSelect from '@/components/pages/MoodSelect'
import QuoteDisplay from '@/components/pages/QuoteDisplay'

export const routes = {
  moodSelect: {
    id: 'mood-select',
    label: 'Mood Selection',
    path: '/mood-select',
    component: MoodSelect
  },
  quoteDisplay: {
    id: 'quote-display',
    label: 'Quote Display',
    path: '/quote/:mood',
    component: QuoteDisplay
  }
}

export const routeArray = Object.values(routes)