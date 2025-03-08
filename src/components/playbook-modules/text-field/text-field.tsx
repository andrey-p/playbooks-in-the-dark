import { useId } from "react";
import { z } from "zod";
import styles from "./text-field.module.css";
import ExampleList from "@/components/example-list/example-list";
import type { SharedModuleProps } from '../playbook-modules.types';

const SystemModuleProps = z.object({
  examples: z.string().array().optional()
}).optional();

type Props = SharedModuleProps<string> & {
  systemModuleData: {
    props: z.infer<typeof SystemModuleProps>
  }
};

export default function TextField(props: Props) {
  const { systemModuleData, value, onUpdate } = props;
  const { examples } = SystemModuleProps.parse(systemModuleData.props) || {};

  const consistentId = useId();

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        className={styles.input}
        id={consistentId}
        name={consistentId}
        onChange={(e) => onUpdate(e.currentTarget.value)}
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
