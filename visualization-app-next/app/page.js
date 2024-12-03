'use client';
import { useState } from "react";
import claude from "../lib/claude";
import MermaidViewer from "@/components/MermaidViewer";
import { Link as Scroll} from 'react-scroll'

export default function Home() {
  const [content,setContent] = useState('');
  const [result,setResult] = useState('');
  const [isLoading,setIsLoading] = useState(false);
    
  

  const review = async () => {
    setIsLoading(true)
    const messages = [
      {
        role: 'user',
        content: `:今からの入力を状態遷移図で最大限詳細に表現してほしい\n${content}`,
      }
    ];
    const result = await claude.completion(messages);
    setResult(result);
    setIsLoading(false);
  }
  return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center">
      <header className="flex w-full max-w-5xl justify-between items-center py-4 px-6">
      <h1 className="flex items-center text-3xl font-black tracking-tight">
        <span className="relative">
          <span className="absolute -inset-1 bg-indigo-50 rounded-lg transform -skew-y-3"></span>
          <span className="relative text-blue-900">可視化</span>
        </span>
        <span className="relative ml-2">
          <span className="relative text-indigo-600">できーる</span>
          <span className="absolute bottom-8 left-0 w-full h-2 bg-indigo-200 transform -skew-x-6"></span>
        </span>
      </h1>
        <span className="relative text-blue-900">
          <Scroll to="concept" smooth={true} duration={600} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
           dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">下にスクロール</Scroll>
        </span>
      </header>
      <section className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden"  style={{ height: '90vh', marginBottom: '20px' }}>
        <div className="flex flex-col w-1/3 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea 
            onChange={(e) =>{
              setContent(e.target.value)
            }}
            disabled={isLoading}
            className="h-full w-full bg-transparent text-white resize-none outline-none" />
            
          </div>
          <button 
           onClick={review}
           disabled={isLoading || !content.trim}
           className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? '生成中...' : '状態遷移図にする'}
          </button>
        </div>
          <nav>
            <div className="flex flex-col w-2/3 h-full items-center justify-center">
              <MermaidViewer content={result} />
            </div>
          </nav>
      </section>

      <section id="concept" className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden"  style={{ height: '20vh' }} >
        <div className="space-y-4">
        </div>
      
      </section>
      

    </div>
  );
}