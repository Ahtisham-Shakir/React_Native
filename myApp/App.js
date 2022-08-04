import React from 'react'
import Navigation from './src/Navigation'
import { ContextProvider } from './src/context'



export default function App() {
  return (
    <ContextProvider>
      <Navigation/>
    </ContextProvider>
  )
}