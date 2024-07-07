import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";

import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  collapseSelection,
  focusEditor,
  getNodeEntries,
  isBlock,
  toggleNodeType,
  useEditorRef,
  useEditorSelector,
} from "@udecode/plate-common";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

import { Icons } from "@/src/components/icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from "./dropdown-menu";
import { ToolbarButton } from "./toolbar";

const items = [
  {
    description: "Paragraphe",
    icon: Icons.paragraph,
    label: "Paragraphe",
    value: ELEMENT_PARAGRAPH,
  },
  {
    description: "Titre 1",
    icon: Icons.h1,
    label: "Titre 1",
    value: ELEMENT_H1,
  },
  {
    description: "Titre 2",
    icon: Icons.h2,
    label: "Titre 2",
    value: ELEMENT_H2,
  },
  {
    description: "Titre 3",
    icon: Icons.h3,
    label: "Titre 3",
    value: ELEMENT_H3,
  },
  {
    Description: "Titre 4",
    icon: Icons.h4,
    label: "Titre 4",
    value: ELEMENT_H4,
  },
  {
    Description: "Titre 5",
    icon: Icons.h5,
    label: "Titre 5",
    value: ELEMENT_H5,
  },
  {
    Description: "Titre 6",
    icon: Icons.h6,
    label: "Titre 6",
    value: ELEMENT_H6,
  },

  {
    description: "Citation (⌘+⇧+.)",
    icon: Icons.blockquote,
    label: "Citation",
    value: ELEMENT_BLOCKQUOTE,
  },
];

const defaultItem = items.find((item) => item.value === ELEMENT_PARAGRAPH)!;

export function TurnIntoDropdownMenu(props: DropdownMenuProps) {
  const value: string = useEditorSelector((editor) => {
    let initialNodeType: string = ELEMENT_PARAGRAPH;
    let allNodesMatchInitialNodeType = false;
    const codeBlockEntries = getNodeEntries(editor, {
      match: (n) => isBlock(editor, n),
      mode: "highest",
    });
    const nodes = Array.from(codeBlockEntries);

    if (nodes.length > 0) {
      initialNodeType = nodes[0][0].type as string;
      allNodesMatchInitialNodeType = nodes.every(([node]) => {
        const type: string = (node?.type as string) || ELEMENT_PARAGRAPH;

        return type === initialNodeType;
      });
    }

    return allNodesMatchInitialNodeType ? initialNodeType : ELEMENT_PARAGRAPH;
  }, []);

  const editor = useEditorRef();
  const openState = useOpenState();

  const selectedItem =
    items.find((item) => item.value === value) ?? defaultItem;
  const { icon: SelectedItemIcon, label: selectedItemLabel } = selectedItem;

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          className="lg:min-w-[130px]"
          isDropdown
          pressed={openState.open}
          tooltip="Transformer en"
        >
          <SelectedItemIcon className="size-5 lg:hidden" />
          <span className="max-lg:hidden">{selectedItemLabel}</span>
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-0">
        <DropdownMenuLabel>Transformer en</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          className="flex flex-col gap-0.5"
          onValueChange={(type) => {
            // if (type === 'ul' || type === 'ol') {
            //   if (settingsStore.get.checkedId(KEY_LIST_STYLE_TYPE)) {
            //     toggleIndentList(editor, {
            //       listStyleType: type === 'ul' ? 'disc' : 'decimal',
            //     });
            //   } else if (settingsStore.get.checkedId('list')) {
            //     toggleList(editor, { type });
            //   }
            // } else {
            //   unwrapList(editor);
            toggleNodeType(editor, { activeType: type });
            // }

            collapseSelection(editor);
            focusEditor(editor);
          }}
          value={value}
        >
          {items.map(({ icon: Icon, label, value: itemValue }) => (
            <DropdownMenuRadioItem
              className="min-w-[180px]"
              key={itemValue}
              value={itemValue}
            >
              <Icon className="mr-2 size-5" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
