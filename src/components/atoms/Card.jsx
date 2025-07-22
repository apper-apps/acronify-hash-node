import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "glass rounded-2xl p-6 shadow-2xl shadow-primary/10 transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02] border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card