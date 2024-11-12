import NewsletterSignup from '@/components/forms/newsletter-signup'
import HeroSection from '@/components/hero-section'

export default function Home() {
  return (
    <>
      <HeroSection />

      <section>
        <div className="container">
          <div>
            <h2>What We Do</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
              consequatur eum unde natus distinctio. Suscipit, cupiditate autem?
              Quod ipsum officia doloremque neque quibusdam fugiat.
            </p>
          </div>
          <ul>
            <li>
              <h3>Protect</h3>
              <p>
                Providing resources and safety for people in need, such as
                shelter, food, and basic necessities.
              </p>
            </li>
            <li>
              <h3>Educate</h3>
              <p>
                Organizing educational workshops, scholarships, and mentoring
                programs to help individuals grow.
              </p>
            </li>
            <li>
              <h3>Empower</h3>
              <p>
                Fostering economic independence by providing skills training and
                community support.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <NewsletterSignup />
    </>
  )
}
