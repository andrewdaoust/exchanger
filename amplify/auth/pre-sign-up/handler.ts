import type { PreSignUpTriggerHandler } from 'aws-lambda';

export const handler: PreSignUpTriggerHandler = async (event) => {
  const email = event.request.userAttributes['email'];

  const validEmails = [
    "daoust.andrew@gmail.com",
    "baileewallace@gmail.com",
  ]

  if (!validEmails.includes(email)) {
    throw new Error('You are not authorized to use the app.');
  }

  return event;
};