import { motion, AnimatePresence } from "framer-motion"
import AcronymCard from "@/components/molecules/AcronymCard"

const AcronymGrid = ({ acronyms, onDelete, onToggleFavorite }) => {
  const sortedAcronyms = [...acronyms].sort((a, b) => {
    // Favorites first, then by creation date (newest first)
    if (a.isFavorite && !b.isFavorite) return -1
    if (!a.isFavorite && b.isFavorite) return 1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <AnimatePresence mode="popLayout">
        {sortedAcronyms.map((acronym, index) => (
          <motion.div
            key={acronym.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.4,
                delay: index * 0.1
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
              transition: { duration: 0.3 }
            }}
            layout
          >
            <AcronymCard
              acronym={acronym}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default AcronymGrid