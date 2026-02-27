import { useState } from "react";
import type { Product } from "../../pages/menu-items/service/products.type";
import { ProductType, SpiceLevel, MediaType } from "../../pages/menu-items/service/products.type";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import {
    Edit2, Trash2, X, Flame, Leaf, AlertTriangle,
    Tag, Info, Activity, Image as ImageIcon, Video,
    Box, ExternalLink, ChevronLeft, ChevronRight, BadgeCheck
} from "lucide-react";

interface ProductDetailPanelProps {
    item: Product | null;
    open: boolean;
    onClose: () => void;
    onEdit?: (item: Product) => void;
    onDelete?: (item: Product) => void;
}

const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val);

const TYPE_STYLES: Record<ProductType, string> = {
    [ProductType.VEG]: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    [ProductType.NON_VEG]: "bg-rose-100 text-rose-800 border border-rose-200",
    [ProductType.VEGAN]: "bg-green-100 text-green-800 border border-green-200",
};

const SPICE_COLORS: Record<SpiceLevel, string> = {
    [SpiceLevel.NONE]: "bg-gray-100 text-gray-500",
    [SpiceLevel.MILD]: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    [SpiceLevel.MEDIUM]: "bg-orange-100 text-orange-700 border border-orange-200",
    [SpiceLevel.HOT]: "bg-red-100 text-red-700 border border-red-200",
    [SpiceLevel.EXTRA_HOT]: "bg-red-200 text-red-900 border border-red-300",
};

const SPICE_CHILIS: Record<SpiceLevel, number> = {
    [SpiceLevel.NONE]: 0,
    [SpiceLevel.MILD]: 1,
    [SpiceLevel.MEDIUM]: 2,
    [SpiceLevel.HOT]: 3,
    [SpiceLevel.EXTRA_HOT]: 4,
};

const Section = ({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) => (
    <div className="space-y-3">
        <h3 className="text-[10px] font-bold text-app-muted uppercase tracking-widest flex items-center gap-1.5">
            {icon}
            {title}
        </h3>
        {children}
    </div>
);

const MenuItemDetailPanel = ({ item, open, onClose, onEdit, onDelete }: ProductDetailPanelProps) => {
    const [activeIdx, setActiveIdx] = useState(0);

    if (!item) return null;

    // Separate media by type
    const images = item.media?.filter(m => m.type === MediaType.IMAGE) ?? [];
    const videos = item.media?.filter(m => m.type === MediaType.VIDEO) ?? [];
    const models = item.media?.filter(m => m.type === MediaType.THREE_D) ?? [];
    const allMedia = item.media ?? [];
    const activeMedia = allMedia[activeIdx];

    const prevMedia = () => setActiveIdx(i => (i - 1 + allMedia.length) % allMedia.length);
    const nextMedia = () => setActiveIdx(i => (i + 1) % allMedia.length);

    const hasNutrition = item.nutritional_info &&
        (item.nutritional_info.protein || item.nutritional_info.carbs ||
            item.nutritional_info.fat || item.nutritional_info.fiber);

    const Header = (
        <div className="flex items-center justify-between w-full">
            <div>
                <h2 className="text-lg font-bold text-app-text">Product Details</h2>
                <div className="flex flex-wrap items-center gap-2 text-xs text-app-muted mt-0.5">
                    <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 border border-neutral-200 text-[10px]">
                        {item.sku}
                    </span>
                    <span className={`font-semibold ${item.is_active ? "text-emerald-600" : "text-red-500"}`}>
                        {item.is_active ? "Active" : "Inactive"}
                    </span>
                    {item.is_featured && (
                        <span className="text-amber-600 font-semibold flex items-center gap-0.5">
                            <BadgeCheck className="size-3" /> Featured
                        </span>
                    )}
                </div>
            </div>
            <button
                onClick={onClose}
                className="size-8 rounded-full flex items-center justify-center text-app-muted hover:bg-app-accent hover:text-app-text cursor-pointer transition-colors"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
    );

    const Footer = (
        <div className="grid grid-cols-2 gap-3">
            <Button
                variant="outline"
                className="h-12 w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold"
                onClick={() => onDelete?.(item)}
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
            </Button>
            <Button
                className="h-12 w-full bg-app-text text-white hover:bg-app-text/90 font-bold"
                onClick={() => onEdit?.(item)}
            >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Item
            </Button>
        </div>
    );

    return (
        <SidePanel
            open={open}
            onClose={onClose}
            title={Header}
            footer={Footer}
            className="sm:max-w-xl"
        >
            <div className="flex-1 overflow-y-auto p-6 space-y-7">

                {/* ── Media Gallery ── */}
                {allMedia.length > 0 && (
                    <Section title={`Media (${allMedia.length})`} icon={<ImageIcon className="size-3" />}>
                        {/* Main viewer */}
                        <div className="relative bg-app-bg border border-app-border rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                            {activeMedia?.type === MediaType.IMAGE && (
                                <img
                                    src={activeMedia.url}
                                    alt={activeMedia.alt_text || item.name}
                                    className="w-full h-full object-cover"
                                />
                            )}
                            {activeMedia?.type === MediaType.VIDEO && (
                                <div className="flex flex-col items-center gap-3">
                                    <Video className="size-10 text-app-muted" />
                                    <a
                                        href={activeMedia.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-app-text hover:underline"
                                    >
                                        Watch Video <ExternalLink className="size-3" />
                                    </a>
                                </div>
                            )}
                            {activeMedia?.type === MediaType.THREE_D && (
                                <div className="flex flex-col items-center gap-3">
                                    <Box className="size-10 text-app-muted" />
                                    <a
                                        href={activeMedia.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-app-text hover:underline"
                                    >
                                        View 3D Model ({activeMedia.format}) <ExternalLink className="size-3" />
                                    </a>
                                </div>
                            )}
                            {/* Primary badge */}
                            {activeMedia?.is_primary && (
                                <span className="absolute top-2 left-2 bg-app-text text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                                    Primary
                                </span>
                            )}
                            {/* Navigation arrows */}
                            {allMedia.length > 1 && (
                                <>
                                    <button
                                        onClick={prevMedia}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 hover:bg-white border border-app-border rounded-full flex items-center justify-center shadow-sm transition-all"
                                    >
                                        <ChevronLeft className="size-4" />
                                    </button>
                                    <button
                                        onClick={nextMedia}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 hover:bg-white border border-app-border rounded-full flex items-center justify-center shadow-sm transition-all"
                                    >
                                        <ChevronRight className="size-4" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail strip */}
                        {allMedia.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1">
                                {allMedia.map((m, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveIdx(idx)}
                                        className={`size-12 rounded-lg border-2 shrink-0 overflow-hidden flex items-center justify-center bg-app-bg transition-all ${activeIdx === idx ? "border-app-text shadow-sm" : "border-app-border opacity-60 hover:opacity-100"}`}
                                    >
                                        {m.type === MediaType.IMAGE
                                            ? <img src={m.url} alt="" className="w-full h-full object-cover" />
                                            : m.type === MediaType.VIDEO
                                                ? <Video className="size-5 text-app-muted" />
                                                : <Box className="size-5 text-app-muted" />
                                        }
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Media type counts */}
                        <div className="flex gap-2 text-[10px] text-app-muted font-semibold">
                            {images.length > 0 && <span>{images.length} image{images.length > 1 ? "s" : ""}</span>}
                            {videos.length > 0 && <span>• {videos.length} video{videos.length > 1 ? "s" : ""}</span>}
                            {models.length > 0 && <span>• {models.length} 3D model{models.length > 1 ? "s" : ""}</span>}
                        </div>
                    </Section>
                )}

                {allMedia.length === 0 && (
                    <div className="aspect-video bg-app-bg border border-dashed border-app-border rounded-xl flex items-center justify-center">
                        <span className="text-sm text-app-muted font-medium">No media uploaded</span>
                    </div>
                )}

                <div className="h-px bg-app-border" />

                {/* ── Basic Info ── */}
                <Section title="Basic Info" icon={<Info className="size-3" />}>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Name — full width */}
                        <div className="col-span-2 p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Name</div>
                            <div className="text-base font-bold text-app-text">{item.name}</div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Slug</div>
                            <div className="text-sm font-mono text-app-text break-all">{item.slug}</div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">SKU</div>
                            <div className="text-sm font-mono text-app-text">{item.sku}</div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Base Price</div>
                            <div className="text-lg font-bold text-app-text">{formatCurrency(item.base_price)}</div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Tax Rate</div>
                            <div className="text-sm font-semibold text-app-text">{item.base_tax_rate > 0 ? `${item.base_tax_rate}%` : "No tax"}</div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Type</div>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-block ${TYPE_STYLES[item.type] ?? "bg-gray-100 text-gray-700"}`}>
                                {item.type.replace(/_/g, " ")}
                            </span>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Spice Level</div>
                            {item.spice_level && item.spice_level !== SpiceLevel.NONE ? (
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${SPICE_COLORS[item.spice_level]}`}>
                                    <Flame className="size-3" />
                                    {item.spice_level.replace(/_/g, " ")} {"🌶".repeat(SPICE_CHILIS[item.spice_level])}
                                </span>
                            ) : (
                                <span className="text-sm font-semibold text-app-muted">None</span>
                            )}
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Calories</div>
                            <div className="text-sm font-semibold text-app-text flex items-center gap-1">
                                <Activity className="size-3.5 text-blue-500" />
                                {item.calories > 0 ? `${item.calories} kcal` : "—"}
                            </div>
                        </div>

                        <div className="p-3 bg-app-bg rounded-lg border border-app-border">
                            <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Alcohol</div>
                            <div className={`text-sm font-semibold ${item.is_alcohol ? "text-purple-700" : "text-app-muted"}`}>
                                {item.is_alcohol ? "🍷 Yes" : "No"}
                            </div>
                        </div>

                        {item.product_uuid && (
                            <div className="col-span-2 p-3 bg-app-bg rounded-lg border border-app-border">
                                <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider mb-1">Product ID</div>
                                <div className="text-[10px] font-mono text-app-muted break-all">{item.product_uuid}</div>
                            </div>
                        )}
                    </div>
                </Section>

                {/* ── Description ── */}
                {item.description && (
                    <Section title="Description">
                        <p className="text-sm text-app-text leading-relaxed bg-app-bg rounded-lg p-3 border border-app-border">
                            {item.description}
                        </p>
                    </Section>
                )}

                {/* ── Nutritional Info ── */}
                {hasNutrition && (
                    <Section title="Nutrition (per serving)" icon={<Leaf className="size-3" />}>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { label: "Protein", value: item.nutritional_info.protein, unit: "g", color: "text-blue-600" },
                                { label: "Carbs", value: item.nutritional_info.carbs, unit: "g", color: "text-amber-600" },
                                { label: "Fat", value: item.nutritional_info.fat, unit: "g", color: "text-red-500" },
                                { label: "Fiber", value: item.nutritional_info.fiber, unit: "g", color: "text-green-600" },
                            ].map(({ label, value, unit, color }) => (
                                <div key={label} className="p-3 bg-app-bg rounded-xl border border-app-border text-center">
                                    <div className={`text-base font-bold ${color}`}>{value}{unit}</div>
                                    <div className="text-[10px] text-app-muted font-semibold mt-0.5">{label}</div>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}

                {/* ── Tags ── */}
                {item.tags && item.tags.length > 0 && (
                    <Section title="Tags" icon={<Tag className="size-3" />}>
                        <div className="flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-app-bg border border-app-border text-xs font-semibold text-app-text">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </Section>
                )}

                {/* ── Allergens ── */}
                {item.allergens && item.allergens.length > 0 && (
                    <Section title="Allergens" icon={<AlertTriangle className="size-3 text-amber-500" />}>
                        <div className="flex flex-wrap gap-1.5">
                            {item.allergens.map((a) => (
                                <span key={a} className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
                                    ⚠️ {a}
                                </span>
                            ))}
                        </div>
                    </Section>
                )}

                <div className="h-px bg-app-border" />

                {/* ── Meta Info ── */}
                <Section title="Details">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                            { label: "SKU", value: item.sku },
                            { label: "Status", value: item.is_active ? "Active" : "Inactive" },
                            { label: "Featured", value: item.is_featured ? "Yes" : "No" },
                            { label: "Alcohol", value: item.is_alcohol ? "Yes" : "No" },
                            {
                                label: "Created",
                                value: new Date(item.created_at).toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric"
                                })
                            },
                            {
                                label: "Updated",
                                value: new Date(item.updated_at).toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric"
                                })
                            },
                        ].map(({ label, value }) => (
                            <div key={label} className="p-3 bg-app-bg rounded-lg border border-app-border">
                                <div className="text-[10px] text-app-muted font-bold uppercase mb-0.5">{label}</div>
                                <div className="font-semibold text-app-text">{value}</div>
                            </div>
                        ))}
                    </div>
                </Section>

            </div>
        </SidePanel>
    );
};

export default MenuItemDetailPanel;
