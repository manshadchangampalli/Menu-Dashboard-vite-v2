import { Bell } from "lucide-react";

const TopBar = () => {
    return (
        <header className="h-16 flex items-center justify-end px-8 border-b border-app-border bg-white sticky top-0 z-10">
            <div className="flex items-center gap-5">
                <button className="relative p-2 rounded-md text-app-muted hover:text-app-text hover:bg-app-bg transition-colors">
                    <Bell className="size-6" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-app-text ring-2 ring-white"></span>
                </button>
                <div className="h-8 w-px bg-app-border"></div>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex flex-col text-right hidden sm:flex">
                        <span className="text-sm font-bold leading-none text-app-text">Sarah Jenkins</span>
                        <span className="text-xs text-app-muted mt-1">General Manager</span>
                    </div>
                    <div className="size-9 rounded-full bg-app-bg overflow-hidden border border-app-border group-hover:border-app-text transition-all">
                        <img
                            alt="User avatar"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPkp61zV93HfwnCFBEVSrQ0C6RZ__d4NLO2CQQgoanXjzbFNWkhEpb5pxSVYjPB2YBQ3Ji157n592lM8fh3j1VABiBP0emn--ldqHBVF1g0Ktm126SAxEnHptIh2buPKa-CCBsFqL6lsu1X3vtQcH-fAR3RGHvbV0LnuZSscv4hA5GQcfpUVrdyA-xBD0BEeTskxTvvRsU4ClnkkY2c9sR_sYCNEbggiib2qojGqUcYILxr-uX6ApCuDn7cdwjKGe0YkuULxFDkgJR"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
