export const baseClient = async (query: string) => {
  const results = await fetch(
    process.env.API_URL || "https://rickandmortyapi.com/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
      }),
    }
  );
  return (await results.json()).data;
};
