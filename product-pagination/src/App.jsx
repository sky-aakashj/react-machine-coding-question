import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemPerPage = 10;

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

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      <h1> Product listing</h1>
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
        {products.length > 0 && (
          <div className="pagination">
            <span
              className={page > 1 ? "" : "pagination__disabled"}
              onClick={() => {
                selectPageHandler(page - 1);
              }}
            >
              ◀
            </span>
            {[...Array(totalPages)].map((_, i) => {
              return (
                <span
                  className={page === i + 1 ? "active" : ""}
                  key={i}
                  onClick={() => {
                    selectPageHandler(i + 1);
                  }}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              className={page < totalPages ? "" : "pagination__disabled"}
              onClick={() => {
                selectPageHandler(page + 1);
              }}
            >
              ▶
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
