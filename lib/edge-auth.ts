const JWT_SECRET = process.env.JWT_SECRET

function getJwtSecret() {
  if (JWT_SECRET) return JWT_SECRET

  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET is required in production")
  }

  return "development-only-secret-change-me"
}

export interface EdgeJWTPayload {
  userId: number
  email: string
  role: string
  exp?: number
}

function base64UrlToBytes(value: string) {
  const padded =
    value.replace(/-/g, "+").replace(/_/g, "/") +
    "=".repeat((4 - (value.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function base64UrlToText(value: string) {
  return new TextDecoder().decode(base64UrlToBytes(value))
}

async function verifyHmacSignature(data: string, signature: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getJwtSecret()),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["verify"]
  )

  return crypto.subtle.verify(
    "HMAC",
    key,
    base64UrlToBytes(signature),
    new TextEncoder().encode(data)
  )
}

export async function verifyTokenAtEdge(
  token: string
): Promise<EdgeJWTPayload | null> {
  try {
    const [header, payload, signature] = token.split(".")

    if (!header || !payload || !signature) return null

    const decodedHeader = JSON.parse(base64UrlToText(header))

    if (decodedHeader.alg !== "HS256") return null

    const validSignature = await verifyHmacSignature(
      `${header}.${payload}`,
      signature
    )

    if (!validSignature) return null

    const decodedPayload = JSON.parse(
      base64UrlToText(payload)
    ) as EdgeJWTPayload

    if (
      decodedPayload.exp &&
      decodedPayload.exp * 1000 < Date.now()
    ) {
      return null
    }

    return decodedPayload
  } catch {
    return null
  }
}
