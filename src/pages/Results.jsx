import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle } from "lucide-react";

const Results = () => {
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestAssessment = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data, error } = await supabase
          .from("assessments")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setAssessment(data);
      } catch (error) {
        console.error("Error fetching assessment:", error);
        navigate("/questionnaire");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAssessment();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return null;
  }

  const getScoreColor = (score) => {
    if (score < 30) return "text-green-600";
    if (score < 50) return "text-yellow-600";
    if (score < 70) return "text-orange-600";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score < 30) return "Low";
    if (score < 50) return "Moderate";
    if (score < 70) return "High";
    return "Severe";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
          <p className="text-muted-foreground">
            Completed on {new Date(assessment.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Score Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Anxiety Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getScoreColor(assessment.anxiety_score)}`}>
                  {assessment.anxiety_score}%
                </div>
                <Progress value={assessment.anxiety_score} className="h-2" />
                <p className="text-sm text-muted-foreground">{getScoreLabel(assessment.anxiety_score)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Depression Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getScoreColor(assessment.depression_score)}`}>
                  {assessment.depression_score}%
                </div>
                <Progress value={assessment.depression_score} className="h-2" />
                <p className="text-sm text-muted-foreground">{getScoreLabel(assessment.depression_score)}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stress Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className={`text-4xl font-bold ${getScoreColor(assessment.stress_score)}`}>
                  {assessment.stress_score}%
                </div>
                <Progress value={assessment.stress_score} className="h-2" />
                <p className="text-sm text-muted-foreground">{getScoreLabel(assessment.stress_score)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Assessment */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-primary mt-1" />
              <div>
                <CardTitle>Overall Assessment</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">
                  {assessment.overall_assessment}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Steps you can take to improve your mental wellness</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {assessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/history")}>
            View History
          </Button>
          <Button variant="outline" onClick={() => navigate("/questionnaire")}>
            Take Another Assessment
          </Button>
          <Button variant="outline" onClick={() => navigate("/about")}>
            Learn More
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;

