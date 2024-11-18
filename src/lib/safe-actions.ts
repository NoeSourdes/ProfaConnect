import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { zodAdapter } from "next-safe-action/adapters/zod";
import { currentUser } from "./auth/current-user";

export class ActionError extends Error {}
export const action = createSafeActionClient({
  validationAdapter: zodAdapter(),
  handleServerError: (e) => {
    console.error("Action server error occurred:", e.message);
    if (e instanceof ActionError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, clientInput, bindArgsClientInputs, ctx }) => {
  const start = Date.now();
  const result = await next();

  const end = Date.now();
  const durationInMs = end - start;

  console.dir(
    {
      durationInMs,
      clientInput,
      bindArgsClientInputs,
      result,
    },
    { depth: null }
  );

  return result;
});

// AuthAction sans métadonnées
export const authAction = createSafeActionClient({
  validationAdapter: zodAdapter(),
  handleServerError: (e) => {
    console.error("Action server error occurred:", e.message);
    if (e instanceof ActionError) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next, ctx }) => {
  const user = await currentUser();

  if (!user) {
    throw new ActionError("You must be logged in");
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  });
});
