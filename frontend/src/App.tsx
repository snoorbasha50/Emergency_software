import { useState } from "react";
import { researchApi } from "./api";
import type { Startup } from "./types";


import StartupCard from "./components/StartupCard";
import MemoModal from "./components/MemoModal";

export default function App() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Startup[]>([]);
  const [selected, setSelected] = useState<Startup | null>(null);

  async function handleResearch() {
  if (!topic.trim()) return;

  try {
    setLoading(true);

    const res = await researchApi.analyze(topic);

    console.log("FULL AXIOS RESPONSE");
    console.log(res);

    console.log("DATA");
    console.log(res.data);

    console.log("COMPANIES");
    console.log(res.data.companies);

    setResults(res.data.companies);

  } catch (err: any) {

    console.log("ERROR");
    console.log(err);

    console.log("MESSAGE");
    console.log(err.message);

    console.log("CODE");
    console.log(err.code);

    console.log("RESPONSE");
    console.log(err.response);

    console.log("REQUEST");
    console.log(err.request);

    alert(err.message);

  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-14">

        <h1 className="text-5xl font-bold">
          🚀 Startup Research Pipeline
        </h1>

        <p className="mt-3 text-gray-400 text-lg">
          Discover, analyze and rank startups using
          Firecrawl + Gemini AI
        </p>

        <div className="mt-10 flex gap-4">

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Example: AI Agents for Fintech"
            className="flex-1 rounded-xl bg-zinc-900 border border-zinc-700 px-5 py-4 outline-none"
          />

          <button
            onClick={handleResearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

        </div>

        {loading && (
          <div className="mt-8 text-blue-400 text-lg">
            🔍 Searching startups and generating investment memos...
          </div>
        )}

        {results.length > 0 && (
          <>
            <h2 className="text-3xl font-bold mt-14 mb-8">
              Startup Rankings
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {results.map((startup) => (
                <StartupCard
                  key={startup.company}
                  startup={startup}
                  onView={setSelected}
                />
              ))}

            </div>
          </>
        )}

      </div>

      <MemoModal
        startup={selected}
        onClose={() => setSelected(null)}
      />

    </div>
  );
}