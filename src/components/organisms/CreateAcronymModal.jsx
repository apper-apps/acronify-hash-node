import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import IconButton from "@/components/atoms/IconButton"
import FormField from "@/components/molecules/FormField"
import Textarea from "@/components/atoms/Textarea"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { generateAcronym } from "@/utils/acronymGenerator"

const CreateAcronymModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    originalText: "",
    category: ""
  })
  const [generatedAcronym, setGeneratedAcronym] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setFormData({ originalText: "", category: "" })
      setGeneratedAcronym(null)
      setErrors({})
    }
  }, [isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
    // Clear generated acronym when text changes
    if (field === "originalText" && generatedAcronym) {
      setGeneratedAcronym(null)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.originalText.trim()) {
      newErrors.originalText = "Please enter some text to convert"
    } else if (formData.originalText.trim().length < 10) {
      newErrors.originalText = "Text should be at least 10 characters long"
    } else if (formData.originalText.trim().length > 500) {
      newErrors.originalText = "Text should be less than 500 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerateAcronym = async () => {
    if (!validateForm()) return

    setIsGenerating(true)
    try {
      const result = await generateAcronym(formData.originalText.trim())
      setGeneratedAcronym(result)
      toast.success("Acronym generated successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to generate acronym")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCreateAcronym = async () => {
    if (!generatedAcronym) return

    setIsCreating(true)
    try {
      const acronymData = {
        ...generatedAcronym,
        originalText: formData.originalText.trim(),
        category: formData.category.trim() || "General",
        createdAt: new Date().toISOString(),
        isFavorite: false
      }

      await onCreate(acronymData)
      toast.success("Acronym created successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to create acronym")
    } finally {
      setIsCreating(false)
    }
  }

  const handleRegenerateAcronym = async () => {
    if (!formData.originalText.trim()) return
    
    setIsGenerating(true)
    try {
      const result = await generateAcronym(formData.originalText.trim(), true) // Force regeneration
      setGeneratedAcronym(result)
      toast.success("New acronym generated!")
    } catch (err) {
      toast.error(err.message || "Failed to regenerate acronym")
    } finally {
      setIsGenerating(false)
    }
  }

  const characterCount = formData.originalText.length
  const maxCharacters = 500

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-2xl border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-2xl font-display font-bold gradient-text">
                  Create New Acronym
                </h2>
                <IconButton
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </IconButton>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Text Input */}
                <FormField
                  label="Text to Convert"
                  error={errors.originalText}
                  required
                >
                  <Textarea
                    placeholder="Enter the text you want to convert into a memorable acronym..."
                    value={formData.originalText}
                    onChange={(e) => handleInputChange("originalText", e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                    <span>Minimum 10 characters for best results</span>
                    <span className={characterCount > maxCharacters ? "text-error" : ""}>
                      {characterCount}/{maxCharacters}
                    </span>
                  </div>
                </FormField>

                {/* Category Input */}
                <FormField
                  label="Category (Optional)"
                >
                  <Input
                    placeholder="e.g., Study, Work, Project..."
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                  />
                </FormField>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerateAcronym}
                    disabled={isGenerating || !formData.originalText.trim()}
                    className="px-8"
                  >
                    {isGenerating ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Sparkles" className="w-4 h-4 mr-2" />
                        Generate Acronym
                      </>
                    )}
                  </Button>
                </div>

                {/* Generated Acronym Display */}
                <AnimatePresence>
                  {generatedAcronym && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Acronym Result */}
                      <div className="glass rounded-xl p-6 border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-center mb-4">
                          <h3 className="text-3xl font-display font-bold gradient-text mb-2">
                            {generatedAcronym.acronym}
                          </h3>
                          <p className="text-gray-300 text-sm">Your memorable acronym</p>
                        </div>

                        {/* Breakdown */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {generatedAcronym.breakdown.map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="glass rounded-lg p-3 text-center border border-white/10"
                            >
                              <div className="text-xl font-bold text-primary mb-1">
                                {item.letter}
                              </div>
                              <div className="text-sm text-gray-300">
                                {item.word}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-3 mt-6">
                          <Button
                            variant="secondary"
                            onClick={handleRegenerateAcronym}
                            disabled={isGenerating}
                          >
                            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button
                            onClick={handleCreateAcronym}
                            disabled={isCreating}
                          >
                            {isCreating ? (
                              <>
                                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                              </>
                            ) : (
                              <>
                                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                                Save Acronym
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateAcronymModal