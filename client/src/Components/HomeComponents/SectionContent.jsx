import React, { Fragment } from "react";
import SectionButton from "./SectionButton";


function SectionContent({ content, userRole, attendingUnits }) {
  return (
    <div className="px-5">
      {content === "Home" ? (
        <div>     
          <section>
            <div className="px-4 pb-5 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 sm:grid-cols-3">
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
                {/* <SectionButton
                  title={"Upload student details file"}
                  link={"/uploadStudDetails"}
                  content={"Lorem ipsum dolor sit amet consectetur."}
                /> */}
              </div>
            </div>
          </section>
        </div>
      ) : content === "Control" ? (
        <div>
          <section>
            <div className=" px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-2 sm:grid-cols-3">
                {
                  //If the user logged in is student only allow them to view SPE form 1 and 2
                  //If the user logged in is lecturer or admin they are allow to see everything
                  userRole === "student" ? (
                    <>
                      {attendingUnits &&
                        attendingUnits.map((unit, index) => (
                          <Fragment key={index}>
                            <SectionButton
                              title={`View ${unit} Self & Peer Evaluation 1 form`}
                              unit={unit}
                              link={`/spe1/${unit}`}
                              content={
                                "View Self & Peer Evaluation 1 form"
                              }
                            />
                            <SectionButton
                              title={`View ${unit} Self & Peer Evaluation 2 form`}
                              unit={unit}
                              link={`/spe2/${unit}`}
                              content={
                                "View Self & Peer Evaluation 2 form"
                              }
                            />
                          </Fragment>
                        ))}
                    </>
                  ) : (
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
                              title={`View ${unit} Self & Peer Evaluation 1 form`}
                              link={`/spe1/${unit}`}
                              content={
                                "View Self & Peer Evaluation 1 form."
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
                              title={`View ${unit} Self & Peer Evaluation 2 form`}
                              link={`/spe2/${unit}`}
                              content={
                                "View Self & Peer Evaluation 2 form."
                              }
                            />
                          </Fragment>
                        ))}
                    </>
                  )
                }
              </div>
            </div>
          </section>
        </div>
      ) 
      // : content === "Dashboard" ? (
      //   <div>
      //     <p>Dashboard</p>
      //   </div>
      // ) 
      : content === "Output" ? (
        <div>
          <section>
            <div className=" px-4 pt-16 pb-28 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-1 sm:grid-cols-3">
                <SectionButton
                  title={"Download output file (only available after due date)"}
                  link={"/downloadSpe"}
                  content={"Download is only available after the due date you have set."}
                />
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

export default SectionContent;
