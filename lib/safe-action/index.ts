import { UserRole } from "@prisma/client";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { z } from "zod";
import { auth } from "../auth";

class ActionError extends Error {}

// Base client.
const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next, clientInput, metadata }) => {
  console.log("LOGGING MIDDLEWARE");

  // Here we await the action execution.
  const result = await next({ ctx: null });

  console.log("Result ->", result);
  console.log("Client input ->", clientInput);
  console.log("Metadata ->", metadata);

  // And then return the result of the awaited action.
  return result;
});

const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Session not found!");
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error("Session is not valid!");
  }

  return next({ ctx: { userId, session } });
});

const businessActionClient = authActionClient.use(async ({ next, ctx }) => {
  const userId = ctx.userId;
  const role = ctx.session.user.role;

  if (role !== UserRole.BUSINESS) {
    throw new Error("Lack of permissions");
  }

  return next({ ctx: { userId } });
});

export { authActionClient, businessActionClient };
