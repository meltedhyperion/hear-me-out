"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const VOICE_OPTIONS = ["Voice 1", "Voice 2", "Voice 3"];
const REPEAT_OPTIONS = ["30min", "1hr", "3hr", "6hr", "12hr", "1day"];

export default function AddAgentPage() {
  const router = useRouter();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/protected")}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Title", id: "title" },
              { label: "Caller Name", id: "callerName" },
              { label: "Relation to Patient", id: "relationToPatient" },
              { label: "Call Number", id: "callNumber", type: "tel" },
              { label: "Number of Repeats", id: "noOfRepeats", type: "number" },
            ].map(({ label, id, type }) => (
              <div key={id}>
                <label
                  htmlFor={id}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {label}
                </label>
                <Input
                  id={id}
                  type={type || "text"}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Voice
              </label>
              <Select
                value={formData.voice}
                onValueChange={(value) => handleSelectChange("voice", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {VOICE_OPTIONS.map((v) => (
                    <SelectItem key={v} value={v}>
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Context
              </label>
              <Textarea
                id="context"
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
                    placeholder="Question"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionnaireChange(
                        index,
                        "question",
                        e.target.value
                      )
                    }
                    required
                  />
                  <Input
                    placeholder="Answer"
                    value={q.answer}
                    onChange={(e) =>
                      handleQuestionnaireChange(index, "answer", e.target.value)
                    }
                    required
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
            </div>

            <Button type="submit">Save Call</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
