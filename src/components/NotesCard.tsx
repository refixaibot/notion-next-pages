import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Save, Edit3 } from "lucide-react";

const NotesCard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(`• Always include public info, sources and profiles in internal documentation
• Be human, concise, and supportive in customer emails—focus on resolving the problem, not company paranoia`);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original notes if needed
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Notes:</CardTitle>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none"
              placeholder="Add notes about this workflow..."
            />
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm" className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {notes.split('\n').map((line, index) => (
              <p key={index} className="text-sm text-muted-foreground leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotesCard;