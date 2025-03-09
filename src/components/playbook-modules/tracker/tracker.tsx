import { z } from "zod";
import { SharedModuleProps } from "../playbook-modules.types";
import schemas from "./tracker.schema";
import SimpleTracker from "@/components/trackers/simple-tracker";

type Props = SharedModuleProps<z.infer<typeof schemas.Value>> & {
  moduleDefinition: {
    props: z.infer<typeof schemas.SystemProps>;
  };
};

export default function Tracker(props: Props) {
  const { moduleDefinition, value, onUpdate } = props;
  const { props: moduleProps, label } = moduleDefinition;
  const { max, trackerType } = moduleProps;

  return (
    <div>
      <h3>{label}</h3>

      <SimpleTracker
        value={value}
        max={max}
        type={trackerType}
        onValueSelect={onUpdate}
      />
    </div>
  );
}
