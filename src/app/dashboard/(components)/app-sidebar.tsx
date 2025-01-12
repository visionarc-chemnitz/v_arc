"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";

import Bpmn from './bpmn-info';

import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { Organization, TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/providers/user-provider";
import { NavBpmnFile } from "./nav-bpmn-file";
import { UserRole } from "@/types/user/user";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
    role: UserRole.MEMBER,
    organizationId: "",
  },
  navMain: [
    {
      title: "Playground",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Text2BPMN",
          url: "/dashboard/text2bpmn",
        },
        {
          title: "Image2BPMN",
          url: "/dashboard/image2bpmn",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log('test');
    if (user && user.id) {
      const fetchOrganizations = async () => {
        try {
          console.log('test');
          const response = await fetch(`/api/organization/get-organizations?userId=${user.id}`);
          const data = await response.json();
          console.log(data);
          if (data.organizations.length > 0) {
            console.log(data.organizations);
            setOrganizations(data.organizations);
          }
        } catch (error) {
          console.error("Error fetching organizations:", error);
        }
      };

      fetchOrganizations();
    }
  }, [user]);

  React.useEffect(() => {
    const storedProjectId = localStorage.getItem("selectedProjectId");
    if (storedProjectId) {
      setSelectedProjectId(storedProjectId);
    }
  }, []);


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher organizations={organizations} />
      </SidebarHeader>
      <SidebarContent>
        {user.role !== UserRole.STAKEHOLDER && (
          <NavMain items={data.navMain} />
        )}
        {selectedProjectId && <NavBpmnFile projectId={selectedProjectId} />}
        {user.role !== UserRole.STAKEHOLDER && (
          <div className="m-4">
            <Bpmn />
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}