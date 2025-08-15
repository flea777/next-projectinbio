import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import Link from 'next/link'
import { ProfileData } from '../../../server/get-profile-data'
import { Button } from '../../ui/Button'
import { EditSocialLinks } from './EditSocialLinks'

export function UserCard(profileData?: ProfileData) {
  return (
    <div
      className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10
    bg-[#121212] rounded-3xl text-white"
    >
      <div className="size-48 ">
        <img
          src="/me.jpeg"
          alt="Pedro Bim"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            Pedro Bim
          </h3>
        </div>
        <p className="opacity-40">Desenvolvedor full-stack</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">LInks</span>
        <div className="flex gap-3">
          {profileData?.socialMedias?.github && (
            <Link
              href={profileData.socialMedias?.github}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2e2e2e]"
            >
              <Github />
            </Link>
          )}

          {profileData?.socialMedias?.instagram && (
            <Link
              href={profileData.socialMedias?.instagram}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2e2e2e]"
            >
              <Instagram />
            </Link>
          )}

          {profileData?.socialMedias?.linkedin && (
            <Link
              href={profileData.socialMedias?.linkedin}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2e2e2e]"
            >
              <Linkedin />
            </Link>
          )}

          {profileData?.socialMedias?.twitter && (
            <Link
              href={profileData.socialMedias?.twitter}
              target="_blank"
              className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2e2e2e]"
            >
              <Twitter />
            </Link>
          )}
          <EditSocialLinks socialMedias={profileData?.socialMedias} />
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          <Button className="w-full">Acesse meu site!</Button>
          <button className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E] cursor-pointer">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  )
}
