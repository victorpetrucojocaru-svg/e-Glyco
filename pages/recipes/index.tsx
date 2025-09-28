import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/supabaseClient";

type Recipe = {
  id: string;
  title_ro: string | null;
  category_slug: string | null;
  subcategory_slug: string | null;
  calories_per_serving: number | null;
  protein_grams: number | null;
  carbs_grams: number | null;
  fat_grams: number | null;
};

export default function Recipes() {
  const router = useRouter();
  const { category, subcategory } = router.query as {
    category?: string;
    subcategory?: string;
  };
  const [data, setData] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!category && !subcategory) return;
      setLoading(true);
      setErrorMsg(null);

      console.log("🔎 Pornesc query cu:", { category, subcategory });

      let query = supabase
        .from("recipes") // ✅ numele corect din Supabase
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (category) query = query.ilike("category_slug", category);
      if (subcategory) query = query.ilike("subcategory_slug", subcategory);

      const { data, error } = await query;

      if (error) {
        console.error("❌ Supabase error:", error);
        setErrorMsg(error.message);
      } else {
        console.log("✅ Supabase data:", data);
        setData(data as Recipe[]);
      }

      setLoading(false);
    };

    run();
  }, [category, subcategory]);

  return (
    <div className="container">
      <h1>
        Rețete {category ? `— ${category}` : ""}{" "}
        {subcategory ? ` / ${subcategory}` : ""}
      </h1>

      {loading && <p>Se încarcă...</p>}
      {errorMsg && (
        <p style={{ color: "red" }}>
          ❌ Eroare Supabase: {errorMsg}
        </p>
      )}
      {!loading && !errorMsg && data.length === 0 && (
        <p>Nu am găsit nicio rețetă.</p>
      )}

      {data.length > 0 && (
        <div className="grid">
          {data.map((r) => (
            <a key={r.id} className="card" href={`/recipes/${r.id}`}>
              <h3 style={{ margin: "0 0 8px 0" }}>
                {r.title_ro ?? "Fără titlu"}
              </h3>
              <div style={{ fontSize: ".9rem", color: "#666" }}>
                {r.calories_per_serving ?? "—"} kcal · P{" "}
                {r.protein_grams ?? "—"}g · C {r.carbs_grams ?? "—"}g · G{" "}
                {r.fat_grams ?? "—"}g
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
