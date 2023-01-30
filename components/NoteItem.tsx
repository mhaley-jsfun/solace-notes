import type { INote } from "@/types";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import classNames from "classnames";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import Link from "next/link";
import { useDeleteNote } from "@/lib/hooks/useNotes";
import { useRouter } from "next/router";

dayjs.extend(calendar);

export default function NoteItem({
  item,
  selected,
}: {
  item: INote;
  selected?: boolean;
}) {
  const router = useRouter();

  const { mutate: deleteNote } = useDeleteNote();

  return (
    <Link href={`/notes/${item.id}`}>
      <div
        className={classNames(
          "w-full flex flex-row items-center px-4 py-6 my-1 rounded-lg",
          {
            "bg-white shadow-md": selected,
          }
        )}
      >
        <div className="flex grow flex-col items-start pl-4">
          <h6 className="text-xl text-purple-800 font-semibold">
            {item.title}
          </h6>

          <p className="text-sm text-purple-400 mt-3">
            {dayjs(item.created_at).calendar()}
          </p>
        </div>

        <div className="flex pr-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              confirmAlert({
                customUI: ({ onClose }) => {
                  return (
                    <div className="shadow-xl rounded-xl p-4">
                      <h1 className="font-semibold pb-3">Are you sure?</h1>
                      <p className="pb-4">You want to delete this note?</p>

                      <button
                        className="py-3 px-6 text-white rounded-lg bg-purple-800 shadow-lg block md:inline-block mr-4"
                        onClick={() => {
                          deleteNote(item.id as string, {
                            onSuccess: () => {
                              router.push("/");
                            },
                          });
                          onClose();
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className="py-3 px-6 bg-white rounded-lg text-purple-800 shadow-lg block md:inline-block"
                        onClick={onClose}
                      >
                        No
                      </button>
                    </div>
                  );
                },
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="30px"
              height="30px"
            >
              <path
                fill="#b39ddb"
                d="M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"
              />
              <path fill="#9575cd" d="M28 6L20 6 14 12 34 12z" />
              <path
                fill="#7e57c2"
                d="M10,8h28c1.1,0,2,0.9,2,2v2H8v-2C8,8.9,8.9,8,10,8z"
              />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
