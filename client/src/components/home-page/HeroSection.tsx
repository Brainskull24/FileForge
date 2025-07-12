import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, Play, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <section className="relative min-h-screen pt-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl"
            animate={{
              x: [0, -25, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-400/15 rounded-full blur-xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-40"></div>

          {/* Mouse follower gradient */}
          <motion.div
            className="absolute w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl pointer-events-none"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-white font-medium">
                Trusted by 50,000+ developers
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                Transform
              </span>{" "}
              <br className="hidden sm:block" />
              Any File,{" "}
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                Encode
              </span>{" "}
              Anything
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Professional encoding, decoding, and file conversion platform
              <br className="hidden sm:block" />
              trusted by developers worldwide
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                size="lg"
                className="group bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/25 px-8 py-4 text-lg font-semibold"
                onClick={() => navigate("/convertor")}
              >
                Start Converting Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300 backdrop-blur-sm px-8 py-4 text-lg font-semibold bg-transparent"
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Live Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="font-medium">Lightning Fast</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Shield className="w-5 h-5" />
                </div>
                <span className="font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80">
                <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="font-medium">Works Everywhere</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
