import { NavLink } from 'react-router'
import styles from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><NavLink to="/quote" className={({ isActive }) => (isActive ? styles.active : '')}>Random Quote Machine</NavLink></li>
                <li><NavLink to="/markdown" className={({ isActive }) => (isActive ? styles.active : '')}>Markdown Previewer</NavLink></li>
                <li><NavLink to="/drum-machine" className={({ isActive }) => (isActive ? styles.active : '')}>Drum Machine</NavLink></li>
                <li><NavLink to="/clock" className={({ isActive }) => (isActive ? styles.active : '')}>25 + 5 Clock</NavLink></li>
                <li><NavLink to="/calculator" className={({ isActive }) => (isActive ? styles.active : '')}>Calculator</NavLink></li>
            </ul>
        </nav>
    )
}