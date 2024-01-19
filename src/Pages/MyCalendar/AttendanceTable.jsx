import React from "react";
import { useTable, usePagination } from "react-table";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Table from "react-bootstrap/Table";
import { useMemo } from "react";

const AttendanceTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      { Header: "Status", accessor: "status" },
      {
        Header: "Time In",
        accessor: "clockIn",
        Cell: ({ value }) => new Date(value).toLocaleTimeString(),
      },
      {
        Header: "Time Out",
        accessor: "clockOut",
        Cell: ({ value }) => new Date(value).toLocaleTimeString(),
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    // Derive the month from the date and create a new array with 'month' property
    return data.map((item) => ({
      ...item,
      month: new Date(item.date).toLocaleString("default", { month: "long" }),
    }));
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const currentMonth = page.length > 0 ? page[0].original.month : "";
  const filteredData = tableData.filter((item) => item.month === currentMonth);

  return (
    <div>
      <div className="d-flex justify-content-center my-4">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="pagination-button"
        >
          <IoIosArrowBack />
        </button>
        <span>{currentMonth}</span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="pagination-button"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <Table bordered hover {...getTableProps()} style={{ width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
