import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";

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
            <BreadcrumbLink href="/dashboard">
              <span>Dashboard</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {props.array.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={item.link}>
                <span>{item.item}</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < props.array!.length - 1 && (
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
