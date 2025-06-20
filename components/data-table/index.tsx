import React from "react";
import { type ColumnDef, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@core/components/ui/table";
import { type Table as TanstackTable } from "@tanstack/react-table";
import { TableContainer } from "../table-container";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TanstackTable<TData>;
  summaryRow?: React.ReactNode;
  renderSubComponent?: (props: { row: any }) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  table,
  summaryRow,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={
                      header.column.columnDef.size &&
                        header.column.columnDef.size !==
                        table._getDefaultColumnDef().size
                        ? { width: `${header.column.columnDef.size}px` }
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={
                          cell.column.columnDef.size &&
                            cell.column.columnDef.size !==
                            table._getDefaultColumnDef().size
                            ? { width: `${cell.column.columnDef.size}px` }
                            : undefined
                        }
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {row.getIsExpanded() && renderSubComponent && (
                    renderSubComponent({ row })
                  )}
                </React.Fragment>
              ))}
              {summaryRow}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Geen resultaten.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
