import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import AlertIcon from "./AlertIcon";
import { TiWarning } from "react-icons/ti";
import { VscError } from "react-icons/vsc";
const AlertSuccess = ({ content }) => {
  return <AlertIcon icon={<FaCheckCircle />} color={"emerald"} content={content} />;
};
const AlertInfo = ({ content }) => {
  return <AlertIcon icon={<FaInfoCircle />} color={"blue"} content={content} />;
};
const AlertWarning = ({ content }) => {
  return <AlertIcon icon={<TiWarning />} color={"yellow"} content={content} />;
};
const AlertError = ({ content }) => {
  return <AlertIcon icon={<VscError />} color={"red"} content={content} />;
};
export { AlertSuccess, AlertInfo, AlertWarning,AlertError };
