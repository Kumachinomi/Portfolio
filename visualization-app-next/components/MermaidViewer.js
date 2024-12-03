import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const MermaidViewer = ({ content }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'arial',
      }
    });
  }, []);

  useEffect(() => {
    const container = document.getElementById("mermaidContainer");
    if (content) {
      document.getElementById('mermaid-diagram').innerHTML = '';
      
      try {
        const mermaidCode = content.match(/```mermaid\s*([\s\S]*?)\s*```/)?.[1] || '';
        
        if (mermaidCode) {
          mermaid.render('mermaid-svg', mermaidCode, undefined, container).then(({ svg }) => {
            document.getElementById('mermaid-diagram').innerHTML = svg;
          });
        }
      } catch (error) {
        document.getElementById('mermaid-diagram').innerHTML
         = '<div class="text-red-500">図の描画に失敗しました。もう一度別の文をお試しください。</div>';
      }
    }
  }, [content]);

  return (
    <div id="mermaidContainer">
      <div id="mermaid-diagram" className="w-full h-full overflow-auto p-4" />
    </div>
  );
};

export default MermaidViewer;