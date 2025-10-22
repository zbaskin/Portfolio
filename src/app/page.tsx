
export default function Home() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Hi, I’m Zach.</h1>
      <p className="text-lg text-neutral-700 max-w-prose">
        I build performant web apps and thoughtful product experiences. Currently hacking on
        <a className="text-brand ml-1 underline" href="https://vouchr.net" target="_blank" rel="noreferrer">Vouchr</a>.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-neutral-700">Full‑stack engineer with a product mindset. I like clean APIs, fast UIs, and delightful details.</p>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Featured Project — Vouchr</h2>
          <p className="text-neutral-700 mb-3">A ticket cataloging + social sharing app. React + TypeScript on the front‑end.</p>
          <div className="flex gap-3">
            <a className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark transition" href="https://vouchr.net" target="_blank" rel="noreferrer">Live</a>
            <a className="px-4 py-2 rounded-xl border hover:bg-neutral-50" href="https://github.com/zbaskin/Vouchr" target="_blank" rel="noreferrer">Source</a>
          </div>
        </article>
      </div>
    </section>
  )
}
