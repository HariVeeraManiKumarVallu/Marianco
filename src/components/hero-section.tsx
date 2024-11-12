import AnimatedWorldMap from './animated-world-map'
import HeroContent from './hero-content'

export default function HeroSection() {
  return (
    <section>
      <div className="container flex flex-col lg:flex-row-reverse items-center justify-between gap-8 lg:gap-12">
        <AnimatedWorldMap />
        <HeroContent />
      </div>
    </section>
  )
}
