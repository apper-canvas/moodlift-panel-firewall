import { motion } from 'framer-motion'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import QuoteViewer from '@/components/organisms/QuoteViewer'

const QuoteDisplay = () => {
  const { mood } = useParams()
  const navigate = useNavigate()

  // Validate mood parameter
  useEffect(() => {
    const validMoods = ['happy', 'sad', 'love', 'angry', 'cool', 'calm']
    if (!validMoods.includes(mood)) {
      navigate('/mood-select')
    }
  }, [mood, navigate])

  const handleChangeMood = () => {
    navigate('/mood-select')
  }

  if (!mood) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <QuoteViewer 
        mood={mood} 
        onChangeMood={handleChangeMood}
      />
    </motion.div>
  )
}

export default QuoteDisplay