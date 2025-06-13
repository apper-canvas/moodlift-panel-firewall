import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { moodThemeService } from '@/services'
import MoodButton from '@/components/atoms/MoodButton'
import LoadingSpinner from '@/components/molecules/LoadingSpinner'

const MoodGrid = ({ onMoodSelect }) => {
  const [moods, setMoods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadMoods = async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await moodThemeService.getAll()
        setMoods(result)
      } catch (err) {
        setError(err.message || 'Failed to load moods')
        toast.error('Failed to load moods')
      } finally {
        setLoading(false)
      }
    }
    loadMoods()
  }, [])

  const handleMoodClick = (mood) => {
    onMoodSelect(mood)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
          MoodLift
        </h1>
        <p className="text-xl font-body text-gray-600">
          How are you feeling today?
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {moods.map((mood, index) => (
          <motion.div
            key={mood.mood}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.1 * index,
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <MoodButton
              emoji={mood.emoji}
              label={mood.label}
              onClick={() => handleMoodClick(mood.mood)}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <p className="text-sm font-body text-gray-500">
          Select your mood to receive personalized inspirational quotes
        </p>
      </motion.div>
    </div>
  )
}

export default MoodGrid