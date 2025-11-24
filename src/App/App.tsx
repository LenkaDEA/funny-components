import { Link, Outlet } from 'react-router'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.main}>
      <header>
        <Link className={styles.link} to="/GameXO"> GameXO </Link>
        <Link className={styles.link} to="/Stopwatch"> Stopwatch </Link>
        <Link className={styles.link} to="/NestedCheckbox"> Nested checkbox </Link>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
