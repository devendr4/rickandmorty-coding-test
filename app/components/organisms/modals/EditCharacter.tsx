import { Character } from "@/app/types";
import { FC } from "react";
import { CharacterForm } from "@/app/components/organisms/forms/Character";
import { AiOutlineClose } from "react-icons/ai";
interface Props {
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  character: Character;
}

export const EditCharacterModal: FC<Props> = ({
  setOpen,
  isOpen,
  character,
}) => {
  return isOpen ? (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Edit {character.name}</h3>

              <button
                className="float-right ml-auto border-0  p-1 text-3xl font-semibold leading-none text-green outline-none focus:outline-none"
                onClick={() => setOpen(false)}
              >
                <span className="block h-6 w-6  text-2xl text-black  outline-none focus:outline-none">
                  <AiOutlineClose />
                </span>
              </button>
            </div>
            <div className="relative flex-auto p-6">
              <CharacterForm
                editedCharacter={character}
                afterSubmit={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-50 " />
    </>
  ) : null;
};
