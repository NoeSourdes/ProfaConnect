import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.array.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={item.link}
                  className={`${
                    index === props.array!.length - 1 ? "text-foreground" : ""
                  }`}
                >
                  {item.item}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < props.array!.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
