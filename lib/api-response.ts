export async function readJsonResponse<T = { error?: string; message?: string }>(
  response: Response
): Promise<T> {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>
  }

  const text = await response.text()

  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    throw new Error(
      response.status === 404
        ? "This request could not be found. Please refresh and try again."
        : "The server could not complete this request. Please refresh and try again."
    )
  }

  throw new Error(text || "Server returned an invalid response.")
}
