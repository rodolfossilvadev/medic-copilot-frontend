// Base da API (usa .env ou localhost como fallback)
const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "https://medico-copilot-backend.onrender.com";

// Função genérica para chamadas POST JSON
export async function postJson<TResponse, TBody>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`; // monta URL final

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // trata erros HTTP
  if (!response.ok) {
    let message = `Erro HTTP ${response.status}`;

    try {
      const data = (await response.json()) as { error?: string };
      if (data?.error) message = data.error; // erro customizado da API
    } catch (err) {
      console.error("Erro ao ler resposta:", err);
    }

    throw new Error(message);
  }

  // retorna a resposta tipada
  const data = (await response.json()) as TResponse;
  return data;
}

export { API_BASE_URL };
