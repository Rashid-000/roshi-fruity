import * as React from "react"
import { cn } from "../../lib/utlis";

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ className, config, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("w-full", className)} {...props} />
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {label}
            </span>
            <span className="font-bold text-muted-foreground">
              {payload[0].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const ChartTooltipContent = ChartTooltip

export { ChartContainer, ChartTooltip, ChartTooltipContent }