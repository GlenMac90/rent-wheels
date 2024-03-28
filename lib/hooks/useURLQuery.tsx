"use client";

import { modifySearchParams } from "@/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useURLQuery = (
  key: string,
  defaultValue = "",
  delay = 0
): [string, (value: string) => void] => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const valueKey = searchParams.get(key) ?? defaultValue;
  const [value, setValue] = useState(valueKey);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const newSearchParams = modifySearchParams(searchParams.toString(), {
        [key]: value,
      });
      router.push(`?${newSearchParams}`);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, searchParams, router, delay, key]);
  return [value, setValue];
};
