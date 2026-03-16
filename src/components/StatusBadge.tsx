import { ApprovalStatus } from '@/data/types';

export default function StatusBadge({ status }: { status: ApprovalStatus | string }) {
  const cls =
    status === 'approved' || status === 'delivered' ? 'badge-approved' :
    status === 'rejected' || status === 'cancelled' ? 'badge-rejected' :
    'badge-pending';
  return <span className={cls}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}
