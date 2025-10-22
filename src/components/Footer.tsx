
export function Footer() {
  return (
    <div className="text-sm text-neutral-600 flex items-center justify-between">
      <p>© {new Date().getFullYear()} Zach Baskin</p>
      <p><a className="underline" href="/resume.pdf">Resume (PDF)</a></p>
    </div>
  )
}
