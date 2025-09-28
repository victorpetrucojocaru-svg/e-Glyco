import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/supabaseClient";

export default function RecipesDebug() {
  const router = useRouter();
  const { category, subcategory } = router.query as {
    category?: string;
    subcategory?: string;
  };

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!category && !subcategory) return;
      setLoading(true);

      let query = supabase
        .from("recipes") // numele corect al tabelului
        .select("*")
        .limit(50);

      if (category) query = query.ilike("category_slug", `%${category}%`);
      if (subcategory) query = query.ilike("subcategory_slug", `%${subcategory}%`);

      const { data, error } = await query;

      if (error) {
        console.error("Supabase error:", error);
        setError(error.message);
      } else {
        console.log("Supabase data:", data);
        setData(data ?? []);
      }

      setLoading(false);
    };

    run();
  }, [category, subcategory]);

  return (
    <div className="container">
      <h1>
        Debug Rețete {category ? `— ${category}` : ""}{" "}
        {subcategory ? ` / ${subcategory}` : ""}
      </h1>

      {loading && <p>Se încarcă...</p>}
      {error && <p style={{ color: "red" }}>Eroare: {error}</p>}

      <pre style={{ background: "#f4f4f4", padding: "10px", borderRadius: "5px" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
