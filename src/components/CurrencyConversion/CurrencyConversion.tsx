import { Flex, Center } from "@mantine/core";
import { IconArrowsLeftRight } from '@tabler/icons-react';

import { CurrencyBox } from "../CurrencyBox/CurrencyBox";
import classes from './CurrencyConversion.module.css';


interface CurrencyConversionProps {
  money: string | number;
  currency: string;
  rates: { [key: string]: number };
}

export function CurrencyConversion({ money, currency, rates }: CurrencyConversionProps) {
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

function getCurrencySymbol(currencyCode: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).formatToParts(0)[0].value;
}
