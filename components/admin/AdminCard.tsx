import { LucideIcon } from "lucide-react";

interface AdminCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export function AdminCard({
  title,
  value,
  icon: Icon,
  color = "primary",
  trend,
}: AdminCardProps) {
  const colorClasses = {
    primary: "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200",
    secondary: "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200",
    success: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200",
    warning: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200",
    danger: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200",
  };

  const iconColorClasses = {
    primary: "bg-amber-100 text-amber-600",
    secondary: "bg-slate-100 text-slate-600",
    success: "bg-emerald-100 text-emerald-600",
    warning: "bg-yellow-100 text-yellow-600",
    danger: "bg-red-100 text-red-600",
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded-lg p-6 flex items-start justify-between transition-all hover:shadow-md`}
    >
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p
            className={`text-xs mt-2 font-semibold ${
              trend.isPositive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}% {trend.label}
          </p>
        )}
      </div>
      <div className={`${iconColorClasses[color]} p-3 rounded-lg ml-4`}>
        <Icon size={24} />
      </div>
    </div>
  );
}
