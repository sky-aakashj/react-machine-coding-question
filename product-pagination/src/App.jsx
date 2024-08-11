import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemPerPage = 6;

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${itemPerPage}&skip=${
        page * itemPerPage - itemPerPage
      }`
    );
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / itemPerPage));
    }
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="pagination">
        <span
          className={page > 1 ? "" : "pagination__disabled"}
          onClick={() => selectPageHandler(page - 1)}
        >
          ◀
        </span>
        {pageNumbers.map((pageNumber) => (
          <span
            key={pageNumber}
            className={pageNumber === page ? "active" : ""}
            onClick={() => selectPageHandler(pageNumber)}
          >
            {pageNumber}
          </span>
        ))}
        <span
          className={page < totalPages ? "" : "pagination__disabled"}
          onClick={() => selectPageHandler(page + 1)}
        >
          ▶
        </span>
      </div>
    );
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}> Product listing</h1>
      <div>
        {products && (
          <div className="products">
            {products.map((product) => (
              <span key={product.id} className="products__single">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            ))}
          </div>
        )}
        {products.length > 0 && renderPagination()}
      </div>
    </>
  );
}

export default App;
