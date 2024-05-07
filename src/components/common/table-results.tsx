import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  export function TableResults({ data }: string[]) {
    return (
      <Table>
        <TableBody>
          {
            data.length > 0
          ? data.map((data) => (
            <TableRow key={data}>
              <TableCell className="font-medium">{data}</TableCell>
            </TableRow>
          ))
          : <TableRow key={data}>
          <TableCell className="font-medium">Nothing in list</TableCell>
        </TableRow>
        }
        </TableBody>
      </Table>
    )
  }
  