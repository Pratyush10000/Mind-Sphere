import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { FileText, TrendingDown, TrendingUp, Minus } from "lucide-react";

const History = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssessments = async () => {
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
          .order("created_at", { ascending: false });

        if (error) throw error;
        setAssessments(data || []);
      } catch (error) {
        console.error("Error fetching assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [navigate]);

  const getTrendIcon = (current, previous) => {
    if (!previous) return <Minus className="h-4 w-4 text-muted-foreground" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-green-600" />;
    if (current > previous) return <TrendingUp className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Assessment History</h1>
          <p className="text-muted-foreground">
            Track your mental health journey over time
          </p>
        </div>

        {assessments.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Assessments Yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Take your first mental health assessment to start tracking your wellness journey.
              </p>
              <Button onClick={() => navigate("/questionnaire")}>
                Start First Assessment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {assessments.map((assessment, index) => {
              const previousAssessment = assessments[index + 1];
              
              return (
                <Card key={assessment.id} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {new Date(assessment.created_at).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {assessment.overall_assessment}
                        </CardDescription>
                      </div>
                      {index === 0 && (
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          Latest
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Anxiety</span>
                          {getTrendIcon(assessment.anxiety_score, previousAssessment?.anxiety_score)}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {assessment.anxiety_score}%
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Depression</span>
                          {getTrendIcon(assessment.depression_score, previousAssessment?.depression_score)}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {assessment.depression_score}%
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Stress</span>
                          {getTrendIcon(assessment.stress_score, previousAssessment?.stress_score)}
                        </div>
                        <div className="text-2xl font-bold text-primary">
                          {assessment.stress_score}%
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default History;

