const BASE_URL = "https://node.netrumlabs.dev";

const output = document.getElementById("output");
const button = document.getElementById("loadNodeBtn");

let canFetch = true;

function startCooldown() {
  canFetch = false;
  let time = 30;

  const timer = setInterval(() => {
    document.getElementById("countdown").textContent =
      `Refresh available in ${time}s`;
    time--;

    if (time < 0) {
      clearInterval(timer);
      document.getElementById("countdown").textContent =
        "You can refresh now";
      canFetch = true;
    }
  }, 1000);
}

async function fetchNodeStatus(nodeId) {
  if (!canFetch) {
    alert("Please wait for cooldown");
    return;
  }

  startCooldown();

  const res = await fetch(
    `${BASE_URL}/metrics/node-status/${nodeId}`
  );

  if (!res.ok) {
    output.textContent = "Node not found or API error";
    return;
  }

  const data = await res.json();
  output.textContent = JSON.stringify(data, null, 2);
}

button.onclick = () => {
  const nodeId = document.getElementById("nodeIdInput").value;
  if (!nodeId) {
    alert("Please enter node_id");
    return;
  }
  fetchNodeStatus(nodeId);
};
