import type { GetServerSideProps } from "next";
import { supabase } from "@lib/supabaseClient";

type Ingredient = { id: string; name: string; quantity: string | null };
type Step = { id: string; step_no: number; text_ro: string | null };
type Recipe = {
  id: string;
  title_ro: string | null;
  description_ro: string | null;
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
  recipe: Recipe;
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
          <h3>Valori</h3>
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
                {i.name} — {i.quantity ?? ""}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Pași</h3>
          <ol>
            {steps
              .sort((a, b) => a.step_no - b.step_no)
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
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  const { data: ingredients } = await supabase
    .from("recipe_ingredients")
    .select("*")
    .eq("recipe_id", id);

  const { data: steps } = await supabase
    .from("recipe_steps")
    .select("*")
    .eq("recipe_id", id);

  return {
    props: {
      recipe,
      ingredients: ingredients ?? [],
      steps: steps ?? [],
    },
  };
};
