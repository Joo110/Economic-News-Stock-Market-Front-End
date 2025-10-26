// app/signup/layout.tsx
export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="antialiased font-cairo">
      {children}
    </section>
  );
}