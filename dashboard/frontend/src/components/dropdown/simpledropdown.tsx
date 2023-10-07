import { FC, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface Props {
  options: string[];
  onSelect: (option: string) => void;
}

const SimpleDropdown: FC<Props> = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>(options[0]);

  const handleSelection = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="max-h-20 h-fit w-full text-start overflow-hidden flex flex-row justify-start items-center gap-4 text-2xl font-light"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1>{selected}</h1>
        {isOpen ? <GoChevronUp /> : <GoChevronDown />}
      </button>

      <ul
        className={`max-h-52 w-52 md:w-80 overflow-y-auto absolute mt-2 py-2 bg-white border-black rounded-b-lg shadow-gray-400 shadow-2xl ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <li
            key={option}
            onClick={() => handleSelection(option)}
            className={`px-4 py-2 cursor-pointer border-gray-300 overflow-x-hidden whitespace-nowrap hover:whitespace-normal text-ellipsis ${
              index !== options.length - 1 && "border-b-[1px]"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleDropdown;
