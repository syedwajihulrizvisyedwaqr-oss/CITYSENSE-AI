import React from "react";
import { Users, Phone, MapPin, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export const TeamView: React.FC = () => {
  const teams = [
    {
      id: "TEAM-ALPHA",
      name: "BBMP Rapid Pavement Unit 1",
      lead: "Ramesh Narayanan",
      zone: "South Zone (Koramangala, HSR)",
      status: "On Patrol",
      activeTask: "Repaving damaged pedestrian walkway slab on 5th Block",
      members: 4,
      phone: "+91 80 2266 0001"
    },
    {
      id: "TEAM-BETA",
      name: "Solid Waste Automated Clean Crew",
      lead: "Sunita Deshmukh",
      zone: "East Zone (Indiranagar, Whitefield)",
      status: "Dispatched",
      activeTask: "Commercial bin spillover extraction & sanitization",
      members: 3,
      phone: "+91 80 2266 0002"
    },
    {
      id: "TEAM-GAMMA",
      name: "Electrical & Luminaire Squad",
      lead: "Karthik Verma",
      zone: "Central Zone (Bengaluru Urban)",
      status: "Available",
      activeTask: "Standby for dark corridor maintenance",
      members: 2,
      phone: "+91 80 2266 0003"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-400" />
            <span>Municipal Maintenance Teams & Field Squads</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time crew tracking, zone dispatch rosters, and active ticket allocations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teams.map((team) => (
          <div
            key={team.id}
            className="rounded-xl bg-[#0a101f] border border-slate-800 p-5 space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-sky-400 font-bold bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/30">
                  {team.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    team.status === "On Patrol"
                      ? "bg-sky-500/20 text-sky-400"
                      : team.status === "Dispatched"
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-emerald-500/20 text-emerald-400"
                  }`}
                >
                  {team.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mt-2">{team.name}</h3>
              <p className="text-xs text-slate-400">Supervisor: {team.lead}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span>{team.zone}</span>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[#070b16] border border-slate-800 text-xs space-y-1">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Active Assignment</span>
              <p className="text-slate-300 font-medium">{team.activeTask}</p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400">{team.members} Field Operators</span>
              <span className="text-sky-400 font-mono font-medium">{team.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
