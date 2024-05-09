import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SizePickerProps = {
  onSizeChange: (size: string) => void;
};

export const SizePicker = (props: SizePickerProps) => {
  return (
    <Select
      defaultValue="paragraph"
      onValueChange={(value) => {
        if (value === "title") {
          props.onSizeChange("48pt");
        } else if (value === "subtitle") {
          props.onSizeChange("36pt");
        } else if (value === "paragraph") {
          props.onSizeChange("16pt");
        } else {
          props.onSizeChange(`${value}pt`);
        }
      }}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Taille</SelectLabel>
          <SelectItem value="title">Titre</SelectItem>
          <SelectItem value="subtitle">Sous-titre</SelectItem>
          <SelectItem value="paragraph">Paragraphe</SelectItem>

          <SelectItem value="8">8</SelectItem>
          <SelectItem value="9">9</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="11">11</SelectItem>
          <SelectItem value="12">12</SelectItem>
          <SelectItem value="14">14</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="18">18</SelectItem>
          <SelectItem value="24">24</SelectItem>
          <SelectItem value="30">30</SelectItem>
          <SelectItem value="36">36</SelectItem>
          <SelectItem value="48">48</SelectItem>
          <SelectItem value="60">60</SelectItem>
          <SelectItem value="72">72</SelectItem>
          <SelectItem value="96">96</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
