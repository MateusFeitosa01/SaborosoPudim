interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  pendente: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    label: "Pendente",
  },
  preparando: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "Preparando",
  },
  pronto: {
    bg: "bg-purple-100",
    text: "text-purple-800",
    label: "Pronto",
  },
  entregue: {
    bg: "bg-green-100",
    text: "text-green-800",
    label: "Entregue",
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pendente;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}
    >
      {config.label}
    </span>
  );
}
