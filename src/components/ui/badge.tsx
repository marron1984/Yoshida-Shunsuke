import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-slate-700 bg-slate-800 text-slate-300',
        consultation: 'border-blue-800 bg-blue-950/50 text-blue-300',
        judgment: 'border-amber-800 bg-amber-950/50 text-amber-300',
        reply: 'border-emerald-800 bg-emerald-950/50 text-emerald-300',
        initial_response: 'border-red-800 bg-red-950/50 text-red-300',
        family: 'border-purple-800 bg-purple-950/50 text-purple-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
