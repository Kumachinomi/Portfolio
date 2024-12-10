import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const MermaidViewer = ({ content, diagramId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
      themeVariables: {
        fontFamily: "arial",
      },
      htmlLabels: true,
      fit: true,
      // cytoscapeの依存関係を無効化
      mindmap: {
        useMaxWidth: true,
        enableCytoscape: false
      }
    });
  }, []);

  const renderDiagram = async () => {
    if (!content || !containerRef.current) return;

    try {
      containerRef.current.innerHTML = "";
      const mermaidCode =
        content.match(/```mermaid\s*([\s\S]*?)\s*```/)?.[1] || "";

      if (mermaidCode) {
        // レンダリング前に少し待機
        await new Promise((resolve) => setTimeout(resolve, 100));

        const { svg } = await mermaid.render(
          `mermaid-svg-${diagramId}`,
          mermaidCode,
          undefined,
          containerRef.current
        );

        const modifiedSvg = svg.replace(
          "<svg ",
          '<svg width="100%" height="100%" style="margin: auto; display: block;" '
        );
        containerRef.current.innerHTML = modifiedSvg;
      }
    } catch (error) {
      console.error("Mermaid rendering error:", error);
      containerRef.current.innerHTML =
        '<div class="text-red-500">図の描画に失敗しました。もう一度別の文をお試しください。</div>';
    }
  };

  useEffect(() => {
    renderDiagram();
  }, [content, diagramId]);

  return <div ref={containerRef} className="w-full h-full overflow-auto" />;
};

export default MermaidViewer;
