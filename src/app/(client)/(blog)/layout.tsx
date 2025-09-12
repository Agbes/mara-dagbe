// src/app/(admin)/layout.tsx
export default function BloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-gray-50">
      {children}
    </main>
  );
}
