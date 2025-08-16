import { useState } from "react";
import { Play, Pause, MoreHorizontal, Clock, Calendar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface WorkflowHeaderProps {
  title: string;
  icon: string;
  isRunning: boolean;
  schedule: string;
  onToggleRun: () => void;
}

const WorkflowHeader = ({ title, icon, isRunning, schedule, onToggleRun }: WorkflowHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border bg-card">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Run every {schedule}</span>
              <Badge
                variant={isRunning ? "default" : "secondary"}
                className={isRunning ? "bg-success-bg text-success-border border-success-border" : ""}
              >
                {isRunning ? "Running" : "Paused"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleRun}
          className="gap-2"
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start
            </>
          )}
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="w-4 h-4" />
          Schedule
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default WorkflowHeader;