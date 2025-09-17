import * as React from 'react'
import styles from './contact-form-template.module.css'

interface EmailTemplateProps {
  name: string
  email: string
  subject: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div className={styles.templateWrapper}>
    <div className={styles.templateContainer}>
      <h1 className={styles.header}>
        Marianco - New Contact Form Submission
      </h1>

      <div className={styles.subjectWrapper}>
        <h2 className={styles.subject}>{subject}</h2>
        <p className={styles.fromInfo}>
          From: {name} ({email})
        </p>
      </div>

      <div className={styles.messageContainer}>
        <p className={styles.message}>{message}</p>
      </div>

      <div className={styles.footer}>
        <p>This is an automated email from your contact form.</p>
      </div>
    </div>
  </div>
)
