import {isRouteErrorResponse, Link, useRouteError} from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();

    let title = "Error encountered";
    let message = "Something";
    let statusCode = 0;

    if (isRouteErrorResponse(error)) {
        statusCode = error.status;
        switch (error.status) {
            case 404:
                title = "Page not found";
                message = "Page you found do not exist";
                break;
            case 401:
                title = "Not authorized";
                message = "You are not authorized to access this page.";
                break;
            case 500:
                title = "Error server";
                message = "Server encountered an error. Please try again later.";
                break;
            default:
                title = `Error ${error.status}`;
                message = error.statusText || message;
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white px-4">
            <h1 className="text-7xl font-bold text-indigo-600 mb-4">
                {statusCode || "Error"}
            </h1>
            <h2 className="text-3xl font-semibold mb-2">{title}</h2>
            <p className="text-slate-400 text-center max-w-md mb-6">{message}</p>
            <Link
                to="/"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full transition duration-200"
            >
                Back home
            </Link>
        </div>
    );
}

export default ErrorPage;
