import React from 'react';
import MermaidViewer from '@/components/MermaidViewer';

const DiagramModal = ({ diagram, onClose }) => {
  if (!diagram) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">{diagram.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="p-4 h-[80vh]">
          <MermaidViewer 
            content={diagram.diagram_data} 
            diagramId={`modal-${diagram.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default DiagramModal;





        



