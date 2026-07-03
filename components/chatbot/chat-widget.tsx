"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { readJsonResponse } from "@/lib/api-response"

import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] =
    useState(false)

  const [isMinimized, setIsMinimized] =
    useState(false)

  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I am Nexa AI Assistant. You can ask me about our services, chatbot systems, analytics, automation, web development, pricing, or contact details.",

        timestamp: new Date(),
      },
    ])

  const [input, setInput] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  const scrollRef =
    useRef<HTMLDivElement>(null)

  const sessionIdRef =
    useRef("")

  useEffect(() => {
    const storedSessionId =
      window.localStorage.getItem(
        "nexa-chat-session-id"
      )

    if (storedSessionId) {
      sessionIdRef.current =
        storedSessionId

      return
    }

    const sessionId =
      `chat-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`

    window.localStorage.setItem(
      "nexa-chat-session-id",
      sessionId
    )

    sessionIdRef.current =
      sessionId
  }, [])

  /* =========================
     AUTO SMOOTH SCROLL
  ========================= */

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current
          .scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messages])

  /* =========================
     SEND MESSAGE
  ========================= */

  const sendMessage = async () => {
    if (!input.trim() || isLoading)
      return

    const userMessage: Message = {
      id: Date.now().toString(),

      role: "user",

      content: input.trim(),

      timestamp: new Date(),
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
    ])

    setInput("")

    setIsLoading(true)

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            sessionId:
              sessionIdRef.current,
            messages: [
              ...messages,
              userMessage,
            ].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        }
      )

      const data =
        await readJsonResponse<{
          message?: string
          error?: string
        }>(response)

      const assistantMessage: Message =
        {
          id: (
            Date.now() + 1
          ).toString(),

          role: "assistant",

          content:
            data.message ||
            data.error ||
            "Sorry, I could not understand your request.",

          timestamp: new Date(),
        }

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ])
    } catch (error) {
      console.error("Chat request failed:", error)

      const errorMessage: Message = {
        id: (
          Date.now() + 1
        ).toString(),

        role: "assistant",

        content:
          "I could not connect to the chat service right now. Please refresh and try again, or contact us at contact@nexaai.com.",

        timestamp: new Date(),
      }

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ])
    } finally {
      setIsLoading(false)
    }
  }

  /* =========================
     ENTER KEY
  ========================= */

  const handleKeyDown = (
    e: React.KeyboardEvent
  ) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* FLOATING BUTTON */}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            className="
              fixed
              bottom-4
              right-4
              sm:bottom-6
              sm:right-6
              z-50
            "
          >
            <Button
              onClick={() =>
                setIsOpen(true)
              }
              className="
                h-12
                w-12
                sm:h-14
                sm:w-14
                rounded-full
                shadow-xl
                p-0
                bg-blue-600
                hover:bg-blue-700
              "
            >
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            className="
              fixed
              bottom-4
              right-4
              z-50
              w-[95vw]
              sm:w-[380px]
              md:w-[420px]
              max-w-[420px]
              h-[85vh]
            "
          >
            <Card className="overflow-hidden shadow-2xl border h-full flex flex-col bg-white">
              {/* HEADER */}

              <div className="bg-blue-600 text-white p-4 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      Nexa AI Assistant
                    </h3>

                    <p className="text-xs text-white/70">
                      Online - replies instantly
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8"
                    onClick={() =>
                      setIsMinimized(
                        !isMinimized
                      )
                    }
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 h-8 w-8"
                    onClick={() =>
                      setIsOpen(false)
                    }
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* BODY */}

              {!isMinimized && (
                <div className="flex flex-col flex-1 min-h-0">
                  {/* MESSAGES */}

                  <div
                    ref={scrollRef}
                    className="
                      flex-1
                      overflow-y-auto
                      overflow-x-hidden
                      p-4
                      space-y-4
                      scroll-smooth
                      chat-scrollbar
                    "
                  >
                    {messages.map(
                      (message) => (
                        <motion.div
                          key={message.id}
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className={`flex gap-3 ${
                            message.role ===
                            "user"
                              ? "flex-row-reverse"
                              : ""
                          }`}
                        >
                          {/* AVATAR */}

                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.role ===
                              "assistant"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-black"
                            }`}
                          >
                            {message.role ===
                            "assistant" ? (
                              <Bot className="h-4 w-4" />
                            ) : (
                              <User className="h-4 w-4" />
                            )}
                          </div>

                          {/* MESSAGE */}

                          <div
                            className={`
                              max-w-[85%]
                              sm:max-w-[75%]
                              rounded-2xl
                              px-4
                              py-3
                              break-words
                              ${
                                message.role ===
                                "assistant"
                                  ? "bg-gray-100 text-black rounded-tl-sm"
                                  : "bg-blue-600 text-white rounded-tr-sm"
                              }
                            `}
                          >
                            <p className="text-sm whitespace-pre-wrap">
                              {
                                message.content
                              }
                            </p>

                            <p
                              className={`text-[10px] mt-2 ${
                                message.role ===
                                "assistant"
                                  ? "text-gray-500"
                                  : "text-white/70"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString(
                                [],
                                {
                                  hour:
                                    "2-digit",
                                  minute:
                                    "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </motion.div>
                      )
                    )}

                    {/* LOADING */}

                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>

                        <div className="bg-gray-100 rounded-2xl px-4 py-3">
                          <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* INPUT */}

                  <div className="p-4 border-t bg-white shrink-0">
                    <div className="flex items-center gap-2">
                      <Input
                        value={input}
                        onChange={(e) =>
                          setInput(
                            e.target.value
                          )
                        }
                        onKeyDown={
                          handleKeyDown
                        }
                        placeholder="Type your message..."
                        disabled={isLoading}
                        className="flex-1"
                      />

                      <Button
                        onClick={sendMessage}
                        disabled={
                          !input.trim() ||
                          isLoading
                        }
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-[10px] text-center text-gray-400 mt-2">
                      Powered by Nexa AI Systems
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
