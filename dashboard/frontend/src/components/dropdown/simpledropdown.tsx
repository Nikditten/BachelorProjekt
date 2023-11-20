import { useOutsideClick } from "@/utils/hooks";
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
    <div
      className='relative'
      ref={ref}
    >
      <button
        type='button'
        className='flex w-full flex-row items-center justify-start gap-4 overflow-hidden text-start text-2xl font-light'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1>{selected}</h1>
        {isOpen ? <GoChevronUp /> : <GoChevronDown />}
      </button>

      <ul
        className={`absolute mt-2 max-h-52 w-52 overflow-y-auto rounded-b-lg border-black bg-white py-2 shadow-2xl shadow-gray-400 md:w-80 ${
          isOpen ? "visible" : "hidden"
        }`}
      >
        {options.map((option, index) => (
          <li
            key={option}
            onClick={() => handleSelection(option)}
            className={`cursor-pointer overflow-x-hidden text-ellipsis whitespace-nowrap border-gray-300 px-4 py-2 hover:whitespace-normal ${
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
