import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

const TablePagination = ({
  page,
  totalPages,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  defaultPageSize,
  showPageSizeOptions,
  showPageJump,
  paginationMaxSize,
}) => {
  const [pageState, setPageState] = useState(page);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  useEffect(() => {
    setPageState(page);
  }, [page]);

  const getSafePage = (_page) => {
    let p = _page;
    if (Number.isNaN(_page)) {
      p = page;
    }
    return Math.min(Math.max(p, 0), totalPages - 1);
  };

  const changePageSize = (size) => {
    onPageSizeChange(size);
    setPageSize(size);
  };

  const changePage = (_page) => {
    const p = getSafePage(_page);

    if (p !== pageState) {
      setPageState(p);
      onPageChange(p);
    }
  };

  const pageClick = (pageIndex) => {
    changePage(pageIndex);
  };

  const renderPages = () => {
    const currentPage = pageState;
    let startPage = 0;
    let endPage = totalPages;
    const maxSize = paginationMaxSize;

    if (maxSize) {
      if (endPage > maxSize) {
        startPage = Math.max(currentPage + 1 - Math.floor(maxSize / 2), 1);
        endPage = startPage + maxSize - 1;
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - maxSize + 1;
        }
        startPage -= 1;
      }
    }

    const pageButtons = [];
    for (let i = startPage; i < endPage; i += 1) {
      const active = currentPage === i;
      pageButtons.push(
        <PaginationItem key={i} active={active}>
          <PaginationLink onClick={() => pageClick(i)}>{i + 1}</PaginationLink>
        </PaginationItem>
      );
    }
    return pageButtons;
  };

  const renderPageJump = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i += 1) {
      pageNumbers.push(
        <DropdownItem key={i} onClick={() => changePage(i)}>
          {i + 1}
        </DropdownItem>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="text-center">
        {showPageJump && (
          <div className="float-left pt-2">
            <span>Page </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {pageState + 1}
              </DropdownToggle>
              <DropdownMenu direction="left">{renderPageJump()}</DropdownMenu>
            </UncontrolledDropdown>
            <span> of </span>
            {totalPages}
          </div>
        )}

        <Pagination
          className="d-inline-block"
          size="sm"
          listClassName="justify-content-center"
          aria-label="Page navigation example"
        >
          <PaginationItem className={`${page === 0 && 'disabled'}`}>
            <PaginationLink
              className="prev"
              onClick={() => {
                if (page === 0) return;
                changePage(page - 1);
              }}
              disabled={page === 0}
            >
              <i className="simple-icon-arrow-left" />
            </PaginationLink>
          </PaginationItem>

          {renderPages()}

          <PaginationItem
            className={`${page === totalPages - 1 && 'disabled'}`}
          >
            <PaginationLink
              className="next"
              onClick={() => {
                if (page === totalPages - 1) return;
                changePage(page + 1);
              }}
              disabled={page === totalPages - 1}
            >
              <i className="simple-icon-arrow-right" />
            </PaginationLink>
          </PaginationItem>
        </Pagination>

        {showPageSizeOptions && (
          <div className="float-right pt-2">
            <span className="text-muted text-small mr-1">Items </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {pageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {pageSizeOptions.map((size, index) => {
                  return (
                    <DropdownItem
                      key={index}
                      onClick={() => changePageSize(size)}
                    >
                      {size}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        )}
      </div>
    </>
  );
};

TablePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  showPageSizeOptions: PropTypes.bool.isRequired,
  showPageJump: PropTypes.bool.isRequired,
  paginationMaxSize: PropTypes.number,
};

export default TablePagination;
