import { useState } from "react";
import { supabase } from "@lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState((router.query.mode as string) || "login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onMagic = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    setMessage(error ? error.message : "Ți-am trimis linkul pe email.");
  };

  const onPassword = async () => {
    setLoading(true);
    let res;
    if (mode === "signup") {
      res = await supabase.auth.signUp({ email, password });
    } else {
      res = await supabase.auth.signInWithPassword({ email, password });
    }
    setLoading(false);
    setMessage(res.error ? res.error.message : "Succes!");
    if (!res.error) router.push("/");
  };

  return (
    <div className="container" style={{maxWidth:480}}>
      <h1>{mode === "signup" ? "Înregistrare" : "Autentificare"}</h1>

      <div className="card" style={{display:"grid",gap:12}}>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required
            style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd"}}/>
        </label>

        <label>Parolă (opțional pentru magic link)
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password"
            style={{width:"100%",padding:10,borderRadius:8,border:"1px solid #ddd"}}/>
        </label>

        <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
          <button className="btn" onClick={onMagic} disabled={loading || !email}>Trimite magic link</button>
          <button className="btn" onClick={onPassword} disabled={loading || !email}>
            {mode === "signup" ? "Creează cont" : "Intră în cont"}
          </button>
        </div>
        <div style={{fontSize:".9rem",color:"#666"}}>
          {mode === "signup" ? "Ai deja cont?" : "Nu ai cont?"}{" "}
          <a href={mode === "signup" ? "/login" : "/login?mode=signup"}>
            {mode === "signup" ? "Autentifică-te" : "Înregistrează-te"}
          </a>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
