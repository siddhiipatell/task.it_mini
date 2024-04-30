import Board from "../Components/Board";

const Boards = () => {
  
  return (
    <>
    <div>
      <header className="py-2 px-8 bg-gray-100 shadow-inner h-16">
        <nav aria-label="Breadcrumb" className="text-gray-600">
          <ol className="list-none flex items-center space-x-6 text-sm">
            <li>
              <a href="/home">Home</a>
            </li>
          </ol>
          <h1 className="text-xl font-bold text-gray-900">Boards</h1>
        </nav>
      </header>
    </div>
    < Board />
    </>
  );
};

export default Boards;
