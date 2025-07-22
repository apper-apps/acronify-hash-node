import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import IconButton from "@/components/atoms/IconButton"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"

const AcronymCard = ({ acronym, onDelete, onToggleFavorite }) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCopyAcronym = async () => {
    try {
      await navigator.clipboard.writeText(acronym.acronym)
      toast.success("Acronym copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy acronym")
    }
  }

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(acronym.originalText)
      toast.success("Original text copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy original text")
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this acronym?")) {
      return
    }

    setIsDeleting(true)
    try {
      await onDelete(acronym.Id)
      toast.success("Acronym deleted successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to delete acronym")
      setIsDeleting(false)
    }
  }

  const handleToggleFavorite = async () => {
    try {
      await onToggleFavorite(acronym.Id)
      toast.success(
        acronym.isFavorite ? "Removed from favorites" : "Added to favorites"
      )
    } catch (err) {
      toast.error(err.message || "Failed to update favorite status")
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-display font-bold gradient-text">
              {acronym.acronym}
            </h3>
            {acronym.isFavorite && (
              <Badge variant="warning">
                <ApperIcon name="Star" className="w-3 h-3 mr-1" />
                Favorite
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <IconButton
              size="sm"
              variant="ghost"
              onClick={handleToggleFavorite}
              className={`${
                acronym.isFavorite 
                  ? "text-warning hover:text-warning/70" 
                  : "text-gray-400 hover:text-warning"
              }`}
            >
              <ApperIcon 
                name={acronym.isFavorite ? "Star" : "StarOff"} 
                className="w-4 h-4" 
              />
            </IconButton>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={handleCopyAcronym}
              className="text-gray-400 hover:text-primary"
            >
              <ApperIcon name="Copy" className="w-4 h-4" />
            </IconButton>
            <IconButton
              size="sm"
              variant="danger"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              <ApperIcon 
                name={isDeleting ? "Loader2" : "Trash2"} 
                className={`w-4 h-4 ${isDeleting ? "animate-spin" : ""}`}
              />
            </IconButton>
          </div>
        </div>

        {/* Breakdown */}
        <div className="mb-4 relative z-10">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Breakdown:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {acronym.breakdown.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="glass rounded-lg p-2 text-center"
              >
                <div className="text-lg font-bold text-primary">
                  {item.letter}
                </div>
                <div className="text-xs text-gray-300 truncate" title={item.word}>
                  {item.word}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Original Text */}
        <div className="mb-4 relative z-10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-300">Original Text:</h4>
            <IconButton
              size="sm"
              variant="ghost"
              onClick={handleCopyOriginal}
              className="text-gray-400 hover:text-primary"
            >
              <ApperIcon name="Copy" className="w-3 h-3" />
            </IconButton>
          </div>
          <p className="text-sm text-gray-200 bg-white/5 rounded-lg p-3 border border-white/10">
            {acronym.originalText}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-400 relative z-10">
          <div className="flex items-center gap-2">
            <ApperIcon name="Calendar" className="w-3 h-3" />
            {format(new Date(acronym.createdAt), "MMM d, yyyy")}
          </div>
          {acronym.category && (
            <Badge variant="default" className="text-xs">
              {acronym.category}
            </Badge>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  )
}

export default AcronymCard