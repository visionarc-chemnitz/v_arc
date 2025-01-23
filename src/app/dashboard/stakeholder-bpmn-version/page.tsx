"use client";

import { useEffect, useState, DragEvent } from 'react';
import BreadcrumbsHeader from '../(components)/breadcrumbs-header';
import BpmnModelerComponent from '../text2bpmn/(components)/bpmn-modeler-component';
import { AlertCircle, Image as ImageIcon, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { API_PATHS } from '@/app/api/api-path/apiPath';
import BpmnCommentComponent from '../text2bpmn/(components)/bpmn-comment-component';
import { useSearchParams } from 'next/navigation';
// import BpmnCommentComponent from '../text2bpmn/(components)/bpmn-comment-component';

export default function StakeholderBpmnVersion() {
  const [loading, setLoading] = useState<boolean>(false);
  const [xml, setXml] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const bpmnVersionId = searchParams.get('bpmnVersionId');

  // Get bpmn version
  useEffect(() => {
    const fetchBpmnVersion = async () => {
      // Try to get bpmnversionid from localStorage
      if (bpmnVersionId) {
        // Fetch BPMN version
        const bpmnVersion = await fetch(`${API_PATHS.GET_BPMN_VERSION}?bpmnVersionId=${bpmnVersionId}`);
        if (!bpmnVersion) {
          throw new Error("Failed to fetch projects");
        }
        const bpmnVersionData = await bpmnVersion.json();
        if (bpmnVersionData.bpmnVersion?.xml) {
          setXml(bpmnVersionData.bpmnVersion.xml);
        }
      }
    };

    fetchBpmnVersion();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <BreadcrumbsHeader href='/dashboard' current='Stakeholder' parent='Playground'/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {xml && (
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300">
              <div className="h-[calc(100vh-24rem)] md:h-[800px]">
                <BpmnCommentComponent
                  containerId="bpmn-modeler"
                  diagramXML={xml}
                  onError={(error: Error) => setError(error.message)}
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
