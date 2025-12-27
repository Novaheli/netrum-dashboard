const BASE_URL = "https://node.netrumlabs.dev";

const output = document.getElementById("output");
const countdownEl = document.getElementById("countdown");
const button = document.getElementById("loadNodeBtn");

let canFetch = true;

/**
 * Start 30s cooldown to respect rate limit
 */
function startCooldown() {
  canFetch = false;
  let time = 30;

  countdownEl.textContent = `Refresh available in ${time}s`;

  const timer = setInterval(() => {
    time--;
    countdownEl.textContent = `Refresh available in ${time}s`;

    if (time <= 0) {
      clearInterval(timer);
      countdownEl.textContent = "You can refresh now";
      canFetch = true;
    }
  }, 1000);
}

/**
 * Fetch Lite node info by node_id
 * Correct endpoint for Lite Node
 */
async function fetchNode(nodeId) {
  if (!canFetch) {
    alert("Please wait for cooldown");
    return;
  }

  startCooldown();

  try {
    const res = await fetch(
      `${BASE_URL}/lite/nodes/id/${nodeId}`
    );

    if (!res.ok) {
      output.textContent = "Node not found or API error";
      return;
    }

    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "Network error";
  }
}

/**
 * Button click handler
 */
button.onclick = () => {
  const nodeId = document.getElementById("nodeIdInput").value.trim();

  if (!nodeId) {
    alert("Please enter node_id");
    return;
  }

  fetchNode(nodeId);
};
