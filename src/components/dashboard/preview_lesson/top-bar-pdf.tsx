export type TopBarPdfProps = {
  setNumPages: (numPages: number) => void;
  numPages: number | undefined;
  setPageNumber: (pageNumber: number) => void;
  pageNumber: number;
};

export const TopBarPdf = (props: TopBarPdfProps) => {
  return (
    <div className="h-14 w-full border-b flex items-center justify-between rounded-md border p-2">
      <div className="flex items-center gap-1.5">Top bar</div>
    </div>
  );
};
