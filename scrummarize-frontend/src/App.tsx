import { Outlet } from '@tanstack/react-router'
import './App.css'
import Header from './Header.tsx'

function App() {

  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </>
  )
}

export default App
