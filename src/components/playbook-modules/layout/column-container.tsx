type Props = {
  children: React.ReactNode;
};

export default function ColumnContainer(props: Props) {
  const { children } = props;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>{children}</div>
  );
}
