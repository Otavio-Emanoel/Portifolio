import { useState } from 'react';
import styles from './Header.module.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Otavio <strong>Emanoel</strong></span>
      </div>
      <button
        className={menuOpen ? `${styles.hamburger} active` : styles.hamburger}
        aria-label="Abrir menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <i className="fa fa-bars" style={{ fontSize: 32, color: '#fff' }}></i>
      </button>
      <nav className={`${styles.nav} ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;