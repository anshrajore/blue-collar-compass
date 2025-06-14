import React from "react";
import Layout from "@/components/Layout";
import JobCard from "@/components/JobCard";
import { sampleJobs } from "@/utils/sampleJobs";

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-nayidisha-blue">
          Latest Job Openings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
