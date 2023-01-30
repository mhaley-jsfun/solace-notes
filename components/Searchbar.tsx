import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();

  const [q, setQ] = useState("");

  useEffect(() => {
    if (router.query.q) {
      setQ(router.query.q as string);
    }
  }, [router]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      router.push({ pathname: router.pathname, query: { ...router.query, q } });
    },
    [q, router]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="rounded-full text-md outline-none py-2 pl-6 w-1/4"
      />
    </form>
  );
}
