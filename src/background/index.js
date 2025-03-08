try {
    console.log("Background script running")

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log("Received message:", request)
        console.log("Received action:", request.action)

        if (request.action === "enhance") {
            ;(async () => {
                try {
                    const response = await fetch(
                        "http://localhost:11434/api/generate",
                        {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify({
                                model: "gemma2:2b",
                                prompt: `Enhance this text by improving grammar and using better language. Return ONLY the improved text with no explanations, no questions, and no additional commentary: "${request.text}"`,
                                stream: false,
                                system: "You are a text enhancement tool. Your only job is to improve grammar, spelling, word choice, and clarity of the provided text. You must return ONLY the enhanced version of the original text with the same meaning, without any explanations, questions, or comments. Never ask questions or add any text that wasn't part of the original meaning.",
                            }),
                        }
                    )

                    const data = await response.json()

                    let enhancedText = data.response.trim()

                    enhancedText = enhancedText
                        .replace(
                            /^(Here's|Here is|Enhanced version|Improved version|Enhanced text):/i,
                            ""
                        )
                        .trim()
                    enhancedText = enhancedText.replace(/^["']|["']$/g, "")

                    chrome.tabs.sendMessage(sender.tab.id, {
                        action: "enhanceResponse",
                        enhancedText: enhancedText,
                    })
                } catch (error) {
                    console.error("Ollama Error:", error)

                    chrome.tabs.sendMessage(sender.tab.id, {
                        action: "enhanceResponse",
                        enhancedText: null,
                        error: error.message,
                    })
                }
            })()

            return true
        }
    })
} catch (e) {
    console.error("Error in background script:", e)
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "enhance-with-ollama",
        title: "Enhance with Ollama",
        contexts: ["selection"],
    })
})

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("background.js")
        .then((registration) => {
            console.log("Service worker registered:", registration)
        })
        .catch((error) => {
            console.error("Service worker registration failed:", error)
        })
}
