const { spawn } = require("child_process")
const fs = require("fs")
const net = require("net")
const path = require("path")

const isWindows = process.platform === "win32"
const projectRoot = path.join(__dirname, "..")
const nextBin = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
)

let opened = false
let detectedUrl = ""
let readyTimer

const preferredPort = Number(process.env.PORT || "3000")
const preferredUrl = `http://localhost:${preferredPort}`
const preferredChromeProfile = process.env.CHROME_PROFILE || "Default"

function getChromePath() {
  if (!isWindows) return ""

  const candidates = [
    path.join(process.env.PROGRAMFILES || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env["PROGRAMFILES(X86)"] || "", "Google", "Chrome", "Application", "chrome.exe"),
    path.join(process.env.LOCALAPPDATA || "", "Google", "Chrome", "Application", "chrome.exe"),
  ]

  return candidates.find((candidate) => fs.existsSync(candidate)) || ""
}

function openBrowser(url) {
  const chromePath = getChromePath()

  if (chromePath) {
    const opener = spawn(
      chromePath,
      [`--profile-directory=${preferredChromeProfile}`, url],
      {
        detached: true,
        stdio: "ignore",
        shell: false,
      }
    )

    opener.unref()
    return
  }

  const command = isWindows
    ? "cmd"
    : process.platform === "darwin"
      ? "open"
      : "xdg-open"

  const args = isWindows
    ? ["/c", "start", "", url]
    : [url]

  const opener = spawn(command, args, {
    detached: true,
    stdio: "ignore",
    shell: false,
  })

  opener.unref()
}

function handleOutput(output) {
  process.stdout.write(output)

  if (opened) return

  const matches = output.match(/https?:\/\/localhost:\d+/g)

  if (matches?.length) {
    detectedUrl = matches[0]
  }

  if (output.includes("Another next dev server is already running.")) {
    if (matches?.length) {
      detectedUrl = matches[matches.length - 1]
    }

    openDetectedUrl()
    return
  }

  if (detectedUrl && output.includes("Ready in")) {
    clearTimeout(readyTimer)
    readyTimer = setTimeout(openDetectedUrl, 1200)
  }
}

function openDetectedUrl() {
  if (opened || !detectedUrl) return

  opened = true

  console.log("")
  console.log(`Project running at: ${detectedUrl}`)
  console.log("Opening browser...")
  console.log("")

  openBrowser(detectedUrl)
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ port, host: "127.0.0.1" }, () => {
      socket.destroy()
      resolve(true)
    })

    socket.on("error", () => resolve(false))
    socket.setTimeout(700, () => {
      socket.destroy()
      resolve(false)
    })
  })
}

async function start() {
  const lockPath = path.join(projectRoot, ".next", "dev", "lock")
  const existingServerIsLikely = fs.existsSync(lockPath) && await isPortOpen(preferredPort)

  if (existingServerIsLikely) {
    detectedUrl = preferredUrl
    console.log(`Existing dev server detected at: ${detectedUrl}`)
    openDetectedUrl()
    return
  }

  let devPort = preferredPort

  while (await isPortOpen(devPort)) {
    devPort += 1
  }

  if (devPort !== preferredPort) {
    console.log(`Port ${preferredPort} is in use. Starting on port ${devPort} instead.`)
  }

  const devServer = spawn(process.execPath, [nextBin, "dev", "-p", String(devPort)], {
    cwd: projectRoot,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
    shell: false,
  })

  devServer.stdout.on("data", (data) => handleOutput(data.toString()))
  devServer.stderr.on("data", (data) => handleOutput(data.toString()))

  devServer.on("close", (code) => {
    process.exit(code ?? 0)
  })

  devServer.on("error", (error) => {
    console.error("Failed to start Next.js dev server:", error.message)
    process.exit(1)
  })
}

start()
