import { PROJECTS } from "@/data/site";
import { ProjectClient } from "./ProjectClient";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ProjectClient params={params} />;
}
