import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
import { motion, AnimatePresence } from "framer-motion"
import FloatingActionButton from "@/components/organisms/FloatingActionButton"
import SearchBar from "@/components/molecules/SearchBar"
import AcronymGrid from "@/components/organisms/AcronymGrid"
import CreateAcronymModal from "@/components/organisms/CreateAcronymModal"
import { acronymService } from "@/services/api/acronymService"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"

function App() {
  const [concepts, setConcepts] = useState([])
  const [filteredConcepts, setFilteredConcepts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadConcepts()
  }, [])

useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = concepts.filter(concept => 
        concept.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        concept.originalText.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredConcepts(filtered)
    } else {
      setFilteredConcepts(concepts)
    }
  }, [concepts, searchQuery])

const loadConcepts = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await acronymService.getAll()
      setConcepts(data)
    } catch (err) {
      setError("Failed to load concepts")
    } finally {
      setLoading(false)
    }
  }

const handleCreateConcept = async (conceptData) => {
    try {
      const newConcept = await acronymService.create(conceptData)
      setConcepts(prev => [newConcept, ...prev])
      setIsModalOpen(false)
    } catch (err) {
      throw new Error("Failed to create concept")
    }
  }

const handleDeleteConcept = async (id) => {
    try {
      await acronymService.delete(id)
      setConcepts(prev => prev.filter(concept => concept.Id !== id))
    } catch (err) {
      throw new Error("Failed to delete concept")
    }
  }

const handleToggleFavorite = async (id) => {
    try {
      const concept = concepts.find(c => c.Id === id)
      const updatedConcept = await acronymService.update(id, {
        ...concept,
        isFavorite: !concept.isFavorite
      })
      setConcepts(prev => prev.map(c => c.Id === id ? updatedConcept : c))
    } catch (err) {
      throw new Error("Failed to update concept")
    }
  }

const handleRetry = () => {
    loadConcepts()
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={handleRetry} />

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/5 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
<h1 className="text-5xl font-display font-bold gradient-text mb-4">
            ConceptLearner
          </h1>
          <p className="text-xl text-gray-300 font-body max-w-2xl mx-auto">
            Transform complex texts into digestible 150-word learning concepts
          </p>
        </motion.div>

{/* Search Bar */}
        {concepts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search your learning concepts..."
            />
          </motion.div>
        )}

        {/* Main Content */}
<AnimatePresence mode="wait">
          {filteredConcepts.length === 0 && !loading ? (
            <Empty onCreateNew={() => setIsModalOpen(true)} />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <AcronymGrid 
                acronyms={filteredConcepts}
                onDelete={handleDeleteConcept}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={() => setIsModalOpen(true)} />

{/* Create Concept Modal */}
        <CreateAcronymModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateConcept}
        />

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  )
}

export default App