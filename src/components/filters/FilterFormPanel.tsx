import { useEffect, useState } from "react";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  type Filter,
  FilterType,
  FilterSource,
  type FilterOption,
  type FilterRange,
  type CreateFilterRequest,
} from "../../pages/filters/service/filters.type";
import { useCreateFilter, useUpdateFilter } from "../../pages/filters/hooks/useFilters";

interface Props {
  open: boolean;
  onClose: () => void;
  filter?: Filter | null;
}

const TYPE_OPTIONS = [
  { label: "Single select (pick one)", value: FilterType.SINGLE },
  { label: "Multi select (pick many)", value: FilterType.MULTI },
  { label: "Range (min / max)", value: FilterType.RANGE },
];

const SOURCE_OPTIONS = [
  { label: "Dietary type (veg / non-veg / vegan)", value: FilterSource.TYPE },
  { label: "Spice level", value: FilterSource.SPICE_LEVEL },
  { label: "Tag", value: FilterSource.TAG },
  { label: "Featured items", value: FilterSource.FEATURED },
  { label: "Price", value: FilterSource.PRICE },
];

const emptyOption: FilterOption = { label: "", value: "" };
const emptyRange: FilterRange = { label: "", min: 0, max: null };

const FilterFormPanel = ({ open, onClose, filter }: Props) => {
  const isEdit = !!filter;
  const { mutate: createFilter, isPending: isCreating } = useCreateFilter();
  const { mutate: updateFilter, isPending: isUpdating } = useUpdateFilter();
  const saving = isCreating || isUpdating;

  const [name, setName] = useState("");
  const [type, setType] = useState<FilterType>(FilterType.MULTI);
  const [source, setSource] = useState<FilterSource>(FilterSource.TYPE);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [options, setOptions] = useState<FilterOption[]>([{ ...emptyOption }]);
  const [ranges, setRanges] = useState<FilterRange[]>([{ ...emptyRange }]);

  useEffect(() => {
    if (!open) return;
    if (filter) {
      setName(filter.name);
      setType(filter.type);
      setSource(filter.source);
      setIsActive(filter.is_active);
      setSortOrder(filter.sort_order ?? 0);
      setOptions(filter.options.length ? filter.options : [{ ...emptyOption }]);
      setRanges(filter.ranges.length ? filter.ranges : [{ ...emptyRange }]);
    } else {
      setName("");
      setType(FilterType.MULTI);
      setSource(FilterSource.TYPE);
      setIsActive(true);
      setSortOrder(0);
      setOptions([{ ...emptyOption }]);
      setRanges([{ ...emptyRange }]);
    }
  }, [open, filter]);

  const updateOption = (i: number, patch: Partial<FilterOption>) =>
    setOptions((prev) => prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));
  const removeOption = (i: number) => setOptions((prev) => prev.filter((_, idx) => idx !== i));

  const updateRange = (i: number, patch: Partial<FilterRange>) =>
    setRanges((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const removeRange = (i: number) => setRanges((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    const payload: CreateFilterRequest = {
      name: name.trim(),
      type,
      source,
      sort_order: sortOrder,
      is_active: isActive,
    };

    if (type === FilterType.RANGE) {
      const cleaned = ranges
        .filter((r) => r.label.trim())
        .map((r, i) => ({
          label: r.label.trim(),
          min: Number(r.min) || 0,
          max: r.max === null || r.max === undefined || String(r.max) === "" ? null : Number(r.max),
          sort_order: i,
        }));
      if (!cleaned.length) {
        toast.error("Add at least one range");
        return;
      }
      payload.ranges = cleaned;
    } else {
      const cleaned = options
        .filter((o) => o.label.trim() && o.value.trim())
        .map((o, i) => ({ label: o.label.trim(), value: o.value.trim(), sort_order: i }));
      if (!cleaned.length) {
        toast.error("Add at least one option");
        return;
      }
      payload.options = cleaned;
    }

    const onSuccess = () => {
      toast.success(isEdit ? "Filter updated" : "Filter created");
      onClose();
    };
    const onError = (err: { message?: string }) => toast.error(err?.message || "Save failed");

    if (isEdit && filter) {
      updateFilter({ id: filter._id, data: payload }, { onSuccess, onError });
    } else {
      createFilter(payload, { onSuccess, onError });
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
              {isEdit ? "Edit filter" : "New filter"}
            </h2>
            <p className="text-xs text-app-muted">Controls what customers can narrow the menu by.</p>
          </div>
          <button onClick={onClose} className="text-app-muted hover:text-app-text">
            <X className="size-5" />
          </button>
        </div>
      }
    >
      <div className="p-6 flex flex-col gap-5">
        <CustomInput
          label="Name"
          placeholder="e.g. Dietary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <CustomSelect
            label="Type"
            options={TYPE_OPTIONS}
            value={type}
            onValueChange={(v) => setType(v as FilterType)}
          />
          <CustomSelect
            label="Source"
            options={SOURCE_OPTIONS}
            value={source}
            onValueChange={(v) => setSource(v as FilterSource)}
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

        {type === FilterType.RANGE ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-app-muted uppercase">Ranges</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRanges((p) => [...p, { ...emptyRange }])}
              >
                <Plus className="size-3.5 mr-1" /> Add range
              </Button>
            </div>
            {ranges.map((r, i) => (
              <div key={i} className="grid grid-cols-[1fr_90px_90px_36px] gap-2 items-end">
                <CustomInput
                  label="Label"
                  placeholder="e.g. Under 50"
                  value={r.label}
                  onChange={(e) => updateRange(i, { label: e.target.value })}
                />
                <CustomInput
                  label="Min"
                  type="number"
                  value={String(r.min ?? 0)}
                  onChange={(e) => updateRange(i, { min: Number(e.target.value) || 0 })}
                />
                <CustomInput
                  label="Max"
                  type="number"
                  placeholder="∞"
                  value={r.max === null || r.max === undefined ? "" : String(r.max)}
                  onChange={(e) => {
                    const v = e.target.value;
                    updateRange(i, { max: v === "" ? null : Number(v) });
                  }}
                />
                <button
                  type="button"
                  className="h-10 text-app-muted hover:text-red-500 flex items-center justify-center"
                  onClick={() => removeRange(i)}
                  disabled={ranges.length === 1}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-app-muted uppercase">Options</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOptions((p) => [...p, { ...emptyOption }])}
              >
                <Plus className="size-3.5 mr-1" /> Add option
              </Button>
            </div>
            {options.map((o, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_36px] gap-2 items-end">
                <CustomInput
                  label="Label"
                  placeholder="e.g. Vegetarian"
                  value={o.label}
                  onChange={(e) => updateOption(i, { label: e.target.value })}
                />
                <CustomInput
                  label="Value"
                  placeholder="e.g. veg"
                  value={o.value}
                  onChange={(e) => updateOption(i, { value: e.target.value })}
                />
                <button
                  type="button"
                  className="h-10 text-app-muted hover:text-red-500 flex items-center justify-center"
                  onClick={() => removeOption(i)}
                  disabled={options.length === 1}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
            <p className="text-[11px] text-app-muted">
              &ldquo;Value&rdquo; is matched against the chosen source on each product (e.g. tag name, type enum).
            </p>
          </div>
        )}
      </div>
    </SidePanel>
  );
};

export default FilterFormPanel;
