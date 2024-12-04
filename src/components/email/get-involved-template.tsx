import * as React from 'react'

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
  <div
    style={{
      backgroundColor: '#f6f9fc',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
    }}
  >
    <div
      style={{
        backgroundColor: '#ffffff',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1
        style={{
          color: '#1a1a1a',
          fontSize: '24px',
          marginBottom: '20px',
          borderBottom: '2px solid #eaeaea',
          paddingBottom: '10px',
        }}
      >
        New Marianco Get Involved Request: {optionTitles[option]}
      </h1>

      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            color: '#333',
            fontSize: '18px',
            marginBottom: '5px',
          }}
        >
          Contact Information
        </h2>
        <p
          style={{
            color: '#666',
            fontSize: '14px',
            marginBottom: '5px',
            lineHeight: '1.5',
          }}
        >
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

      <div style={{ marginBottom: '20px' }}>
        <h2
          style={{
            color: '#333',
            fontSize: '18px',
            marginBottom: '5px',
          }}
        >
          Interest Details
        </h2>
        <p
          style={{
            color: '#666',
            fontSize: '14px',
            marginBottom: '5px',
            lineHeight: '1.5',
          }}
        >
          <strong>Area of Interest:</strong> {optionTitles[option]}
        </p>
        <p
          style={{
            color: '#666',
            fontSize: '14px',
            marginTop: '10px',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
          }}
        >
          {message}
        </p>
      </div>
    </div>
  </div>
)
