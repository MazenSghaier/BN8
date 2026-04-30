"use client"

import { ReactNode, useState } from "react"
import { SignInModal } from "./sign-in-modal"
import { SignUpModal } from "./sign-up-modal"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [signInOpen, setSignInOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)

  const openSignIn = () => {
    setSignUpOpen(false)
    setSignInOpen(true)
  }

  const openSignUp = () => {
    setSignInOpen(false)
    setSignUpOpen(true)
  }

  return (
    <>
      {children}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        onSwitchToSignUp={openSignUp}
      />
      <SignUpModal
        isOpen={signUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSwitchToSignIn={openSignIn}
      />
    </>
  )
}
