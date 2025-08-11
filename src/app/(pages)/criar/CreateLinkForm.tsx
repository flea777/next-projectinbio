import { Button } from '@/app/components/ui/Button'
import { TextInput } from '@/app/components/ui/TextInput'
import { useState } from 'react'

export function CreateLinkForm() {
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  return (
    <>
      <form action="" className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput value={link} onChange={(e) => setLink(e.target.value)} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">Erro de exemplo</span>
      </div>
    </>
  )
}
