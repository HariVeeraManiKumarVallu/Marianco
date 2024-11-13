import Link from 'next/link'
import React from 'react'

interface StyledLinkProps extends typeof Link {
  children: React.ReactNode
}

function StyledLink({ children }:StyleLinkProps) {
  return <Link className="hover:text-blue-500">{children}</Link>
}

export default StyledLink
