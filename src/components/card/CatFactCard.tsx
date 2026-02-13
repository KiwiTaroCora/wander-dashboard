import { useEffect, useState } from "react";

type CatFactResponse = {
  fact: string;
  length: number;
};

export function CatFactCard() {
  const [data, setData] = useState<CatFactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://catfact.ninja/fact", {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = (await res.json()) as CatFactResponse;
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Cat Fact</h3>
        <button className="text-sm underline" onClick={load} disabled={loading}>
          {loading ? "…" : "Neu"}
        </button>
      </div>

      {error && <p className="text-sm">Fehler: {error}</p>}
      {!error && !data && <p className="text-sm">Lade…</p>}

      {data && (
        <>
          <p className="text-base">{data.fact}</p>
          <p className="mt-2 text-xs opacity-70">Länge: {data.length}</p>
        </>
      )}
    </div>
  );
}