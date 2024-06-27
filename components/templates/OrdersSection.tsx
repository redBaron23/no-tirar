import MiniOrder from "../molecules/MiniOrder";

const transactions = [
  { id: "x1db-a5k7", date: "Hoy 11:55", status: "REALIZADO", amount: 4653 },
  { id: "x1db-5k7", date: "Hoy 12:00", status: "RETIRO", amount: "3200" },
];

const OrdersSection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold">Hoy</h3>
      {transactions.map((transaction) => (
        <MiniOrder
          key={transaction.id}
          id={transaction.id}
          date={transaction.date}
          status={transaction.status}
          amount={transaction.amount}
        />
      ))}
    </div>
  );
};

export default OrdersSection;
