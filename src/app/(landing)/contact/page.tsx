'use client'

import { ContactForm } from '@/components/forms/contact-form'
import TitleSection from '@/components/title-section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { CONTACT_INFO } from '@/config/contact-info'
import { FAQ } from '@/config/faq'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="space-y-page">
      <TitleSection
        title="Contact Us"
        description="Have Questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        image={{ url: '/titleImg.png', altText: 'altText' }}
      />
      {/* <section className="relative py-20 bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600">
              Have questions? We'd love to hear from you. Send us a message and
              we'll respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section> */}

      <section className="gradient-main pb-section">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="pr-0 lg:pr-12">
                <h2 className="mb-6">Get in Touch</h2>
                <p className="text-gray-600 mb-8">
                  Whether you&apos;re looking to volunteer, donate, or learn
                  more about our programs, we&apos;re here to help. Fill out the
                  form and we&apos;ll get back to you as soon as possible.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                  {CONTACT_INFO.map(item => (
                    <Card key={item.title} className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="p-3 bg-brand-blue-100 rounded-lg">
                            <item.icon className="w-6 h-6 text-brand-blue-900" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-gray-600">{item.details}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 ">
                <ContactForm />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-8 text-center">Frequently Asked Questions</h2>
            <Card className="p-6 ">
              <Accordion type="single" collapsible className="w-full">
                {FAQ.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
