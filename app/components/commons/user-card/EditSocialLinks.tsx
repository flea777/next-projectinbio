'use client'

import {
  Github,
  Instagram,
  Linkedin,
  LucideProps,
  Plus,
  Twitter,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  startTransition,
  useState,
} from 'react'
import { addSocialLinks } from '../../../actions/create-social-links'
import { Button } from '../../ui/Button'
import { Modal } from '../../ui/Modal'
import { TextInput } from '../../ui/TextInput'

interface SocialButton {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  name: string
  value: string
  prefix: string
  setName: Dispatch<SetStateAction<string>>
}

export function EditSocialLinks({
  socialMedias,
}: {
  socialMedias?: {
    github: string
    instagram: string
    linkedin: string
    twitter: string
  }
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSavingSocialLinks, setIsSavingSocialLinks] = useState(false)

  const [github, setGithub] = useState(socialMedias?.github || '')
  const [instagram, setInstagram] = useState(socialMedias?.instagram || '')
  const [linkedin, setLinkedin] = useState(socialMedias?.linkedin || '')
  const [twitter, setTwitter] = useState(socialMedias?.twitter || '')

  const { profileId } = useParams()

  const router = useRouter()

  const socialButtons: SocialButton[] = [
    {
      icon: Github,
      name: 'Github',
      value: github,
      prefix: 'https://github.com/',
      setName: setGithub,
    },
    {
      icon: Instagram,
      name: 'Instagram',
      value: instagram,
      prefix: 'https://instagram.com/',
      setName: setInstagram,
    },
    {
      icon: Linkedin,
      name: 'Linkedin',
      value: linkedin,
      prefix: 'https://linkedin.com/in/',
      setName: setLinkedin,
    },
    {
      icon: Twitter,
      name: 'Twitter',
      value: twitter,
      prefix: 'https://twitter.com/',
      setName: setTwitter,
    },
  ]

  async function handleAddSocialLinks() {
    setIsSavingSocialLinks(true)

    const linksToSend = {
      github: github !== socialButtons[0].prefix ? github : '',
      instagram: instagram !== socialButtons[1].prefix ? instagram : '',
      linkedin: linkedin !== socialButtons[2].prefix ? linkedin : '',
      twitter: twitter !== socialButtons[3].prefix ? twitter : '',
    }

    await addSocialLinks({
      profileId: typeof profileId === 'string' ? profileId : '',
      ...linksToSend,
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
                  value={button.value || button.prefix}
                  onChange={(e) => button.setName(e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSavingSocialLinks}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
