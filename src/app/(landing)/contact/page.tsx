export default function Contact() {
  return (
    <>
      <h1>Let&apos;s Talk About Making a Difference</h1>
      <p>
        We&apos;re here to listen, share, and work together for the protection
        of children everywhere.
      </p>
      <section>
        <h2>Contact Information</h2>
        <ul>
          <li>
            <span>Email:</span>
            <p>info@marianco.org</p>
          </li>
          <li>
            <span>Phone:</span>
            <p>+1-XXX-XXX-XXXX</p>
          </li>
          <li>
            <span>Address:</span>
            <p>123 Marianco Sweden, Gothenburg & Stockholm</p>
          </li>
        </ul>
      </section>
      <section>
        <h2>Contact Form</h2>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <label htmlFor="subject">Subject:</label>
          <input type="text" id="subject" name="subject" required />
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" rows={4} required />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}
