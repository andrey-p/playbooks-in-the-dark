"use server";

import { Resource } from "sst";
import { get, put } from "./integrations/dynamodb";
import { nanoid } from "nanoid";
import type { UserData } from "@/types";

export const getCharacter = async (id: string) => {
  const result = await get(Resource.sheets.name, { id });

  return result as UserData;
};

// very very basic validation
//
// this data is mostly arbitrary, and not rendered unsafely via React
// so a size limit is probably the best way to validate this for now
const validateData = (data: UserData) => {
  if (JSON.stringify(data).length > 4000) {
    throw new Error("playbook size too large");
  }
};

export const saveCharacter = async (data: UserData) => {
  if (!data.id) {
    data.id = nanoid();
  }

  try {
    validateData(data);
  } catch {
    throw new Error("Couldn't save playbook");
  }

  await put(Resource.sheets.name, data);

  return getCharacter(data.id);
};
