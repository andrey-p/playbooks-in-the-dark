'use server';

export const getEnvVar = async (name: string): Promise<string | null> => {
  return process.env[`PLAYBOOKS_${name}`] || null;
};
