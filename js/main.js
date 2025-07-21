function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.getElementById("darkMode").addEventListener("change", e => {
  document.body.classList.toggle("dark", e.target.checked);
});

const csv = [["Time", "Location", "Temp", "Humidity", "N", "P", "K", "pH", "Lat", "Long"]];

function generateData(loc) {
  return {
    location: loc,
    temp: +(25 + Math.random() * 10).toFixed(1),
    hum: +(40 + Math.random() * 20).toFixed(1),
    N: Math.floor(Math.random() * 50),
    P: Math.floor(Math.random() * 50),
    K: Math.floor(Math.random() * 50),
    ph: +(5.5 + Math.random() * 2).toFixed(1),
    lat: +(19 + Math.random()).toFixed(6),
    long: +(73 + Math.random()).toFixed(6)
  };
}

function updateReadingCard(loc, data) {
  const card = document.querySelector(`.loc${loc}`);
  card.innerHTML = `
    <h2>Location ${loc}</h2>
    <p>Temp: ${data.temp} °C</p>
    <p>Humidity: ${data.hum} %</p>
    <p>N: ${data.N}</p>
    <p>P: ${data.P}</p>
    <p>K: ${data.K}</p>
    <p>pH: ${data.ph}</p>
    <p>Lat: ${data.lat}</p>
    <p>Long: ${data.long}</p>
  `;
}

function updateSuggestion(loc, data) {
  const sug = document.querySelector(`.suggestion.loc${loc}`);
  sug.innerHTML = `<h3>Location ${loc} Suggestion</h3><p>Maintain pH near 6.5, NPK balanced.</p>`;
}

setInterval(() => {
  const t = new Date().toLocaleTimeString();
  for (let i = 1; i <= 4; i++) {
    const d = generateData(i);
    updateReadingCard(i, d);
    updateSuggestion(i, d);
    updateCharts(i - 1, t, d.temp, d.hum, d.ph);
    csv.push([t, "Location " + i, d.temp, d.hum, d.N, d.P, d.K, d.ph, d.lat, d.long]);
  }
}, 1500);

function downloadCSV() {
  const blob = new Blob([csv.map(r => r.join(",")).join("\n")], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "soil_data.csv";
  a.click();
}
