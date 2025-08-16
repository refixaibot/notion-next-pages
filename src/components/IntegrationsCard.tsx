import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  color: string;
}

const IntegrationsCard = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "stripe",
      name: "Stripe",
      description: "for payment status and upcoming renewals",
      icon: "💳",
      enabled: true,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "deep-people-search",
      name: "Deep People Search",
      description: "to learn about the person or company",
      icon: "🔍",
      enabled: false,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "web-search",
      name: "Web Search",
      description: "to learn about the person or company",
      icon: "🌐",
      enabled: false,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "gmail",
      name: "Gmail",
      description: "for direct customer outreach",
      icon: "📧",
      enabled: false,
      color: "bg-red-100 text-red-800",
    },
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Integrations:</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-integration-bg"
          >
            <Checkbox
              id={integration.id}
              checked={integration.enabled}
              onCheckedChange={() => toggleIntegration(integration.id)}
              className="mt-0.5"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">{integration.icon}</span>
                <label
                  htmlFor={integration.id}
                  className="font-medium text-foreground cursor-pointer"
                >
                  {integration.name}
                </label>
                <Badge variant="secondary" className={integration.color}>
                  {integration.enabled ? "Active" : "Inactive"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IntegrationsCard;