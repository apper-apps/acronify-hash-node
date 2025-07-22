import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white hover:brightness-110 hover:scale-105 focus:ring-primary shadow-lg shadow-primary/25",
    secondary: "glass text-white hover:bg-white/20 focus:ring-white/50",
    outline: "border border-white/20 text-white hover:bg-white/10 focus:ring-white/50",
    ghost: "text-white hover:bg-white/10 focus:ring-white/50"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
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

Button.displayName = "Button"

export default Button