import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import {
    DAYS_ORDERED,
    DayOfWeek,
    type ScheduleWindow,
} from "../../pages/menu/service/menu.type";

interface ScheduleEditorProps {
    value: ScheduleWindow[];
    onChange: (next: ScheduleWindow[]) => void;
}

const dayShort = (day: DayOfWeek) => day.slice(0, 3);

const ScheduleEditor = ({ value, onChange }: ScheduleEditorProps) => {
    const windows = value ?? [];

    const update = (idx: number, patch: Partial<ScheduleWindow>) => {
        onChange(windows.map((w, i) => (i === idx ? { ...w, ...patch } : w)));
    };

    const remove = (idx: number) => {
        onChange(windows.filter((_, i) => i !== idx));
    };

    const add = () => {
        onChange([
            ...windows,
            { start_time: "09:00", end_time: "17:00", days: [...DAYS_ORDERED] },
        ]);
    };

    const toggleDay = (idx: number, day: DayOfWeek) => {
        const w = windows[idx];
        const has = w.days.includes(day);
        update(idx, {
            days: has ? w.days.filter((d) => d !== day) : [...w.days, day],
        });
    };

    if (windows.length === 0) {
        return (
            <div className="space-y-3">
                <div className="rounded-md border border-dashed border-app-border bg-app-bg p-4 text-center">
                    <p className="text-sm text-app-text font-medium">Always active</p>
                    <p className="text-xs text-app-muted mt-1">
                        This menu will be available at all hours, every day. Add a window to limit when it's active.
                    </p>
                </div>
                <Button type="button" variant="outline" onClick={add} className="w-full">
                    <Plus className="w-4 h-4 mr-2" /> Add schedule window
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {windows.map((w, idx) => (
                <div
                    key={idx}
                    className="rounded-md border border-app-border p-4 space-y-3 bg-white"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-app-muted uppercase tracking-wider">
                            Window {idx + 1}
                        </span>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-7 text-app-muted hover:text-red-600"
                            onClick={() => remove(idx)}
                        >
                            <Trash2 className="size-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <CustomInput
                            label="Start"
                            type="time"
                            value={w.start_time}
                            onChange={(e) => update(idx, { start_time: e.target.value })}
                        />
                        <CustomInput
                            label="End"
                            type="time"
                            value={w.end_time}
                            onChange={(e) => update(idx, { end_time: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-app-text mb-1.5">Days</label>
                        <div className="flex flex-wrap gap-1.5">
                            {DAYS_ORDERED.map((day) => {
                                const active = w.days.includes(day);
                                return (
                                    <button
                                        type="button"
                                        key={day}
                                        onClick={() => toggleDay(idx, day)}
                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
                                            active
                                                ? "bg-app-text text-white border-app-text"
                                                : "bg-white text-app-muted border-app-border hover:bg-app-bg"
                                        }`}
                                    >
                                        {dayShort(day)}
                                    </button>
                                );
                            })}
                        </div>
                        {w.days.length === 0 && (
                            <p className="text-xs text-red-600 mt-1">Pick at least one day or this window won't apply.</p>
                        )}
                    </div>

                    {w.end_time <= w.start_time && (
                        <p className="text-xs text-app-muted">
                            End is before start — treated as overnight (wraps past midnight).
                        </p>
                    )}
                </div>
            ))}

            <Button type="button" variant="outline" onClick={add} className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Add another window
            </Button>
        </div>
    );
};

export default ScheduleEditor;
