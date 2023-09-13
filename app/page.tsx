import CustomSelect from "./components/CustomSelect";
import styles from "./page.module.scss";

const options = [
  "Payment Processing Fees",
  "Payroll Bonus",
  "SUM",
  "Payroll Bonus S&M",
  "Payroll Bonus G&A",
  "Salary Increase Month",
];

export default function Home() {
  return (
    <main className={styles.customSelect}>
      <CustomSelect options={options} />
    </main>
  );
}
