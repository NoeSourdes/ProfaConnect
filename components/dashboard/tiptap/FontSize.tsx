import { Extension } from "@tiptap/core";
import { RawCommands } from "@tiptap/react";

export const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands(): Partial<RawCommands> {
    return {
      setFontSize:
        (fontSize: number) =>
        ({ chain }: { chain: any }) => {
          return chain()
            .setMark("textStyle", { fontSize: fontSize + "px" })
            .run();
        },
      unsetFontSize:
        () =>
        ({ chain }: { chain: any }) => {
          return chain()
            .setMark("textStyle", { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
