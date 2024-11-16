import * as React from 'react'

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
  <div style={{
    backgroundColor: '#f6f9fc',
    fontFamily: 'Arial, sans-serif',
    padding: '40px 20px',
  }}>
    <div style={{
      backgroundColor: '#ffffff',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        color: '#1a1a1a',
        fontSize: '24px',
        marginBottom: '20px',
        borderBottom: '2px solid #eaeaea',
        paddingBottom: '10px',
      }}>
        New Contact Form Submission
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{
          color: '#333',
          fontSize: '18px',
          marginBottom: '5px',
        }}>
          {subject}
        </h2>
        <p style={{
          color: '#666',
          fontSize: '14px',
          marginBottom: '20px',
          lineHeight: '1.5',
        }}>
          From: {name} ({email})
        </p>
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px',
      }}>
        <p style={{
          color: '#444',
          fontSize: '16px',
          lineHeight: '1.6',
          whiteSpace: 'pre-wrap',
          margin: 0,
        }}>
          {message}
        </p>
      </div>

      <div style={{
        borderTop: '1px solid #eaeaea',
        paddingTop: '20px',
        color: '#999',
        fontSize: '12px',
        textAlign: 'center' as const,
      }}>
        <p>This is an automated email from your contact form.</p>
      </div>
    </div>
  </div>
)
