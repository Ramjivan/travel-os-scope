import { createContext, useContext, useState, type ReactNode } from 'react'

const ReviewContext = createContext({ active: false, request: 0, requestReview: () => {}, setActive: (_active: boolean) => {} })

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false)
  const [request, setRequest] = useState(0)
  return <ReviewContext.Provider value={{ active, request, setActive, requestReview: () => setRequest(value => value + 1) }}>{children}</ReviewContext.Provider>
}

export const useReview = () => useContext(ReviewContext)
