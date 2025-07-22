import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/5 to-primary/5 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="shimmer h-12 bg-white/10 rounded-2xl w-64 mx-auto mb-4" />
          <div className="shimmer h-6 bg-white/5 rounded-xl w-96 mx-auto" />
        </div>

        {/* Search Bar Skeleton */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="shimmer h-12 bg-white/10 rounded-xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 space-y-4"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="shimmer h-8 bg-white/10 rounded-lg w-24" />
                <div className="flex gap-2">
                  <div className="shimmer w-8 h-8 bg-white/10 rounded-full" />
                  <div className="shimmer w-8 h-8 bg-white/10 rounded-full" />
                  <div className="shimmer w-8 h-8 bg-white/10 rounded-full" />
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="glass rounded-lg p-2 space-y-1">
                    <div className="shimmer h-6 bg-white/10 rounded w-full" />
                    <div className="shimmer h-3 bg-white/5 rounded w-full" />
                  </div>
                ))}
              </div>

              {/* Original Text */}
              <div className="space-y-2">
                <div className="shimmer h-4 bg-white/10 rounded w-20" />
                <div className="space-y-2 bg-white/5 rounded-lg p-3">
                  <div className="shimmer h-3 bg-white/10 rounded w-full" />
                  <div className="shimmer h-3 bg-white/10 rounded w-3/4" />
                  <div className="shimmer h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center">
                <div className="shimmer h-3 bg-white/5 rounded w-20" />
                <div className="shimmer h-5 bg-white/5 rounded-full w-16" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAB Skeleton */}
        <div className="fixed bottom-8 right-8">
          <div className="shimmer w-20 h-20 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export default Loading