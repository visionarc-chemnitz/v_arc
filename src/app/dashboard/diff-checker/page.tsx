"use client";

import React, { useState, useRef } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { BpmnViewerComponent } from '../text2bpmn/(components)/bpmn-viewer-component';
import BreadcrumbsHeader from '../(components)/breadcrumbs-header';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
} from "@/components/ui/drawer";
import { diff } from 'bpmn-js-differ';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';
import type { BpmnViewerRef } from '@/types/board/board-types';

interface ProcessedDiff {
  type: string;
  elementId: string;
  elementType: string;
  changes?: any;
}

interface BpmnDiff {
  _changed: {
    [key: string]: {
      model: { $type: string; id: string };
      attrs: { [key: string]: { oldValue: string; newValue: string } };
    };
  };
  _added: { [key: string]: { $type: string; id: string } };
  _removed: { [key: string]: { $type: string; id: string } };
  _layoutChanged: { [key: string]: { $type: string; id: string } };
}

export default function DiffCheckerPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [difference, setDiff] = useState(null);

  const modeler1Ref = useRef<BpmnViewerRef>(null);
  const modeler2Ref = useRef<BpmnViewerRef>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const compareDiagrams = async (originalXml: string, changedXml: string) => {
    if (!originalXml || !changedXml) {
      throw new Error('Both original and changed XML are required');
    }

    try {
      const viewer1 = new BpmnViewer();
      const viewer2 = new BpmnViewer();

      // Import XMLs and wait for both to complete
      const [importResult1, importResult2] = await Promise.all([
        viewer1.importXML(originalXml),
        viewer2.importXML(changedXml)
      ]);

      if (importResult1.warnings.length || importResult2.warnings.length) {
        console.warn('Import warnings:', {
          original: importResult1.warnings,
          changed: importResult2.warnings
        });
      }

      // Get the root elements
      const definitions1 = viewer1.getDefinitions();
      const definitions2 = viewer2.getDefinitions();

      // Perform diff using bpmn-js-differ
      const difference = diff(definitions1, definitions2);
      console.log('Difference:', difference);
      // Cleanup
      viewer1.destroy();
      viewer2.destroy();

      return difference;
    } catch (error) {
      console.error('Error in diagram comparison:', error);
      throw error;
    }
  };

  const handleCompareDiagrams = async () => {
    try {
      if (!modeler1Ref.current || !modeler2Ref.current) {
        console.error('Both modeler references are required for comparison');
        return;
      }

      const xml1 = await modeler1Ref.current.exportXML();
      const xml2 = await modeler2Ref.current.exportXML();

      if (!xml1 || !xml2) {
        console.error('Both XML1 and XML2 are required for comparison');
        return;
      }

      const differences = await compareDiagrams(xml1, xml2);
      setDiff(differences);
      console.table(extractChanges(differences));
      addOverlays(differences);
    } catch (error) {
      console.error('Error comparing diagrams:', error);
    }
  };

  const extractChanges = (differences: any) => {
    const result: { id: string; type: string; name?: string; change: string }[] = [];
  
    // Handle _changed
    for (const key in differences._changed) {
      const { model, attrs } = differences._changed[key];
      result.push({
        id: key,
        type: model.$type,
        name: attrs.name ? attrs.name.newValue : undefined,
        change: 'changed',
      });
    }
  
    // Handle _removed
    for (const key in differences._removed) {
      const { $type } = differences._removed[key];
      result.push({
        id: key,
        type: $type,
        name: undefined,
        change: 'removed',
      });
    }
  
    // Handle _layoutChanged
    for (const key in differences._layoutChanged) {
      const { $type } = differences._layoutChanged[key];
      result.push({
        id: key,
        type: $type,
        name: undefined,
        change: 'layoutChanged',
      });
    }
  
    // Handle _added
    for (const key in differences._added) {
      const { $type } = differences._added[key];
      result.push({
        id: key,
        type: $type,
        name: undefined,
        change: 'added',
      });
    }
  
    return result;
  };

  const processDifferences = (differences: BpmnDiff) => {
    const result: { type: string; elementId: string; elementType: string; changes?: any }[] = [];
  
    // Process added elements
    Object.entries(differences._added).forEach(([id, details]) => {
      result.push({
        type: 'element-added',
        elementId: id,
        elementType: details.$type
      });
    });
  
    // Process removed elements
    Object.entries(differences._removed).forEach(([id, details]) => {
      result.push({
        type: 'element-removed',
        elementId: id,
        elementType: details.$type
      });
    });
  
    // Process changed elements
    Object.entries(differences._changed).forEach(([id, details]) => {
      result.push({
        type: 'element-modified',
        elementId: id,
        elementType: details.model.$type,
        changes: details.attrs
      });
    });
  
    // Process layout changes
    Object.entries(differences._layoutChanged).forEach(([id, details]) => {
      result.push({
        type: 'layout-changed',
        elementId: id,
        elementType: details.$type
      });
    });
  
    return result;
  };
  
  const generateOverlayHtml = (diff: ProcessedDiff) => {
    const markerDiv = document.createElement('div');
    markerDiv.className = 'marker-container';
  
    const getMarkerContent = (type: string) => {
      switch (type) {
        case 'element-removed':
          return '<span class="marker marker-removed">&minus;</span>';
        case 'element-added':
          return '<span class="marker marker-added">&#43;</span>';
        case 'layout-changed':
          return '<span class="marker marker-layout-changed">&#8680;</span>';
        default:
          return '<span class="marker marker-changed">&#9998;</span>';
      }
    };
  
    markerDiv.innerHTML = getMarkerContent(diff.type);
    markerDiv.style.position = 'absolute';
    markerDiv.style.top = '-10px';
    markerDiv.style.right = '-10px';
    markerDiv.style.zIndex = '100';
    
    return markerDiv;
  };

  const addOverlays = async (differences: BpmnDiff) => {
    if (!modeler1Ref.current || !modeler2Ref.current) return;
    clearOverlays();
    const processedDiffs = processDifferences(differences);
  
    // Create temporary containers
    const container1 = document.createElement('div');
    const container2 = document.createElement('div');
    document.body.appendChild(container1);
    document.body.appendChild(container2);
  
    // Initialize viewers with containers
    const viewer1 = new BpmnViewer({ container: container1 });
    const viewer2 = new BpmnViewer({ container: container2 });
  
    try {
      const xml1 = await modeler1Ref.current.exportXML();
      const xml2 = await modeler2Ref.current.exportXML();
  
      // Import XMLs and wait for completion
      await Promise.all([
        viewer1.importXML(xml1),
        viewer2.importXML(xml2)
      ]);
  
      const registry1 = viewer1.get('elementRegistry') as any;
      const registry2 = viewer2.get('elementRegistry') as any;
  
      processedDiffs.forEach((diff) => {
        let shape;
        let overlayHtml;
        
        if (diff.type === 'element-added') {
          shape = registry2.get(diff.elementId);
          if (shape) {
            overlayHtml = generateOverlayHtml(diff);
            modeler2Ref.current?.addOverlay(diff.elementId, overlayHtml);
          }
        } else if (diff.type === 'element-removed') {
          shape = registry1.get(diff.elementId);
          if (shape) {
            overlayHtml = generateOverlayHtml(diff);
            modeler1Ref.current?.addOverlay(diff.elementId, overlayHtml);
          }
        } else if (diff.type === 'layout-changed') {
          shape = registry1.get(diff.elementId);
          if (shape) {
            overlayHtml = generateOverlayHtml(diff);
            modeler1Ref.current?.addOverlay(diff.elementId, overlayHtml);
          }
        } else {
          shape = registry1.get(diff.elementId);
          if (shape) {
            overlayHtml = generateOverlayHtml(diff);
            modeler2Ref.current?.addOverlay(diff.elementId, overlayHtml);
          }
        }
      });
    } catch (error) {
      console.error('Error processing overlays:', error);
    } finally {
      // Cleanup
      viewer1.destroy();
      viewer2.destroy();
      container1.remove();
      container2.remove();
    }
  };

  const clearOverlays = () => {
    try {
      modeler1Ref.current?.clearOverlay()
      modeler2Ref.current?.clearOverlay()
    } catch (error) {
      console.error('Failed to clear overlays:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <BreadcrumbsHeader href='/dashboard' current='Diff-Checker' parent='Playground' />
      <div className="flex flex-1">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <div className="flex-1 rounded-xl bg-muted/50" style={{ height: '100%' }}>
              <BpmnViewerComponent
                ref={modeler1Ref}
                containerId="bpmn-container-1"
                diagramXML=""
                onError={(err) => console.error(err)}
                onImport={() => console.log('Imported successfully')}
                height="100%"
                width="100%"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex-1 rounded-xl bg-muted/50" style={{ height: '100%' }}>
              <BpmnViewerComponent
                ref={modeler2Ref}
                containerId="bpmn-container-2"
                diagramXML=""
                onError={(err) => console.error(err)}
                onImport={() => console.log('Imported successfully')}
                height="100%"
                width="100%"
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <footer className="p-2 bg-gray-100 dark:bg-gray-800" style={{ maxWidth: 'var(--sidebar-footer-width)' }}>
        <button
          onClick={toggleDrawer}
          className="m-2 p-1 bg-primary text-white rounded-md text-sm"
        >
          {isDrawerOpen ? 'Close Panel' : 'Open Panel'}
        </button>
        <button
          onClick={handleCompareDiagrams}
          className="m-2 p-1 bg-secondary text-white rounded-md text-sm"
        >
          Compare Changes
        </button>
        <button
          onClick={clearOverlays}
          className="m-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
        >
          Clear Overlays
        </button>
      </footer>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <DrawerContent className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 overflow-y-auto" style={{ maxHeight: '50vh', maxWidth: 'calc(100% - var(--sidebar-width))' }}>
          <h2 className="text-lg font-semibold">Expandable Panel</h2>
          <p>This is the content of the expandable panel.</p>
          <DrawerClose onClick={toggleDrawer} className="mt-4 p-2 bg-primary text-white rounded-md">
            Close
          </DrawerClose>
          {difference && (
            <div>
              <h3 className="text-md font-semibold">Differences:</h3>
              <pre>{JSON.stringify(extractChanges(difference), null, 2)}</pre>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}