import { Link } from "wouter";
import { Layout } from "@/components/game/Layout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, CheckCircle, Users } from "lucide-react";
import heroImage from "@assets/generated_images/modern_career_growth_illustration.png";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 py-8 lg:py-16">
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Siap Hadapi <br/>
              <span className="text-primary bg-primary/10 px-2 rounded-lg -ml-2 box-decoration-clone">Dunia Kerja?</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Pelajari hak pekerja, tips interview, dan etika profesional melalui game interaktif yang seru. Persiapkan karirmu dari sekarang!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/game" className={cn(buttonVariants({ size: "lg" }), "h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all")}>
              <a>
                Mulai Bermain <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Link>
            <Link href="/result" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 px-8 text-lg rounded-xl border-2 hover:bg-muted/50")}>
              <a>Lihat Progress</a>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-border/50">
            <FeatureItem icon={BookOpen} text="Materi Edukatif" />
            <FeatureItem icon={CheckCircle} text="Simulasi Nyata" />
            <FeatureItem icon={Users} text="Ramah Pemula" />
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl animate-in fade-in zoom-in duration-1000 delay-200">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-success rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <Card className="relative border-0 shadow-2xl overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <img 
                  src={heroImage} 
                  alt="Ilustrasi Dunia Kerja" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-3 text-muted-foreground font-medium">
      <div className="p-2 bg-primary/10 rounded-full text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <span>{text}</span>
    </div>
  );
}
