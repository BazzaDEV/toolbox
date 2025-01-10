import { PasswordGeneratorForm } from '@/components/password-generator-form'

export default function Home() {
  return (
    <div className='flex flex-col gap-8'>
      <h1 className='text-3xl font-medium tracking-tighter'>
        Generate a password.
      </h1>
      <div className='text-sm'>
        <p>
          All the web-based password generators I've come across have, without
          fail, been...
        </p>
        <p className='mt-2 mb-1'>
          <b>(1)</b> Ugly;
        </p>
        <p className='mb-2'>
          <b>(2)</b> So ugly , I've had to close my browser and contemplate the
          fate of my existence.
        </p>
        <p>
          That's why I made this small tool - to ease the pain I was feeling
          (and seeing).
        </p>
      </div>
      <PasswordGeneratorForm />
    </div>
  )
}
