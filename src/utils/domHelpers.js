export const debounce = (fn, delay) => {
    let timeout
    return (...args) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => fn.apply(this, args), delay)
    }
}

export const isTextInput = (element) => {
    return (
        element.tagName === "TEXTAREA" ||
        (element.tagName === "INPUT" &&
            ["text", "search", "email", "password", "tel", "url"].includes(
                element.type
            ))
    )
}
