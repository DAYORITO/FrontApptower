import React from 'react'
import { Nav } from './Nav'
import NavUser from './NavUser'

export const PageLayout = ({children}) => {
  return (
    <div>
        {/* <Nav/> */}
        <NavUser/>
        <div>
            {children}
        </div>
    </div>
  )
}
