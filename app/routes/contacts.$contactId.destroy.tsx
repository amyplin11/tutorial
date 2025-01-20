import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { json, redirect } from "@remix-run/node";

import { deleteContact, getContact } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  await deleteContact(params.contactId);
  return redirect("/");
};

export default function DestroyContact() {
  const { contact } = useLoaderData<typeof loader>();

  return <div></div>;
}
