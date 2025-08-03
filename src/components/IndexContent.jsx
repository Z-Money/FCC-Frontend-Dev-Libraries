import certification from '../assets/images/FCC-Frontend-Development-Libraries.webp'
import styles from './IndexContent.module.css'

export default function IndexContent() {
    return (
        <div className={styles.indexContent}>
            <h1>Welcome to my FCC submission site</h1>
            <hr className={styles.hr}></hr>
            <p>This site contains all the projects I have completed for the FreeCodeCamp Front End Development Libraries Certification.</p>
            <br></br>
            <p>For each project, click the link on the navigation bar above to view the project.</p>
            <br></br>
            <img src={certification} alt="Front End Development Certification" className={styles.certification} />
        </div>
    )
}
