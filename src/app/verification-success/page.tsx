export default function VerificationSuccess() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Email Verified!</h1>
      <p className="text-xl">Your email has been successfully verified. You can now log in.</p>
      <a href="/login" className="text-blue-500 hover:text-blue-700 mt-4">
        Go to Login
      </a>
    </div>
  )
}