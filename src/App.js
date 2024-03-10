
import './App.css';
import AddProduct from './components/AddProduct';
import Categories from './components/Categories';
import CategoryPage from './components/CategoryPage';
import Header from './components/Header';
import Home from './components/Home';
import LikedProducts from './components/LikedProducts';
import Login from './components/Login';
import ProductDetail from './components/ProductDetail';
import Signup from './components/Signup';

function App() {
  return (
    <div className="App">
           <Header />
           <Home />
           <Signup />
           <Login />
           <AddProduct/>
           <Categories />
     <LikedProducts />
     <ProductDetail/>
     <CategoryPage/>

    </div>
  );
}

export default App;
