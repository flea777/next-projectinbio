'use client'

import { createLink } from '@/app/actions/create-link'
import { verifyLink } from '@/app/actions/verify-link'
import { Button } from '@/app/components/ui/Button'
import { TextInput } from '@/app/components/ui/TextInput'
import { sanitizeLink } from '@/app/lib/utils'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export function CreateLinkForm() {
  const router = useRouter()
  const [link, setLink] = useState('')
  const [error, setError] = useState('')

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value))
    setError('')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (link.length === 0) return setError('Ops! Esqueceu de colocar seu link.')

    const isLinkTaken = await verifyLink(link)

    if (isLinkTaken) return setError('Desculpe, esse link já está em uso!')

    const isLinkCreated = await createLink(link)

    if (isLinkCreated === 401) {
      return setError('Por favor, faça o login antes de continuar')
    }

    if (isLinkCreated === 500) {
      return setError('Erro ao criar o perfil. Por favor, tente novamente')
    }

    router.push(`/${link}`)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <TextInput value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>
    </>
  )
}
