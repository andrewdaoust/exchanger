import { useState } from "react";
import { MantineProvider, Select, NumberInput, Flex, Container, Center, UnstyledButton } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";
import { IconArrowsLeftRight } from '@tabler/icons-react';

import { theme } from "./theme";
import classes from './App.module.css';

import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

const APP_ID = import.meta.env.VITE_OPENEXCHANGERATES_APP_ID;

Amplify.configure(outputs);

export default function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [exchange, setExchange] = useState<any>({});
  const [currency, setCurrency] = useState<string>('');
  const [money, setMoney] = useState<string | number>('');

  const onDateChange = async (value: DateValue) => {
    setDate(value);
    if (value) {
      const formattedDate = value.toISOString().split('T')[0];
      const response = await fetch(`https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${APP_ID}`);
      const data = await response.json();
      console.log(data.rates);
      setExchange(data.rates);
    }
  };

  const onCurrencyChange = (value: string | null) => {
    if (value) {
      console.log(value)
      setCurrency(value);
    }
  };

  return <MantineProvider defaultColorScheme="dark" theme={theme}>
    <Authenticator>
      {({ signOut, user }) => (
        <main>
          <Center>
            <h1>The Benevity Sucks Currency Converter</h1>
          </Center>
          <Flex>
            <DatePickerInput
              className={classes.picker}
              value={date}
              onChange={onDateChange}
              placeholder="Pick a date"
              label="Pick a date"
              firstDayOfWeek={0}
              minDate={new Date(1999, 1, 1)}
              maxDate={new Date()}
            />

            <Select
              className={classes.picker}
              label="Pick a currency"
              placeholder="Pick a currency"
              data={Object.keys(exchange)}
              onChange={onCurrencyChange}
              searchable
            />

            <NumberInput
              className={classes.picker}
              value={money}
              onChange={setMoney}
              label="Enter an amount"
              placeholder="Enter an amount"
              hideControls
            />
          </Flex>

          <CurrencyConversion money={money} currency={currency} rates={exchange} />
          <div className={classes.foot}>
            Hello {user?.signInDetails?.loginId} | <UnstyledButton 
              className={classes.signOutButton} 
              onClick={signOut}
            >Sign out</UnstyledButton>
          </div>
        </main>
      )}
    </Authenticator>
  </MantineProvider>;
}

function getCurrencySymbol(currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).formatToParts(0)[0].value;
}

interface CurrencyConversionProps {
  money: string | number;
  currency: string;
  rates: { [key: string]: number };
}

function CurrencyConversion({ money, currency, rates }: CurrencyConversionProps) {
  if (money === '' || currency === '' || rates.length === 0) {
    return <></>
  }

  let currencySymbol = getCurrencySymbol(currency);
  let converted = parseFloat(money.toString()) / rates[currency]
  return (
    <Center>
      <Flex className={classes.wrapper}>
        <CurrencyBox money={money} currency={currency} symbol={currencySymbol} />
        <div className={classes.iconWrapper}>
          <IconArrowsLeftRight className={classes.icon} stroke={1.5} />
        </div>
        <CurrencyBox money={converted.toFixed(2)} currency="USD" symbol="$" />
      </Flex>
    </Center>
  )
}

interface CurrencyBoxProps {
  money: number | string;
  currency: string;
  symbol: string;
};


function CurrencyBox({ money, currency, symbol }: CurrencyBoxProps) {
  let display = (currency === symbol) ? `${money} ${symbol}` : `${symbol}${money}`;
  return (
    <div className={classes.currencyBox}>
      <Container>
        <div className={classes.currency}>{currency}</div>
        <Center>
          <div className={classes.amount}>{display}</div>
        </Center>
      </Container>
    </div>
  )
}
