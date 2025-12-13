import classNames from "classnames";
import { Loader } from "lucide-react";

import "./styles.css";

const prefix = "c-spinner";

/**
 * Renders a `<Spinner />` component
 * @param {object} props
 * @param {string} props.className - Custom class name
 */
function Spinner({ className }: { className?: string }) {
  const customClassName = classNames(prefix, className);
  return <Loader className={customClassName} />;
}

export default Spinner;
