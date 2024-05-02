import { Link } from "react-router-dom";
import logofullsvg from "../assets/images/logo-full.svg";
import Board from "../assets/images/board.png";

const LandingPage = () => {
  return (
    <main className="h-screen bg-white">
      <header className="flex items-center justify-between p-4 md:px-8">
        <img src={logofullsvg} alt="Task.it Logo" width="120" />
        <nav>
          <ul className="flex items-center space-x-4 text-sm">
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-2 py-1 space-x-2 bg-gray-100 rounded-md hover:text-primary"
              >
                <i className="ri-github-fill"></i>
                <p>Github</p>
              </a>
            </li>
            <li>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-2 py-1 space-x-2 bg-gray-100 rounded-md hover:text-primary"
              >
                <i className="ri-twitter-x-fill"></i>
                <p>Twitter</p>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="text-gray-600 body-font">
        <div className="container flex flex-col items-center pl-10 py-24 mx-auto md:flex-row">
          <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-5 md:pr-10 md:items-start md:text-left md:mb-0">
            <h1 className="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl">
              Task.it
              <br className="hidden lg:inline-block" />
              Tasks Done Right!
            </h1>
            <p className="leading-relaxed">
              Simple No BS project management application with a minimalist UI.
            </p>
            <ul className="pl-6 mt-4 list-disc">
              <li>Simple and User friendly</li>
              <li>Support for multiple Orgs</li>
              <li>Role based access control</li>
            </ul>
            <div className="flex justify-center mt-8 space-x-4">
              <button className="bg-primary-gradient text-white shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:shadow-lg px-3 py-2 rounded">
                <Link to="/signup" passHref>
                  Create New Account
                </Link>
              </button>
              <button className="bg-gray-100 text-gray-800 border focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:bg-gray-200 px-3 py-2 rounded">
                <Link to="/login" passHref>
                  Login
                </Link>
              </button>
            </div>
          </div>
          <div className="w-2/6 mr-10 shadow-lg">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={Board}
            />
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container px-5 pb-24 mx-auto">
          <div className="mb-20 text-center">
            <h1 className="mb-4 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
              Explore Features
            </h1>
            <p className="mx-auto text-base leading-relaxed xl:w-2/4 lg:w-3/4">
              A lot of cool features with a stress on minimalism
            </p>
          </div>
          
          <div className="flex flex-wrap -mx-2 lg:w-4/5 sm:mx-auto sm:mb-2">
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">Multiple Orgs</span>
            </div>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">Kanban Board</span>
            </div>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">Invite users</span>
            </div>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">Role based access</span>
            </div>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">Attachments</span>
            </div>
          </div>
          <div className="w-full p-2 sm:w-1/2">
            <div className="flex items-center h-full p-4 bg-gray-100 rounded">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                className="flex-shrink-0 w-6 h-6 mr-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="font-normal title-font">
                Simple user management
              </span>
            </div>
          </div>
        </div>
        </div>

        
      </section>
    </main>
  );
};

export default LandingPage;
