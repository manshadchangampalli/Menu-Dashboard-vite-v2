import { useForm, Controller } from "react-hook-form";
import SidePanel from "../ui/SidePanel";
import { Button } from "../ui/button";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";
import { X, Save, MapPin, Clock, Users } from "lucide-react";
import { useCreateBranch } from "../../pages/branches/hooks/useBranches";
import { type CreateBranchRequest, BranchStatus, BranchType, DayOfWeek } from "../../pages/branches/service/branches.type";
import { toast } from "sonner";

interface BranchCreatePanelProps {
    open: boolean;
    onClose: () => void;
}

const BranchCreatePanel = ({ open, onClose }: BranchCreatePanelProps) => {
    const { mutate: createBranch, isPending } = useCreateBranch();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateBranchRequest>({
        defaultValues: {
            status: BranchStatus.ACTIVE,
            branch_type: BranchType.STANDARD,
            address_detail: {
                country: "UAE",
                city: "Dubai",
                state: "Dubai",
                zip_code: "00000",
                street: "",
                map_location_url: "",
                coordinates: { lat: 0, lng: 0 }
            },
            operating_hours: [
                {
                    day: DayOfWeek.MONDAY,
                    open_time: "09:00",
                    close_time: "22:00",
                    is_closed: false,
                },
            ],
            occupancy_stats: {
                capacity: 50,
            },
            organization_id: "69948af4435dccf179e3e939",
            manager_id: "69948af4435dccf179e3e939",
            name: "",
            email: "",
            phone: "",
        },
    });

    const onSubmit = (data: CreateBranchRequest) => {
        createBranch(data, {
            onSuccess: () => {
                toast.success("Branch created successfully!");
                reset();
                onClose();
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to create branch");
            },
        });
    };

    const Header = (
        <div className="flex items-center justify-between w-full">
            <div>
                <h2 className="text-lg font-bold text-app-text">Create New Branch</h2>
                <p className="text-xs text-app-muted mt-0.5">Fill in the details to add a new restaurant location.</p>
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
        <div className="flex gap-3 h-12">
            <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 font-bold border-app-border text-app-text hover:bg-app-bg"
                type="button"
            >
                Cancel
            </Button>
            <Button
                className="flex-1 bg-app-text text-white hover:bg-app-text/90 font-bold shadow-sm"
                onClick={handleSubmit(onSubmit)}
                disabled={isPending}
            >
                {isPending ? "Creating..." : (
                    <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Branch
                    </>
                )}
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
            <form className="p-6 space-y-8" onSubmit={handleSubmit(onSubmit)}>
                {/* Basic Information */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-app-accent">
                            <Save className="w-4 h-4 text-app-text" />
                        </div>
                        <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Basic Information</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Branch name is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Branch Name"
                                    placeholder="e.g. Dubai Marina Branch"
                                    error={errors.name?.message}
                                />
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                }}
                                render={({ field }) => (
                                    <CustomInput
                                        {...field}
                                        label="Email"
                                        placeholder="branch@example.com"
                                        type="email"
                                        error={errors.email?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "Phone is required" }}
                                render={({ field }) => (
                                    <CustomInput
                                        {...field}
                                        label="Phone"
                                        placeholder="9876543210"
                                        error={errors.phone?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>
                </section>

                {/* Location Details */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-app-accent">
                            <MapPin className="w-4 h-4 text-app-text" />
                        </div>
                        <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Location Details</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <Controller
                            name="address_detail.street"
                            control={control}
                            rules={{ required: "Street is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Street Address"
                                    placeholder="123 Main St"
                                    error={errors.address_detail?.street?.message}
                                />
                            )}
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <Controller
                                name="address_detail.city"
                                control={control}
                                render={({ field }) => (
                                    <CustomInput {...field} label="City" />
                                )}
                            />
                            <Controller
                                name="address_detail.state"
                                control={control}
                                render={({ field }) => (
                                    <CustomInput {...field} label="State" />
                                )}
                            />
                            <Controller
                                name="address_detail.zip_code"
                                control={control}
                                render={({ field }) => (
                                    <CustomInput {...field} label="Zip Code" />
                                )}
                            />
                        </div>
                        <Controller
                            name="address_detail.map_location_url"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Map URL (Optional)"
                                    placeholder="https://maps.google.com/..."
                                />
                            )}
                        />
                    </div>
                </section>

                {/* Capacity & Type */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-app-accent">
                            <Users className="w-4 h-4 text-app-text" />
                        </div>
                        <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Capacity & Settings</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Controller
                            name="occupancy_stats.capacity"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    {...field}
                                    label="Capacity"
                                    type="number"
                                    placeholder="50"
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    error={errors.occupancy_stats?.capacity?.message}
                                />
                            )}
                        />
                        <Controller
                            name="branch_type"
                            control={control}
                            render={({ field }) => (
                                <CustomSelect
                                    label="Branch Type"
                                    options={[
                                        { label: "Standard", value: BranchType.STANDARD },
                                        { label: "Main HQ", value: BranchType.MAIN_HQ },
                                    ]}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    error={errors.branch_type?.message}
                                />
                            )}
                        />
                    </div>
                </section>

                {/* Operating Hours Placeholder */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 rounded-md bg-app-accent">
                            <Clock className="w-4 h-4 text-app-text" />
                        </div>
                        <h3 className="text-sm font-bold text-app-text uppercase tracking-wider">Operating Hours</h3>
                    </div>
                    <div className="p-4 bg-app-bg border border-app-border rounded-lg text-center">
                        <p className="text-xs text-app-muted font-medium italic">{DayOfWeek.MONDAY} 09:00 - 22:00 (Default)</p>
                        <p className="text-[10px] text-app-muted mt-1 uppercase font-bold">Standard hours will be applied initially</p>
                    </div>
                </section>
            </form>
        </SidePanel>
    );
};

export default BranchCreatePanel;
