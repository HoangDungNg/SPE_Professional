import React from "react";

function IntroCard({ SPENumber, unitCode }) {
  return (
    <div className=" mx-auto bg-[#FFFFFF] rounded-lg text-xl my-4 lg:w-3/5 md:w-5/5">
      <div className="rounded-t-lg bg-[#E12945] h-2.5">{/*bg-[#607C8A]*/}</div> 

      <div className="divide-y divide-slate-200">
        <div className="flex flex-wrap items-center">
          <span className="p-5 font-normal text-3xl">
            Self and Peer Evaluation {SPENumber} for {unitCode}
          </span>
        </div>
        {/* <div className="border border-[#dadce0] width-full"></div> */}

        <div>
          {/* Take in email from database */}
          <div className="p-5">
        
            <div className="flex flex-col space-between items-start">
                <span className="px-5 text-sm font-bold ">Introduction</span>
                <p className="px-5 pt-5 text-sm text-left">
                Below you will see a series of questions and scales designed to
                allow you to evaluate both your own performance in the project
                process to date, and that of each of your fellow group members.
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                This form, together with those of others in your group, will
                determine the first Self and Peer Evaluation (SPE) mark that you
                get.
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                Fill in this form electronically, and
                submit your complete form.
                </p>
                <p className="p-5 text-sm text-left">
                <strong>Please note: </strong>Everything that you put into this form will be kept
                strictly confidential by the unit coordinator.
                </p>
            </div>

            <div className="flex flex-col space-between items-start">
                <span className="px-5 pt-5 text-sm font-bold ">Using the assessment scales</span>
                <p className="px-5 pt-5 text-sm text-left">
                    You need to fill in a mark from the scale for each one of 5 performance criteria. These are:
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                    1 = Very poor, or even obstructive, contribution to the project process
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                    2 = Poor contribution to the project process
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                    3 = acceptable contribution to the project process
                </p>
                <p className="px-5 pt-5 text-sm text-left">
                    4 = good contribution to the project process
                </p>
                <p className="p-5 text-sm text-left">
                    5 = excellent contribution to the project process
                </p>
            </div>

            <div className="flex flex-col space-between items-start">
                <span className="px-5 pt-5 text-sm font-bold ">The assessment criteria</span>
                <p className="px-5 text-sm text-left">
                You need to fill in a mark from the scale for each one of 5 performance criteria.  These are:
                </p>

                <div className="px-9">
                    <ol className="list-decimal">
                        <li className="text-sm pt-5 text-left">The amount of work and effort put into the Requirements and Analysis Document, the Project Management Plan, and the Design Document.</li>
                        <li className="text-sm pt-3 text-left">Willingness to work as part of the group and taking responsibility in the group.</li>
                        <li className="text-sm pt-3 text-left">Communication within the group and participation in group meetings.</li>
                        <li className="text-sm pt-3 text-left">Contribution to the management of the project, e.g. work delivered on time.</li>
                        <li className="text-sm pt-3 text-left">Problem solving and creativity on behalf of the group’s work.</li>
                    </ol>
                </div> 
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default IntroCard;
