import * as mdIcons from "react-icons/md";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Grid, GridCellProps, WindowScroller } from "react-virtualized";
import classNames from "classnames";
import { chunk } from "lodash";
import { Input } from "@nextui-org/react";

interface IconPickerProps {
  onSelect: (icon: string) => void;
  selected: string;
  hasErrors?: boolean;
}

const IconPicker: React.FC<IconPickerProps> = ({
  onSelect,
  selected,
  hasErrors,
}) => {
  const gridRef = useRef<Grid>(null);
  const [search, setSearch] = useState("");
  const icons = useMemo(
    () =>
      chunk(
        [
          ...Object.entries(mdIcons).filter((icon) =>
            icon[0].toLowerCase().includes(search.toLowerCase())
          ),
        ],
        16
      ),
    [search]
  );

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.forceUpdate();
    }
  }, [selected]);

  const handleOnSelect = useCallback(
    (icon: string) => {
      onSelect(icon);
    },
    [onSelect]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  function cellRenderer({ columnIndex, key, rowIndex, style }: GridCellProps) {
    const index = icons[rowIndex][columnIndex];
    if (!index) return null;
    return (
      <div
        key={key}
        style={style}
        onClick={() => handleOnSelect(index[0])}
        className={classNames(
          "flex justify-center items-center w-[50px] h-[50px] hover:bg-gray-100 cursor-pointer text-2xl",
          {
            "bg-primaryColor text-white": selected === index[0],
          }
        )}
      >
        {index[1]()}
      </div>
    );
  }

  return (
    <>
      <Input
        className="mb-2"
        labelPlacement="outside"
        type="search"
        label="Search"
        placeholder="Search your icon..."
        isInvalid={hasErrors}
        onChange={handleSearch}
        endContent={<mdIcons.MdSearch />}
        value={search}
      />
      <WindowScroller>
        {({ width }) => (
          <Grid
            ref={gridRef}
            cellRenderer={cellRenderer}
            columnCount={icons[0]?.length || 0}
            columnWidth={50}
            height={300}
            rowCount={icons.length}
            rowHeight={50}
            autoWidth
            width={width}
          />
        )}
      </WindowScroller>
    </>
  );
};

export default IconPicker;

//   const getIcon = (iconName: string) => {
//     const iconsMap = new Map();
//     iconsMap.set("Bs", bsIcons);
//     iconsMap.set("Ai", aiIcons);
//     iconsMap.set("Bi", biIcons);
//     iconsMap.set("Gi", giIcons);
//     iconsMap.set("Fa", faIcons);
//     iconsMap.set("Tb", tbIcons);

//     return iconsMap.get(iconName.substring(0, 2));
//   };

//   const icons: any = getIcon(icon);
//   const TheIcon: IconType = icons[icon];

//   return <TheIcon className={className} />;
