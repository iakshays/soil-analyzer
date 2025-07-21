// Setup for 4 separate real-time charts
const chartRefs = [1, 2, 3, 4].map(i => {
  const ctx = document.getElementById("chart" + i).getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        { label: "Temp", data: [], borderColor: "red", fill: false },
        { label: "Humidity", data: [], borderColor: "blue", fill: false },
        { label: "pH", data: [], borderColor: "orange", fill: false }
      ]
    },
    options: {
      responsive: true,
      animation: false,
      plugins: { legend: { labels: { color: "#fff" } } },
      scales: {
        x: { ticks: { color: "#ccc" } },
        y: { ticks: { color: "#ccc" } }
      }
    }
  });
});

function updateCharts(index, t, temp, hum, ph) {
  const chart = chartRefs[index];
  const d = chart.data;
  d.labels.push(t);
  d.datasets[0].data.push(temp);
  d.datasets[1].data.push(hum);
  d.datasets[2].data.push(ph);
  if (d.labels.length > 30) {
    d.labels.shift(); d.datasets.forEach(ds => ds.data.shift());
  }
  chart.update();
}
