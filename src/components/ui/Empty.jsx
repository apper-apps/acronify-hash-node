import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ onCreateNew }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="flex items-center justify-center py-20"
    >
      <Card className="text-center p-12 max-w-lg mx-auto">
        {/* Illustration */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
          className="mb-8"
        >
          <div className="relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-150" />
            
            {/* Main icon container */}
            <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center border border-primary/20">
              <ApperIcon name="Lightbulb" className="w-12 h-12 text-primary" />
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full flex items-center justify-center border border-accent/30"
            >
              <ApperIcon name="Sparkles" className="w-4 h-4 text-accent" />
            </motion.div>
            
            <motion.div
              animate={{ 
                y: [0, 5, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute -bottom-1 -left-3 w-6 h-6 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full flex items-center justify-center border border-secondary/30"
            >
              <ApperIcon name="Zap" className="w-3 h-3 text-secondary" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-display font-bold gradient-text mb-4">
            Ready to Create?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Transform your ideas into memorable acronyms! Click the button below to get started with AI-powered acronym generation.
          </p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-4"
        >
          <Button
            onClick={onCreateNew}
            size="lg"
            className="px-8"
          >
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Create Your First Acronym
          </Button>
          
          <div className="text-sm text-gray-400 space-y-2">
            <p>✨ AI-powered generation</p>
            <p>🧠 Perfect for studying and memorization</p>
            <p>💾 Automatically saved for later</p>
          </div>
        </motion.div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"
          />
          
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl"
          />
        </div>
      </Card>
    </motion.div>
  )
}

export default Empty