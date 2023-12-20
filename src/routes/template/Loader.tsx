import { ErrorBoundary } from "@/components/error-boundary";
import { Loading } from "@/components/loading";
import React from "react";

const Component = React.lazy(
  () => import(/* webpackChunkName: "Home" */ "./Page")
);

const Loader: React.FC = () => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading />}>
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Loader;
