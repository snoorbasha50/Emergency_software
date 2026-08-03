import type { Startup } from "../types";

interface Props {
  startup: Startup;
  onView: (startup: Startup) => void;
}

export default function StartupCard({
  startup,
  onView,
}: Props) {

  const color =
    startup.verdict === "TAKE A MEETING"
      ? "bg-green-500"
      : startup.verdict === "WATCH"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg hover:border-blue-500 transition">

      <div className="flex justify-between items-start">

        <div>

          <h3 className="text-2xl font-bold">
            {startup.company}
          </h3>

          <div
            className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold text-black ${color}`}
          >
            {startup.verdict}
          </div>

        </div>

        <div className="flex flex-col items-center">

          <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center">

            <span className="text-2xl font-bold">
              {startup.score}
            </span>

          </div>

          <span className="text-gray-400 text-sm mt-2">
            Score
          </span>

        </div>

      </div>

      <div className="mt-8">

        <button
          onClick={() => onView(startup)}
          className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold transition"
        >
          View Investment Memo
        </button>

      </div>

    </div>
  );
}