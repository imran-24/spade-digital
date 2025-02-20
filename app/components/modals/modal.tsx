import { X } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";
import Spinner from "../spinner";

interface ModalProps {
  disabled?: boolean;
  isOpen?: boolean;
  onSubmit: () => void;
  onClose: () => void;
  actionLabel: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({
  actionLabel,
  body,
  footer,
  onClose,
  onSubmit,
  disabled,
  isOpen,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(false);
    setTimeout(onClose, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    try {
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/50 overflow-x-hidden overflow-y-auto'>
      <div className='relative w-full h-full sm:h-auto sm:w-3/5 md:w-4/6 lg:w-3/6 xl:w-2/5'>
        <div
          className={`
            h-full translate duration-300
            ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }
          `}
        >
          <div className='h-full w-full relative flex flex-col rounded-lg bg-white px-4 shadow-lg'>
            <header className='p-3'>
              <button
                onClick={handleClose}
                className='absolute right-3 p-1 rounded-full hover:bg-neutral-300/50 transition'
              >
                <X size={22} />
              </button>
            </header>

            <main className='h-full'>{body}</main>

            <footer className='flex flex-col gap-2 items-center my-4'>
              <div className='w-full flex items-center gap-2'>
                {disabled ? (
                  <div className="px-4">
                    <Spinner />
                  </div>
                ) : (
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                )}
              </div>
              {footer}
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
