import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="font-display text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 rounded-xl action-gradient text-primary-foreground font-display font-bold"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
