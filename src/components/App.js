import React, { useState, useEffect } from "react";
import   "./app.css"
import Axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchProducts();
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};


  
  const fetchProducts = async () => {
    setTimeout(async () => {
      const { data } = await Axios.get(
      "https://type.fit/api/quotes?page=${page}");
			setPage(page + 1);
      const products = data;
      setProducts(products);
      console.log(products);
    }, 1000);
  };

  useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchProducts();
		setIsFetching(false);
	};

     function loadMore() {
      setPage((page) => page + 10);
     }
     
     return (
    <>
    <div className="App"><h2>Fetching Quotes using React webpack</h2>
      <div className="load-more">
       
      {products.map((products) => (
        <p>{products.text}</p>
        ))}
       <scroll />
      
       </div>
    </div>
    {isFetching && <h1>Fetching more ...</h1>}
    </>
  );
};

export default App;



