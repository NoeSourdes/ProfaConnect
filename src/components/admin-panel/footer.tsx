import Link from "next/link";

export function Footer() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 z-20 w-full border-t bg-background/95 backdrop-blur">
      <div className="mx-4 md:mx-8 flex h-14 items-center">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="/" passHref>
            Brand
          </Link>
          . All rights reserved.
        </p>
      </div>
    </div>
  );
}
