import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { userStateService } from '@/services'
import MoodGrid from '@/components/organisms/MoodGrid'

const MoodSelect = () => {
  const navigate = useNavigate()

  const handleMoodSelect = async (mood) => {
    try {
      // Update user state with selected mood
      await userStateService.updateCurrentMood(mood)
      
      // Navigate to quote display with smooth transition
      navigate(`/quote/${mood}`)
    } catch (error) {
      console.error('Failed to update mood:', error)
      // Still navigate even if state update fails
      navigate(`/quote/${mood}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col justify-center items-center p-4"
    >
      <MoodGrid onMoodSelect={handleMoodSelect} />
    </motion.div>
  )
}

export default MoodSelect