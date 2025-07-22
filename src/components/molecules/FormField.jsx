import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const FormField = forwardRef(({ 
  label, 
  error, 
  children, 
  required = false, 
  className,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}
      <div ref={ref}>
        {children}
      </div>
      {error && (
        <p className="text-sm text-error flex items-center gap-2">
          <span className="w-1 h-1 bg-error rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  )
})

FormField.displayName = "FormField"

export default FormField