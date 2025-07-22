import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const IconButton = forwardRef(({ className, size = "md", variant = "ghost", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white hover:brightness-110 hover:scale-110 focus:ring-primary shadow-lg shadow-primary/25",
    secondary: "glass text-white hover:bg-white/20 focus:ring-white/50",
    ghost: "text-white hover:bg-white/10 focus:ring-white/50",
    danger: "text-red-400 hover:bg-red-500/10 focus:ring-red-500/50 hover:text-red-300"
  }
  
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

IconButton.displayName = "IconButton"

export default IconButton