import { GetIcon } from "@/common/components/IconPicker/GetIcon";
import { CategoryWithTotal } from "@/types/types";
import { formatPrice } from "@/utils/formatPrice";

interface Props {
  category: CategoryWithTotal;
}

export default async function ExpenseCategoryTile({
  category: { color, icon, name, total },
}: Props) {
  return (
    <div className="rounded-xl shadow-sm bg-white p-8 flex flex-col items-start justify-start">
      <GetIcon
        style={{ fill: color }}
        className="text-6xl"
        name={icon as string}
      />
      <h3 className="mt-6 text-sm text-primary">{name}</h3>
      <p className="text-lg mt-2 text-black">{formatPrice(total)}</p>
    </div>
  );
}
