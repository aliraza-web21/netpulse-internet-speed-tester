const startButton = document.getElementById("start-btn");
const buttonText = document.getElementById("button-text");
const buttonIcon = document.getElementById("button-icon");
const mainSpeed = document.getElementById("main-speed");
const speedCaption = document.getElementById("speed-caption");
const gauge = document.getElementById("gauge");
const gaugeIcon = document.getElementById("gauge-icon");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const stateLabel = document.getElementById("state-label");
const pingValue = document.getElementById("ping-value");
const downloadValue = document.getElementById("download-value");
const uploadValue = document.getElementById("upload-value");
const notice = document.getElementById("notice");

const TEST_FILE_URL = "https://speed.cloudflare.com/__down?bytes=10000000";
const UPLOAD_TEST_URL = "https://speed.cloudflare.com/__up";

function setProgress(percent, message) {
  progressBar.style.width = `${percent}%`;
  progressText.textContent = message;
}

function setState(message, testing = false) {
  stateLabel.innerHTML = `<span class="mini-dot"></span> ${message}`;
  stateLabel.classList.toggle("testing", testing);
}

function showGauge(value, caption, icon = "↯") {
  mainSpeed.textContent = value;
  speedCaption.textContent = caption;
  gaugeIcon.textContent = icon;
  const numeric = Number.parseFloat(value);
  const degrees = Number.isFinite(numeric) ? Math.min(270, Math.max(0, numeric * 2.7)) : 0;
  gauge.style.setProperty("--progress", `${degrees}deg`);
}

async function measurePing(samples = 5) {
  const times = [];
  for (let i = 0; i < samples; i++) {
    const start = performance.now();
    const response = await fetch(`https://speed.cloudflare.com/__down?bytes=0&cacheBust=${Date.now()}-${i}`, {
      cache: "no-store",
      mode: "cors"
    });
    if (!response.ok) throw new Error("Ping request failed.");
    await response.arrayBuffer();
    times.push(performance.now() - start);
  }
  times.sort((a, b) => a - b);
  return times[Math.floor(times.length / 2)];
}

async function measureDownload() {
  const start = performance.now();
  const response = await fetch(`${TEST_FILE_URL}&cacheBust=${Date.now()}`, {
    cache: "no-store",
    mode: "cors"
  });
  if (!response.ok) throw new Error("Download test failed.");
  const data = await response.arrayBuffer();
  const seconds = (performance.now() - start) / 1000;
  if (seconds <= 0) throw new Error("Download test took too little time to measure.");
  return (data.byteLength * 8) / seconds / 1_000_000;
}

async function measureUpload() {
  // A 2 MB test payload; server must allow CORS and accept POST requests.
  const payload = new Blob([new Uint8Array(2 * 1024 * 1024)]);
  const start = performance.now();
  const response = await fetch(`${UPLOAD_TEST_URL}?cacheBust=${Date.now()}`, {
    method: "POST",
    body: payload,
    cache: "no-store",
    mode: "cors"
  });
  if (!response.ok) throw new Error("Upload test failed.");
  await response.arrayBuffer().catch(() => new ArrayBuffer(0));
  const seconds = (performance.now() - start) / 1000;
  if (seconds <= 0) throw new Error("Upload test took too little time to measure.");
  return (payload.size * 8) / seconds / 1_000_000;
}

function displayMbps(value) {
  return value < 10 ? value.toFixed(2) : value.toFixed(1);
}

async function runTest() {
  startButton.disabled = true;
  buttonText.textContent = "Testing connection…";
  buttonIcon.textContent = "↻";
  pingValue.textContent = "—";
  downloadValue.textContent = "—";
  uploadValue.textContent = "—";
  notice.innerHTML = '<span class="notice-symbol">i</span><span>Testing in progress. Please keep this tab open until the test finishes.</span>';
  setState("Testing connection", true);
  setProgress(5, "Preparing your test…");
  showGauge("—", "Getting ready", "↯");

  try {
    setProgress(15, "Measuring server response time…");
    const ping = await measurePing();
    pingValue.textContent = Math.round(ping);
    setProgress(35, "Testing download speed…");
    showGauge("…", "Measuring download", "↓");

    const download = await measureDownload();
    downloadValue.textContent = displayMbps(download);
    showGauge(displayMbps(download), "Download speed", "↓");

    setProgress(70, "Testing upload speed…");
    showGauge("…", "Measuring upload", "↑");
    const upload = await measureUpload();
    uploadValue.textContent = displayMbps(upload);
    showGauge(displayMbps(download), "Download speed", "↓");

    setProgress(100, "Test complete.");
    setState("Test complete");
    notice.innerHTML = '<span class="notice-symbol">i</span><span>These are approximate browser-based measurements. Your result may differ from your ISP plan or other speed-test services.</span>';
    speedCaption.textContent = "Download speed";
  } catch (error) {
    progressText.textContent="A request failed. Check your internet connection and try again."
    progressText.style.color="red"
    setState("Test could not finish");
    speedCaption.textContent = "Test unavailable";
    notice.innerHTML = `<span class="notice-symbol">!</span><span>${error.message} This test needs access to Cloudflare's speed-test endpoints. If blocked by your network or browser, try again later or configure your own test server.</span>`;
  } finally {
    startButton.disabled = false;
    buttonText.textContent = "Run test again";
    buttonIcon.textContent = "↻";
  }
}

startButton.addEventListener("click", runTest);
