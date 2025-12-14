"use client";
import { editPlaytester } from "app/dashboard/contact/[contactId]/edit/actions";
import Spinner from "components/spinner";
import { Save } from "lucide-react";
import { useActionState } from "react";

export default function PlaytesterNoteForm({
  playtesterId,
  notes,
}: {
  playtesterId: string;
  notes: string;
}) {
  const [, action, pending] = useActionState(editPlaytester, false);
  return (
    <form action={action}>
      <input
        name="playtesterId"
        type="text"
        value={playtesterId}
        readOnly
        hidden
      />
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={notes} rows={10} />
      </label>
      <footer>
        <button className="c-button" type="submit" disabled={pending}>
          {pending ? <Spinner /> : <Save />} Save
        </button>
      </footer>
    </form>
  );
}
