"use client";

import { useRef, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as Avatar from "@radix-ui/react-avatar";

import { changeAvatar } from "../actions";

import "./styles.css";

export default function ChangeAvatarForm({
  playtesterId,
  avatar,
}: {
  playtesterId: string;
  avatar?: string;
}) {
  const ref = useRef<HTMLFormElement>(null);
  const onDrop = useCallback(() => {
    ref.current?.requestSubmit();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form action={changeAvatar} className="c-avatar-change-form" ref={ref}>
      <div {...getRootProps()}>
        <input {...getInputProps()} name="avatar" />
        <Avatar.Root className="c-avatar" data-is-drag-active={isDragActive}>
          <Avatar.Image
            className="c-avatar-image"
            src={avatar || undefined}
            alt={`Avatar ${playtesterId}`}
          />
          <Avatar.Fallback className="c-avatar-fallback" delayMs={600}>
            {playtesterId}
          </Avatar.Fallback>
        </Avatar.Root>
      </div>

      <input
        name="playtesterId"
        type="text"
        value={playtesterId || undefined}
        readOnly
        hidden
      />
    </form>
  );
}
