export const dynamic = 'error'

export default function ResumePage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Resume</h1>
      <p className="text-neutral-700">Download the PDF or preview it below.</p>
      <div className="flex gap-3">
        <a className="px-4 py-2 rounded-xl bg-brand text-white hover:bg-brand-dark transition" href="/resume.pdf" download>
          Download PDF
        </a>
        <a className="px-4 py-2 rounded-xl border hover:bg-neutral-50" href="/resume.pdf" target="_blank" rel="noreferrer">
          Open in new tab
        </a>
      </div>
      <div className="card overflow-hidden">
        <object data="/resume.pdf" type="application/pdf" className="w-full h-[80vh]">
          <p className="p-6">Your browser can’t display embedded PDFs. <a className="text-brand underline" href="/resume.pdf" target="_blank" rel="noreferrer">Open the file</a>.</p>
        </object>
      </div>
    </section>
  )
}
