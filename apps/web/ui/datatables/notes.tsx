"use client"

import { Block } from "@/lib/zod"
import { useState } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import {useEditor} from "tldraw"


import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    VisibilityState,
    Row
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui"

import { Button } from "@repo/ui"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    Input,
    Checkbox
} from "@repo/ui"

import { MoreHorizontal, ChevronsUpDown, NotepadText, Settings2 } from "lucide-react"



export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const payments: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
    // ...
]

function NoteNameCell({ row }: { row: Row<Block> }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const params = new URLSearchParams(searchParams)
    const canvasEditor = useEditor()
    const shapeId = searchParams.get("shape")
    const selectedShape = canvasEditor.getShape(shapeId || "")

    let name = row.original.properties?.title;
    if (!name) name = "Untitled"
    return <div className="text-left font-medium">
        <Button variant="ghost" className="p-0 items-center" onClick={() => {
            if (selectedShape && !selectedShape.meta?.noteId) {
                canvasEditor.updateShape({
                    id: selectedShape.id,
                    type: "shape",
                    meta: {
                        ...selectedShape.meta,
                        noteId: row.original.id
                    }
                })
            }

            params.set("note", row.original.id)
            router.push(`${pathname}?${params.toString()}`);
        }}>
            <NotepadText className="h-4 w-4 mr-2 text-neutral-500" />
            {name}
        </Button>
    </div>
}
export const columns: ColumnDef<Block>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && "indeterminate")
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            let name = row.original.properties?.title;
            if (!name) name = "Untitled"
            return <NoteNameCell row={row} />
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <div className="text-left">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="items-center px-0"
                    >
                        created at
                        <ChevronsUpDown className="ml-2 h-3 w-3" />
                    </Button>

                </div>
            )
        },
        cell: ({ row }) => {
            const created_at = row.original.created_at
            // example created_at: 2024-10-02T11:15:59.059Z
            const formatted = new Date(created_at).toLocaleString()

            return <div className="">{formatted}</div>
        }
    },
    // {
    //     accessorKey: "amount",
    //     header: () => <div className="text-right">Amount</div>,
    //     cell: ({ row }) => {
    //         const amount = parseFloat(row.getValue("amount"))
    //         const formatted = new Intl.NumberFormat("en-US", {
    //             style: "currency",
    //             currency: "USD",
    //         }).format(amount)

    //         return <div className="text-right font-medium">{formatted}</div>
    //     },
    // },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

            return (
                <div className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0 text-right items-center">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Edit note
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete note</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                </div>
            )
        },
    },
]


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    })

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Filter notes..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm py-0 h-8"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto py-0 items-center h-8">
                            <Settings2 className="mr-2 h-3 w-3" />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="h-2 py-0">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-6 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                {/* <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button> */}
            </div>
        </div>
    )
}