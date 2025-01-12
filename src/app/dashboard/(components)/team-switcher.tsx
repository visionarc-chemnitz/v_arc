import * as React from "react";
import { ChevronsUpDown, Plus, GalleryVerticalEnd } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useModalManager } from "@/hooks/useModalManager";
import { OrganizationModal } from '@/app/dashboard/organization-project-bpmn-modal/(components)/organizationModal';

export interface Organization {
  id?: string;
  name: string;
  logo?: string; // Updated to string for image URL
  projects?: { name: string; url: string; icon: React.ElementType }[];
}
export function TeamSwitcher({
  organizations,
}: {
  organizations: Organization[];
}) {
  const { isMobile } = useSidebar();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [activeOrganization, setActiveOrganization] = React.useState(
    organizations[0] || { name: "No Organization", logo: "", projects: [] }
  );


  // Modal state management
  const {
    isOpen,
    openModal,
    closeModal,
    organizationName,
    setOrganizationName,
    handleOrganizationSubmit,
  } = useModalManager();

  // Fallback logo if undefined
  const defaultLogo = GalleryVerticalEnd;

  const handleOrganizationChange = (organization: Organization) => {
    setActiveOrganization(organization);
    if (organization.id) {
      localStorage.setItem("selectedOrganizationId", organization.id);
    }
    window.location.reload();
  };

  React.useEffect(() => {
    if (organizations.length > 0) {
      setActiveOrganization(organizations[0]);
      if (organizations[0].id) {
        localStorage.setItem("selectedOrganizationId", organizations[0].id);
      }
    }
  }, [organizations]);

  const getInitials = (name: string) => {
    const initials = name.split(" ").map(word => word[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <div className="grid flex-1 text-left text-sm leading-tight space-y-1">
                  <div className="flex items-center gap-2">
                    {activeOrganization.logo ? (
                      <img
                        src={activeOrganization.logo}
                        alt="Organization Logo"
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded text-white">
                        {getInitials(activeOrganization.name)}
                      </div>
                    )}
                    {!isCollapsed && (
                      <span className="truncate font-semibold text-gray-800 dark:text-white">
                        {activeOrganization?.name}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronsUpDown className="ml-auto text-gray-500 dark:text-gray-400 transition-all duration-200" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white dark:bg-gray-800 shadow-xl"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel>Organizations</DropdownMenuLabel>
              {organizations && organizations.length > 0 ? (
              organizations.map((organization) => (
                <DropdownMenuItem
                  key={organization.id}
                  onClick={() => handleOrganizationChange(organization)}
                  className="gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  {organization.logo ? (
                    <img
                      src={organization.logo}
                      alt="Organization Logo"
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <div className="h-8 w-8 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded text-white">
                      {getInitials(organization.name)}
                    </div>
                  )}
                  <span>{organization.name}</span>
                </DropdownMenuItem>
              ))
            ) : (
                <DropdownMenuItem asChild>
                  <div
                    className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    onClick={openModal}
                  >
                    <Plus className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                    <span className="text-gray-800 dark:text-gray-300">
                      Add Your Organization
                    </span>
                  </div>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* Organization Modal */}
      <OrganizationModal
        isOpen={isOpen}
        onClose={closeModal}
      />
    </>
  );
}