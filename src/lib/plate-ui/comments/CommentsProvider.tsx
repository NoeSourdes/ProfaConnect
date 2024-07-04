import { type ReactNode } from "react";

import { CommentsProvider as CommentsProviderPrimitive } from "@udecode/plate-comments";

export function CommentsProvider({ children }: { children: ReactNode }) {
  return (
    <CommentsProviderPrimitive
      myUserId="1"
      /* eslint-disable no-console */
      onCommentAdd={(comment) => console.log("Comment added", comment)}
      onCommentDelete={(comment) => console.log("Comment deleted", comment)}
      onCommentUpdate={(comment) => console.log("Comment updated", comment)}
      /* eslint-enable no-console */
    >
      {children}
    </CommentsProviderPrimitive>
  );
}
