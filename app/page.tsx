import Image from "next/image";
import Chat from "@/components/chat";
import { Briefcase, GraduationCap, MapPin, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <aside className="hidden md:flex w-80 flex-col border-r border-gray-200 bg-gray-50">
        <div className="p-6 space-y-6">
          <div>
            <Image
              src="/headshot.jpg"
              alt="Joseph Hale"
              width={80}
              height={80}
              className="rounded-full object-cover"
              priority
            />
            <h1 className="mt-4 text-xl font-bold text-gray-900">
              Joseph Hale
            </h1>
            <p className="text-sm text-gray-500">
              Sr. Practice Leader, Healthcare & Life Sciences
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <Briefcase className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
              <span>Snowflake</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
              <span>Alpharetta, Georgia</span>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
              <span>Auburn University – BS, Applied Discrete Mathematics</span>
            </div>
            <div className="flex items-start gap-2">
              <Award className="h-4 w-4 mt-0.5 text-gray-400 shrink-0" />
              <span>27+ years global experience</span>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Career Highlights
            </h2>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>• 40+ enterprise clients across 11 industries</li>
              <li>• Presidents Club 2017 & 2019</li>
              <li>• Top US Services Sales Mgr 2015 & 2016</li>
              <li>• Certified ScrumMaster (CSM)</li>
              <li>• 3x Salesforce Ranger</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Experience
            </h2>
            <ul className="text-sm text-gray-600 space-y-1.5">
              <li>Snowflake · Sr. Practice Leader</li>
              <li>Salesforce · Account Partner Director</li>
              <li>Qlik · Global Sr. Customer Success Exec</li>
              <li>Oracle · Managing Principal Consultant</li>
            </ul>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Chat with Joseph&apos;s Digital Twin
            </h2>
            <p className="text-xs text-gray-400">
              Powered by AI · Ask about career, skills & experience
            </p>
          </div>
          <div className="md:hidden">
            <Image
              src="/headshot.jpg"
              alt="Joseph Hale"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
        </header>
        <Chat />
      </main>
    </div>
  );
}
