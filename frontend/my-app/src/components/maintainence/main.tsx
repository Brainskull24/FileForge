import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, Lock, Sparkles, Wrench, RefreshCw, ExternalLink, Twitter, Mail, Phone } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"

interface StatusUpdate {
  id: string
  time: string
  message: string
  type: "info" | "success" | "warning"
}

interface MaintenancePhase {
  id: number
  name: string
  status: "complete" | "in-progress" | "pending"
  progress?: number
}

const codeSnippets = [
  "const maintenance = true;",
  "UPDATE systems SET status = 'upgrading';",
  "Base64.encode('MAINTENANCE')",
  "await database.backup();",
  "npm install --production",
  "docker build -t app:latest .",
  "kubectl apply -f deployment.yaml",
  "SELECT * FROM improvements;",
  "git push origin production",
  "systemctl restart services",
]

const encodingFacts = [
  "The term 'bug' in programming dates back to 1947",
  "Base64 encoding was first described in RFC 1421",
  "UTF-8 can encode over 1 million characters",
  "The first computer weighed 30 tons",
  "ASCII stands for American Standard Code for Information Interchange",
  "Binary code uses only 0s and 1s to represent data",
]

export default function Maintenance() {
  const [progress, setProgress] = useState(67)
  const [timeRemaining, setTimeRemaining] = useState(9258) // seconds
  const [currentFact, setCurrentFact] = useState(0)
  const [encodingText, setEncodingText] = useState("")
  const [isEncoding, setIsEncoding] = useState(true)
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([
    { id: "1", time: "14:32", message: "Database backup completed successfully", type: "success" },
    { id: "2", time: "14:45", message: "Beginning system updates...", type: "info" },
    { id: "3", time: "15:12", message: "API services temporarily offline", type: "warning" },
    { id: "4", time: "15:28", message: "Installing security patches...", type: "info" },
    { id: "5", time: "15:45", message: "Running system diagnostics...", type: "info" },
  ])

  const [phases] = useState<MaintenancePhase[]>([
    { id: 1, name: "Database Backup", status: "complete" },
    { id: 2, name: "Service Shutdown", status: "complete" },
    { id: 3, name: "System Updates", status: "in-progress", progress: 67 },
    { id: 4, name: "Testing & Validation", status: "pending" },
    { id: 5, name: "Service Restoration", status: "pending" },
  ])

  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.random() * 2, 100))
      setTimeRemaining((prev) => Math.max(prev - 1, 0))
      setLastUpdated(new Date())

      // Add new status update occasionally
      if (Math.random() < 0.1) {
        const newUpdate: StatusUpdate = {
          id: Date.now().toString(),
          time: new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
          message: "System optimization in progress...",
          type: "info",
        }
        setStatusUpdates((prev) => [newUpdate, ...prev.slice(0, 4)])
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Encoding animation
  useEffect(() => {
    const maintenanceText = "MAINTENANCE"
    const encodedText = "TUFJTFRFTUFOQ0U="

    const animateEncoding = () => {
      if (isEncoding) {
        let currentIndex = 0
        const interval = setInterval(() => {
          if (currentIndex <= encodedText.length) {
            setEncodingText(encodedText.slice(0, currentIndex))
            currentIndex++
          } else {
            clearInterval(interval)
            setTimeout(() => setIsEncoding(false), 2000)
          }
        }, 100)
      } else {
        let currentIndex = 0
        const interval = setInterval(() => {
          if (currentIndex <= maintenanceText.length) {
            setEncodingText(maintenanceText.slice(0, currentIndex))
            currentIndex++
          } else {
            clearInterval(interval)
            setTimeout(() => setIsEncoding(true), 2000)
          }
        }, 100)
      }
    }

    const timeout = setTimeout(animateEncoding, 1000)
    return () => clearTimeout(timeout)
  }, [isEncoding])

  // Rotate facts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % encodingFacts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours}h ${minutes}m ${secs}s`
  }

  const getStatusIcon = (status: MaintenancePhase["status"]) => {
    switch (status) {
      case "complete":
        return "✅"
      case "in-progress":
        return "🔄"
      case "pending":
        return "⏳"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={index}
            className="absolute text-xs text-white/10 font-mono whitespace-nowrap"
            initial={{
              x: -200,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: window.innerWidth + 200,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: index * 2,
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Status Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <Badge className="text-lg px-6 py-2 bg-orange-500/20 text-orange-300 border-orange-500/50 mb-4">
              🔧 MAINTENANCE IN PROGRESS
            </Badge>
          </motion.div>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Base64 Encoding Progress</h2>
            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm font-mono">{progress.toFixed(0)}% Complete</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Encoding Animation */}
            <div className="bg-slate-800/30 rounded-lg p-6 font-mono">
              <div className="text-sm text-gray-400 mb-2">
                {isEncoding ? "Encoding: MAINTENANCE → Base64" : "Decoding: Base64 → MAINTENANCE"}
              </div>
              <div className="text-xl text-green-400">
                {encodingText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-1"
                >
                  |
                </motion.span>
              </div>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {phases.map((phase) => (
              <Card key={phase.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{getStatusIcon(phase.status)}</div>
                  <h3 className="font-semibold text-sm mb-1">{phase.name}</h3>
                  {phase.status === "in-progress" && phase.progress && (
                    <div className="text-xs text-blue-400">{phase.progress}%</div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl font-bold mb-4">We're Upgrading Our Systems</h1>
          <p className="text-xl text-gray-300 mb-2">
            FileForge is temporarily offline while we enhance your experience
          </p>
          <p className="text-lg text-gray-400">Expected Duration: 2-4 hours</p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-block bg-slate-800/50 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">Estimated Time Remaining</h3>
            <div className="text-4xl font-mono font-bold text-green-400 mb-2">{formatTime(timeRemaining)}</div>
            <p className="text-sm text-gray-400">We'll be back soon!</p>
          </div>
        </motion.div>

        {/* Improvements Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">⚡ Performance Boost</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>50% faster file processing</li>
                <li>Reduced memory usage</li>
                <li>Optimized algorithms</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Lock className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">🔒 Enhanced Security</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Updated encryption protocols</li>
                <li>Improved access controls</li>
                <li>Security vulnerability patches</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">✨ New Features</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Advanced workflow builder</li>
                <li>Additional file formats</li>
                <li>Improved API endpoints</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6 text-center">
              <Wrench className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-bold mb-2">🛠️ Infrastructure</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Database optimization</li>
                <li>Server upgrades</li>
                <li>Network improvements</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Live Status Feed */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Live Status Feed
                  </h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Refresh
                  </Button>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  <AnimatePresence>
                    {statusUpdates.map((update) => (
                      <motion.div
                        key={update.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-gray-500 font-mono text-xs mt-0.5">{update.time}</span>
                        <span className="text-gray-300">{update.message}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Encoding Trivia */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">💡 Encoding Trivia</h3>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentFact}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-300"
                  >
                    {encodingFacts[currentFact]}
                  </motion.p>
                </AnimatePresence>
                <div className="flex justify-center mt-4 space-x-1">
                  {encodingFacts.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentFact ? "bg-purple-400" : "bg-gray-600"}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact & Alternatives */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">📞 Emergency Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <a href="mailto:emergency@fileforge.com" className="text-blue-400 hover:underline">
                    emergency@fileforge.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <a href="#" className="text-blue-400 hover:underline">
                    @FileForgeStatus
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <a href="#" className="text-blue-400 hover:underline">
                    Status Page
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">🔗 Alternative Access</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  API Status Checker
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Mobile App
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Get Notified
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-slate-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
        >
          <p className="text-gray-400 text-sm">Thank you for your patience while we improve FileForge</p>
          <p className="text-gray-500 text-xs mt-2">© 2024 FileForge. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  )
}
