import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Home } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type array = {
  item: string;
  link: string;
};

export type BreadcrumbProps = {
  array?: array[];
};

export const BreadcrumbComponent = (props: BreadcrumbProps) => {
  if (!props.array || props.array.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const array = props.array;
  const shouldTruncate = array.length >= 3;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard">
              <Home size={16} />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {shouldTruncate ? (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={array[0].link} className="text-foreground">
                  {array[0].item.length > 20
                    ? array[0].item.substring(0, 20) + "..."
                    : array[0].item}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {array.slice(1, array.length - 1).map((item, index) => (
                    <DropdownMenuItem key={index}>
                      <Link href={item.link}>{item.item}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={array[array.length - 1].link}
                  className="text-foreground"
                >
                  {array[array.length - 1].item.length > 20
                    ? array[array.length - 1].item.substring(0, 20) + "..."
                    : array[array.length - 1].item}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </>
        ) : (
          array.map((item, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={item.link}
                    className={`${
                      index === array.length - 1 ? "text-foreground" : ""
                    }`}
                  >
                    {item.item.length > 20
                      ? item.item.substring(0, 20) + "..."
                      : item.item}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index < array.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
