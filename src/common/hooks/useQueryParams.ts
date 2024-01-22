import {
  usePathname,
  useSearchParams,
  ReadonlyURLSearchParams,
} from "next/navigation";
import { omit } from "lodash";
import { useCallback } from "react";

export const useQueryParams = () => {
  const pathname = usePathname();
  const params = useSearchParams();
  const mappedParams = getParamsObject(params);

  const removeQueryParams = useCallback(
    (paramsToRemove: Array<string>) => {
      const omittedParams = omit(mappedParams, paramsToRemove);

      return mapParamsToQueryString(pathname, omittedParams);
    },
    [pathname, mappedParams]
  );

  const addQueryParams = useCallback(
    (paramsToAdd: Record<string, unknown>) => {
      return mapParamsToQueryString(pathname, {
        ...mappedParams,
        ...paramsToAdd,
      });
    },
    [pathname, mappedParams]
  );

  return { removeQueryParams, addQueryParams };
};

const mapParamsToQueryString = (pathname: string, params: any) => {
  return `${pathname}?${Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
};

const getParamsObject = (params: ReadonlyURLSearchParams) => {
  const availableParams: Record<string, unknown> = {};
  params.forEach((value, key) => {
    availableParams[key] = value;
  });
  return availableParams;
};
