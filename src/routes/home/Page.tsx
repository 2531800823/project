import { testAxios } from "@/apis/text";
import React, { FC, useEffect } from "react";

interface PageProps {}

const Page: FC<PageProps> = (props) => {
  const {} = props;
  useEffect(() => {
    testAxios().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Page</div>;
};

export default Page;
