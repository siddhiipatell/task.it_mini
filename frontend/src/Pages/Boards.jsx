import Board from "../Components/Board";

const Boards = () => {
  return (
    <>
      <header className="py-2 px-8 bg-gray-100 shadow-inner h-16">
        <nav aria-label="Breadcrumb" className="text-gray-600">
          <ol className="list-none flex items-center space-x-6 text-sm">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <p>	&gt;</p>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
          </ol>
          <h1 className="text-xl font-bold text-gray-900">Boards</h1>
        </nav>
      </header>
      <div className="ml-8 mt-10 grid grid-cols-3">
        <div className="mr-8">
          <h1 className="text-lg text-gray-500 mb-2">
            <span className="bg-primary-gradient px-1.5 rounded-xl mr-2"></span>
            Boards
          </h1>
        </div>
      </div>
      <div></div>
      <Board />
    </>
  );
};

export default Boards;
