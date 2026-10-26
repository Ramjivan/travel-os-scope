export interface ReviewMark {
  x: number; y: number; width: number; height: number
  scrollX: number; scrollY: number; viewportWidth: number; viewportHeight: number
  selector: string; label: string; excerpt: string
}
export interface ReviewDraft {
  requestId: string; author: string; team: string; text: string
  page: string; pageTitle: string; role: string; userId: string; userName: string; build: string
  mark: ReviewMark | null
  voice: { base64: string; mimeType: string; durationSeconds: number | null } | null
}
export interface ReviewReceipt { id: string; createdAt: string; status: 'pending' }
export interface ReviewService { submit(draft: ReviewDraft): Promise<ReviewReceipt> }
