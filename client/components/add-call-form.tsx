"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AudioRecorder from "@/audio-recorder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Form() {
  const REPEAT_OPTIONS = ["30min", "1hr", "3hr", "6hr", "12hr", "24hr"];
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    callerName: "",
    relationToPatient: "",
    voice: "",
    context: "",
    repeat: "",
    noOfRepeats: "",
    callNumber: "",
    questionnaires: [{ question: "", answer: "" }],
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleQuestionnaireChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedQ = [...prev.questionnaires];
      updatedQ[index][field] = value;
      return { ...prev, questionnaires: updatedQ };
    });
  };

  const handleAddQuestionnaire = () => {
    setFormData((prev) => ({
      ...prev,
      questionnaires: [...prev.questionnaires, { question: "", answer: "" }],
    }));
  };

  const handleRemoveQuestionnaire = (index) => {
    setFormData((prev) => ({
      ...prev,
      questionnaires: prev.questionnaires.filter((_, i) => i !== index),
    }));
  };

  const handleVoiceGenerated = (audioId: string) => {
    console.log("Voice generated:", audioId);
    setFormData((prev) => ({ ...prev, voice: audioId }));
  };

  const router = useRouter();

  // When the form is submitted, set isLoading to true.
  const handleSubmit = () => {
    setIsLoading(true);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/user")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Set New Call Therapy</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            action={formAction}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            {[
              { label: "Title", id: "title", placeholder: "Title" },
              {
                label: "Caller Name",
                id: "callerName",
                placeholder: "Name of the Caller",
              },
              {
                label: "Relation to Patient",
                id: "relationToPatient",
                placeholder: "Their Relation to the Patient",
              },
              {
                label: "Call Number",
                id: "callNumber",
                type: "tel",
                placeholder: "Phone Number to Call",
              },
              {
                label: "Number of Repeats",
                id: "noOfRepeats",
                type: "number",
                placeholder: "Number of times to repeat",
              },
            ].map(({ label, id, type, placeholder }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <Input
                  id={id}
                  name={id}
                  type={type || "text"}
                  placeholder={placeholder}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Add Caller's Voice
              </label>
              <AudioRecorder
                name={formData.callerName}
                onVoiceGenerated={handleVoiceGenerated}
              />
              {formData.voice && (
                <p className="text-sm font-bold text-green-600 mt-1 text-center">
                  Voice uploaded
                </p>
              )}
              {/* Hidden input to include voice data in the form submission */}
              <input type="hidden" name="voice" value={formData.voice} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Repeat
              </label>
              <Select
                value={formData.repeat}
                onValueChange={(value) => handleSelectChange("repeat", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select repeat interval" />
                </SelectTrigger>
                <SelectContent>
                  {REPEAT_OPTIONS.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Hidden input to include repeat value */}
              <input type="hidden" name="repeat" value={formData.repeat} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Context
              </label>
              <Textarea
                id="context"
                name="context"
                placeholder="Context of the call and caller"
                value={formData.context}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Questionnaires
              </label>
              {formData.questionnaires.map((q, index) => (
                <div key={index} className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Question to ask"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionnaireChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    required
                    name={`question-${index}`}
                  />
                  <Input
                    placeholder="Answer to expect"
                    value={q.answer}
                    onChange={(e) =>
                      handleQuestionnaireChange(index, "answer", e.target.value)
                    }
                    required
                    name={`answer-${index}`}
                  />
                  <Button
                    type="button"
                    onClick={() => handleRemoveQuestionnaire(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddQuestionnaire}
                className="mt-2"
              >
                Add Question
              </Button>
              {/* Hidden input to submit questionnaires as JSON */}
              <input
                type="hidden"
                name="questionnaires"
                value={JSON.stringify(formData.questionnaires)}
              />
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Call"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
