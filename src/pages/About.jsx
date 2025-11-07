import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Brain, Heart, Shield, Users, Phone, ExternalLink } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex flex-col">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">About Mental Health</h1>
          <p className="text-muted-foreground text-lg">
            Understanding the importance of mental wellness
          </p>
        </div>

        {/* What is Mental Health */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Brain className="h-8 w-8 text-primary" />
              <CardTitle className="text-2xl">What is Mental Health?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Mental health includes our emotional, psychological, and social well-being. It affects how we 
              think, feel, and act. It also helps determine how we handle stress, relate to others, and make 
              healthy choices.
            </p>
            <p>
              Mental health is important at every stage of life, from childhood and adolescence through adulthood. 
              Over the course of your life, if you experience mental health problems, your thinking, mood, and 
              behavior could be affected.
            </p>
          </CardContent>
        </Card>

        {/* Why It Matters */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl">Why Mental Health Matters</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Prevention
                </h3>
                <p className="text-muted-foreground">
                  Regular self-assessment can help identify early warning signs and prevent mental health 
                  conditions from worsening.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Relationships
                </h3>
                <p className="text-muted-foreground">
                  Good mental health enables better relationships with family, friends, and colleagues.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Conditions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Understanding Common Conditions</CardTitle>
            <CardDescription>Learn about anxiety, depression, and stress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Anxiety</h3>
              <p className="text-muted-foreground">
                Anxiety disorders involve more than temporary worry or fear. For people with an anxiety 
                disorder, the anxiety does not go away and can get worse over time, interfering with daily 
                activities such as job performance and relationships.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Depression</h3>
              <p className="text-muted-foreground">
                Depression is a common and serious medical illness that negatively affects how you feel, 
                think, and act. It causes feelings of sadness and/or a loss of interest in activities you 
                once enjoyed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Stress</h3>
              <p className="text-muted-foreground">
                Stress is your body's way of responding to any kind of demand or threat. When you sense 
                danger, your body's defenses kick into high gear in a rapid, automatic process known as 
                the fight-or-flight response.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Phone className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl">Crisis Resources</CardTitle>
            </div>
            <CardDescription>If you're in crisis, help is available 24/7</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
              <h3 className="font-semibold mb-2">National Suicide Prevention Lifeline</h3>
              <p className="text-2xl font-bold text-destructive mb-2">988</p>
              <p className="text-sm text-muted-foreground">
                Available 24/7. Free and confidential support for people in distress.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold mb-2">Crisis Text Line</h3>
              <p className="text-lg font-bold text-primary mb-2">Text HOME to 741741</p>
              <p className="text-sm text-muted-foreground">
                Free, 24/7 support for those in crisis via text message.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h3>
              <p className="text-muted-foreground mb-6">
                Take a confidential assessment to understand your mental health better.
              </p>
              <Button size="lg" onClick={() => navigate("/questionnaire")}>
                Take Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;

