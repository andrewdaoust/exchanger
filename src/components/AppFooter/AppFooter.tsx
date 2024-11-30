import { UnstyledButton } from "@mantine/core";
import { AuthUser } from "aws-amplify/auth";
import { AuthEventData } from "@aws-amplify/ui";
import classes from './AppFooter.module.css';


export interface AppFooterProps {
  signOut: ((data?: AuthEventData | undefined) => void) | undefined;
  user: AuthUser | undefined;
}

export function AppFooter({signOut, user}: AppFooterProps) {
  return (<div className={classes.appFooter}>
    Hello {user?.signInDetails?.loginId} | <UnstyledButton 
      className={classes.signOutButton} 
      onClick={signOut}
    >Sign out</UnstyledButton>
  </div>);
}
