import React from 'react';
import ReactPaginate from 'react-paginate';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/paginator.css';

const Paginator = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    <Pagination className="pagination">
      <LinkContainer
        className="page-link"
        key={'firstProviderPage'}
        to={keyword ? `/searchpage/${keyword}/page/1` : `/page/1`}>
        <Pagination.First />
      </LinkContainer>

      {[...Array(pages).keys()].map((i) => (
        <>
          <LinkContainer
            className="page-link"
            key={i + 1}
            to={
              keyword
                ? `/searchpage/${keyword}/page/${i + 1}`
                : `/page/${i + 1}`
            }>
            <Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
          </LinkContainer>
        </>
      ))}
      <LinkContainer
        className="page-link"
        key={page + 1}
        to={
          keyword
            ? `/searchpage/${keyword}/page/${page + 1}`
            : `/page/${page + 1}`
        }>
        <Pagination.Next />
      </LinkContainer>
      <LinkContainer
        className="page-link"
        key={'lastProviderPage'}
        to={
          keyword ? `/searchpage/${keyword}/page/${pages}` : `/page/${pages}`
        }>
        <Pagination.Last />
      </LinkContainer>
    </Pagination>
  );
};

export default Paginator;
