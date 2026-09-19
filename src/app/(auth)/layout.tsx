export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#11110F] flex items-center justify-center px-4 py-12">
      {children}
    </div>
  )
}
