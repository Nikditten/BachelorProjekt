import { IWebsite } from "@/utils/types";
import { FC, useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdGroup,
  MdOpenInNew,
  MdPersonRemove,
} from "react-icons/md";
import IconButton from "../buttons/iconbutton";
import CreateWebsiteForm from "./createwebsiteform";

interface Props {
  website: IWebsite;
  onUpdate: (name: string, url: string) => void;
  onShare: () => void;
  onCopy: () => void;
  onDelete: () => void;
}

const WebsiteCard: FC<Props> = ({
  website,
  onShare,
  onUpdate,
  onCopy,
  onDelete,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [apiKeyText, setApiKeyText] = useState<string>(website.key);

  const handleOnCopy = () => {
    onCopy();
    setApiKeyText("Copied!");
    setTimeout(() => {
      setApiKeyText(website.key);
    }, 500);
  };

  if (editMode) {
    return (
      <CreateWebsiteForm
        website={website}
        onHide={() => setEditMode(false)}
        onSubmit={onUpdate}
      />
    );
  }

  return (
    <div
      data-testid='website-card'
      className='flex h-56 w-full flex-col items-center justify-between rounded-lg p-6 shadow-md shadow-gray-400'
    >
      <div className='w-full text-start'>
        <div className='flex w-full flex-row items-center justify-between text-xl'>
          <h1 className='w-full font-bold'>{website.name}</h1>
          <a
            href={website.url}
            target='_blank'
            rel='noreferrer'
          >
            <MdOpenInNew />
          </a>
        </div>
        <h4 className='mt-3 w-full'>API key:</h4>
        <button
          className='text-start'
          onClick={handleOnCopy}
        >
          <span className='font-thin hover:text-gray-600'>{apiKeyText}</span>
        </button>
      </div>

      <ul className='flex w-full flex-row items-center justify-end gap-4'>
        {website.isAdmin && (
          <li>
            <IconButton
              className='group relative hover:text-green-600'
              onClick={onShare}
            >
              <h2 className='absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-black group-hover:text-green-600'>
                {website.sharedWith?.length}
              </h2>
              <MdGroup />
            </IconButton>
          </li>
        )}
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
            {website.isAdmin ? <MdDelete /> : <MdPersonRemove />}
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default WebsiteCard;
