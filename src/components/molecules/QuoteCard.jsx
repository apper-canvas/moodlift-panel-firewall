import { motion } from 'framer-motion'

const QuoteCard = ({ 
  quote, 
  moodTheme,
  className = '',
  ...props 
}) => {
  if (!quote || !moodTheme) {
    return null
  }

  const cardStyle = {
    backgroundColor: moodTheme.cardColor,
    color: moodTheme.textColor
  }

  const fontFamilyClass = moodTheme.fontFamily === 'Quicksand' 
    ? 'font-display' 
    : 'font-body'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-auto ${className}`}
      style={cardStyle}
      {...props}
    >
      <div className="text-center">
        {/* Quote Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className={`text-xl md:text-2xl lg:text-3xl leading-relaxed mb-6 ${fontFamilyClass} quote-text-shadow-${moodTheme.mood}`}
          style={{ color: moodTheme.textColor }}
        >
          "{quote.text}"
        </motion.p>
        
        {/* Author */}
        {quote.author && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`text-lg font-medium ${fontFamilyClass} opacity-80`}
            style={{ color: moodTheme.accentColor }}
          >
            — {quote.author}
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export default QuoteCard