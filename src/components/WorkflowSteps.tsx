import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, GripVertical, Trash2, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Step {
  id: string;
  order: number;
  title: string;
  description: string;
  type: "action" | "condition" | "trigger";
  status: "active" | "inactive" | "error";
}

const WorkflowSteps = () => {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "1",
      order: 1,
      title: "Pull a list of upcoming at-risk customer payments from Stripe",
      description: "Including flagged card declines, or customers flagged as a payment risk",
      type: "trigger",
      status: "active",
    },
    {
      id: "2", 
      order: 2,
      title: "For each at-risk customer, research the account holder or company using Deep People Search and Web Search",
      description: "To gather helpful context",
      type: "action",
      status: "active",
    },
    {
      id: "3",
      order: 3,
      title: "Personally email each customer with a brief, friendly, and tailored warning",
      description: "Mentioning something to resolve their payment issue (e.g., card update link, support contact, etc.)",
      type: "action", 
      status: "active",
    },
    {
      id: "4",
      order: 4,
      title: "Flag any high-value or strategic customers for escalation",
      description: "And follow up by the human team",
      type: "condition",
      status: "active",
    },
  ]);

  const addStep = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      order: steps.length + 1,
      title: "New step",
      description: "Click to edit this step",
      type: "action",
      status: "inactive",
    };
    setSteps([...steps, newStep]);
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case "trigger":
        return "⚡";
      case "condition":
        return "❓";
      case "action":
        return "🎯";
      default:
        return "🔧";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success-bg text-success-border border-success-border";
      case "inactive":
        return "bg-gray-100 text-gray-600 border-gray-300";
      case "error":
        return "bg-red-100 text-red-600 border-red-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Steps:</CardTitle>
        <Button onClick={addStep} size="sm" variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Step
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="group relative p-4 rounded-lg border border-border bg-step-bg hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {step.order}
                </div>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getStepIcon(step.type)}</span>
                    <h3 className="font-medium text-foreground leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit3 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => deleteStep(step.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {step.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusColor(step.status)}`}
                  >
                    {step.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WorkflowSteps;