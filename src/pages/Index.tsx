import { useState } from "react";
import WorkspaceSidebar from "@/components/WorkspaceSidebar";
import WorkflowHeader from "@/components/WorkflowHeader";
import IntegrationsCard from "@/components/IntegrationsCard";
import WorkflowSteps from "@/components/WorkflowSteps";
import NotesCard from "@/components/NotesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isWorkflowRunning, setIsWorkflowRunning] = useState(true);

  const toggleWorkflowRun = () => {
    setIsWorkflowRunning(!isWorkflowRunning);
  };

  return (
    <div className="min-h-screen bg-workspace-bg flex">
      <WorkspaceSidebar />
      
      <main className="flex-1 overflow-auto">
        <WorkflowHeader
          title="Failed Payment Prevention"
          icon="🔄"
          isRunning={isWorkflowRunning}
          schedule="day at 9:00am"
          onToggleRun={toggleWorkflowRun}
        />
        
        <div className="p-6 space-y-6 max-w-4xl">
          {/* Goal Section */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Goal:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                Proactively prevent failed payments by <strong>identifying upcoming at-risk Stripe customers</strong> and 
                directly contacting them after research.
              </p>
            </CardContent>
          </Card>

          {/* Integrations */}
          <IntegrationsCard />

          {/* Steps */}
          <WorkflowSteps />

          {/* Notes */}
          <NotesCard />
        </div>
      </main>
    </div>
  );
};

export default Index;
