"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { formAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Form() {
  const VOICE_OPTIONS = ["Munni", "Papa", "Mummy", "Daddy"];
  const REPEAT_OPTIONS = ["30min", "1hr", "3hr", "6hr", "12hr", "24hr"];
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
  const router = useRouter();
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      {/* Back Button */}
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={() => router.push("/user")}
          className="flex items-center space-x-2"
        >
          <ArrowLeft
            onClick={() => router.push("/user")}
            className="w-4 h-4 mr-2"
          />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Set New Call Therapy</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
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
                  <SelectValue placeholder="Select caller voice" />
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
                  />
                  <Input
                    placeholder="Answer to expect"
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
