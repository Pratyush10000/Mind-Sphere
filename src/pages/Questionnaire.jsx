import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const questions = [
  { id: "q1", text: "How often have you felt nervous or anxious?", category: "anxiety" },
  { id: "q2", text: "How often have you worried about things?", category: "anxiety" },
  { id: "q3", text: "How often have you felt restless or on edge?", category: "anxiety" },
  { id: "q4", text: "How often have you felt down or depressed?", category: "depression" },
  { id: "q5", text: "How often have you lost interest in activities?", category: "depression" },
  { id: "q6", text: "How often have you had trouble sleeping?", category: "depression" },
  { id: "q7", text: "How often have you felt overwhelmed?", category: "stress" },
  { id: "q8", text: "How often have you had difficulty concentrating?", category: "stress" },
  { id: "q9", text: "How often have you felt irritable or angry?", category: "stress" },
  { id: "q10", text: "How often have you experienced physical symptoms of stress?", category: "stress" },
];

const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

const Questionnaire = () => {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const progress = (Object.keys(responses).length / questions.length) * 100;

  const handleResponseChange = (questionId, value) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateScores = () => {
    const scores = { anxiety: 0, depression: 0, stress: 0 };
    
    questions.forEach((question) => {
      const response = parseInt(responses[question.id] || "0");
      if (question.category === "anxiety") scores.anxiety += response;
      if (question.category === "depression") scores.depression += response;
      if (question.category === "stress") scores.stress += response;
    });

    // Convert to percentage (each category has different max scores)
    return {
      anxiety: Math.round((scores.anxiety / 9) * 100), // 3 questions * 3 max
      depression: Math.round((scores.depression / 9) * 100),
      stress: Math.round((scores.stress / 12) * 100), // 4 questions * 3 max
    };
  };

  const getAssessment = (scores) => {
    const avg = (scores.anxiety + scores.depression + scores.stress) / 3;
    
    if (avg < 30) return "Your mental health appears to be in good standing. Keep up your self-care practices.";
    if (avg < 50) return "You're experiencing some challenges. Consider incorporating stress-management techniques.";
    if (avg < 70) return "You're facing significant difficulties. We recommend speaking with a mental health professional.";
    return "You're experiencing severe symptoms. Please seek professional help immediately.";
  };

  const getRecommendations = (scores) => {
    const recommendations = [];
    
    if (scores.anxiety > 50) recommendations.push("Practice deep breathing exercises daily");
    if (scores.depression > 50) recommendations.push("Engage in activities you enjoy");
    if (scores.stress > 50) recommendations.push("Establish a regular sleep schedule");
    
    recommendations.push("Consider speaking with a mental health professional");
    recommendations.push("Maintain regular exercise routine");
    
    return recommendations;
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length < questions.length) {
      toast({
        title: "Incomplete Assessment",
        description: "Please answer all questions before submitting.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const scores = calculateScores();
      const assessment = getAssessment(scores);
      const recommendations = getRecommendations(scores);

      const { error } = await supabase.from("assessments").insert({
        user_id: user.id,
        responses: responses,
        anxiety_score: scores.anxiety,
        depression_score: scores.depression,
        stress_score: scores.stress,
        overall_assessment: assessment,
        recommendations: recommendations,
      });

      if (error) throw error;

      toast({
        title: "Assessment Complete",
        description: "Your results have been saved successfully.",
      });

      navigate("/results");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to save assessment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-3xl flex-1">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">Mental Health Assessment</CardTitle>
            <CardDescription>
              Answer the following questions based on your experiences over the past two weeks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Object.keys(responses).length} / {questions.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1}. {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={responses[question.id]}
                  onValueChange={(value) => handleResponseChange(question.id, value)}
                >
                  <div className="space-y-3">
                    {options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                        <Label htmlFor={`${question.id}-${option.value}`} className="cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            size="lg" 
            onClick={handleSubmit} 
            disabled={loading || Object.keys(responses).length < questions.length}
          >
            {loading ? "Saving..." : "Submit Assessment"}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questionnaire;

