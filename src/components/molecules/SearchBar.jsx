import { useState } from "react"
import { motion } from "framer-motion"
import Input from "@/components/atoms/Input"
import IconButton from "@/components/atoms/IconButton"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleClear = () => {
    onChange("")
  }

  return (
    <motion.div 
      className="relative max-w-md mx-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
        </div>
        
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-12 pr-12 transition-all duration-300 ${
            isFocused ? "ring-2 ring-primary/50 border-primary/50 bg-white/10" : ""
          }`}
        />
        
        {value && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <IconButton
              size="sm"
              variant="ghost"
              onClick={handleClear}
              className="text-gray-400 hover:text-white"
            >
              <ApperIcon name="X" className="h-4 w-4" />
            </IconButton>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default SearchBar