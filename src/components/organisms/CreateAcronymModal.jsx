import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import Button from "@/components/atoms/Button"
import IconButton from "@/components/atoms/IconButton"
import FormField from "@/components/molecules/FormField"
import Textarea from "@/components/atoms/Textarea"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"
import { summarizeText } from "@/utils/acronymGenerator"

const CreateAcronymModal = ({ isOpen, onClose, onCreate }) => {
const [formData, setFormData] = useState({
    originalText: "",
    category: ""
  })
const [generatedConcept, setGeneratedConcept] = useState(null)
const [isSummarizing, setIsSummarizing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
setFormData({ originalText: "", category: "" })
      setGeneratedConcept(null)
      setErrors({})
    }
  }, [isOpen])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
// Clear generated concept when text changes
    if (field === "originalText" && generatedConcept) {
      setGeneratedConcept(null)
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
if (!formData.originalText.trim()) {
      newErrors.originalText = "Please enter some text to summarize"
    } else if (formData.originalText.trim().length < 50) {
      newErrors.originalText = "Text should be at least 50 characters long for effective summarization"
    } else if (formData.originalText.trim().length > 2000) {
      newErrors.originalText = "Text should be less than 2000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

const handleSummarizeText = async () => {
    if (!validateForm()) return

    setIsSummarizing(true)
    try {
      const result = await summarizeText(formData.originalText.trim())
      setGeneratedConcept(result)
      toast.success("Concept generated successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to generate concept")
    } finally {
      setIsSummarizing(false)
    }
  }

const handleCreateConcept = async () => {
    if (!generatedConcept) return

    setIsCreating(true)
    try {
      const conceptData = {
        ...generatedConcept,
        originalText: formData.originalText.trim(),
        category: formData.category.trim() || "General",
        createdAt: new Date().toISOString(),
        isFavorite: false
      }

      await onCreate(conceptData)
      toast.success("Learning concept saved successfully!")
    } catch (err) {
      toast.error(err.message || "Failed to save concept")
    } finally {
      setIsCreating(false)
    }
  }

const handleRegenerateConcept = async () => {
    if (!formData.originalText.trim()) return
    
    setIsSummarizing(true)
    try {
      const result = await summarizeText(formData.originalText.trim(), true) // Force regeneration
      setGeneratedConcept(result)
      toast.success("New concept generated!")
    } catch (err) {
      toast.error(err.message || "Failed to regenerate concept")
    } finally {
      setIsSummarizing(false)
    }
  }

const characterCount = formData.originalText.length
  const maxCharacters = 2000

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
                  Create Learning Concept
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
label="Text to Summarize"
                  error={errors.originalText}
                  required
                >
                  <Textarea
placeholder="Enter the long text you want to transform into a digestible learning concept..."
                    value={formData.originalText}
                    onChange={(e) => handleInputChange("originalText", e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
<span>Minimum 50 characters for effective summarization</span>
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
                    onClick={handleSummarizeText}
                    disabled={isSummarizing || !formData.originalText.trim()}
                    className="px-8"
                  >
                    {isSummarizing ? (
                      <>
                        <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                        Summarizing...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Brain" className="w-4 h-4 mr-2" />
                        Generate Learning Concept
                      </>
                    )}
                  </Button>
                </div>

{/* Generated Concept Display */}
                <AnimatePresence>
                  {generatedConcept && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      {/* Concept Result */}
                      <div className="glass rounded-xl p-6 border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-center mb-4">
                          <h3 className="text-2xl font-display font-bold gradient-text mb-2">
                            Learning Concept Summary
                          </h3>
                          <p className="text-gray-300 text-sm">~150 words | Digestible format</p>
                        </div>

                        {/* Summary Content */}
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
                          <p className="text-gray-200 leading-relaxed text-sm">
                            {generatedConcept.summary}
                          </p>
                          <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
                            <span>Word count: ~{generatedConcept.summary.split(/\s+/).length} words</span>
                            <span>Optimized for learning retention</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-3">
                          <Button
                            variant="secondary"
                            onClick={handleRegenerateConcept}
                            disabled={isSummarizing}
                          >
                            <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                            Regenerate
                          </Button>
                          <Button
                            onClick={handleCreateConcept}
                            disabled={isCreating}
                          >
                            {isCreating ? (
                              <>
                                <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <ApperIcon name="Save" className="w-4 h-4 mr-2" />
                                Save Learning Concept
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