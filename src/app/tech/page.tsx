"use client";

import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Server, Layout, Cloud, Bell } from "lucide-react";

export default function SoftwarePage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background pb-32 pt-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="mb-16 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"
            >
              Technical Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed"
            >
              A collection of data science projects and software applications that demonstrate my analytical
              skills and technical expertise. From machine learning models to interactive dashboards and web applications.
            </motion.p>
          </div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 md:p-12 shadow-lg"
          >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center mb-12">
              <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 border border-blue-500/20">
                <Database size={40} />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                I&apos;m currently documenting and preparing detailed case studies for my technical projects,
                including machine learning models, data analytics dashboards, and full-stack applications.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                  <Database size={20} /> Data Science
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Customer Churn Prediction Models
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Sales Analytics Dashboards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Market Sentiment Analysis
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-purple-400">
                  <Layout size={20} /> Software Applications
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Interactive Web Applications
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    Automation & Workflow Tools
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    API Development & Integration
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
              >
                <Bell size={18} />
                Get Notified
              </Link>
              <Link
                href="/create"
                className="px-8 py-3 rounded-full border border-border hover:bg-secondary transition-colors font-medium flex items-center gap-2"
              >
                View Creative Work
                <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Skills Section */}
          <div className="mt-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-12 text-center"
            >
              Technical Expertise
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Python", role: "Data Science", color: "text-blue-400", icon: <Database size={24} /> },
                { name: "Java", role: "Backend Dev", color: "text-red-400", icon: <Server size={24} /> },
                { name: "Next.js", role: "Web Dev", color: "text-white", icon: <Layout size={24} /> },
                { name: "Vercel", role: "Deployment", color: "text-yellow-400", icon: <Cloud size={24} /> },
              ].map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors"
                >
                  <div className={`mb-4 ${skill.color} bg-secondary/50 p-3 rounded-xl`}>
                    {skill.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{skill.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
