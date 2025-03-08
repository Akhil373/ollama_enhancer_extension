let lastSelection = {
    text: "",
    element: null,
    start: 0,
    end: 0,
}

document.addEventListener("mousedown", function (event) {
    if (event.button === 2) {
        const selection = window.getSelection()
        const selectedText = selection.toString().trim()

        if (selectedText && document.activeElement) {
            if (
                document.activeElement.tagName === "INPUT" ||
                document.activeElement.tagName === "TEXTAREA"
            ) {
                lastSelection = {
                    text: selectedText,
                    element: document.activeElement,
                    start: document.activeElement.selectionStart,
                    end: document.activeElement.selectionEnd,
                }
            }
        }
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "enhanceResponse") {
        const enhancedText = request.enhancedText
        console.log("Enhanced text:", enhancedText)
        if (!enhancedText) {
            console.log("Enhanced text is null or undefined")
            return
        }

        let element = document.activeElement
        let start, end

        if (!(element.tagName === "INPUT" || element.tagName === "TEXTAREA")) {
            element = lastSelection.element
            start = lastSelection.start
            end = lastSelection.end
        } else {
            start = element.selectionStart
            end = element.selectionEnd
        }

        if (
            element &&
            (element.tagName === "INPUT" || element.tagName === "TEXTAREA")
        ) {
            const originalText = element.value

            element.value =
                originalText.substring(0, start) +
                enhancedText +
                originalText.substring(end)

            element.setSelectionRange(
                start + enhancedText.length,
                start + enhancedText.length
            )

            element.dispatchEvent(new Event("input", {bubbles: true}))
        } else {
            console.error("No valid input element found to replace text.")
        }
    }
})

try {
    if (chrome.runtime) {
        document.addEventListener("contextmenu", (event) => {
            let selectedText = window.getSelection().toString()
            if (selectedText) {
                chrome.runtime.sendMessage({
                    action: "enhance",
                    text: selectedText,
                })
            }
        })
    } else {
        console.error("chrome.runtime is not available.")
    }
} catch (e) {
    console.error("Error in content script:", e)
}
