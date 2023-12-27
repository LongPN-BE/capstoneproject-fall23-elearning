import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import AllCourses from '../../components/Landing/AllCourses/AllCourses';

function CoursesPaginate({ items, itemsPerPage }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log('currentItems: '.currentItems);
    setCurrentItems(currentItems);
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <Container>
        {currentItems?.length > 0 ? (
          <AllCourses courses={currentItems} />
        ) : (
          <>
            <div class="container mt-5">
              <div class="container p-4">
                <h2 style={{ textAlign: 'center' }}>Không tìm thấy dữ liệu</h2>
              </div>
            </div>
            <hr />
          </>
        )}
        <div style={{ padding: '0 12px' }}>
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </Container>
    </>
  );
}

export default CoursesPaginate;
