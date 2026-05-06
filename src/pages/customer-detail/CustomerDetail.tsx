import { useParams, useNavigate } from "react-router";
import { ChevronRight, User, Mail, Phone, Calendar, CheckCircle2, XCircle, LogIn, MapPin, Home, Star } from "lucide-react";
import { useCustomerById } from "../customers/hooks/useCustomers";
import type { CustomerAddress } from "../customers/customer.type";

const LOGIN_METHOD_LABELS: Record<string, string> = {
  PASSWORD: "Password",
  EMAIL_OTP: "Email OTP",
};

const CustomerProfileCard = ({ customer }: { customer: any }) => (
  <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
    <div className="flex flex-col items-center text-center">
      <div className="size-20 rounded-full bg-app-bg border border-app-border flex items-center justify-center mb-4 shadow-sm">
        <User className="size-9 text-app-muted" />
      </div>
      <h3 className="text-xl font-bold text-app-text">{customer.full_name}</h3>
      <p className="text-xs font-semibold text-app-muted mb-3 uppercase tracking-wider">Customer</p>
      {customer.is_verified ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-emerald-50 text-emerald-700 border-emerald-100">
          <CheckCircle2 className="size-3.5" /> Verified
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-gray-50 text-gray-500 border-gray-200">
          <XCircle className="size-3.5" /> Unverified
        </span>
      )}
    </div>

    <div className="mt-6 pt-6 border-t border-app-border space-y-4">
      <h4 className="text-[11px] font-bold text-app-muted uppercase tracking-widest">Contact Info</h4>

      <div className="flex items-start gap-3">
        <Mail className="text-app-muted size-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-app-muted font-medium">Email</p>
          <p className="text-sm font-semibold text-app-text break-all">{customer.email}</p>
        </div>
      </div>

      {customer.phone && (
        <div className="flex items-start gap-3">
          <Phone className="text-app-muted size-5 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-app-muted font-medium">Phone</p>
            <p className="text-sm font-semibold text-app-text">{customer.phone}</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <LogIn className="text-app-muted size-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-app-muted font-medium">Login Method</p>
          <p className="text-sm font-semibold text-app-text">
            {LOGIN_METHOD_LABELS[customer.login_method] ?? customer.login_method}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Calendar className="text-app-muted size-5 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs text-app-muted font-medium">Joined</p>
          <p className="text-sm font-semibold text-app-text">
            {new Date(customer.created_at).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const AddressCard = ({ address }: { address: CustomerAddress }) => (
  <div className="border border-app-border rounded-lg p-4 space-y-1.5 relative">
    {address.is_default && (
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full uppercase">
        <Star className="size-2.5" /> Default
      </span>
    )}
    {address.label && (
      <p className="text-xs font-bold text-app-muted uppercase tracking-wider">{address.label}</p>
    )}
    <p className="text-sm font-semibold text-app-text">
      {address.line1}
      {address.line2 && `, ${address.line2}`}
    </p>
    <p className="text-xs text-app-muted">
      {[address.area, address.city, address.state, address.postal_code]
        .filter(Boolean)
        .join(", ")}
    </p>
    <p className="text-xs text-app-muted">{address.country}</p>
    {address.contact_phone && (
      <p className="text-xs text-app-muted flex items-center gap-1">
        <Phone className="size-3" /> {address.contact_phone}
      </p>
    )}
    {address.notes && (
      <p className="text-xs text-app-muted italic">{address.notes}</p>
    )}
  </div>
);

const AddressesCard = ({ addresses }: { addresses: CustomerAddress[] }) => (
  <div className="bg-white border border-app-border rounded-xl p-6 shadow-sm">
    <div className="flex items-center gap-2 mb-5">
      <MapPin className="size-4 text-app-muted" />
      <h4 className="text-sm font-bold text-app-text">Saved Addresses</h4>
      <span className="ml-auto text-xs font-bold text-app-muted bg-app-bg border border-app-border px-2 py-0.5 rounded-full">
        {addresses.length}
      </span>
    </div>
    {addresses.length === 0 ? (
      <div className="flex flex-col items-center py-8 text-app-muted gap-2">
        <Home className="size-8 opacity-30" />
        <p className="text-sm font-medium">No saved addresses</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {addresses.map((addr) => (
          <AddressCard key={addr._id} address={addr} />
        ))}
      </div>
    )}
  </div>
);

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: response, isLoading } = useCustomerById(id!);

  const customer = response?.data;

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-app-bg rounded w-64" />
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 h-96 bg-app-bg rounded-xl" />
            <div className="col-span-8 h-96 bg-app-bg rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!customer) {
    return (
      <main className="flex-1 overflow-y-auto p-8">
        <p className="text-app-muted">Customer not found.</p>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-app-muted mb-2 uppercase tracking-widest">
            <button className="hover:text-app-text" onClick={() => navigate("/customers")}>
              Customers
            </button>
            <ChevronRight className="size-3.5" />
            <span className="text-app-text font-bold">Profile</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-app-text">{customer.full_name}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-1 lg:col-span-4">
          <CustomerProfileCard customer={customer} />
        </div>
        <div className="col-span-1 lg:col-span-8">
          <AddressesCard addresses={customer.addresses ?? []} />
        </div>
      </div>
    </main>
  );
};

export default CustomerDetail;
