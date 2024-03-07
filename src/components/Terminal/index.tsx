export default function TerminalUI({ lines }: { lines: string[] }) {
  return (
    <div
      className={
        "border react-terminal scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent w-full max-w-7xl rounded-md max-h-[500px] overflow-y-scroll h-[500px] border-slate-800"
      }
    >
      <div className={"p-2"}>
        <h1>Conversion output</h1>
      </div>
      <pre>
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </pre>
    </div>
  );
}
