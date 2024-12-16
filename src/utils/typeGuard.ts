function hasMessageProp(unknownValue: unknown): unknownValue is { message: string} {
    return (typeof unknownValue === "object" && unknownValue !== null 
        && Object.hasOwn(unknownValue, "message") && typeof (unknownValue as {message: string}).message === "string") 
}

function hasCertainProp<T extends Record<string, unknown>>(unknownValue: unknown, propName: string): unknownValue is T {
    return (
        typeof unknownValue === "object" 
          && unknownValue !== null 
          && Object.hasOwn(unknownValue, propName)
    )
}