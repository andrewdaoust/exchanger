import { MantineProvider} from "@mantine/core";
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

import { Converter } from "./components/Converter/Converter";
import { theme } from "./theme";
import outputs from '../amplify_outputs.json';

import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@aws-amplify/ui-react/styles.css';

const APP_ID = import.meta.env.VITE_OPENEXCHANGERATES_APP_ID;

Amplify.configure(outputs);

export default function App() {
  return <MantineProvider defaultColorScheme="dark" theme={theme}>
    <Authenticator>
      {({ signOut, user }) => (
        <Converter signOut={signOut} user={user} appId={APP_ID} />
      )}
    </Authenticator>
  </MantineProvider>;
}
