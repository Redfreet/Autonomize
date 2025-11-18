const query = document.getElementById("query");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
  fetchActivity();
});

query.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    fetchActivity();
  }
});

async function fetchActivity() {
  const text = query.value.trim();

  if (!text) {
    result.innerHTML = "Please type.";
    result.classList.remove("hidden");
    result.classList.add("error");
    return;
  }

  //results hidden
  result.classList.add("hidden");
  result.classList.remove("error");

  try {
    const res = await fetch(`/api/activity?q=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch activity.");
    }

    result.innerHTML = data.response;
    result.classList.remove("hidden");
  } catch (err) {
    result.innerHTML = `${err.message}`;
    result.classList.remove("hidden");
    result.classList.add("error");
  }
}
