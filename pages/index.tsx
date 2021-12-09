import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerTextBox}>
          <h1 className={styles.headingPrimary}>
            <span className={styles.headingTextPrimary}>
              COVID Timeline Generator
            </span>
          </h1>
        </div>
      </header>

      <main>
        <div className={styles.containerPatientInfo}>
          <h1 className={styles.patientInfoTextPrimary}>Patient Information</h1>

          <div className={styles.patientInfoBox}>
            <div>
              <label className={styles.patientInfoLabel}>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>LGBTQ+</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
