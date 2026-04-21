import { useEffect, useState } from "react";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { Save, X } from "lucide-react";
import { toast } from "sonner";
import {
  type SortOption,
  SortField,
  SortDirection,
  type CreateSortOptionRequest,
} from "../../pages/filters/service/filters.type";
import {
  useCreateSortOption,
  useUpdateSortOption,
} from "../../pages/filters/hooks/useFilters";

interface Props {
  open: boolean;
  onClose: () => void;
  sort?: SortOption | null;
}

const FIELD_OPTIONS = [
  { label: "Price", value: SortField.PRICE },
  { label: "Name", value: SortField.NAME },
  { label: "Featured", value: SortField.FEATURED },
  { label: "Newest", value: SortField.CREATED_AT },
];

const DIRECTION_OPTIONS = [
  { label: "Ascending", value: SortDirection.ASC },
  { label: "Descending", value: SortDirection.DESC },
];

const SortFormPanel = ({ open, onClose, sort }: Props) => {
  const isEdit = !!sort;
  const { mutate: createSort, isPending: isCreating } = useCreateSortOption();
  const { mutate: updateSort, isPending: isUpdating } = useUpdateSortOption();
  const saving = isCreating || isUpdating;

  const [label, setLabel] = useState("");
  const [field, setField] = useState<SortField>(SortField.FEATURED);
  const [direction, setDirection] = useState<SortDirection>(SortDirection.DESC);
  const [isDefault, setIsDefault] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!open) return;
    if (sort) {
      setLabel(sort.label);
      setField(sort.field);
      setDirection(sort.direction);
      setIsDefault(sort.is_default);
      setSortOrder(sort.sort_order ?? 0);
      setIsActive(sort.is_active);
    } else {
      setLabel("");
      setField(SortField.FEATURED);
      setDirection(SortDirection.DESC);
      setIsDefault(false);
      setSortOrder(0);
      setIsActive(true);
    }
  }, [open, sort]);

  const handleSubmit = () => {
    if (!label.trim()) {
      toast.error("Label is required");
      return;
    }
    const payload: CreateSortOptionRequest = {
      label: label.trim(),
      field,
      direction,
      is_default: isDefault,
      sort_order: sortOrder,
      is_active: isActive,
    };
    const onSuccess = () => {
      toast.success(isEdit ? "Sort option updated" : "Sort option created");
      onClose();
    };
    const onError = (err: { message?: string }) => toast.error(err?.message || "Save failed");

    if (isEdit && sort) {
      updateSort({ id: sort._id, data: payload }, { onSuccess, onError });
    } else {
      createSort(payload, { onSuccess, onError });
    }
  };

  const footer = (
    <div className="flex gap-3">
      <Button variant="outline" className="flex-1" onClick={onClose} disabled={saving}>
        Cancel
      </Button>
      <Button className="flex-1 bg-app-text text-white" onClick={handleSubmit} disabled={saving}>
        <Save className="size-4 mr-1" />
        {saving ? "Saving..." : isEdit ? "Update" : "Create"}
      </Button>
    </div>
  );

  return (
    <SidePanel
      open={open}
      onClose={onClose}
      footer={footer}
      title={
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-lg font-bold text-app-text">
              {isEdit ? "Edit sort option" : "New sort option"}
            </h2>
            <p className="text-xs text-app-muted">How customers can order the product list.</p>
          </div>
          <button onClick={onClose} className="text-app-muted hover:text-app-text">
            <X className="size-5" />
          </button>
        </div>
      }
    >
      <div className="p-6 flex flex-col gap-5">
        <CustomInput
          label="Label"
          placeholder="e.g. Price: Low to High"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            label="Field"
            options={FIELD_OPTIONS}
            value={field}
            onValueChange={(v) => setField(v as SortField)}
          />
          <CustomSelect
            label="Direction"
            options={DIRECTION_OPTIONS}
            value={direction}
            onValueChange={(v) => setDirection(v as SortDirection)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            label="Display order"
            type="number"
            value={String(sortOrder)}
            onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
          />
          <CustomSelect
            label="Status"
            options={[
              { label: "Active", value: "true" },
              { label: "Inactive", value: "false" },
            ]}
            value={String(isActive)}
            onValueChange={(v) => setIsActive(v === "true")}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-app-text cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="size-4 accent-app-text"
          />
          Set as default sort
        </label>
      </div>
    </SidePanel>
  );
};

export default SortFormPanel;
