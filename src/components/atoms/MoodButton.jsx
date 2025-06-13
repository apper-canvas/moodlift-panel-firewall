import { motion } from 'framer-motion'

const MoodButton = ({ 
  emoji, 
  label, 
  onClick,
  className = '',
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[140px] w-full max-w-[140px] mx-auto ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="text-5xl mb-3 animate-float">
        {emoji}
      </div>
      <div className="text-sm font-body font-medium text-gray-700">
        {label}
      </div>
    </motion.button>
  )
}

export default MoodButton