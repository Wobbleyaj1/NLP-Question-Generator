export async function fetchWithRetry(
  url,
  options,
  retries = 5,
  delay = 4000,
  setStatus = () => {}
) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Server error");
      return await res.json();
    } catch (err) {
      if (i < retries - 1) {
        setStatus("Waking up server, please wait...");
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw err;
      }
    }
  }
}
