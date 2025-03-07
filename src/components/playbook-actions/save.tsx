import { useState, useRef } from "react";
import styles from "./save.module.css";

type Props = {
  savePlaybook: () => Promise<{ shareableUrl: string }>;
};

export default function SaveAction(props: Props) {
  const { savePlaybook } = props;
  const [link, setLink] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = async () => {
    const { shareableUrl } = await savePlaybook();

    setLink(shareableUrl);
  };

  const onSelect = () => {
    inputRef.current?.select();
  };

  return (
    <div className={styles.container}>
      <button onClick={onClick}>Save</button>
      {link && (
        <label>
          Shareable link
          <input
            type="text"
            value={link || ""}
            readOnly
            onSelect={onSelect}
            ref={inputRef}
          />
        </label>
      )}
    </div>
  );
}
