
export default function Home() {
  return (
    <section className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Hi, I’m Zach.</h1>
      <p className="text-lg text-neutral-700 max-w-none">
        I build performant web apps and thoughtful product experiences. Currently hacking on
        <a className="text-brand ml-1 underline" href="https://vouchr.net" target="_blank" rel="noreferrer">Vouchr</a>.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-neutral-700">
            Motivated and versatile <strong>Full‑Stack Engineer</strong> with a product mindset. 
            I like clean APIs, fast UIs, and delightful details. Eager to tackle new challenges
            that demand innovative problem-solving.
          </p>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Featured Project — Vouchr</h2>
          <p className="text-neutral-700 mb-3">A ticket cataloging & social sharing app. React + TypeScript on the front‑end.</p>
          <div className="flex gap-3">
            <a 
              className="px-4 py-2 rounded-xl bg-[#EE3C37] text-white hover:bg-[#801616] transition" 
              href="https://vouchr.net" 
              target="_blank" 
              rel="noreferrer"
            >
              Live
            </a>
            <a 
              className="px-4 py-2 rounded-xl border hover:bg-neutral-50" 
              href="https://github.com/zbaskin/Vouchr" 
              target="_blank" 
              rel="noreferrer"
            >
              Source
            </a>
          </div>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Education
            <img
              src="/gt-logo.png"
              alt="Georgia Tech logo"
              className="float-right ml-4 mb-2 w-16 h-16 object-contain rounded"
            />
          </h2>
          <p className="text-neutral-700">
            I conducted my undergraduate studies at the <strong>Georgia Institute of Technology</strong>. During my time, 
            I completed a <strong>Bachelor’s Degree in Computer Science</strong> with History Minor.
            <br />
            <br />
            Threads: Artificial Intelligence & Information Networks
          </p>
        </article>
        <article className="card p-6">
          <h2 className="text-xl font-semibold mb-2">Experience</h2>
          <p className="text-neutral-700 mb-3">
            I bridge product and ops: diagnose high-priority outages, drive root-cause fixes, 
            and automate noisy workflows.
            <br />
            <br />
            Stack: React/Next.js, Node, TypeScript, AWS, CI/CD.
          </p>
          <div className="flex gap-3">
            <a className="px-4 py-2 rounded-xl bg-[#EE3C37] text-white hover:bg-[#801616] transition" 
              href="https://www.linkedin.com/in/zachbaskin/" 
              target="_blank" 
              rel="noreferrer"
            >
              Learn More
            </a>
          </div>
        </article>
      </div>
      {/* --- Contact CTA --- */}
      <div className="card p-6 md:col-span-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Let’s work together</h2>
            <p className="text-neutral-700">
              Have a role or project in mind? I’m open to opportunities and collaborations.
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="mailto:zachbas@gmail.com?subject=Hi%20Zach%20—%20Opportunity"
              target="_blank" 
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap
               rounded-xl px-4 bg-[#EE3C37] text-white hover:bg-[#801616] transition"
            >
              Contact Me
            </a>
            <a
              href="/resume.pdf"
              className="inline-flex h-10 items-center justify-center whitespace-nowrap
               rounded-xl px-4 border border-neutral-200 hover:bg-neutral-50 transition"
              target="_blank"
              rel="noreferrer"
            >
              Resume (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
