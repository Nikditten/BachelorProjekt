import { IWebsite } from "@/utils/types";
import { FC, useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import IconButton from "../buttons/iconbutton";
import CreateWebsiteForm from "./createwebsiteform";

interface Props {
  website: IWebsite;
  onUpdate: (name: string, url: string) => void;
  onCopy: () => void;
  onDelete: () => void;
}

const WebsiteCard: FC<Props> = ({ website, onUpdate, onCopy, onDelete }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [apiKeyText, setApiKeyText] = useState<string>(website.id);

  const handleOnCopy = () => {
    onCopy();
    setApiKeyText("Copied!");
    setTimeout(() => {
      setApiKeyText(website.id);
    }, 500);
  };

  if (editMode)
    return (
      <CreateWebsiteForm
        website={website}
        onHide={() => setEditMode(false)}
        onSubmit={onUpdate}
      />
    );

  return (
    <div className='flex h-56 w-full flex-col items-center justify-between rounded-lg p-6 shadow-md shadow-gray-400'>
      <div className='w-full text-start'>
        <h1 className='w-full text-xl font-bold'>{website.name}</h1>
        <a
          className='text-md w-full font-light underline'
          href={website.url}
          target='_blank'
          rel='noreferrer'
        >
          {website.url}
        </a>
        <h4 className='mt-3 w-full'>API key:</h4>
        <button
          className='text-start'
          onClick={handleOnCopy}
        >
          <span className='font-thin'>{apiKeyText}</span>
        </button>
      </div>

      <ul className='flex w-full flex-row items-center justify-end gap-4'>
        {website.isAdmin && (
          <li>
            <IconButton
              className='hover:text-orange-400'
              onClick={() => setEditMode(true)}
            >
              <MdEdit />
            </IconButton>
          </li>
        )}
        <li>
          <IconButton
            className='hover:text-red-600'
            onClick={onDelete}
          >
            <MdDeleteOutline />
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteCard;
