import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import {
  Table,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup,
  Form,
  Input,
  Label,
} from 'reactstrap';
import {
  FaChevronRight,
  FaChevronLeft,
  FaSort,
  FaSortUp,
  FaSortDown,
} from 'react-icons/fa';

export default function CustomTable({
  columns,
  data,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  variant = 'striped',
  colorScheme = 'blue',
  onPageChange,
  onPageSizeChange,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    canPreviousPage,
    canNextPage,
    pageOptions,
    setPageSize,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: initialPageSize },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const renderSortIcon = (column) => {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return <FaSortDown />;
      }
      return <FaSortUp />;
    }
    return <FaSort />;
  };

  // Page change handler
  const handlePageChange = (page) => {
    onPageChange && onPageChange(page);
    gotoPage(page);
  };

  // Page size change handler
  const handlePageSizeChange = (size) => {
    onPageSizeChange && onPageSizeChange(size);
    setPageSize(size);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table
            {...getTableProps()}
            striped={variant === 'striped'}
            className={`table-${colorScheme}`}
            responsive
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                    >
                      {column.render('Header')}
                      {renderSortIcon(column)}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} key={row.id}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()} key={cell.column.id}>
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-between align-items-center">
        <Col xs="auto">
          <ButtonGroup>
            <Button
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={!canPreviousPage}
              variant="outline-primary"
            >
              <FaChevronLeft />
              Previous
            </Button>
            <Button
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={!canNextPage}
              variant="outline-primary"
            >
              Next
              <FaChevronRight />
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs="auto">
          <Form inline>
            <Label className="mr-2" for="formPageSizeSelect">Page Size:</Label>
            <Input
              type="select"
              name="select"
              id="formPageSizeSelect"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Input>
          </Form>
        </Col>
        <Col xs="auto">
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
        </Col>
      </Row>
    </Container>
  );
}

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialPageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  variant: PropTypes.string,
  colorScheme: PropTypes.string,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

CustomTable.defaultProps = {
  initialPageSize: 10,
  pageSizeOptions: [10, 20, 30, 40, 50],
  variant: 'striped',
  colorScheme: 'blue',
};
