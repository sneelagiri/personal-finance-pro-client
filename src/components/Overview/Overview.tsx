import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
// import { History, LocationState } from "history";
import { BUDGET_QUERY } from "../../queries/queries";

interface Props {}

export default function Overview({}: Props): ReactElement {
  const { loading, error, data } = useQuery(BUDGET_QUERY);
  console.log(data);
  return (
    <div>
      <h1>Overview</h1>
    </div>
  );
}
