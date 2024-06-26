import Projects from "../Components/Project";

const Project = () => {
  
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
          <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        </nav>
      </header>
    </div>
    < Projects />
    </>
  );
};

export default Project;
