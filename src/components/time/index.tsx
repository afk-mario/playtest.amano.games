import React from "react";

import { parseISO, format } from "date-fns";

import { es } from "date-fns/locale";

export const localizedTimeAndDate = "p - PP";
export const localizedDateWithTime = "P p";

function Time({
  className,
  children,
  formatStr = "PP",
}: {
  children: string;
  className?: string;
  formatStr?: string;
}) {
  const date = parseISO(children);
  const formatted = format(date, formatStr, { locale: es });
  return <time className={className}>{formatted}</time>;
}
export default Time;
