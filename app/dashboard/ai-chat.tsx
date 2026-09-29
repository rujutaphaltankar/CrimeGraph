"use client"

import * as React from "react"
import {
  BotIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  MenuIcon,
  MessageSquarePlusIcon,
  PaperclipIcon,
  SearchIcon,
  SendIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
  time: string
}

type Chat = {
  id: number
  title: string
  preview: string
  updated: string
}

const initialChats: Chat[] = [
  {
    id: 1,
    title: "Case overview analysis",
    preview: "Summarize the key entities...",
    updated: "2 min ago",
  },
  {
    id: 2,
    title: "Rohan Verma investigation",
    preview: "Show connections between...",
    updated: "18 min ago",
  },
  {
    id: 3,
    title: "Entity relationship analysis",
    preview: "Which entities have the most...",
    updated: "1 hour ago",
  },
  {
    id: 4,
    title: "Case documents",
    preview: "Find relevant documents...",
    updated: "Yesterday",
  },
  {
    id: 5,
    title: "Timeline summary",
    preview: "Create a timeline from the...",
    updated: "Yesterday",
  },
]

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      role: "user",
      content:
        "Give me an overview of the important entities connected to this case.",
      time: "7:42 PM",
    },
    {
      id: 2,
      role: "assistant",
      content:
        "I found several relevant entities in the current case graph. Rohan Verma is one of the central entities, with multiple direct and indirect connections across the available case records.",
      time: "7:42 PM",
    },
    {
      id: 3,
      role: "assistant",
      content:
        "I can also break this down by direct relationships, indirect relationships, documents, or case IDs.",
      time: "7:43 PM",
    },
  ],
  2: [
    {
      id: 4,
      role: "user",
      content: "Show me the connections for Rohan Verma.",
      time: "7:25 PM",
    },
    {
      id: 5,
      role: "assistant",
      content:
        "Rohan Verma has several linked entities in the current dataset. I can help you inspect the direct and indirect relationship paths.",
      time: "7:25 PM",
    },
  ],
  3: [
    {
      id: 6,
      role: "user",
      content: "Which entities have the most connections?",
      time: "6:40 PM",
    },
    {
      id: 7,
      role: "assistant",
      content:
        "The current graph contains several highly connected entities. I can rank them by direct links, indirect links, or combined relationship count.",
      time: "6:41 PM",
    },
  ],
  4: [
    {
      id: 8,
      role: "user",
      content: "Find the most relevant documents for this case.",
      time: "Yesterday",
    },
    {
      id: 9,
      role: "assistant",
      content:
        "I can search the indexed case documents and identify documents that are most closely related to the entities and relationships in this case.",
      time: "Yesterday",
    },
  ],
  5: [
    {
      id: 10,
      role: "user",
      content: "Create a timeline from the available case information.",
      time: "Yesterday",
    },
    {
      id: 11,
      role: "assistant",
      content:
        "I can construct a chronological timeline from the available case records and highlight the entities involved at each stage.",
      time: "Yesterday",
    },
  ],
}

export function AIChat() {
  const [chats, setChats] = React.useState(initialChats)
  const [messages, setMessages] = React.useState(initialMessages)
  const [activeChatId, setActiveChatId] = React.useState(1)
  const [message, setMessage] = React.useState("")
  const [search, setSearch] = React.useState("")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [showChatSidebar, setShowChatSidebar] = React.useState(true)
  const [chatSidebarReady, setChatSidebarReady] = React.useState(false)
  const { translations } = useLanguage()

  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const activeChat = chats.find((chat) => chat.id === activeChatId)
  const currentMessages = messages[activeChatId] ?? []

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(search.toLowerCase())
  )

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    })
  }, [currentMessages.length, isGenerating])

  React.useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches

    setShowChatSidebar(!isMobile)
    setChatSidebarReady(true)
  }, [])

  function createNewChat() {
    const newId = Math.max(...chats.map((chat) => chat.id), 0) + 1

    const newChat: Chat = {
      id: newId,
      title: "New investigation",
      preview: "Start a new conversation...",
      updated: "Just now",
    }

    setChats((current) => [newChat, ...current])

    setMessages((current) => ({
      ...current,
      [newId]: [],
    }))

    setActiveChatId(newId)
    setMessage("")
  }

  function sendMessage() {
    const trimmed = message.trim()

    if (!trimmed || isGenerating) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
    }

    setMessages((current) => ({
      ...current,
      [activeChatId]: [
        ...(current[activeChatId] ?? []),
        userMessage,
      ],
    }))

    setChats((current) =>
      current.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              preview: trimmed,
              updated: "Just now",
            }
          : chat
      )
    )

    setMessage("")
    setIsGenerating(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "I’ve analyzed your request against the current case context. This is a placeholder response — connect this handler to your AI backend or API route.",
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        }),
      }

      setMessages((current) => ({
        ...current,
        [activeChatId]: [
          ...(current[activeChatId] ?? []),
          assistantMessage,
        ],
      }))

      setIsGenerating(false)
    }, 1200)
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="relative flex h-full min-h-0 w-full overflow-hidden bg-background">
      {/* Main chat */}
      <main className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center border-b px-4 lg:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <BotIcon className="size-4 text-primary" />
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">
                {activeChat?.title ?? translations.aiAssistant}
              </h1>

              <p className="text-xs text-muted-foreground">
                {translations.caseIntelligenceAssistant}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setShowChatSidebar((current) => !current)}
            aria-expanded={showChatSidebar}
            aria-label={showChatSidebar ? translations.hideChatHistory : translations.showChatHistory}
          >
            <MenuIcon className="size-4" />
          </Button>

        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-6">
            {currentMessages.length === 0 ? (
              <EmptyChat onSuggestion={setMessage} />
            ) : (
              <div className="space-y-8">
                {currentMessages.map((item) => (
                  <ChatMessage key={item.id} message={item} />
                ))}

                {isGenerating && <TypingMessage />}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="shrink-0 bg-background px-4 pb-5 pt-3 lg:px-6">
          <div className="mx-auto max-w-3xl">
            <div
              className={cn(
                "rounded-xl border bg-background p-2 shadow-sm",
                "transition-colors",
                "focus-within:border-primary/40",
                "focus-within:ring-2",
                "focus-within:ring-primary/10"
              )}
            >
              <Textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={translations.askAboutCase}
                className="min-h-[64px] resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:ring-0"
                disabled={isGenerating}
              />

              <div className="flex items-center justify-between px-1 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-muted-foreground"
                  type="button"
                >
                  <PaperclipIcon className="size-4" />
                  <span className="sr-only">{translations.attachDocument}</span>
                </Button>

                <Button
                  size="icon"
                  className="size-8"
                  onClick={sendMessage}
                  disabled={!message.trim() || isGenerating}
                >
                  <SendIcon className="size-4" />
                  <span className="sr-only">{translations.sendMessage}</span>
                </Button>
              </div>
            </div>

            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              {translations.aiDisclaimer}
            </p>
          </div>
        </div>
      </main>

      {chatSidebarReady && showChatSidebar && (
        <button
          type="button"
          aria-label={translations.hideChatHistory}
          className="absolute inset-0 z-10 bg-black/45 lg:hidden"
          onClick={() => setShowChatSidebar(false)}
        />
      )}

      {/* Right chat history */}
      <aside
        className={cn(
          "hidden shrink-0 overflow-y-auto border-l bg-muted/10 transition-[width] duration-200 lg:flex max-lg:absolute max-lg:inset-y-0 max-lg:right-0 max-lg:z-30 max-lg:shadow-xl",
          !chatSidebarReady && "pointer-events-none opacity-0",
          showChatSidebar ? "w-72 max-lg:flex max-lg:flex-none max-lg:!w-[calc(100vw-1rem)] max-lg:!min-w-[calc(100vw-1rem)]" : "w-10 max-lg:hidden"
        )}
      >
        <Card className="h-full min-h-0 rounded-none border-0">
          {/* Sidebar header */}
          <div className={cn(
            "relative flex items-center border-b py-3",
            showChatSidebar ? "justify-between px-4" : "justify-center px-1"
          )}>
            <Button
              variant="ghost"
              size="icon-sm"
              className={cn(
                "size-7 shrink-0 text-muted-foreground hover:bg-transparent hover:text-foreground",
                showChatSidebar && "ms-auto"
              )}
              onClick={() => setShowChatSidebar((current) => !current)}
              aria-expanded={showChatSidebar}
              aria-label={showChatSidebar ? translations.hideChatHistory : translations.showChatHistory}
            >
              {showChatSidebar ? (
                <ChevronRightIcon className="size-4" />
              ) : (
                <ChevronLeftIcon className="size-4" />
              )}
            </Button>

            {showChatSidebar && (
              <div className="absolute left-1/2 -translate-x-1/2 text-center">
                <p className="text-sm font-semibold">{translations.chatHistory}</p>
              </div>
            )}
          </div>

          {showChatSidebar && <div className="flex min-h-0 flex-1 flex-col gap-2">
            {/* Search */}
            <div className="px-4 pb-5 pt-1">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={translations.search}
                  className="h-8 border-0 bg-muted/50 pl-8 text-xs shadow-none focus-visible:ring-1"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Chat list */}
            <div className="min-h-0 flex-1 overflow-y-auto px-3 py-1">
              <p className="px-2 pb-4 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {translations.recent}
              </p>

              <div className="space-y-1">
                {filteredChats.map((chat) => {
                  const active = chat.id === activeChatId

                  return (
                    <button
                      key={chat.id}
                      type="button"
                      onClick={() => setActiveChatId(chat.id)}
                      className={cn(
                        "group w-full rounded-lg px-3.5 py-3.5 text-left",
                        "transition-colors",
                        active
                          ? "bg-primary/10"
                          : "hover:bg-muted/70"
                      )}
                    >
                      <div className="flex items-start gap-2.5">
                        <MessageSquarePlusIcon
                          className={cn(
                            "mt-0.5 size-3.5 shrink-0",
                            active
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />

                        <div className="min-w-0 flex-1">
                          <p
                            className={cn(
                              "truncate text-xs font-medium",
                              active && "text-primary"
                            )}
                          >
                            {chat.title}
                          </p>

                          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                            {chat.preview}
                          </p>

                          <p className="mt-1 text-[10px] text-muted-foreground/70">
                            {chat.updated}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* New chat */}
            <div className="px-4 pb-5 pt-3">
              <Button
                variant="outline"
                className="h-9 w-full justify-center gap-2"
                onClick={createNewChat}
              >
                <MessageSquarePlusIcon className="size-4" />
                {translations.newChat}
              </Button>
            </div>
          </div>}
        </Card>
      </aside>
    </div>
  )
}

function ChatMessage({
  message,
}: {
  message: Message
}) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <SparklesIcon className="size-3.5 text-primary" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[75%]",
          isUser && "flex flex-col items-end"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-6",
            isUser
              ? "rounded-br-md bg-primary text-primary-foreground"
              : "rounded-bl-md bg-muted/60"
          )}
        >
          {message.content}
        </div>

        <span className="mt-1 px-1 text-[10px] text-muted-foreground">
          {message.time}
        </span>
      </div>
    </div>
  )
}

function TypingMessage() {
  return (
    <div className="flex gap-3">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <SparklesIcon className="size-3.5 text-primary" />
      </div>

      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted/60 px-4 py-3">
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
      </div>
    </div>
  )
}

function EmptyChat({
  onSuggestion,
}: {
  onSuggestion: (value: string) => void
}) {
  const { translations } = useLanguage()
  const suggestions = [
    translations.suggestionSummarize,
    translations.suggestionConnected,
    translations.suggestionRelationships,
    translations.suggestionFindings,
  ]

  return (
    <div className="flex min-h-[calc(100vh-18rem)] flex-col items-center justify-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
        <SparklesIcon className="size-6 text-primary" />
      </div>

      <h2 className="mt-5 text-lg font-semibold tracking-tight">
        {translations.howCanIHelp}
      </h2>

      <p className="mt-2 max-w-md text-center text-sm text-muted-foreground">
        {translations.askInvestigationQuestions}
      </p>

      <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestion(suggestion)}
            className={cn(
              "rounded-lg border bg-background p-3 text-left text-xs",
              "transition-colors",
              "hover:border-primary/30",
              "hover:bg-primary/5"
            )}
          >
            <div className="flex items-start gap-2.5">
              <FileTextIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
              <span>{suggestion}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
