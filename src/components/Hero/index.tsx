import styles from './Hero.module.css';
import Photo3D from './Photo3D';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <span className={styles.portfolio}>OTAVIO'S PORTFOLIO</span>
        <h1>
          HELLO! <span className={styles.italic}>I'M A</span> <br />
          FULLSTACK<br />
          <span className={styles.blue}>DEVELOPER</span>
        </h1>
        <p className={styles.desc}>
          Passionate about building modern web experiences that combine design and technology. I love turning ideas into interactive, beautiful, and high-performance solutions for real people and real businesses.
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Photo3D />
      </div>
    </section>
  );
}