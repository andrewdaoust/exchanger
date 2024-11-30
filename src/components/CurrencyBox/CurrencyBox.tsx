import { Container, Center } from "@mantine/core";
import classes from './CurrencyBox.module.css';


interface CurrencyBoxProps {
  money: number | string;
  currency: string;
  symbol: string;
};

export function CurrencyBox({ money, currency, symbol }: CurrencyBoxProps) {
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
