import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidViewer = ({ content, diagramId }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'arial',
      },
      htmlLabels: true,
      fit: true,
    });
  }, []);

  useEffect(() => {
    const container = document.getElementById(`mermaid-diagram-${diagramId}`);
    if (content && container) {
      container.innerHTML = '';
      
      try {
        const mermaidCode = content.match(/```mermaid\s*([\s\S]*?)\s*```/)?.[1] || '';
        
        if (mermaidCode) {
          mermaid.render(`mermaid-svg-${diagramId}`, mermaidCode, undefined, container).then(({ svg }) => {
            const modifiedSvg = svg.replace(
              '<svg ',
              '<svg width="100%" height="100%" style="margin: auto; display: block;" '
            );
            container.innerHTML = modifiedSvg;
          });
        }
      } catch (error) {
        container.innerHTML = '<div class="text-red-500">図の描画に失敗しました。もう一度別の文をお試しください。</div>';
      }
    }
  }, [content, diagramId]);

  return (
    <div id={`mermaid-diagram-${diagramId}`} className="w-full h-full overflow-auto" />
  );
};

export default MermaidViewer;