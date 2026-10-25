# netpulse-internet-speed-tester

# NetPulse — Internet Speed Tester

NetPulse is a modern, responsive Internet Speed Tester web application built with HTML, CSS, and JavaScript. It allows users to test their internet connection's download speed, upload speed, and ping (latency) through browser-based network requests.

Featuring a sleek dark-themed dashboard, animated speedometer, real-time test progress, and responsive layout, NetPulse provides a simple and user-friendly way to explore internet performance and networking fundamentals.

## ✨ Features

- **Download Speed Test:** Estimates how quickly data is received from a test server.
- **Upload Speed Test:** Estimates how quickly data is sent to a test server.
- **Ping Measurement:** Measures the response time of browser requests.
- **Interactive Speedometer:** Displays the download speed with a visual gauge.
- **Real-Time Progress:** Shows the current testing stage and progress.
- **Responsive Design:** Supports desktop, laptop, tablet, and mobile screens.
- **Modern Dark UI:** Includes a clean dashboard with metric cards and visual indicators.
- **Error Handling:** Displays a message if a test request fails.
- **No Build Tools Required:** Runs directly in a modern web browser.

## 🛠️ Technologies Used

- HTML5 — Web page structure
- CSS3 — Styling, responsive layout, and animations
- JavaScript — Network requests, speed calculations, and user interactions
- Fetch API — Sending browser-based network requests
- Performance API — Measuring request duration
- Cloudflare Speed Test Endpoints — Providing the test endpoints used by this version

## 📸 Project Overview

The dashboard displays three main network measurements:

| Metric | Description | Unit |
|---|---|---|
| Ping | Time taken for a test request to receive a response | ms |
| Download | Estimated data download throughput | Mbps |
| Upload | Estimated data upload throughput | Mbps |

## 📂 Project Structure

```text
netpulse-internet-speed-tester/
├── index.html
├── style.css
├── script.js
├── README.md
├── LICENSE
└── .gitignore
```

`LICENSE` and `.gitignore` should be included if you create those files in your repository.

## 🚀 Getting Started

### Prerequisites

- A modern web browser, such as Google Chrome, Microsoft Edge, or Firefox.
- An active internet connection for accessing the remote test endpoints.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/aliraza-web21/netpulse-internet-speed-tester.git
```

Replace `YOUR-USERNAME` with your GitHub username.

**2. Open the project folder**

```bash
cd netpulse-internet-speed-tester
```

**3. Run the application**

Open `index.html` in your browser.

Alternatively, open the folder in Visual Studio Code and use the Live Server extension.

**4. Start testing**

1. Open the NetPulse website.
2. Click the **Start Speed Test** button.
3. Wait while the application measures ping, download, and upload performance.
4. Review the displayed results.

## ⚙️ How It Works

### 1. Ping Test
The application sends small requests to the test endpoint and measures their response times using JavaScript's `performance.now()`.

### 2. Download Test
The application requests a test payload and estimates download throughput from the number of bytes received and the elapsed time.

### 3. Upload Test
The application sends a test payload to the upload endpoint and estimates upload throughput from the payload size and elapsed time.

### Speed Calculation

Throughput is estimated using the following formula:

```text
Speed (Mbps) = (Data Size in Bytes × 8)
               ÷ Time in Seconds
               ÷ 1,000,000
```

These measurements are estimates of browser request performance, not guaranteed measurements of your internet provider's maximum speed.

## ⚠️ Limitations

- Results depend on the internet connection, browser, device, and test server.
- The test requires access to the configured Cloudflare endpoints.
- Network restrictions, browser policies, or endpoint availability may cause a test to fail.
- Ping is measured using HTTP request-response time, so it is not equivalent to a traditional ICMP ping.
- Download and upload measurements use finite test payloads and may not reflect sustained maximum throughput.
- Jitter, packet loss, test history, and server selection are not implemented in this version.

## 🔮 Future Improvements

Potential future enhancements include:

- More realistic live speedometer animation
- Jitter and packet-loss testing with suitable test infrastructure
- Speed test history and performance graphs
- Dark and light theme switching
- Exporting results to CSV
- Connection quality reports
- Multiple test server selection
- Optional backend integration and database support

## 🎯 Project Purpose

NetPulse is a learning and portfolio project designed to practise front-end web development, JavaScript, browser networking, and internet performance measurement.

It demonstrates how a responsive web interface can use network requests to estimate connection performance.

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit your changes.
5. Open a Pull Request describing your improvements.

## 📄 License

This project is intended to be distributed under the MIT License if the repository's `LICENSE` file contains that license.

See the `LICENSE` file for the applicable terms.

## 👨‍💻 Author

**ALI RAZA**

- GitHub: https://github.com/aliraza-web21

---

If you find this project useful, consider giving the repository a ⭐ on GitHub!

