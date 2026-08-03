import ReactMarkdown from "react-markdown";
import type { Startup } from "../types";

interface Props {
  startup: Startup | null;
  onClose: () => void;
}

export default function MemoModal({
  startup,
  onClose,
}: Props) {
  if (!startup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-6">

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center border-b border-zinc-700 p-6">

          <div>

            <h2 className="text-3xl font-bold">
              {startup.company}
            </h2>

            <div className="flex gap-4 mt-3">

              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
                Score: {startup.score}/100
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  startup.verdict === "TAKE A MEETING"
                    ? "bg-green-600"
                    : startup.verdict === "WATCH"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-600"
                }`}
              >
                {startup.verdict}
              </span>

            </div>

          </div>

          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
          >
            Close
          </button>

        </div>

        {/* Body */}

        <div className="overflow-y-auto p-8 max-h-[75vh]">

          <article className="prose prose-invert max-w-none">

            <ReactMarkdown>
              {startup.memo}
            </ReactMarkdown>

          </article>

        </div>

      </div>

    </div>
  );
}