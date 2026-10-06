const BEAUTY_AI_WEBHOOK = 'https://karen1007.app.n8n.cloud/webhook/62a24b65-34d5-4e91-a631-aaacee7d9bb7/chat'

export const createBeautyAiSessionId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `sweet-makeup-${Date.now()}`
}

export const getBeautyAiResponseText = (data) => {
  if (typeof data === 'string') return data
  if (Array.isArray(data)) return getBeautyAiResponseText(data[0])
  return data?.output || data?.text || data?.message || data?.response || 'No recibí una respuesta de la asesora.'
}

export async function requestBeautyAi({ sessionId, message, image }) {
  const requestBody = new FormData()
  requestBody.append('action', 'sendMessage')
  requestBody.append('sessionId', sessionId)
  requestBody.append('chatInput', message || 'Analiza la imagen adjunta.')

  if (image?.file) requestBody.append('files', image.file, image.name)

  const response = await fetch(BEAUTY_AI_WEBHOOK, { method: 'POST', body: requestBody })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : await response.text()
  return getBeautyAiResponseText(data)
}
