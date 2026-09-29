"use client"

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react"

export type Language = "English" | "Marathi"

const languageStorageKey = "crimegraph-language"

const translations = {
  English: {
    overview: "Overview",
    graph: "Graph",
    aiChat: "AI Chat",
    cases: "Cases",
    entities: "Entities",
    documents: "Documents",
    caseRequests: "Case Requests",
    language: "Language",
    english: "English",
    marathi: "Marathi",
    activeCases: "Active cases",
    totalEntities: "Total entities",
    totalLinks: "Total links",
    totalDocs: "Total Docs",
    intelligenceActivity: "Intelligence activity",
    totalLast3Months: "Total for the last 3 months",
    last3Months: "Last 3 months",
    last30Days: "Last 30 days",
    last7Days: "Last 7 days",
    selectValue: "Select a value",
    keyEntities: "Key Entities",
    entitiesDescription:
      "Entities identified across cases and their relationship counts.",
    entity: "Entity",
    type: "Type",
    directLinks: "Direct links",
    indirectLinks: "Indirect links",
    caseId: "Case ID",
    noEntitiesFound: "No entities found.",
    entitiesCount: "entities",
    rowsPerPage: "Rows per page",
    page: "Page",
    of: "of",
    firstPage: "Go to first page",
    previousPage: "Go to previous page",
    nextPage: "Go to next page",
    lastPage: "Go to last page",

    allCases: "All Cases",
    case: "case",
    casesFound: "found",
    searchCases: "Search cases...",
    newest: "Newest",
    oldest: "Oldest",
    title: "Title",
    totalDocuments: "Total documents",
    assignedTo: "Assigned to",
    status: "Status",
    noCasesFound: "No cases found",
    tryChangingSearch: "Try changing your search.",

    allDocuments: "All Documents",
    document: "Document",
    documentSingular: "document",
    searchDocuments: "Search documents...",
    download: "Download",
    noDocumentsFound: "No documents found",

    allEntities: "All Entities",
    entitySingular: "entity",
    searchEntities: "Search entities...",
    noEntitiesFoundDetailed: "No entities found",

    accessRequest: "Access request",
    requestedCase: "Requested case",
    reason: "Reason",
    requested: "Requested",
    reject: "Reject",
    allow: "Allow",
    noPendingRequests: "No pending requests",
    allRequestsReviewed:
      "All case access requests have been reviewed.",

    graphComingSoon: "Graph view coming soon.",
    documentsView: "Documents",
    caseRequestsView: "Case Requests",

    aiAssistant: "AI Assistant",
    caseIntelligenceAssistant: "Case intelligence assistant",
    showChatHistory: "Show chat history",
    hideChatHistory: "Hide chat history",
    chatHistory: "Chat history",
    investigations: "Your investigations",
    newChat: "New chat",
    search: "Search",
    recent: "Recent",
    askAboutCase: "Ask about this case...",
    attachDocument: "Attach document",
    sendMessage: "Send message",
    aiDisclaimer:
      "AI responses may contain errors. Verify important information against source records.",
    howCanIHelp: "How can I help?",
    askInvestigationQuestions:
      "Ask questions about entities, relationships, documents, timelines, or your current investigation.",
    investigator: "Investigator",
    aiWorkspace: "AI workspace",
    active: "Active",
    pending: "Pending",
    closed: "Closed",
    suggestionSummarize: "Summarize the current case",
    suggestionConnected: "Show the most connected entities",
    suggestionRelationships:
      "Find relationships involving Rohan Verma",
    suggestionFindings: "Explain the key case findings",
  },

  Marathi: {
    overview: "आढावा",
    graph: "ग्राफ",
    aiChat: "AI चॅट",
    cases: "प्रकरणे",
    entities: "घटक",
    documents: "दस्तऐवज",
    caseRequests: "प्रकरण विनंत्या",
    language: "भाषा",
    english: "इंग्रजी",
    marathi: "मराठी",
    activeCases: "सक्रिय प्रकरणे",
    totalEntities: "एकूण घटक",
    totalLinks: "एकूण दुवे",
    totalDocs: "एकूण दस्तऐवज",
    intelligenceActivity: "गुप्तचर क्रियाकलाप",
    totalLast3Months: "गेल्या ३ महिन्यांतील एकूण",
    last3Months: "गेल्या ३ महिन्यांतील",
    last30Days: "गेल्या ३० दिवसांतील",
    last7Days: "गेल्या ७ दिवसांतील",
    selectValue: "मूल्य निवडा",
    keyEntities: "महत्त्वाचे घटक",
    entitiesDescription:
      "प्रकरणांमध्ये ओळखलेले घटक आणि त्यांच्या संबंधांची संख्या.",
    entity: "घटक",
    type: "प्रकार",
    directLinks: "थेट दुवे",
    indirectLinks: "अप्रत्यक्ष दुवे",
    caseId: "प्रकरण क्रमांक",
    noEntitiesFound: "घटक आढळले नाहीत.",
    entitiesCount: "घटक",
    rowsPerPage: "प्रति पृष्ठ ओळी",
    page: "पृष्ठ",
    of: "पैकी",
    firstPage: "पहिल्या पृष्ठावर जा",
    previousPage: "मागील पृष्ठावर जा",
    nextPage: "पुढील पृष्ठावर जा",
    lastPage: "शेवटच्या पृष्ठावर जा",

    allCases: "सर्व प्रकरणे",
    case: "प्रकरण",
    casesFound: "आढळली",
    searchCases: "प्रकरणे शोधा...",
    newest: "नवीनतम",
    oldest: "जुनी",
    title: "शीर्षक",
    totalDocuments: "एकूण दस्तऐवज",
    assignedTo: "नियुक्त व्यक्ती",
    status: "स्थिती",
    noCasesFound: "प्रकरणे आढळली नाहीत",
    tryChangingSearch: "शोध बदलून पहा.",

    allDocuments: "सर्व दस्तऐवज",
    document: "दस्तऐवज",
    documentSingular: "दस्तऐवज",
    searchDocuments: "दस्तऐवज शोधा...",
    download: "डाउनलोड",
    noDocumentsFound: "दस्तऐवज आढळले नाहीत",

    allEntities: "सर्व घटक",
    entitySingular: "घटक",
    searchEntities: "घटक शोधा...",
    noEntitiesFoundDetailed: "घटक आढळले नाहीत",

    accessRequest: "प्रवेश विनंती",
    requestedCase: "विनंती केलेले प्रकरण",
    reason: "कारण",
    requested: "विनंती केली",
    reject: "नकार द्या",
    allow: "परवानगी द्या",
    noPendingRequests: "प्रलंबित विनंत्या नाहीत",
    allRequestsReviewed:
      "सर्व प्रकरण प्रवेश विनंत्यांचे पुनरावलोकन झाले आहे.",

    graphComingSoon: "ग्राफ दृश्य लवकरच उपलब्ध होईल.",
    documentsView: "दस्तऐवज",
    caseRequestsView: "प्रकरण विनंत्या",

    aiAssistant: "AI सहाय्यक",
    caseIntelligenceAssistant: "प्रकरण गुप्तचर सहाय्यक",
    showChatHistory: "चॅट इतिहास दाखवा",
    hideChatHistory: "चॅट इतिहास लपवा",
    chatHistory: "चॅट इतिहास",
    investigations: "तुमच्या तपासण्या",
    newChat: "नवीन चॅट",
    search: "शोधा",
    recent: "अलीकडील",
    askAboutCase: "या प्रकरणाबद्दल विचारा...",
    attachDocument: "दस्तऐवज जोडा",
    sendMessage: "संदेश पाठवा",
    aiDisclaimer:
      "AI प्रतिसादांमध्ये चुका असू शकतात. महत्त्वाची माहिती मूळ नोंदींशी पडताळा.",
    howCanIHelp: "मी कशी मदत करू?",
    askInvestigationQuestions:
      "घटक, संबंध, दस्तऐवज, कालरेषा किंवा तुमच्या सध्याच्या तपासणीबद्दल प्रश्न विचारा.",
    investigator: "तपास अधिकारी",
    aiWorkspace: "AI कार्यक्षेत्र",
    active: "सक्रिय",
    pending: "प्रलंबित",
    closed: "बंद",
    suggestionSummarize: "सध्याच्या प्रकरणाचा सारांश द्या",
    suggestionConnected: "सर्वाधिक जोडलेले घटक दाखवा",
    suggestionRelationships:
      "रोहन वर्माशी संबंधित संबंध शोधा",
    suggestionFindings:
      "प्रकरणातील प्रमुख निष्कर्ष समजावून सांगा",
  },
} as const

type LanguageContextValue = {
  language: Language
  changeLanguage: (language: Language) => void
  translations: (typeof translations)[Language]
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [language, setLanguage] = useState<Language>("English")

  useEffect(() => {
    const savedLanguage =
      window.localStorage.getItem(languageStorageKey)

    if (
      savedLanguage === "English" ||
      savedLanguage === "Marathi"
    ) {
      startTransition(() => setLanguage(savedLanguage))
      document.documentElement.lang =
        savedLanguage === "Marathi" ? "mr" : "en"
    }
  }, [])

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage)
    window.localStorage.setItem(
      languageStorageKey,
      nextLanguage
    )
    document.documentElement.lang =
      nextLanguage === "Marathi" ? "mr" : "en"
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error(
      "useLanguage must be used within LanguageProvider"
    )
  }

  return context
}
