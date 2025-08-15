import { TotalVisits } from '../../components/commons/TotalVisits'
import { UserCard } from '../../components/commons/user-card/UserCard'
import Link from 'next/link'
import {
  getProfileData,
  getProfileProjects,
} from '../../server/get-profile-data'
import { notFound } from 'next/navigation'
import { auth } from '../../lib/auth'
import { NewProject } from './NewProject'
import { getDownloadUrlFromPath } from '../../lib/firebase'
import { ProjectCard } from '../../components/commons/ProjectCard'

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const { profileId } = await params

  const profileData = await getProfileData(profileId)

  if (!profileData) return notFound()

  const projects = await getProfileProjects(profileId)

  const session = await auth()
  const isOwner = profileData.userId === session?.user?.id

  return (
    <div className="relative h-screen flex p-20 overflow-hidden">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary">
        <span>Você está usando a versão de teste.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold cursor-pointer">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>

      <div className="w-1/2 flex justify-center h-min">
        <UserCard {...profileData} />
      </div>

      <div className="w-full flex justify-center content-start gap-4 flex-wrap overflow-y-auto">
        {projects.map(async (project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOwner={isOwner}
            img={
              project.imagePath ??
              (await getDownloadUrlFromPath(project.imagePath))
            }
          />
        ))}
        {isOwner && <NewProject profileId={profileId} />}
      </div>

      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  )
}
