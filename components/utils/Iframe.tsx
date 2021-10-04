import { memo } from "react";

interface IFrameProps {
  html?: string;
  src?: string;
  className?: string;
}

const IFrame = ({
  html,
  src,
  ...props
}: IFrameProps) => (
    <iframe {...props} srcDoc={html} src={src} sandbox="allow-orientation-lock" />
);

export default memo(IFrame);
