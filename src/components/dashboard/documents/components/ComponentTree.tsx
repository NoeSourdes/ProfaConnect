"use client";

import { File, Folder, Tree } from "@/src/components/magicui/file-tree";
import { useGetTreeView } from "@/src/hooks/documents/use-get-tree-view";

export const ComponentTree = () => {
  const { isOpenModalTreeView } = useGetTreeView();
  return (
    <div className="flex h-full gap-5 min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
      <div
        className={`relative flex flex-col items-center justify-center overflow-hidden transition-all ${
          isOpenModalTreeView ? "w-56 border-r" : "w-0"
        }`}
      >
        <Tree
          className="px-2 overflow-hidden"
          initialSelectedId="7"
          initialExpandedItems={[
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
          ]}
          elements={ELEMENTS}
        >
          <Folder element="src" value="1">
            <Folder value="2" element="app">
              <File value="3">
                <p>layout.tsx</p>
              </File>
              <File value="4">
                <p>page.tsx</p>
              </File>
            </Folder>
            <Folder value="5" element="components">
              <Folder value="6" element="ui">
                <File value="7">
                  <p>button.tsx</p>
                </File>
              </Folder>
              <File value="8">
                <p>header.tsx</p>
              </File>
              <File value="9">
                <p>footer.tsx</p>
              </File>
            </Folder>
            <Folder value="10" element="lib">
              <File value="11">
                <p>utils.ts</p>
              </File>
            </Folder>
          </Folder>
        </Tree>
      </div>
    </div>
  );
};

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
