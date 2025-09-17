import * as React from 'react'
import styles from './get-involved-template.module.css'

interface GetInvolvedEmailProps {
  name: string
  email: string
  phone?: string
  option: 'volunteer' | 'partner' | 'donate' | 'advocate'
  message: string
}

const optionTitles = {
  volunteer: 'Volunteer',
  partner: 'Partnership',
  donate: 'Donation',
  advocate: 'Advocacy',
}

export const GetInvolvedEmail: React.FC<Readonly<GetInvolvedEmailProps>> = ({
  name,
  email,
  phone,
  option,
  message,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <h1 className={styles.header}>
        New Marianco Get Involved Request: {optionTitles[option]}
      </h1>

      <div className={styles.contactInfo}>
        <h2 className={styles.contactHeader}>Contact Information</h2>
        <p className={styles.contactDetails}>
          <strong>Name:</strong> {name}
          <br />
          <strong>Email:</strong> {email}
          <br />
          {phone && (
            <>
              <strong>Phone:</strong> {phone}
              <br />
            </>
          )}
        </p>
      </div>

      <div className={styles.interestDetails}>
        <h2 className={styles.interestHeader}>Interest Details</h2>
        <p className={styles.area}>
          <strong>Area of Interest:</strong> {optionTitles[option]}
        </p>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  </div>
)
