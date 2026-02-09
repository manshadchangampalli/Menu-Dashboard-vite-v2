import { useState } from "react";
import type { MenuItem } from "../../pages/menu/menu.type";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { Edit2, Trash2, X, Star, Box, Video, Image as ImageIcon, ExternalLink } from "lucide-react";

interface MenuDetailPanelProps {
    item: MenuItem | null;
    open: boolean;
    onClose: () => void;
}

const MenuDetailPanel = ({ item, open, onClose }: MenuDetailPanelProps) => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!item) return null;

    const Header = (
        <div className="flex items-center justify-between w-full">
            <div>
                <h2 className="text-lg font-bold text-app-text">Item Details</h2>
                <div className="flex items-center gap-2 text-xs text-app-muted mt-0.5">
                    <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 border border-neutral-200">
                        {item.sku}
                    </span>
                    <span>•</span>
                    <span className={item.inStock ? "text-emerald-600 font-medium" : "text-red-500 font-medium"}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
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
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Item
            </Button>
            <Button className="h-12 w-full bg-app-text text-white hover:bg-app-text/90 font-bold">
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
            <div className="flex flex-col h-full">
                
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Top Section: Image + Info */}
                    <div className="flex gap-6">
                        {/* Image Section - Fixed 200x200 */}
                        <div className="flex flex-col gap-3 shrink-0">
                            <div className="w-[200px] h-[200px] bg-app-bg border border-app-border rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                                <img 
                                    src={item.images?.[activeImageIndex] || item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Thumbnails */}
                            {item.images && item.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto max-w-[200px] pb-1 no-scrollbar">
                                    {item.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImageIndex(idx)}
                                            className={`size-10 rounded border-2 overflow-hidden flex-shrink-0 transition-all ${activeImageIndex === idx ? 'border-app-text shadow-sm' : 'border-app-border opacity-70 hover:opacity-100'}`}
                                        >
                                            <img src={img} className="w-full h-full object-cover" alt="" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Info Column */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-xl font-bold text-app-text leading-tight mb-2">{item.name}</h1>
                                <div>
                                    {item.offerPrice ? (
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-red-600">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.offerPrice)}
                                            </span>
                                            <span className="text-sm text-app-muted line-through decoration-red-500/50">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                                            </span>
                                        </div>
                                    ) : (
                                        <span className="text-2xl font-bold text-app-text">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-app-border bg-app-bg text-xs font-bold text-app-text uppercase tracking-wider">
                                    {item.menuType}
                                </span>
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-app-border bg-app-accent text-xs font-bold text-app-text uppercase tracking-wider">
                                    {item.category}
                                </span>
                            </div>

                            {item.rating && (
                                <div className="flex items-center gap-1.5">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`size-4 ${i < Math.floor(item.rating!) ? "fill-orange-400 text-orange-400" : "fill-gray-200 text-gray-200"}`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium text-app-text">{item.rating}</span>
                                    <span className="text-xs text-app-muted">({item.reviews} reviews)</span>
                                </div>
                            )}

                             {/* Media Actions */}
                             <div className="flex flex-col gap-2 pt-2">
                                {item.modelUrl && (
                                    <Button variant="outline" size="sm" className="justify-start gap-2 h-8 text-xs font-semibold">
                                        <Box className="size-3.5" />
                                        View 3D Model
                                    </Button>
                                )}
                                {item.videos && item.videos.length > 0 && (
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="justify-start gap-2 h-8 text-xs font-semibold"
                                        onClick={() => window.open(item.videos?.[0].url, '_blank')}
                                    >
                                        <Video className="size-3.5" />
                                        Watch Video
                                        <ExternalLink className="size-3 ml-auto opacity-50" />
                                    </Button>
                                )}
                             </div>
                        </div>
                    </div>

                    <div className="h-px bg-app-border" />

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest">Description</h3>
                         <div className="space-y-3">
                            <p className="text-sm font-medium text-app-text leading-relaxed">
                                {item.shortDescription}
                            </p>
                            <p className="text-sm text-app-muted leading-relaxed">
                                {item.longDescription}
                            </p>
                        </div>
                    </div>

                    {/* Attributes / Specs */}
                    {item.attributes && item.attributes.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest">Specifications</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {item.attributes.map((attr, idx) => (
                                    <div key={idx} className="p-3 bg-app-bg rounded-lg border border-app-border flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-app-muted">{attr.name}</span>
                                        <span className="text-sm font-semibold text-app-text mt-0.5">{attr.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Variants */}
                    {item.variants && item.variants.length > 0 && (
                        <div className="space-y-4">
                            <h3 className="text-xs font-bold text-app-muted uppercase tracking-widest">Available Variants</h3>
                            <div className="space-y-2">
                                {item.variants.map((variant, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-app-border bg-white hover:border-app-text/50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-2 rounded-full ${variant.stock ? 'bg-emerald-500 ring-2 ring-emerald-100' : 'bg-red-400 ring-2 ring-red-100'}`} />
                                            <span className="text-sm font-medium text-app-text">{variant.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {!variant.stock && <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Out of Stock</span>}
                                            <span className="text-sm font-bold text-app-text group-hover:text-app-text">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(variant.price)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SidePanel>
    );
};

export default MenuDetailPanel;
