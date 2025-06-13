import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { quoteService, moodThemeService, userStateService } from '@/services'
import QuoteCard from '@/components/molecules/QuoteCard'
import Button from '@/components/atoms/Button'
import LoadingSpinner from '@/components/molecules/LoadingSpinner'
import ApperIcon from '@/components/ApperIcon'

const QuoteViewer = ({ mood, onChangeMood }) => {
  const [currentQuote, setCurrentQuote] = useState(null)
  const [moodTheme, setMoodTheme] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [viewedQuotes, setViewedQuotes] = useState([])
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load mood theme
  useEffect(() => {
    const loadMoodTheme = async () => {
      try {
        const theme = await moodThemeService.getById(mood)
        setMoodTheme(theme)
      } catch (err) {
        toast.error('Failed to load mood theme')
      }
    }
    
    if (mood) {
      loadMoodTheme()
    }
  }, [mood])

  // Load initial quote
  useEffect(() => {
    if (mood) {
      loadRandomQuote()
    }
  }, [mood])

  const loadRandomQuote = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const quote = await quoteService.getRandomByMood(mood, viewedQuotes)
      setCurrentQuote(quote)
      
      // Update user state
      await userStateService.updateCurrentQuote(quote.id)
      await userStateService.addViewedQuote(quote.id)
      
      // Update local viewed quotes
      setViewedQuotes(prev => [...prev, quote.id])
      
    } catch (err) {
      setError(err.message || 'Failed to load quote')
      toast.error('Failed to load quote')
    } finally {
      setLoading(false)
    }
  }

  const handleShowAnother = async () => {
    setIsTransitioning(true)
    
    // Wait for exit animation
    setTimeout(async () => {
      await loadRandomQuote()
      setIsTransitioning(false)
    }, 200)
  }

  const handleChangeMood = () => {
    onChangeMood()
  }

  if (!moodTheme) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const backgroundClass = `mood-gradient-${mood}`

  return (
    <div className={`min-h-screen ${backgroundClass} flex flex-col justify-center items-center p-4`}>
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header with mood indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">{moodTheme.emoji}</div>
            <h1 className="text-2xl md:text-3xl font-display font-bold" style={{ color: moodTheme.textColor }}>
              {moodTheme.label} Quotes
            </h1>
          </div>
        </motion.div>

        {/* Quote Display Area */}
        <div className="mb-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <LoadingSpinner size="large" color={moodTheme.accentColor} />
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto">
                <ApperIcon name="AlertCircle" className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 mb-4">{error}</p>
                <Button
                  variant="accent"
                  onClick={loadRandomQuote}
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {currentQuote && !isTransitioning && (
                <QuoteCard
                  key={currentQuote.id}
                  quote={currentQuote}
                  moodTheme={moodTheme}
                />
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Action Buttons */}
        {currentQuote && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              variant="primary"
              size="large"
              onClick={handleShowAnother}
              disabled={isTransitioning}
              className="min-w-[200px]"
              style={{ 
                backgroundColor: moodTheme.accentColor,
                borderColor: moodTheme.accentColor
              }}
            >
              <div className="flex items-center justify-center">
                <ApperIcon name="RefreshCw" className="w-5 h-5 mr-2" />
                Show Another Quote
              </div>
            </Button>
            
            <Button
              variant="outline"
              size="large"
              onClick={handleChangeMood}
              className="min-w-[200px]"
              style={{ 
                borderColor: moodTheme.textColor,
                color: moodTheme.textColor
              }}
            >
              <div className="flex items-center justify-center">
                <ApperIcon name="ArrowLeft" className="w-5 h-5 mr-2" />
                Change Mood
              </div>
            </Button>
          </motion.div>
        )}

        {/* Quote Counter */}
        {viewedQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-8"
          >
            <p className="text-sm font-body opacity-70" style={{ color: moodTheme.textColor }}>
              You've viewed {viewedQuotes.length} {moodTheme.label.toLowerCase()} quote{viewedQuotes.length !== 1 ? 's' : ''} today
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default QuoteViewer