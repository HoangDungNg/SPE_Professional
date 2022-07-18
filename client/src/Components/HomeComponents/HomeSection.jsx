import React from "react";
import Feed from "../Feed";
import SectionContent from "./SectionContent";

function HomeSection({ title, userRole, attendingUnits }) {
  return (
    <div className="h-full mb-1 flex flex-row divide-x-2 divide-dotted divide-slate-400">
      <div
        className={`${
          userRole === "student" ? "flex-[100%]" : "flex-[70%]"
        } h-screen overflow-auto no-scrollbar items-start`}
      >
        <div className="flex pl-10 py-8 justify-start items-center">
          <h1>
            <span className="underline underline-offset-1 decoration-[#E12945]">
              Welcome
            </span>{" "}
            to Self & Peer Evaluation Portal
          </h1>
        </div>

        {
          userRole === "student" ? (
            <SectionContent
              content={"Home"}
              userRole={userRole}
              attendingUnits={attendingUnits}
            />
        ) : userRole === "lecturer" ? (
          <>
            <SectionContent
              content={"Home"}
              userRole={userRole}
              attendingUnits={attendingUnits}
            />

            <SectionContent
              content={"Control"}
              userRole={userRole}
              attendingUnits={attendingUnits}
            />

            <SectionContent
              content={"Output"}
              userRole={userRole}
              attendingUnits={attendingUnits}
            />
          </>
        ) : userRole === "admin" ? (
          <>
            <SectionContent
                content={"AdminControl"}
                userRole={userRole}
                attendingUnits={attendingUnits}
              />
          </>
        ) : null
      
      }
      </div>
      {userRole === "student" ? null : (
        <div className="flex-[30%] h-screen lg:flex md:hidden sm:hidden xs:hidden 2xs:hidden 3xs:hidden 4xs:hidden">
          <div className="px-10 overflow-auto">
            <div className="flex pl-10 py-8 justify-start items-center">
              <h1>
                <span className="underline underline-offset-1 decoration-[#E12945]">
                  Recent
                </span>{" "}
                activities
              </h1>
            </div>

            <div>
              <Feed />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeSection;
