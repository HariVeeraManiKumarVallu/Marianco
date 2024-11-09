'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

export default function DonationOptionsCards() {
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [monthlyAmount, setMonthlyAmount] = useState('')

  return (
    <article className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Support Our Cause
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {/* One-time Donation */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl mb-2">One-time Donation</CardTitle>
              <CardDescription /* className="h-12" */>
                Choose any amount to contribute and make an immediate impact.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {['25', '50', '100', '200'].map(amount => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => setSelectedAmount(amount)}
                    className="w-full"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="custom-amount">Custom Amount</Label>
                <Input
                  id="custom-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={e => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount('custom')
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Donate Now</Button>
            </CardFooter>
          </Card>

          {/* Monthly Giving */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Monthly Giving</CardTitle>
              <CardDescription>
                Become a sustaining donor, contributing each month to ensure our
                programs remain strong and consistent.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="space-y-2">
                <Label htmlFor="monthly-amount">Monthly Amount</Label>
                <Input
                  id="monthly-amount"
                  type="number"
                  placeholder="Enter monthly amount"
                  value={monthlyAmount}
                  onChange={e => setMonthlyAmount(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="">
              <Button className="w-full">Subscribe Monthly</Button>
            </CardFooter>
          </Card>

          {/* Sponsor a Person */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Sponsor a Child</CardTitle>
              <CardDescription>
                Contribute to the complete care and rehabilitation of a child
                rescued from exploitation. Receive regular updates about their
                progress.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="space-y-2">
                <Label htmlFor="sponsorship-level">Sponsorship Level</Label>
                <Select>
                  <SelectTrigger id="sponsorship-level">
                    <SelectValue placeholder="Select a sponsorship level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">
                      Basic Care ($50/month)
                    </SelectItem>
                    <SelectItem value="standard">
                      Standard Care ($100/month)
                    </SelectItem>
                    <SelectItem value="comprehensive">
                      Comprehensive Care ($200/month)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sponsor Now</Button>
            </CardFooter>
          </Card>

          {/* Fund a Project */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl mb-2">Fund a Project</CardTitle>
              <CardDescription>
                Support a specific project, whether it&apos; is a rescue
                mission, an educational campaign, or a safe home for victims of
                trafficking.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <div className="space-y-2">
                <Label htmlFor="project-select">Select Project</Label>
                <Select>
                  <SelectTrigger id="project-select">
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">
                      Education Outreach
                    </SelectItem>
                    <SelectItem value="healthcare">
                      Healthcare Initiative
                    </SelectItem>
                    <SelectItem value="environment">
                      Environmental Conservation
                    </SelectItem>
                    <SelectItem value="community">
                      Community Development
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Fund Project</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </article>
  )
}
