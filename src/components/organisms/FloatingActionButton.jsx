import { motion } from "framer-motion"
import IconButton from "@/components/atoms/IconButton"
import ApperIcon from "@/components/ApperIcon"

const FloatingActionButton = ({ onClick }) => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Main button */}
        <IconButton
          onClick={onClick}
          variant="primary"
          className="w-20 h-20 text-white shadow-2xl shadow-primary/50 relative z-10"
        >
          <ApperIcon name="Plus" className="w-8 h-8" />
        </IconButton>
        
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-accent to-secondary p-[2px] -z-10">
          <div className="w-full h-full rounded-full bg-gradient-to-r from-primary to-accent" />
        </div>
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-2 bg-surface/90 backdrop-blur-sm text-white text-sm rounded-lg border border-white/10 whitespace-nowrap"
      >
        Create New Acronym
        <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-surface/90 border-y-[4px] border-y-transparent" />
      </motion.div>
    </motion.div>
  )
}

export default FloatingActionButton