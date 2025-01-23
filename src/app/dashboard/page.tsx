'use client';

import { useEffect, useState } from 'react';
import BreadcrumbsHeader from './(components)/breadcrumbs-header';
import NewTeam from './(components)/new-team';
import TeamSpacePage from './(components)/teamSpace';
import { useUser } from "@/providers/user-provider";
import { API_PATHS } from '../api/api-path/apiPath';
import { UserRole } from '@/types/user/user';
import { useOrganizationWorkspaceContext } from '@/providers/organization-workspace-provider';
import { toastService } from '../services/toast.service';
import StakeholderBpmnPage from './stakeholder-bpmn/page';

export default function DashBoardPage() {
  const user = useUser();  // Get user directly here
  const [hasOrganization, setHasOrganization] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { setCurrentOrganization } = useOrganizationWorkspaceContext();
  const breadcrumbTitle = user.role === UserRole.STAKEHOLDER ? '' : 'Playground';
 
  useEffect(() => {
    const invitationToken = localStorage.getItem('invitationToken');
    const requestBody = {
      invitationToken,
    };

    // If invitation token is present in local storage, decode the token and give access to the user
    if (invitationToken) {
      const acceptInvitation = async () => {
        const response = await fetch(API_PATHS.ACCEPT_INVITATION, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
        });
        const data = await response.json(); 
        if (data.success) {
          toastService.showDefault("You have successfully accepted the invitation.");
        }
      };
      
      // Remove the token from local storage
      acceptInvitation();
      localStorage.removeItem('invitationToken');
    }

    if (user && user.email) {
      const checkUserOrganization = async () => {
        try {
          const response = await fetch(`${API_PATHS.GET_ORGANIZATION}?userId=${user.id}`);
          const data = await response.json();
          if (data.organizations.length > 0) {
            setHasOrganization(true);
            setCurrentOrganization(data.organizations[0]);
          }
        } catch (error) {
          console.error("Error checking organization:", error);
        } finally {
          setLoading(false);
        }
      };

      checkUserOrganization();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div>Loading...</div> 
    );
  }


  return (
    <div>
      <BreadcrumbsHeader href='/dashboard' current={breadcrumbTitle} parent='/'/>
      {user.role !== UserRole.STAKEHOLDER && (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {hasOrganization ? (
            <TeamSpacePage />
          ) : (
            <NewTeam />
          )}
        </div>
      )}
      {user.role == UserRole.STAKEHOLDER && (
        <StakeholderBpmnPage />
      )}
    </div>
  );
}