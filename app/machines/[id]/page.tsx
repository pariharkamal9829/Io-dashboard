import { DashboardLayout } from "@/components/dashboard-layout"
import { MachineDetails } from "@/components/machine-details"

export default function MachinePage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <MachineDetails id={params.id} />
    </DashboardLayout>
  )
}
