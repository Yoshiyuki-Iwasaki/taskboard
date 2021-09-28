import { useRouter } from "next/router";
import React from "react";

export default function Sample() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <h1>このページの path は {path} です。</h1>
      <input data-testid="input" value="" type="text" onChange={()=>console.log('test')}/>
    </>
  );
}
