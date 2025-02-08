import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/logo.png"
      width={264}
      height={204}
      alt="Marianco logo"
      className="object-contain h-full w-auto"
    />

  )
}

