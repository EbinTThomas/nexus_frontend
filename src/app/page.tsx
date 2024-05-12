import { axiosPrivate } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";


const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen lg:px-[15vw] md:px-[10vw] sm:px-[5vw]">
      <div className="w-full">
        <div className="pt-[10rem] max-w-[700px]">
          <div className="text-[4rem] font-bold leading-[4rem]">
            <span className="text-primary">XOPs</span> - Adversary Cloud Penetration Testing Framework
          </div>
          <p className="text-xl text-muted-foreground mt-8">
            Identify misconfigurations in your cloud infrastructure and enhance your security posture.
          </p>
          <div className="mt-16">
            <Link href={"/projects"} className="px-8 py-4 font-medium border border-primary text-primary rounded-[4px] min-w-[160px] text-xl">Get Started</Link>
          </div>
        </div>
      </div>
      <div className="">
        <section className="flex pt-[200px] pb-[160px] items-center">
          <h2 className="text-5xl font-bold mb-4 text-gray-700">Is your cloud infrastructure vulnerable?</h2>
          <div className="">
            <p className="text-lg mb-4">Many organizations face security risks due to misconfigurations in their cloud environments. XOPs can help you identify and mitigate these risks.</p>
            <ul className="list-disc list-inside">
              <li>Are your user roles and policies properly configured?</li>
              <li>Do you know who has access to your sensitive data?</li>
              <li>Are your cloud resources adequately protected?</li>
            </ul>
          </div>
        </section>
        <section className="flex pb-[160px]">
          <div className="">
            <p className="text-lg mb-4">XOPs offers a comprehensive solution for identifying and addressing misconfigurations in your cloud infrastructure.</p>
            <ul className="list-disc list-inside">
              <li>Scan your cloud environment for misconfigurations.</li>
              <li>Visualize potential attack paths and security risks.</li>
              <li>Receive actionable recommendations for improving your security posture.</li>
            </ul>
          </div>
          <h2 className="text-5xl font-bold text-gray-700">How XOPs can help</h2>
        </section>
        <section className="bg-gray-800 rounded-[8px] p-8 mb-8 text-white">
          <h2 className="text-4xl font-bold mb-4">Get started with XOPs today</h2>
          <p className="text-lg mb-8">Sign up for XOPs and start securing your cloud infrastructure.</p>
          <Link href={"/projects"} className="px-8 py-4 font-medium border border-white text-white rounded-[4px] min-w-[160px] text-l">Get Started</Link>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;

