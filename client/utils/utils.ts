import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export interface Agent {
  id: string;
  title: string;
  caller_name: string;
  created_at: Date;
  situation: string;
  voice: string;
  relation_to_patient: string;
  call_number: string;
  questionnaires: { question: string; answer: string }[];
  schedule: string;
  repeatitions: number;
  is_completed: boolean;
  email: string;
}
export function isCallCompleted(agent: Agent): boolean {
  const startDate = new Date(agent.created_at);

  const scheduleMap: { [key: string]: number } = {
    "30min": 30 * 60 * 1000, // 30 minutes in ms
    "1hr": 60 * 60 * 1000, // 1 hour in ms
    "3hr": 3 * 60 * 60 * 1000, // 3 hours in ms
    "6hr": 6 * 60 * 60 * 1000, // 6 hours in ms
    "12hr": 12 * 60 * 60 * 1000, // 12 hours in ms
    "24hr": 24 * 60 * 60 * 1000, // 24 hours in ms
  };

  const scheduleInterval = scheduleMap[agent.schedule];

  if (!scheduleInterval) {
    console.error("Invalid schedule value");
    return false;
  }
  const totalDuration = scheduleInterval * agent.repeatitions;
  const endTime = new Date(startDate.getTime() + totalDuration);

  const currentTime = new Date();
  return currentTime >= endTime;
}
