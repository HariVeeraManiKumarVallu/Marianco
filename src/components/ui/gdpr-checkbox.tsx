'use client'

import * as React from 'react'
import { FormControl, FormField, FormItem, FormMessage } from './form'
import Link from 'next/link'
import { Checkbox } from './checkbox'

interface GDPRCheckboxProps {
  control: any
  name?: string
}

export function GDPRCheckbox({
  control,
  name = 'gdprConsent',
}: GDPRCheckboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <p className="text-sm text-muted-foreground">
              I consent to the processing of my personal data according to the{' '}
              <Link
                href="/privacy-policy"
                className="underline hover:text-primary"
              >
                Privacy Policy
              </Link>
              . I understand that I can withdraw my consent at any time.
            </p>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
