import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/5 to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="text-center p-8">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-error/20 to-error/10 rounded-full flex items-center justify-center border border-error/20">
              <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-display font-bold text-white mb-3">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {message}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-3"
          >
            {onRetry && (
              <Button
                onClick={onRetry}
                className="w-full"
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <p className="text-sm text-gray-400">
              If the problem persists, try refreshing the page or check your internet connection.
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Error