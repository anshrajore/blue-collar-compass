import React from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: "sk01",
    title: "Plumbing Basics",
    description: "Learn core plumbing concepts, best practices, and safety.",
    progress: 80,
    level: "Beginner",
  },
  {
    id: "sk02",
    title: "Electrician Training",
    description: "Wiring, circuits, and troubleshooting for entry-level jobs.",
    progress: 20,
    level: "Intermediate",
  },
  {
    id: "sk03",
    title: "Carpentry Fundamentals",
    description: "Woodwork skills, tools, and site safety for carpenters.",
    progress: 100,
    level: "Advanced",
  },
  {
    id: "sk04",
    title: "Welding Essentials",
    description: "Arc, MIG, and TIG welding—techniques and hands-on demos.",
    progress: 0,
    level: "Beginner",
  },
];

const learningPaths = [
  {
    id: "lp01",
    title: "Construction Helper to Supervisor",
    steps: [
      "Basic Construction Safety",
      "Small Projects Management",
      "Team Leadership Essentials",
      "Site Supervisor Certification"
    ],
    progress: 2,
  },
  {
    id: "lp02",
    title: "Hospitality Service Pro",
    steps: [
      "Hospitality Soft Skills",
      "Hotel Operations",
      "Advanced Customer Service"
    ],
    progress: 1,
  },
];

const SkillDevelopment = () => {
  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <h1 className="text-3xl font-bold mb-6 text-nayidisha-blue">
          Skill Development
        </h1>
        <section>
          <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="shadow">
                <CardHeader>
                  <CardTitle>
                    {course.title} <Badge className="ml-2">{course.level}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-gray-600">{course.description}</p>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm">
                      Progress: {course.progress}%
                    </span>
                    {course.progress < 100 ? (
                      <Button size="sm" variant="outline">
                        Continue
                      </Button>
                    ) : (
                      <Badge variant="secondary" className="bg-green-200 text-green-800">
                        Completed
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Learning Paths</h2>
          <div className="space-y-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="shadow bg-slate-50">
                <CardHeader>
                  <CardTitle>{path.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal ml-4 mb-3">
                    {path.steps.map((step, idx) => (
                      <li
                        key={step}
                        className={idx < path.progress ? "text-green-600 font-semibold" : ""}
                      >
                        {step}
                      </li>
                    ))}
                  </ol>
                  <Progress
                    value={Math.round((path.progress / path.steps.length) * 100)}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SkillDevelopment;
