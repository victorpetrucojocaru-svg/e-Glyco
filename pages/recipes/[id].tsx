import type { GetServerSideProps } from "next";
import { supabase } from "@lib/supabaseClient";

type Ingredient = { id: string; nume: string; cantitate: string | null; rețetă_id: string };
type Step = { id: string; nr_pasă: number; text_ro: string | null; rețetă_id: string };
type Recipe = {
  id: string;
  title_ro: string | null;
  description_ro: string | null;
  category_slug: string | null;
  subcategorie_slug: string | null;
  calories_per_serving: number | null;
  protein_grams: number | null;
  carbs_grams: number | null;
  fat_grams: number | null;
  fiber_grams: number | null;
};

export default function RecipePage({
  recipe,
  ingredients,
  steps,
}: {
  recipe: Recipe | null;
  ingredients: Ingredient[];
  steps: Step[];
}) {
  if (!recipe)
    return (
      <div className="container">
        <p>Rețetă negăsită.</p>
      </div>
    );

  return (
    <div className="container">
      <h1>{recipe.title_ro}</h1>
      {recipe.description_ro && <p>{recipe.description_ro}</p>}
      <div
        className="card"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 16,
        }}
      >
        <div>
          <h3>Valori nutriționale</h3>
          <ul>
            <li>Calorii: {recipe.calories_per_serving ?? "—"}</li>
            <li>Proteine: {recipe.protein_grams ?? "—"} g</li>
            <li>Carbohidrați: {recipe.carbs_grams ?? "—"} g</li>
            <li>Grăsimi: {recipe.fat_grams ?? "—"} g</li>
            <li>Fibre: {recipe.fiber_grams ?? "—"} g</li>
          </ul>
        </div>
        <div>
          <h3>Ingrediente</h3>
          <ul>
            {ingredients.map((i) => (
              <li key={i.id}>
                {i.nume} — {i.cantitate ?? ""}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Pași</h3>
          <ol>
            {steps
              .sort((a, b) => a.nr_pasă - b.nr_pasă)
              .map((s) => (
                <li key={s.id}>{s.text_ro}</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;

  const { data: recipe } = await supabase
    .from("rețete") // 🔹 tabelele cu diacritice
    .select("*")
    .eq("id", id)
    .single();

  const { data: ingredients } = await supabase
    .from("ingrediente_rețetă") // 🔹 tabelele cu diacritice
    .select("*")
    .eq("rețetă_id", id);

  const { data: steps } = await supabase
    .from("pași_rețetă") // 🔹 tabelele cu diacritice
    .select("*")
    .eq("rețetă_id", id);

  return {
    props: {
      recipe,
      ingredients: ingredients ?? [],
      steps: steps ?? [],
    },
  };
};
