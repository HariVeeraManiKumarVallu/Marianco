import Link from 'next/link'
import React from 'react'

interface StyledLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode
}

function StyledLink({ children, ...props }: StyledLinkProps) {
  return <Link className="hover:text-blue-500" {...props}>{children}</Link>
}

export default StyledLink
