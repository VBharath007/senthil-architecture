import { PROJECTS } from "@/data/site";
import { ProjectClient } from "./ProjectClient";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return <ProjectClient params={resolvedParams} />;
}
