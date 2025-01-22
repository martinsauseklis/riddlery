import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";

const columns = [
  {
    key: "product",
    label: "PRECE",
  },
  {
    key: "value",
    label: "VĒRTĪBA",
  },
  {
    key: "price",
    label: "NOMA UZ 1 NEDĒĻU",
  },
];

export default function CartContent() {

  const item = useSearchParams().get("item");
  const chosenProduct = JSON.parse(decodeURIComponent(atob(item)));

  const rows = [chosenProduct].map((product, index) => ({
    key: index,
    product: product.title,
    value: `${product.price.toLocaleString("lv")} €`,
    price: `${(15).toLocaleString("lv")} €`,
  }));

  const totalsRow = (rows: Array<T>) => {
    return rows.length == 1
      ? {
          key: rows.length,
          product: "",
          value: "KOPĀ:",
          price: rows[0].price,
        }
      : {
          key: rows.length,
          product: "",
          value: "KOPĀ:",
          price: rows.reduce((p, c) => p.price + c.price, 0),
        };
  };

  rows.push(totalsRow(rows));

  return (
    <div>
      <h1>Grozs</h1>
      <Table
        className="w-full md:w-4/5"
        aria-label="Example table with dynamic content"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell
                  {...(item.key > 0 ? { className: "font-bold" } : null)}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
