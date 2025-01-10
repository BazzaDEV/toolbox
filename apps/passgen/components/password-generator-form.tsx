'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Checkbox } from '@repo/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Slider } from '@repo/ui/slider'
import { Input } from '@repo/ui/input'
import {
  AMBIGUOUS_CHARS,
  generatePassword,
  LOWERCASE_CHARS,
  NUMBER_CHARS,
  SYMBOL_CHARS,
  UPPERCASE_CHARS,
} from '@/lib/crypto'
import { useEffect, useState } from 'react'
import { useScramble } from 'use-scramble'
import { cn } from '@repo/ui/cn'
import { Button } from '@repo/ui/button'
import { LucideCopy, LucideRefreshCcw } from './icons'
import { toast } from '@repo/ui/sonner'

const schema = z.object({
  length: z.coerce.number().gte(0).lte(128),
  includeUppercase: z.boolean().default(true),
  includeLowercase: z.boolean().default(true),
  includeNumbers: z.boolean().default(true),
  includeSymbols: z.boolean().default(true),
  includeAmbiguous: z.boolean().default(true),
})

type Schema = z.infer<typeof schema>

const booleanFlags = [
  {
    id: 'includeLowercase',
    label: 'Lowercase',
    description: LOWERCASE_CHARS,
  },
  {
    id: 'includeUppercase',
    label: 'Uppercase',
    description: UPPERCASE_CHARS,
  },
  {
    id: 'includeNumbers',
    label: 'Numbers',
    description: NUMBER_CHARS,
  },
  {
    id: 'includeSymbols',
    label: 'Special Characters/Symbols',
    description: SYMBOL_CHARS,
  },
  {
    id: 'includeAmbiguous',
    label: 'Include Ambiguous Characters',
    description: AMBIGUOUS_CHARS,
  },
] as const

export function PasswordGeneratorForm() {
  const [password, setPassword] = useState('')

  function genPass(values: Schema) {
    const gen = generatePassword({
      length: values.length,
      includeUppercase: values.includeUppercase,
      includeLowercase: values.includeLowercase,
      includeNumbers: values.includeNumbers,
      includeSymbols: values.includeSymbols,
      excludeAmbiguous: !values.includeAmbiguous,
    })

    setPassword(gen)
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      length: 32,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
      includeAmbiguous: false,
    },
  })

  useEffect(() => {
    genPass(form.getValues())
  }, [])

  const { ref, replay } = useScramble({
    text: password,
    speed: 1,
  })

  useEffect(() => {
    const { unsubscribe } = form.watch((values) => {
      genPass({
        length: values.length!,
        includeUppercase: values.includeUppercase!,
        includeLowercase: values.includeLowercase!,
        includeNumbers: values.includeNumbers!,
        includeSymbols: values.includeSymbols!,
        includeAmbiguous: values.includeAmbiguous!,
      })
    })

    return () => unsubscribe()
  }, [form.watch])

  function onSubmit(values: z.infer<typeof schema>) {
    genPass({
      length: values.length,
      includeUppercase: values.includeUppercase,
      includeLowercase: values.includeLowercase,
      includeNumbers: values.includeNumbers,
      includeSymbols: values.includeSymbols,
      includeAmbiguous: values.includeAmbiguous,
    })
  }

  const length = form.watch('length')

  function selectContents(el: any) {
    let range = document.createRange()
    range.selectNodeContents(el)
    let sel = window.getSelection()!
    sel.removeAllRanges()
    sel.addRange(range)
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <div className='h-14 py-2 px-3 flex items-center gap-4 w-full bg-neutral-100 border border-border rounded-lg drop-shadow-lg'>
            <div
              className={cn(
                'cursor-copy',
                'font-medium w-full overflow-hidden text-ellipsis whitespace-nowrap',
                length <= 34 ? 'text-2xl' : 'text-lg',
              )}
              onClick={(e) => {
                selectContents(e.target)
                document.execCommand('copy')
                toast.success('Secure password copied to clipboard.', {
                  position: 'top-center',
                })
              }}
              ref={ref}
            />
            <div className='inline-flex gap-2'>
              <Button
                type='button'
                size='icon'
                className='h-8 w-8'
                variant='outline'
              >
                <LucideCopy className='h-4 w-4' />
              </Button>
              <Button
                type='submit'
                size='icon'
                className='h-8 w-8'
              >
                <LucideRefreshCcw className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <FormField
            control={form.control}
            name='length'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Length</FormLabel>
                <div className='flex gap-2'>
                  <FormControl>
                    <Input
                      type='number'
                      min={0}
                      max={128}
                      className='w-[12ch] h-8'
                      {...field}
                    />
                  </FormControl>
                  <FormControl>
                    <Slider
                      className='w-[100%]'
                      onValueChange={(vals) => field.onChange(vals[0])}
                      value={[field.value]}
                      min={0}
                      max={128}
                    />
                  </FormControl>
                </div>
                <FormDescription>
                  The longer, the better... or so I've heard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-col gap-4'>
            {booleanFlags.map((flag) => {
              const { ref, replay: replay2 } = useScramble({
                text: flag.description,
                speed: 1,
                scramble: 3,
              })

              return (
                <FormField
                  key={flag.id}
                  control={form.control}
                  name={flag.id}
                  render={({ field }) => (
                    <FormItem className='flex justify-between space-y-0 gap-4 items-center'>
                      <div className='flex gap-2'>
                        <FormControl>
                          <Checkbox
                            checked={Boolean(field.value)}
                            onCheckedChange={(checked) => {
                              replay2()
                              field.onChange(checked)
                            }}
                          />
                        </FormControl>
                        <FormLabel className='leading-5'>
                          {flag.label}
                        </FormLabel>
                      </div>
                      <FormDescription
                        className='mt-0'
                        ref={ref}
                        onMouseOver={replay2}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            })}
          </div>
        </form>
      </Form>
    </div>
  )
}
