import React, { Fragment } from "react";
import SectionButton from "./SectionButton";

//Home Content: View SPE1 & SPE2 (Student & lecturer only) Done
//Control Content: Add Spe1 & Spe2 and set up SPE1 & SPE2 (Lecturer only)
//Output Content: Download output file (Lecturer only)
//Admin Control Content: Add users (student and lecturer), Add units

function SectionContent({ content, userRole, attendingUnits }) {
  return (
    <div className="px-5">
      {content === "Home" ? (
        <>
          <section>
            <div className="px-4 pb-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3">
                {userRole === "student" || userRole === "lecturer" ? (
                    <>
                    {attendingUnits &&
                        attendingUnits.map((unit, index) => (
                        <Fragment key={index}>
                            <SectionButton
                            title={`View ${unit} Self & Peer Evaluation 1 form`}
                            unit={unit}
                            link={`/spe1/${unit}`}
                            content={"View Self & Peer Evaluation 1 form"}
                            />
                            <SectionButton
                            title={`View ${unit} Self & Peer Evaluation 2 form`}
                            unit={unit}
                            link={`/spe2/${unit}`}
                            content={"View Self & Peer Evaluation 2 form"}
                            />
                        </Fragment>
                        ))}
                    </>
                    
                ): null}
              </div>
            </div>
          </section>
        </>
      ) : content === "Control" ? (
        <>
          <section>
            <div className=" px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3">
                {
                  //If the user logged in is student only allow them to view SPE form 1 and 2
                  //If the user logged in is lecturer or admin they are allow to see everything
                    userRole === "lecturer" && 
                    <>
                      {attendingUnits &&
                        attendingUnits.map((unit, index) => (
                          <Fragment key={index}>
                            <SectionButton
                              title={"Set up a new due date for SPE 1"}
                              link={"/addSpe1"}
                              content={
                                "Set up new due date for unit(s) for Self & Peer Evaluation 1."
                              }
                            />
                            <SectionButton
                              title={"Set up a new due date for SPE 2"}
                              link={"/addSpe2"}
                              content={
                                "Set up new due date for unit(s) for Self & Peer Evaluation 2."
                              }
                            />
                            
                            <SectionButton
                                title={"Add/Update form for SPE 1"}
                                link={"/addSpe1"}
                                content={"Add or update Self and Peer Evaluation form 1."}
                            />
                            <SectionButton
                                title={"Add/Update form for SPE 2"}
                                link={"/addSpe2"}
                                content={"Add or update Self and Peer Evaluation form 2."}
                            />
                          </Fragment>
                        ))}
                    </> 
                }
              </div>
            </div>
          </section>
        </>
      ) : content === "AdminControl" ?  (
        <>
          <section>
            <div className=" px-4 pt-16 pb-28 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3">
                <SectionButton
                  title={"Register/Update student information"}
                  link={"/registerStud"}
                  content={ "Register students"}
                />
                <SectionButton
                  title={"Register Units"}
                  link={"/registerUnit"}
                  content={"Register units"}
                />
                <SectionButton
                  title={"Register/Update lecture information"}
                  link={"/registerLect"}
                  content={"Register lecturer"}
                />
              </div>
            </div>
          </section>
        </>
      ) : content === "Output" ? (
        <>
          <section>
            <div className=" px-4 pt-16 pb-28 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 sm:grid-cols-3">
                <SectionButton
                  title={"Download output file (only available after due date)"}
                  link={"/downloadSpe"}
                  content={
                    "Download is only available after the due date you have set."
                  }
                />
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}

export default SectionContent;
