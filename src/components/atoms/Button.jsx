import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  className = '',
  moodTheme = null,
  ...props 
}) => {
  const baseClasses = 'font-body font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const getVariantClasses = () => {
    if (moodTheme) {
      return `bg-white border-2 text-gray-700 hover:bg-gray-50 focus:ring-primary`
    }
    
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary/90 focus:ring-primary'
      case 'secondary':
        return 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary'
      case 'accent':
        return 'bg-accent text-white hover:bg-accent/90 focus:ring-accent'
      case 'outline':
        return 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary'
      default:
        return 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500'
    }
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${getVariantClasses()} ${disabledClasses} ${className}`

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button