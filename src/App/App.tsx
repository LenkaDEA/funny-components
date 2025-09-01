import './App.css'
import { Link, Outlet } from 'react-router'

function App() {
  return (
    <>
      <header>
        <Link to="/GameXO"> GameXO </Link>
        <Link to="/Stopwatch"> Stopwatch </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default App
