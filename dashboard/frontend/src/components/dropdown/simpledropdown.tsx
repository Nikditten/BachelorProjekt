import useOutsideClick from "@/utils/hooks/useOutsideClick";
import { FC, useRef, useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

interface Props {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const SimpleDropdown: FC<Props> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  const handleSelection = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex flex-row items-center justify-start w-full overflow-hidden text-2xl font-light max-h-20 h-fit text-start gap-4"
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
