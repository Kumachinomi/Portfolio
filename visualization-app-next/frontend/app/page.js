"use client";
import { useEffect, useState } from "react";
import claude from "../lib/claude";
import mermaidClient from "../lib/MermaidDiagramAPI";
import MermaidViewer from "@/components/MermaidViewer";
import DiagramModal from "@/components/DiagramModal";

export default function Home() {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedDiagrams, setSavedDiagrams] = useState([]);
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortOrder, setSortOrder] = useState("-created_at");

  const generate = async () => {
    setIsLoading(true);
    const messages = [
      {
        role: "user",
        content: `:今からの入力を状態遷移図で最大限詳細に表現してほしい\n${content}`,
      },
    ];
    const result = await claude.completion(messages);
    setResult(result);
    setIsLoading(false);
  };

  const generateEmoji = async () => {
    setIsLoading(true);
    const updatedContent = `${content}\n絵文字を適切に配置`;
    setContent(updatedContent);

    const messages = [
      {
        role: "user",
        content: `:今からの入力を状態遷移図で最大限詳細に表現してほしい\n${updatedContent}`,
      },
    ];
    const result = await claude.completion(messages);
    setResult(result);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    setIsSaving(true);
    try {
      await mermaidClient.saveDiagram(title, result);
      handleGet();
      alert("保存しました");
      setTitle("");
    } catch (error) {
      console.error("保存に失敗:", error);
      alert("保存に失敗しました");
    } finally {
      setIsSaving(false);
    }
  };

  const handleGet = async () => {
    try {
      const params = {
        title: searchTitle,
        ordering: sortOrder,
      };
      const diagrams = await mermaidClient.getAllDiagrams(params);
      setSavedDiagrams(diagrams);
      console.log(diagrams);
    } catch (error) {
      console.error("図の取得に失敗:", error);
      alert("図の取得に失敗しました");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("本当にこの図を削除しますか？")) {
      try {
        await mermaidClient.deleteDiagram(id);
        // 削除後にリストを更新
        const updatedDiagrams = savedDiagrams.filter(
          (diagram) => diagram.id !== id
        );
        setSavedDiagrams(updatedDiagrams);
        alert("図を削除しました");
      } catch (error) {
        console.error("削除に失敗:", error);
        alert("削除に失敗しました");
      }
    }
  };

  useEffect(() => {
    handleGet();
  }, [searchTitle, sortOrder]);

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

        {result && (
          <div className="p-4">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="図のタイトルを入力"
              className="w-full p-2 mb-2 bg-gray-800 text-white border border-gray-700 rounded"
            />
            <button
              onClick={handleSave}
              disabled={isLoading || !content.trim()}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "保存中..." : "保存する"}
            </button>

            <button
              onClick={generateEmoji}
              disabled={isLoading || !content.trim()}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "生成中..." : "絵文字をつける"}
            </button>
          </div>
        )}
      </header>
      <section
        className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden"
        style={{ height: "90vh", marginBottom: "20px" }}
      >
        <div className="flex flex-col w-1/3 h-full bg-gray-900 overflow-y-auto">
          <div className="flex-1 p-4 text-white">
            <textarea
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
              className="h-full w-full bg-transparent text-white resize-none outline-none"
            />
          </div>
          <button
            onClick={generate}
            disabled={isLoading || !content.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "生成中..." : "状態遷移図にする"}
          </button>
        </div>

        <div className="w-2/3 h-full overflow-hidden">
          <div className="flex flex-col h-full items-center justify-center max-w-full">
            <MermaidViewer content={result} diagramId="main-diagram" />
          </div>
        </div>
      </section>
      <section className="w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden mb-4">
          <div className="p-4 flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="タイトルで検索..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex-1">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="-created_at">新しい順</option>
                <option value="created_at">古い順</option>
                <option value="title">タイトル (あ-)</option>
                <option value="-title">タイトル (-ん)</option>
              </select>
            </div>
          </div>
        </section>

      <section className="flex w-full max-w-5xl bg-white rounded-lg shadow-xl overflow-hidden my-4">
        <div className="w-full p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">保存された図一覧</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedDiagrams.map((diagram, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(diagram.id);
                    }}
                    className="inline-block bg-slate-400 hover:bg-red-700 text-white py-2 px-6 rounded-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    削除
                  </button>
                </div>
                <h3 className="text-lg font-semibold mb-2">{diagram.title}</h3>
                <div
                  className="min-h-[200px] max-h-[400px] overflow-auto cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedDiagram(diagram)}
                >
                  <MermaidViewer
                    content={diagram.diagram_data}
                    diagramId={`saved-${diagram.id}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedDiagram && (
        <DiagramModal
          diagram={selectedDiagram}
          onClose={() => setSelectedDiagram(null)}
        />
      )}
    </div>
  );
}
