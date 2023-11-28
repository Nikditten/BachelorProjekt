import { ShareWebsiteSchema, ShareWebsiteType } from "@/schemas/sharewebsite";
import { useWebsite } from "@/services/website/useWebsite";
import { IWebsite } from "@/utils/types";
import { Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import ActionButton from "../buttons/actionbutton";
import InputField from "../inputfield/inputfield";
import Modal from "../modal/modal";

interface Props {
  isShown: boolean;
  onClose: () => void;
  websiteid: string | null;
  onSubmit: (username: string) => void;
  onRemoveShare: (website: IWebsite, userid: string) => void;
}

const Share: FC<Props> = ({
  isShown,
  onClose,
  websiteid,
  onSubmit,
  onRemoveShare,
}) => {
  const { websites } = useWebsite();

  const [website, setWebsite] = useState<IWebsite | null>(null);

  useEffect(() => {
    if (websiteid && websites) {
      const website = websites.find((website) => website.id === websiteid);
      setWebsite(website!);
    }
  }, [websiteid, websites]);

  const initialValues: ShareWebsiteType = {
    username: "",
  };

  const handleSubmit = (values: ShareWebsiteType, actions: any) => {
    const { username } = values;
    const { resetForm, setSubmitting } = actions;
    onSubmit(username);
    resetForm();
    setSubmitting(false);
  };

  return (
    <Modal
      isShown={isShown}
      onClose={onClose}
    >
      <div className='flex h-full w-full flex-col items-center justify-start gap-3'>
        <h1 className='w-full text-start text-2xl'>{website?.name}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ShareWebsiteSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {(props) => (
            <Form className='flex w-full flex-col items-center justify-center gap-2 self-start'>
              <InputField
                name='username'
                label='Username'
              />

              <ActionButton disabled={props.isSubmitting}>Share</ActionButton>
            </Form>
          )}
        </Formik>

        <div className='mt-3 flex h-full w-full flex-col items-center justify-start gap-2 overflow-y-auto'>
          <div className='flex w-full flex-col items-center justify-start'>
            <h2 className='w-full text-start text-xl'>Shared with</h2>
            <div className='h-0.5 w-full bg-black' />
          </div>
          {website?.sharedWith && website.sharedWith.length > 0 ? (
            website?.sharedWith?.map((user, index) => (
              <div
                key={index}
                className='flex w-full flex-row items-center justify-between rounded-md odd:bg-gray-100 p-3'
              >
                <p className='w-full text-start text-lg'>{`${user.name} (${user.username})`}</p>

                <button
                  className='text-xl'
                  onClick={() => onRemoveShare(website, user.id)}
                >
                  <MdClose />
                </button>
              </div>
            ))
          ) : (
            <p className='w-full text-start text-lg'>
              This website is not shared with anyone.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Share;
