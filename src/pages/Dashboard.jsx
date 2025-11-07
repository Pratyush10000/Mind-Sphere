import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FileText, History, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-mental-health.jpg";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-2xl mb-12">
          <div className="absolute inset-0">
            <img 
              src={heroImage} 
              alt="Mental wellness journey" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/80"></div>
          </div>
          <div className="relative z-10 px-8 py-16 md:py-24 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your Mental Wellness Journey
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl">
              Take control of your mental health with comprehensive assessments and personalized insights.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/questionnaire")}
              className="bg-white text-primary hover:bg-white/90"
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Assessment
            </Button>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/questionnaire")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>New Assessment</CardTitle>
              <CardDescription>
                Complete a comprehensive mental health questionnaire
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/history")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <History className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>View History</CardTitle>
              <CardDescription>
                Review your past assessments and track your progress
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate("/about")}>
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-secondary/50 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Learn More</CardTitle>
              <CardDescription>
                Discover resources and information about mental health
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* Info Section */}
        <section className="bg-card rounded-xl p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Why Mental Health Matters</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mental health is just as important as physical health. Regular self-assessment can help you 
                understand your emotional well-being, identify areas that need attention, and track your progress 
                over time. Our comprehensive questionnaire evaluates anxiety, depression, and stress levels to 
                provide you with actionable insights.
              </p>
              <Button variant="outline" onClick={() => navigate("/about")}>
                Learn More About Mental Health
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

