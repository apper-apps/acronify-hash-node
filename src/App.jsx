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
  const [acronyms, setAcronyms] = useState([])
  const [filteredAcronyms, setFilteredAcronyms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    loadAcronyms()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = acronyms.filter(acronym => 
        acronym.acronym.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acronym.originalText.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredAcronyms(filtered)
    } else {
      setFilteredAcronyms(acronyms)
    }
  }, [acronyms, searchQuery])

  const loadAcronyms = async () => {
    try {
      setError("")
      setLoading(true)
      const data = await acronymService.getAll()
      setAcronyms(data)
    } catch (err) {
      setError("Failed to load acronyms")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAcronym = async (acronymData) => {
    try {
      const newAcronym = await acronymService.create(acronymData)
      setAcronyms(prev => [newAcronym, ...prev])
      setIsModalOpen(false)
    } catch (err) {
      throw new Error("Failed to create acronym")
    }
  }

  const handleDeleteAcronym = async (id) => {
    try {
      await acronymService.delete(id)
      setAcronyms(prev => prev.filter(acronym => acronym.Id !== id))
    } catch (err) {
      throw new Error("Failed to delete acronym")
    }
  }

  const handleToggleFavorite = async (id) => {
    try {
      const acronym = acronyms.find(a => a.Id === id)
      const updatedAcronym = await acronymService.update(id, {
        ...acronym,
        isFavorite: !acronym.isFavorite
      })
      setAcronyms(prev => prev.map(a => a.Id === id ? updatedAcronym : a))
    } catch (err) {
      throw new Error("Failed to update acronym")
    }
  }

  const handleRetry = () => {
    loadAcronyms()
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
            Acronify
          </h1>
          <p className="text-xl text-gray-300 font-body max-w-2xl mx-auto">
            Transform any text into memorable acronyms with AI-powered intelligence
          </p>
        </motion.div>

        {/* Search Bar */}
        {acronyms.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search your acronyms..."
            />
          </motion.div>
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {filteredAcronyms.length === 0 && !loading ? (
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
                acronyms={filteredAcronyms}
                onDelete={handleDeleteAcronym}
                onToggleFavorite={handleToggleFavorite}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={() => setIsModalOpen(true)} />

        {/* Create Acronym Modal */}
        <CreateAcronymModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreateAcronym}
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