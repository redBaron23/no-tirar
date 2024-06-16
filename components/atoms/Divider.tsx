import { cx } from "class-variance-authority";

interface Props {
  className?: string;
}

const Divider = ({ className }: Props) => {
  return <hr className={cx("border-t border-gray-300", className)} />;
};

export default Divider;
