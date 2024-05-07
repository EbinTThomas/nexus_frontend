import Header from '@/components/common/header';
import * as actions from "@/actions/index";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import BasicFlow from '@/components/inspect/basic-flow';

interface BasicFlowInterface {
  params: {
    projectId: string,
    scanId: string
  }
}

export default async function Inspect(props: BasicFlowInterface) {
  const scanDetail = await actions.getScanDetail(props.params.scanId); 

  return (
    <>
      <Header title="Assessment Visualization" description="A Visualization of the exploited path with the assigned keys" />
      <div className="mb-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${props.params.projectId}/scans`}>Scans</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/projects/${props.params.projectId}/scans/${props.params.scanId}`}>{scanDetail.name}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Visualization</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <BasicFlow />
    </>
  );
}