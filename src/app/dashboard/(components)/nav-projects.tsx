"use client"

import { ChevronRight, Plus, type LucideIcon, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuAction,
} from "@/components/ui/sidebar"

import { useState } from 'react';
import { UserRole } from "@/types/user/user"
import { useUser } from "@/providers/user-provider"
import { ProjectModal } from "../organization-project-bpmn-modal/(components)/projectModal";

export function NavProjects({
  projects,
  icon: ProjectsIcon = Folder,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  icon?: LucideIcon
}) {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>, data: { projectName: string; organizationId: string }) => {
    e.preventDefault();
    console.log('Project Name:', data.projectName);
    console.log('Organization ID:', data.organizationId);
    closeProjectModal();
  };
  const user = useUser();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible asChild defaultOpen={true} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Projects">
                <ProjectsIcon className="mr-2 size-4" />
                <span>Projects</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {projects.map((project) => (
                  <SidebarMenuSubItem key={project.name}>
                    <SidebarMenuSubButton asChild>
                      <a href={project.url}>
                        <project.icon className="mr-2 size-4" />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuSubButton>
                    <SidebarMenuAction showOnHover>
                      <Plus className="mr-2 size-4" />
                      <span>Create Project</span>
                    </SidebarMenuAction>
                  </SidebarMenuSubItem>
                ))}
                {user.role !== UserRole.STAKEHOLDER && (
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      size="sm"
                      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-all ease-in-out duration-200"
                      onClick={openProjectModal}
                    >
                      <Plus className="mr-2 size-4" />
                      <button
                        className="font-medium text-muted-foreground dark:text-muted-foreground-dark cursor-pointer transition-all ease-in-out duration-200 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        onClick={openProjectModal}
                      >
                        Create Project
                      </button>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                )}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
      />
    </SidebarGroup>
  )
}