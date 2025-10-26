// app/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="antialiased font-cairo">
      {children}
    </section>
  );
}
