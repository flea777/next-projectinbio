'use client'

import {
  Github,
  Linkedin,
  LucideProps,
  Plus,
  Instagram,
  Twitter,
} from 'lucide-react'
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  startTransition,
  useState,
} from 'react'
import { Modal } from '../../ui/Modal'
import { Button } from '../../ui/Button'
import { useParams } from 'next/navigation'
import { addSocialLinks } from '../../../actions/create-social-links'
import { TextInput } from '../../ui/TextInput'
import { useRouter } from 'next/navigation'

interface SocialButton {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  name: string
  setName: Dispatch<SetStateAction<string>>
}

export function EditSocialLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [twitter, setTwitter] = useState('')

  const { profileId } = useParams()

  const router = useRouter()

  const socialButtons: SocialButton[] = [
    {
      icon: Github,
      name: 'Github',
      setName: setGithub,
    },
    {
      icon: Instagram,
      name: 'Instagram',
      setName: setInstagram,
    },
    {
      icon: Linkedin,
      name: 'Linkedin',
      setName: setLinkedin,
    },
    {
      icon: Twitter,
      name: 'Twitter',
      setName: setTwitter,
    },
  ]

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true)

    await addSocialLinks({
      profileId: typeof profileId === 'string' ? profileId : '',
      github,
      instagram,
      linkedin,
      twitter,
    })

    startTransition(() => {
      setIsModalOpen(false)
      setIsSavingSocialLinks(false)
      router.refresh()
    })
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] cursor-pointer"
      >
        <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <div className="bg-[#050505] p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-xl text-white font-bold">
            Adicionar redes sociais
          </p>
          <div className="flex flex-col gap-4">
            {socialButtons.map((button) => (
              <div key={button.name} className="flex items-center gap-2 w-full">
                <button.icon />
                <TextInput
                  type="text"
                  placeholder={`Link ${button.name}`}
                  onChange={(e) => button.setName(e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="font-bold text-white"
          >
            Voltar
          </button>
          <Button onClick={handleAddSocialLinks} disabled={isSavingSocialLinks}>
            Salvar
          </Button>
        </div>
      </Modal>
    </>
  )
}
