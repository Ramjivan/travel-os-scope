import type { ReviewDraft, ReviewReceipt, ReviewService } from '@/domain/review'

export function createReviewService(): ReviewService {
  return {
    async submit(draft: ReviewDraft): Promise<ReviewReceipt> {
      let response: Response
      try { response = await fetch('/api/review/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(draft), signal: AbortSignal.timeout(30000) }) }
      catch { throw new Error('Your comment could not reach the reviewer. Your draft is still here. Please try again.') }
      let result: { id?: string; createdAt?: string; error?: string }
      try { result = await response.json() } catch { throw new Error('The review service is unavailable. Your draft is still here. Please try again.') }
      if (!response.ok) throw new Error(result.error || 'Your comment could not be saved. Please try again.')
      if (!result.id || !result.createdAt) throw new Error('The save could not be confirmed. Please try again.')
      return { id: result.id, createdAt: result.createdAt, status: 'pending' }
    },
  }
}
