import type { ReactNode, ScriptHTMLAttributes } from "react";

interface NextScriptProps extends ScriptHTMLAttributes<HTMLScriptElement> {
  children?: ReactNode;
  strategy?: string;
}

export default function Script({
  children,
  strategy,
  dangerouslySetInnerHTML,
  ...rest
}: NextScriptProps) {
  if (dangerouslySetInnerHTML) {
    return <script {...rest} dangerouslySetInnerHTML={dangerouslySetInnerHTML} />;
  }

  return <script {...rest}>{children}</script>;
}

