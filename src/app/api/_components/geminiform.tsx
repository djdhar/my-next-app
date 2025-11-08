'use client'

import { useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import 'highlight.js/styles/github.css' // optional syntax highlighting theme

export default function GeminiForm() {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setAnswer(null)

    if (!prompt.trim()) {
      setError("Ask some question first!")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data?.error ?? "Request failed")
      } else {
        const text = data?.answer ?? JSON.stringify(data?.raw ?? data)
        setAnswer(text)
      }
    } catch {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl p-6 bg-white rounded shadow">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="font-medium">Ask AI</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          className="w-full rounded border px-3 py-2"
          placeholder="Ask anything to AI..."
        />

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
          <button
            type="button"
            className="text-sm text-gray-600 underline"
            onClick={() => { setPrompt(""); setAnswer(null); setError(null) }}
          >
            Clear
          </button>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        {answer && (
          <div>
                <div className="prose prose-sm max-w-none font-serif text-gray-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                    {answer}
                </ReactMarkdown>
                </div>
          </div>
        )}
      </form>
    </div>
  )
}
