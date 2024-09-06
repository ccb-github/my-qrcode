function hasMessageProp(unknownValue: unknown): unknownValue is { message: string} {
    return (typeof unknownValue === "object" && unknownValue !== null 
        && Object.hasOwn(unknownValue, "message") && typeof unknownValue.message === "string") 
}