import { ReactNode } from 'react'

interface HeadingProps {
  children: ReactNode
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  asChild?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export type { HeadingProps }
