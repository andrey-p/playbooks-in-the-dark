import { z } from "zod";
import { Item as ItemSchema } from "./items.schema";
import ItemToggle from "./item-toggle";
import styles from "./item.module.css";

type Props = {
  item: z.infer<typeof ItemSchema>;
  selected: boolean;
  onSelect: (selected: boolean) => void;
};

export default function Item(props: Props) {
  const { item, selected, onSelect } = props;

  return (
    <div className={styles.container}>
      <ItemToggle load={item.load} selected={selected} onSelect={onSelect} />
      <span className={item.load === 0 ? styles.noLoadItem : ""}>
        {item.id}
      </span>
    </div>
  );
}
