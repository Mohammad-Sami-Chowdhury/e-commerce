import Category from "../components/category/Category";
import Header from "../components/common/Header";

const ProductsPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Products" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <Category />
      </main>
    </div>
  );
};
export default ProductsPage;
