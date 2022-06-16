import React from "react";
import { Link } from "react-router-dom";
import SectionButton from "./SectionButton";

function SectionContent({ content }) {
  return (
    <div className="p-10">
      {content === "Initiation" ? (
        <div>
          <section>
            <div class=" px-4 py-16 sm:px-6 lg:px-8">

                <div class="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    <SectionButton title={'Add/Update form for SPE 1'} link={'/addSpe1'} content={'Lorem ipsum dolor sit amet consectetur.'}/>
                    <SectionButton title={'Add/Update form for SPE 2'} link={'/spe2'} content={'Lorem ipsum dolor sit amet consectetur.'}/>
                    <SectionButton title={'Upload student details file'} link={'/uploadStudDetails'} content={'Lorem ipsum dolor sit amet consectetur.'}/>                 
                </div>

            </div>
          </section>
        </div>
      ) : content === "Control" ? (
        <div>
            <section>
                <div class=" px-4 py-16 sm:px-6 lg:px-8">

                    <div class="grid grid-cols-2 gap-4 lg:grid-cols-2 sm:grid-cols-3">
                        <SectionButton title={'Set up a new due date for SPE 1'} link={'/setSpe1Due'} content={'Lorem ipsum dolor sit amet consectetur.'}/>
                        <SectionButton title={'View SPE 1 form'} link={'/spe1'} content={'Lorem ipsum dolor sit amet consectetur.'}/>
                        <SectionButton title={'Set up a new due date for SPE 2'} link={'/setSpe2Due'} content={'Lorem ipsum dolor sit amet consectetur.'}/>   
                        <SectionButton title={'View SPE 2 form'} link={'/spe2'} content={'Lorem ipsum dolor sit amet consectetur.'}/>                           
                    </div>

                </div>
            </section>
        </div>
      ) : content === "Dashboard" ? (
        <div>
          <p>Dashboard</p>
        </div>
      ) : content === "Output" ? (
        <div>
            <section>
                <div class=" px-4 py-16 sm:px-6 lg:px-8">

                    <div class="grid grid-cols-2 gap-4 lg:grid-cols-1 sm:grid-cols-3">
                        <SectionButton title={'Download output file (only available after due date)'} link={'/downloadSpe'} content={'Lorem ipsum dolor sit amet consectetur.'}/>                               
                    </div>

                </div>
            </section>
        </div>
      ) : null}
    </div>
  );
}

export default SectionContent;
