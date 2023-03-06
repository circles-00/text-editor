import { ReactNode } from 'react'

interface ILayoutProps {
  children: ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
  return <div className="px-20 py-10">{children}</div>
}

export default Layout
