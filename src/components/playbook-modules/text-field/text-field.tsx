import { useId } from "react";
import { z } from "zod";
import styles from "./text-field.module.css";
import ExampleList from "@/components/example-list/example-list";
import type { SharedModuleProps } from '../playbook-modules.types';

const SystemModuleProps = z.object({
  examples: z.string().array().optional()
}).optional();

type Props = SharedModuleProps & {
  systemModuleData: {
    props: z.infer<typeof SystemModuleProps>
  }
  text: string;
  //onTextUpdated: (text: string) => void;
};

export default function TextField(props: Props) {
  const { systemModuleData } = props;
  const { examples } = SystemModuleProps.parse(systemModuleData.props) || {};

  const { text, onTextUpdated } = props;
  const consistentId = useId();

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={text}
        className={styles.input}
        id={consistentId}
        name={consistentId}
        onChange={(e) => onTextUpdated(e.currentTarget.value)}
      />
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor={consistentId}>
          {systemModuleData.label}
          {examples && ":"}
        </label>

        {examples && <ExampleList items={examples} />}
      </div>
    </div>
  );
}
