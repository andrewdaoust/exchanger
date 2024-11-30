
import { useState } from "react";
import { Select, NumberInput, Flex, Center } from "@mantine/core";
import { DatePickerInput, DateValue } from "@mantine/dates";

import { AppFooter, AppFooterProps } from "../AppFooter/AppFooter";
import { CurrencyConversion } from "../CurrencyConversion/CurrencyConversion";

import classes from './Converter.module.css';


interface ConverterProps extends AppFooterProps {
  appId: string;
}

export function Converter({ signOut, user, appId }: ConverterProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [exchange, setExchange] = useState<any>({});
  const [currency, setCurrency] = useState<string>('');
  const [money, setMoney] = useState<string | number>('');

  const onDateChange = async (value: DateValue) => {
    setDate(value);
    if (value) {
      const formattedDate = value.toISOString().split('T')[0];
      const response = await fetch(`https://openexchangerates.org/api/historical/${formattedDate}.json?app_id=${appId}`);
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

  return (
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
      <AppFooter signOut={signOut} user={user} />
    </main>
  );
}
