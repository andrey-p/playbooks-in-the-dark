export type ToggleProps = {
  size?: number;
  filled?: boolean;
  highlighted?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
