import { ReactNode, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FoldingMenu = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <button
      onClick={() => setIsMenuOpen((state) => !state)}
      className={"w-full max-w-7xl  p-5 rounded-md border border-slate-800"}
    >
      <div className={"w-full flex justify-between"}>
        <p> Inspect output</p>
        {!isMenuOpen ? (
          <IoIosArrowDown className="" />
        ) : (
          <IoIosArrowDown className="transform rotate-180" />
        )}
      </div>
      {isMenuOpen && children}
    </button>
  );
};

export default function TerminalUI({ lines }: { lines: string[] }) {
  return (
    <FoldingMenu>
      <div
        className={
          " react-terminal scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent w-full max-w-7xl rounded-md max-h-[500px] overflow-y-scroll h-[500px] "
        }
      >
        <pre className={"w-full text-left"}>
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
      </div>
    </FoldingMenu>
  );
}
